import { randomInt } from 'crypto';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { buildParisCustomerEmail, buildParisNotificationEmail, parisCustomerSubject, type ParisRequestEmail } from '../../../../lib/paris-emails';
import {
  computeParisPricing,
  isParisDateSelectable,
  parisMaxPeople,
  parisNowParts,
  parisPackages,
  parisSlotsFor,
  parisStandardPeople,
  type ParisPackageId,
} from '../../../../lib/paris-shoot-config';
import { parisEn } from '../../../../data/paris/en';
import { parseAttribution } from '../../../../lib/attribution-server';

// Paris photoshoot booking requests. Separate from /api/milan/request (own rate limit, references and emails).
export const runtime = 'nodejs';

// Best-effort in-memory rate limit: max 5 requests per IP per 10 minutes, per serverless instance.
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

// Best-effort duplicate protection (double clicks / retries) within one instance for 5 minutes.
const DEDUP_WINDOW_MS = 5 * 60 * 1000;
const processed = new Map<string, { timestamp: number; reference: string }>();
function cachedReference(submissionId: string) {
  const hit = processed.get(submissionId);
  return hit && Date.now() - hit.timestamp < DEDUP_WINDOW_MS ? hit.reference : null;
}
function remember(submissionId: string, reference: string) {
  const now = Date.now();
  processed.set(submissionId, { timestamp: now, reference });
  processed.forEach((v, k) => now - v.timestamp > DEDUP_WINDOW_MS * 2 && processed.delete(k));
}

const clientIp = (req: Request) =>
  req.headers.get('x-real-ip')?.trim() || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

const PACKAGE_IDS = parisPackages.map((p) => p.id) as [ParisPackageId, ...ParisPackageId[]];
const text = (min: number, max: number) => z.string().trim().min(min).max(max);

const RequestSchema = z
  .object({
    submissionId: z.string().trim().max(100).optional().default(''),
    packageId: z.enum(PACKAGE_IDS),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    name: text(2, 100),
    email: z.string().trim().max(254).email(),
    phone: z.string().trim().min(6).max(30).regex(/^\+?[\d\s().-]+$/).refine((v) => v.replace(/\D/g, '').length >= 6),
    people: z.coerce.number().int().min(1).max(parisMaxPeople),
    country: text(2, 80),
    notes: z.string().trim().max(1000).optional().default(''),
    locale: z.enum(['en', 'it', 'fr']).catch('en'),
    attribution: z.unknown().optional(), // Optional marketing attribution; validated separately and never blocks a request
    company_website: z.string().trim().max(500).optional().default(''), // Honeypot
  })
  .strict(); // Unknown fields (price, reference, city…) are rejected

// Reference: PAR-YYMMDD-XXXX (Milan uses MEO-…), random suffix without ambiguous characters.
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function makeReference(todayIso: string) {
  const suffix = Array.from({ length: 4 }, () => REF_ALPHABET[randomInt(REF_ALPHABET.length)]).join('');
  return `PAR-${todayIso.slice(2, 4)}${todayIso.slice(5, 7)}${todayIso.slice(8, 10)}-${suffix}`;
}
const titleCase = (s: string) => s.replace(/\b(\w)(\w*)/g, (_, a: string, b: string) => a + b.toLowerCase());

export async function POST(req: Request) {
  try {
    if (rateLimited(clientIp(req))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    // Honeypot: pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') return NextResponse.json({ ok: true });

    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', fields: parsed.error.issues.map((i) => i.path.join('.')) }, { status: 400 });
    }
    const r = parsed.data;

    if (r.submissionId) {
      const ref = cachedReference(r.submissionId);
      if (ref) return NextResponse.json({ ok: true, reference: ref, pricing: computeParisPricing(r.packageId) });
    }

    // Preferred date must be today or later (Paris time) and the start time must fit the package.
    // This is only a request: nothing is reserved or confirmed here.
    if (!isParisDateSelectable(r.date) || !parisSlotsFor(r.date, r.packageId).includes(r.time)) {
      return NextResponse.json({ error: 'Date or time not available' }, { status: 409 });
    }

    const pricing = computeParisPricing(r.packageId);
    const now = parisNowParts();
    const reference = makeReference(now.date);
    const data: ParisRequestEmail = {
      reference,
      packageName: titleCase(parisEn.packages[r.packageId].name),
      date: r.date,
      time: r.time,
      location: parisEn.location.name,
      people: r.people,
      largerGroup: r.people > parisStandardPeople,
      name: r.name,
      email: r.email,
      phone: r.phone,
      country: r.country,
      notes: r.notes || undefined,
      locale: r.locale,
      submittedAt: `${now.date} ${now.time}`,
      total: pricing.total,
      attribution: parseAttribution(r.attribution),
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1) Notification to MEOCY first. If this fails nothing was received, so report an error.
    const notification = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: r.email,
      subject: `New PARIS photoshoot request — ${reference} · ${r.name}`,
      html: buildParisNotificationEmail(data),
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Customer email (EN / IT / FR). A failure is logged; the request already reached MEOCY.
    const confirmation = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: r.email,
      replyTo: 'hello@meocy.com',
      subject: parisCustomerSubject(reference, r.locale),
      html: buildParisCustomerEmail(data),
    });
    if (confirmation.error) console.error('paris request: customer email failed', reference, confirmation.error);

    if (r.submissionId) remember(r.submissionId, reference);
    return NextResponse.json({ ok: true, reference, pricing });
  } catch (e) {
    console.error('paris request route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
