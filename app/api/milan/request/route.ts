import { randomInt } from 'crypto';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  buildMilanCustomerEmail,
  buildMilanNotificationEmail,
  milanCustomerSubject,
  type MilanRequestEmail,
} from '../../../../lib/emails';
import {
  availabilityEndTime,
  computePricing,
  depositPaymentUrl,
  isDateSelectable,
  isSlotSelectable,
  maxLocationsFor,
  maxPeople,
  milanLocations,
  milanPackages,
  slotStartTimes,
  standardPeople,
  type MilanLocationId,
  type MilanPackageId,
} from '../../../../lib/milan-shoot-config';
import { en } from '../../../../data/locales/en';

export const runtime = 'nodejs';

// Simple in-memory rate limit: max 5 requests per IP per 10 minutes (best effort; each serverless instance counts on its own).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.forEach((times, key) => times.every((t) => now - t >= RATE_WINDOW_MS) && hits.delete(key));
  return false;
}

// In-memory submission deduplication: tracks recently processed submission IDs.
// Purpose: prevent accidental duplicate bookings from rapid client retries or double-clicks.
// Limitation: only valid within single Vercel instance for ~5 minutes. Does NOT survive
// instance restarts or load balancing across instances. Not suitable for durable cross-instance idempotency.
const DEDUP_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const processedSubmissions = new Map<string, { timestamp: number; reference: string }>();
function checkAndRecordSubmission(submissionId: string): { isDuplicate: boolean; cachedReference?: string } {
  const now = Date.now();
  const existing = processedSubmissions.get(submissionId);
  if (existing && now - existing.timestamp < DEDUP_WINDOW_MS) {
    // Duplicate detected within dedup window; return cached reference.
    return { isDuplicate: true, cachedReference: existing.reference };
  }
  // New submission or outside dedup window; will be recorded after successful processing.
  return { isDuplicate: false };
}
function recordSubmission(submissionId: string, reference: string) {
  processedSubmissions.set(submissionId, { timestamp: Date.now(), reference });
  // Cleanup old entries to prevent unbounded growth.
  const now = Date.now();
  for (const [id, data] of processedSubmissions.entries()) {
    if (now - data.timestamp > DEDUP_WINDOW_MS * 2) {
      processedSubmissions.delete(id);
    }
  }
}

const clientIp = (req: Request) =>
  req.headers.get('x-real-ip')?.trim() || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

const PACKAGE_IDS = milanPackages.map((p) => p.id) as [MilanPackageId, ...MilanPackageId[]];
const LOCATION_IDS = milanLocations.map((l) => l.id) as [MilanLocationId, ...MilanLocationId[]];
const text = (min: number, max: number) => z.string().trim().min(min).max(max);

// Zod schema for booking request validation.
// - Only whitelisted fields are accepted
// - Unknown keys (e.g., price, bookingReference) are explicitly rejected
// - All fields are sanitized/trimmed where applicable
// - Enum validation ensures only valid packages/locations/times are accepted
// - Format validation prevents manipulated dates
// - Business logic validation (duration, location limits) happens after schema parsing
// - company_website is a honeypot field (checked before this schema, included here for strict mode)
const RequestSchema = z.object({
  submissionId: z.string().trim().min(1).max(100).optional().default(''),
  packageId: z.enum(PACKAGE_IDS),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(slotStartTimes as [string, ...string[]]),
  locations: z.array(z.enum(LOCATION_IDS)).min(1).max(milanLocations.length),
  name: text(2, 100),
  email: z.string().trim().max(254).email(),
  phone: z.string().trim().min(6).max(30).regex(/^\+?[\d\s().-]+$/).refine((v) => v.replace(/\D/g, '').length >= 6),
  people: z.coerce.number().int().min(1).max(maxPeople),
  country: text(2, 80),
  notes: z.string().trim().max(1000).optional().default(''),
  locale: z.enum(['en', 'it', 'fr']).catch('en'),
  company_website: z.string().trim().max(500).optional().default(''), // Honeypot field
}).strict(); // Reject any unknown fields (price, bookingReference, etc.)

