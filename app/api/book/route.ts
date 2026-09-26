import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { buildConfirmationEmail, buildNotificationEmail, subjects, type Locale } from '../../../lib/emails';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const b = await req.json();
    if (!b?.name || !b?.email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }
    const locale: Locale = (b.locale === 'en' || b.locale === 'fr') ? b.locale : 'it';

    // 1) Confirmation to the client (in their language)
    await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: b.email,
      replyTo: 'hello@meocy.com',
      subject: subjects[locale],
      html: buildConfirmationEmail(b, locale),
    });

    // 2) Notification to Chamila (reply goes straight to the client)
    await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: b.email,
      subject: `New booking — ${b.name}${b.brand ? ' · ' + b.brand : ''}`,
      html: buildNotificationEmail(b),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('book route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
