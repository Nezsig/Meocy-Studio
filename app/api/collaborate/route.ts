import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import {
  buildCollabConfirmationEmail,
  buildCollabNotificationEmail,
  collabSubjects,
  collabTrackLabels,
  type Locale,
} from '../../../lib/emails';
import {
  COLLAB_FIELDS,
  COLLAB_TRACKS,
  EMAIL_RE,
  LIMITS,
  englishOptions,
  greetingField,
  subjectField,
  type CollabTrack,
} from '../../../lib/collab';

export const runtime = 'nodejs';

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes.
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
  req.headers.get('x-real-ip')?.trim() ||
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  'unknown';

const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(req: Request) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return bad('Invalid payload');

    // Honeypot: real users never fill this hidden field. Pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const track = body.track as CollabTrack;
    if (!COLLAB_TRACKS.includes(track)) return bad('Invalid track');
    const locale: Locale = body.locale === 'en' || body.locale === 'fr' || body.locale === 'it' ? body.locale : 'it';

    const fields = body.fields;
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return bad('Invalid fields');

    // Only whitelisted fields for this track are read; anything else is ignored.
    const clean: Record<string, string | true> = {};
    for (const f of COLLAB_FIELDS[track]) {
      if (f.showIf && clean[f.showIf.field] !== f.showIf.equals) continue;
      const raw = fields[f.key];

      if (f.kind === 'check') {
        if (raw === true) clean[f.key] = true;
        else if (f.required) return bad(`Invalid field: ${f.key}`);
        continue;
      }

      if (raw === undefined || raw === null) {
        if (f.required) return bad(`Invalid field: ${f.key}`);
        continue;
      }
      if (typeof raw !== 'string') return bad(`Invalid field: ${f.key}`);
      const value = raw.trim();
      if (!value) {
        if (f.required) return bad(`Invalid field: ${f.key}`);
        continue;
      }

      const ok =
        f.kind === 'name' ? value.length >= LIMITS.nameMin && value.length <= LIMITS.nameMax
        : f.kind === 'email' ? value.length <= LIMITS.email && EMAIL_RE.test(value)
        : f.kind === 'message' ? value.length <= LIMITS.message
        : f.kind === 'select' ? englishOptions(f.options!).includes(value)
        : value.length <= LIMITS.text;
      if (!ok) return bad(`Invalid field: ${f.key}`);
      clean[f.key] = value;
    }

    const email = clean.email as string;
    const subjectName = clean[subjectField(track)] as string;
    const greetingName = clean[greetingField(track)] as string;

    const rows: [string, string][] = [
      ['Track', collabTrackLabels[track]],
      ...COLLAB_FIELDS[track]
        .filter((f) => clean[f.key] !== undefined)
        .map((f): [string, string] => [f.emailLabel, clean[f.key] === true ? 'Yes' : (clean[f.key] as string)]),
      ['Language', locale.toUpperCase()],
    ];

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1) Notification first (reply goes straight to the applicant). The Resend SDK reports failures in `error`.
    const notification = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: email,
      subject: `New collaboration request — ${collabTrackLabels[track]}: ${subjectName}`,
      html: buildCollabNotificationEmail(track, subjectName, rows),
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Confirmation to the applicant (in their language). Already received, so a failure here is only logged.
    const confirmation = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: email,
      replyTo: 'hello@meocy.com',
      subject: collabSubjects[locale],
      html: buildCollabConfirmationEmail(greetingName, locale),
    });
    if (confirmation.error) console.error('collaborate route: confirmation failed', confirmation.error);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('collaborate route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
