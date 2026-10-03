import { Resend } from 'resend';
import { CREW_FIELDS, LIMITS } from '../../../lib/crew';
import { esc, type Locale } from '../../../lib/emails';

const MEOCY_EMAIL = 'hello@meocy.com';
const NOTIFY_EMAIL = 'hello@meocy.com';

interface CrewSubmission {
  locale: Locale;
  fields: Record<string, string | boolean>;
  company_website?: string;
}

// Simple in-memory rate limit, same as /api/collaborate: max 5 submissions per IP per 10 minutes.
// Best effort only — each serverless instance keeps its own counters.
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
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    });
  }
  return false;
}

const clientIp = (req: Request) =>
  req.headers.get('x-real-ip')?.trim() || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

const maxLength = (kind: string) =>
  kind === 'name' ? LIMITS.nameMax : kind === 'email' ? LIMITS.email : kind === 'message' ? LIMITS.message : LIMITS.text;

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }
    if (rateLimited(clientIp(request))) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: CrewSubmission | null = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Honeypot: real users never fill this hidden field. Pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
      return Response.json({ success: true });
    }

    const { locale = 'en', fields } = body;

    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      return Response.json({ error: 'Invalid fields' }, { status: 400 });
    }

    // Type and length limits (same limits as the form).
    for (const f of CREW_FIELDS) {
      const raw = fields[f.key];
      if (raw === undefined || raw === null) continue;
      if (f.kind === 'check') {
        if (typeof raw !== 'boolean') return Response.json({ error: `Invalid ${f.label}` }, { status: 400 });
        continue;
      }
      if (typeof raw !== 'string' || raw.length > maxLength(f.kind)) {
        return Response.json({ error: `Invalid ${f.label}` }, { status: 400 });
      }
    }

    // Validate required fields
    for (const f of CREW_FIELDS) {
      if (!f.required) continue;
      const raw = fields[f.key];
      // A required checkbox (privacy consent) must be literally true; String(false) would otherwise pass.
      if (f.kind === 'check') {
        if (raw !== true) return Response.json({ error: `Missing ${f.label}` }, { status: 400 });
        continue;
      }
      const value = String(raw ?? '').trim();
      if (!value) return Response.json({ error: `Missing ${f.label}` }, { status: 400 });
      if (f.kind === 'email' && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return Response.json({ error: 'Invalid email' }, { status: 400 });
      }
    }

    const name = String(fields.name || '').trim();
    const email = String(fields.email || '').trim();
    const role = String(fields.role || '').trim();

    if (!name || !email || !role) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Build notification email
    const fieldsList = CREW_FIELDS
      .filter((f) => f.key !== 'consent' && fields[f.key])
      .map((f) => {
        const value = String(fields[f.key] ?? '').trim();
        if (!value) return null;
        const label = f.emailLabel;
        if (f.kind === 'check') return `${label}: Yes`;
        return `${label}: ${value}`;
      })
      .filter(Boolean)
      .join('\n');

    const notificationHtml = `
<h2>New MEOCY Crew Profile</h2>
<p><strong>Role:</strong> ${esc(role)}</p>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<pre>${esc(fieldsList)}</pre>
<p><em>Type: Freelance Crew / Production Network</em></p>
    `;

    // Send confirmation to applicant
    const confirmationHtml = `
<h2>Thanks — we've received your details.</h2>
<p>If your profile matches a future MEOCY production need, we'll get in touch with the project details.</p>
<p>Speak soon,<br><strong>Chamila</strong><br>MEOCY STUDIO</p>
    `;

    // 1) Notification to MEOCY first, so a profile is never lost. The Resend SDK reports failures in
    //    `error` rather than throwing, so check it explicitly.
    const notification = await resend.emails.send({
      from: MEOCY_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New MEOCY Crew Profile — ${role} — ${name}`,
      html: notificationHtml,
      replyTo: email,
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Confirmation to the applicant. The profile is already with MEOCY, so a failure here is only logged
    //    (returning an error would invite a duplicate resubmission).
    const confirmation = await resend.emails.send({
      from: MEOCY_EMAIL,
      to: email,
      subject: 'MEOCY — Details received',
      html: confirmationHtml,
    });
    if (confirmation.error) console.error('crew route: confirmation failed', confirmation.error);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Crew submission error:', error);
    return Response.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
