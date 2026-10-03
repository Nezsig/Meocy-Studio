import { Resend } from 'resend';
import { CREW_FIELDS } from '../../../lib/crew';
import { esc, type Locale } from '../../../lib/emails';

const MEOCY_EMAIL = 'hello@meocy.com';
const NOTIFY_EMAIL = 'hello@meocy.com';

interface CrewSubmission {
  locale: Locale;
  fields: Record<string, string | boolean>;
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: CrewSubmission = await request.json();
    const { locale = 'en', fields } = body;

    if (!fields || typeof fields !== 'object') {
      return Response.json({ error: 'Invalid fields' }, { status: 400 });
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

    await Promise.all([
      resend.emails.send({
        from: MEOCY_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `New MEOCY Crew Profile — ${role} — ${name}`,
        html: notificationHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: MEOCY_EMAIL,
        to: email,
        subject: 'MEOCY — Details received',
        html: confirmationHtml,
      }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Crew submission error:', error);
    return Response.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
