import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { buildConfirmationEmail, buildNotificationEmail, subjects, type Locale, type Booking, type ContentType } from '../../../lib/emails';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTENT_TYPES: ContentType[] = ['photography', 'video', 'both'];

// Optional string field: trimmed, capped, and dropped when empty or not a string.
const str = (v: unknown, max = 200): string | undefined => {
  if (typeof v !== 'string') return undefined;
  const s = v.trim().slice(0, max);
  return s || undefined;
};

const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') return bad('Invalid payload');

    // Honeypot: real users never fill this hidden field. Pretend success, send nothing.
    if (typeof body.company_website === 'string' && body.company_website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (name.length < 2 || name.length > 100) return bad('Invalid name');

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (email.length > 254 || !EMAIL_RE.test(email)) return bad('Invalid email');

    // `message` is sent by the /contact form and is required there; the homepage form sends `specialRequests` instead.
    let message: string | undefined;
    if (body.message !== undefined) {
      const m = typeof body.message === 'string' ? body.message.trim() : '';
      if (m.length < 10 || m.length > 3000) return bad('Invalid message');
      message = m;
    }

    const booking: Booking = {
      name,
      email,
      phone: str(body.phone),
      brand: str(body.brand),
      package: str(body.package),
      shootType: str(body.shootType),
      where: str(body.where),
      extras: str(body.extras),
      preferredDate: str(body.preferredDate),
      preferredTime: str(body.preferredTime),
      specialRequests: str(body.specialRequests, 3000),
      projectType: str(body.projectType),
      projectTypeLabel: str(body.projectTypeLabel),
      contentType: CONTENT_TYPES.includes(body.contentType) ? body.contentType : undefined,
      quantity: str(body.quantity),
      message,
      locale: (body.locale === 'en' || body.locale === 'fr' || body.locale === 'it') ? body.locale : 'it',
    };
    const locale: Locale = booking.locale || 'it';

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1) Notification to Chamila first (reply goes straight to the client), so a lead is never lost.
    // The Resend SDK reports failures in `error` rather than throwing.
    const notification = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: booking.email,
      subject: `New booking — ${booking.name}${booking.brand ? ' · ' + booking.brand : ''}`,
      html: buildNotificationEmail(booking),
    });
    if (notification.error) throw new Error(`notification failed: ${notification.error.message}`);

    // 2) Confirmation to the client (in their language). The request is already with us, so a failure here is only logged.
    const confirmation = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: booking.email,
      replyTo: 'hello@meocy.com',
      subject: subjects[locale],
      html: buildConfirmationEmail(booking, locale),
    });
    if (confirmation.error) console.error('book route: confirmation failed', confirmation.error);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('book route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