// Reference: MEO-YYMMDD-XXXX, random suffix without ambiguous characters (no 0/O, 1/I/L).
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function makeReference(todayIso: string) {
  const suffix = Array.from({ length: 4 }, () => REF_ALPHABET[randomInt(REF_ALPHABET.length)]).join('');
  return `MEO-${todayIso.slice(2, 4)}${todayIso.slice(5, 7)}${todayIso.slice(8, 10)}-${suffix}`;
}
const milanNow = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .format(new Date())
    .replace(',', '');

export async function POST(req: Request) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Honeypot: real visitors never fill this hidden field. Pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', fields: parsed.error.issues.map((i) => i.path.join('.')) },
        { status: 400 },
      );
    }
    const r = parsed.data;

    // Deduplication: check if this submission was already processed within the dedup window.
    // If so, return the cached booking reference without reprocessing or resending emails.
    if (r.submissionId) {
      const dedup = checkAndRecordSubmission(r.submissionId);
      if (dedup.isDuplicate && dedup.cachedReference) {
        // Return success with the previously-generated reference.
        // No new emails are sent; the client receives the same reference.
        const pricing = computePricing(r.packageId, r.locations.length);
        return NextResponse.json({ ok: true, reference: dedup.cachedReference, pricing }, { status: 200 });
      }
    }

    const uniqueLocations = Array.from(new Set(r.locations));
    if (uniqueLocations.length !== r.locations.length || uniqueLocations.length > maxLocationsFor(r.packageId)) {
      return NextResponse.json({ error: 'Invalid request', fields: ['locations'] }, { status: 400 });
    }

    // Past dates, blocked dates and blocked/past start times are refused here, whatever the browser showed.
    if (!isDateSelectable(r.date) || !isSlotSelectable(r.date, r.time)) {
      return NextResponse.json({ error: 'Date or time not available' }, { status: 409 });
    }

    // Validate duration: selected time + package duration must not exceed availability end time.
    const pkg = milanPackages.find((p) => p.id === r.packageId)!;
    const [timeHour, timeMin] = r.time.split(':').map(Number);
    const [endHour, endMin] = availabilityEndTime.split(':').map(Number);
    const startMinutes = timeHour * 60 + timeMin;
    const endMinutes = endHour * 60 + endMin;
    const durationMinutes = pkg.durationHours * 60;
    if (startMinutes + durationMinutes > endMinutes) {
      return NextResponse.json({ error: 'Selected time does not allow enough duration for this package', fields: ['time'] }, { status: 400 });
    }

    const pricing = computePricing(r.packageId, uniqueLocations.length);
    const now = milanNow();
    const reference = makeReference(now.slice(0, 10));
    const m = en.milanShoot;
    const pkgName = m.packages[r.packageId].name.replace(/\b(\w)(\w*)/g, (_, a: string, b: string) => a + b.toLowerCase());

    const data: MilanRequestEmail = {
      reference,
      packageName: pkgName,
      date: r.date,
      time: r.time,
      locations: uniqueLocations.map((id) => m.locations[id].name),
      people: r.people,
      largerGroup: r.people > standardPeople,
      name: r.name,
      email: r.email,
      phone: r.phone,
      country: r.country,
      notes: r.notes || undefined,
      locale: r.locale,
      submittedAt: now,
      pricing,
      depositUrl: depositPaymentUrl || undefined,
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1) Notification to MEOCY first (English). If this fails nothing was received, so report an error.
    const notification = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: r.email,
      subject: `New Milan photoshoot request — ${reference} · ${r.name}`,
      html: buildMilanNotificationEmail(data),
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Customer email (Italian for the Italian site, otherwise English). The request is already with MEOCY,
    //    so a failure here is logged but the request still succeeds.
    const confirmation = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: r.email,
      replyTo: 'hello@meocy.com',
      subject: milanCustomerSubject(reference, r.locale),
      html: buildMilanCustomerEmail(data),
    });
    if (confirmation.error) console.error('milan request: customer email failed', reference, confirmation.error);

    // Record successful submission for deduplication.
    if (r.submissionId) {
      recordSubmission(r.submissionId, reference);
    }

    return NextResponse.json({ ok: true, reference, pricing });
  } catch (e) {
    console.error('milan request route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
