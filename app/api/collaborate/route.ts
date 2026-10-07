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
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      console.error('[collaborate validation]', { reason: 'invalid_payload_format' });
      return bad('Invalid payload');
    }

    // Honeypot: real users never fill this hidden field. Pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const track = body.track as CollabTrack;
    if (!COLLAB_TRACKS.includes(track)) {
      console.error('[collaborate validation]', { reason: 'invalid_track', track });
      return bad('Invalid track');
    }
    const locale: Locale = body.locale === 'en' || body.locale === 'fr' || body.locale === 'it' ? body.locale : 'it';

    const fields = body.fields;
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      console.error('[collaborate validation]', { reason: 'invalid_fields_structure' });
      return bad('Invalid fields');
    }

    // Only whitelisted fields for this track are read; anything else is ignored.
    const clean: Record<string, string | true> = {};
    for (const f of COLLAB_FIELDS[track]) {
      if (f.showIf && clean[f.showIf.field] !== f.showIf.equals) continue;
      const raw = fields[f.key];

      if (f.kind === 'check') {
        if (raw === true) clean[f.key] = true;
        else if (f.required) {
          console.error('[collaborate validation]', { field: f.key, reason: 'required_checkbox_not_checked' });
          return bad(`Invalid field: ${f.key}`);
        }
        continue;
      }

      if (raw === undefined || raw === null) {
        if (f.required) {
          console.error('[collaborate validation]', { field: f.key, reason: 'required_field_missing' });
          return bad(`Invalid field: ${f.key}`);
        }
        continue;
      }
      if (typeof raw !== 'string') {
        console.error('[collaborate validation]', { field: f.key, reason: 'field_not_string', type: typeof raw });
        return bad(`Invalid field: ${f.key}`);
      }
      const value = raw.trim();
      if (!value) {
        if (f.required) {
          console.error('[collaborate validation]', { field: f.key, reason: 'required_field_empty' });
          return bad(`Invalid field: ${f.key}`);
        }
        continue;
      }

      // Normalize URLs: prepend https:// if protocol is missing
      const normalizedValue =
        f.kind === 'url' && value && !value.startsWith('http://') && !value.startsWith('https://')
          ? `https://${value}`
          : value;

      const ok =
        f.kind === 'name' ? value.length >= LIMITS.nameMin && value.length <= LIMITS.nameMax
        : f.kind === 'email' ? value.length <= LIMITS.email && EMAIL_RE.test(value)
        : f.kind === 'message' ? value.length <= LIMITS.message
        : f.kind === 'select' ? englishOptions(f.options!).includes(value)
        : f.kind === 'number' ? /^\d+$/.test(value) && parseInt(value, 10) >= LIMITS.heightMin && parseInt(value, 10) <= LIMITS.heightMax
        : f.kind === 'url' ? normalizedValue.length <= LIMITS.url && /^https?:\/\/.+/.test(normalizedValue)
        : value.length <= LIMITS.text;
      if (!ok) {
        let reason = 'validation_failed';
        if (f.kind === 'name') reason = value.length < LIMITS.nameMin ? 'name_too_short' : 'name_too_long';
        else if (f.kind === 'email') reason = EMAIL_RE.test(value) ? 'email_too_long' : 'email_invalid_format';
        else if (f.kind === 'message') reason = 'message_too_long';
        else if (f.kind === 'select') reason = `select_invalid_option_not_in_${f.options}`;
        else if (f.kind === 'number') reason = /^\d+$/.test(value) ? 'number_out_of_range' : 'number_not_digits';
        else if (f.kind === 'url') reason = /^https?:\/\/.+/.test(normalizedValue) ? 'url_too_long' : 'url_invalid_format';
        else reason = 'text_too_long';
        console.error('[collaborate validation]', { field: f.key, kind: f.kind, reason });
        return bad(`Invalid field: ${f.key}`);
      }
      // Store normalized value for URLs, original value for everything else
      clean[f.key] = f.kind === 'url' ? normalizedValue : value;
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
    const notificationSubject = track === 'agencies' ? `New Agency Enquiry — ${subjectName}` : `New collaboration request — ${collabTrackLabels[track]}: ${subjectName}`;
    const notification = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: email,
      subject: notificationSubject,
      html: buildCollabNotificationEmail(track, subjectName, rows),
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Confirmation to the applicant (in their language). Already received, so a failure here is only logged.
    const confirmationSubject = track === 'agencies' ? (locale === 'en' ? 'We received your enquiry — MEOCY Studio' : locale === 'it' ? 'Abbiamo ricevuto la tua richiesta — MEOCY STUDIO' : 'Nous avons reçu votre demande — MEOCY STUDIO') : collabSubjects[locale];
    const confirmation = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: email,
      replyTo: 'hello@meocy.com',
      subject: confirmationSubject,
      html: buildCollabConfirmationEmail(greetingName, locale),
    });
    if (confirmation.error) console.error('collaborate route: confirmation failed', confirmation.error);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('collaborate route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
