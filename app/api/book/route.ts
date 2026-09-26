import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { buildConfirmationEmail, buildNotificationEmail, subjects, type Locale, type Booking } from '../../../lib/emails';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }

    const booking: Booking = {
      name: body.name,
      email: body.email,
      brand: body.brand,
      package: body.package,
      shootType: body.shootType,
      where: body.where,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      specialRequests: body.specialRequests,
      locale: (body.locale === 'en' || body.locale === 'fr' || body.locale === 'it') ? body.locale : 'it',
    };

    // 1) Confirmation to the client (in their language)
    await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: booking.email,
      replyTo: 'hello@meocy.com',
      subject: subjects[booking.locale || 'it'],
      html: buildConfirmationEmail(booking, booking.locale || 'it'),
    });

    // 2) Notification to Chamila (reply goes straight to the client)
    await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: ['hello@meocy.com', 'meocystudio@gmail.com'],
      replyTo: booking.email,
      subject: `New booking — ${booking.name}${booking.brand ? ' · ' + booking.brand : ''}`,
      html: buildNotificationEmail(booking),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('book route error', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
