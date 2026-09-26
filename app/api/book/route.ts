import { Resend } from 'resend';
import { confirmationEmailEN, confirmationEmailIT, confirmationEmailFR, notificationEmail } from '../../../lib/emails';

const STUDIO_EMAIL = 'hello@meocy.com';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, date, time, brief, locale } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Select confirmation email template based on locale
    let confirmationHTML = confirmationEmailEN(name, date, time);
    if (locale === 'it') {
      confirmationHTML = confirmationEmailIT(name, date, time);
    } else if (locale === 'fr') {
      confirmationHTML = confirmationEmailFR(name, date, time);
    }

    // Send confirmation email to client
    const clientEmailResult = await resend.emails.send({
      from: 'MEOCY STUDIO <hello@meocy.com>',
      to: email,
      subject: locale === 'it'
        ? 'Richiesta di shooting ricevuta'
        : locale === 'fr'
          ? 'Demande de séance reçue'
          : 'Booking request received',
      html: confirmationHTML,
    });

    // Send notification email to studio
    const studioEmailResult = await resend.emails.send({
      from: 'MEOCY STUDIO <noreply@meocy.com>',
      to: STUDIO_EMAIL,
      subject: `New Booking Request from ${name}`,
      html: notificationEmail(name, email, date, time, brief || '', locale),
    });

    // Check if both emails were sent successfully
    if (clientEmailResult.error || studioEmailResult.error) {
      console.error('Email send errors:', {
        client: clientEmailResult.error,
        studio: studioEmailResult.error,
      });
      return Response.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Booking request sent successfully',
      clientEmail: clientEmailResult.data?.id,
      studioEmail: studioEmailResult.data?.id,
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
