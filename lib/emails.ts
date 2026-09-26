export type Locale = 'en' | 'it' | 'fr';

export const subjects: Record<Locale, string> = {
  en: 'Booking request received',
  it: 'Richiesta di shooting ricevuta',
  fr: 'Demande de séance reçue',
};

interface BookingBody {
  name: string;
  email: string;
  date: string;
  time: string;
  brief?: string;
  brand?: string;
  locale?: Locale;
}

export const buildConfirmationEmail = (b: BookingBody, locale: Locale): string => {
  const greetings = {
    en: { hi: 'Hi', thanks: 'Thank you for reaching out! We received your booking request for', at: 'at', review: "We're reviewing your brief and will send you a shot list and fixed price quote within one working day. If you have any questions in the meantime, feel free to reply to this email.", date_time: 'Requested Date & Time', looking: 'Looking forward to working with you!', best: 'Best,\nThe MEOCY STUDIO team' },
    it: { hi: 'Ciao', thanks: 'Grazie per averci contattato! Abbiamo ricevuto la tua richiesta di shooting per', at: 'alle', review: 'Stiamo revisionando il tuo brief e ti invieremo uno shot list e il preventivo a prezzo fisso entro un giorno lavorativo. Se hai domande, non esitare a rispondere a questa email.', date_time: 'Data e Orario Richiesti', looking: 'Non vediamo l\'ora di lavorare con te!', best: 'Un saluto,\nIl team MEOCY STUDIO' },
    fr: { hi: 'Bonjour', thanks: 'Merci de nous avoir contactés ! Nous avons reçu votre demande de séance pour', at: 'à', review: 'Nous examinons votre brief et vous enverrons un plan de prise de vue et un devis à prix fixe dans un jour ouvrable. Si vous avez des questions, n\'hésitez pas à répondre à cet email.', date_time: 'Date et Heure Demandées', looking: 'Nous avons hâte de travailler avec vous !', best: 'Cordialement,\nL\'équipe MEOCY STUDIO' },
  };

  const t = greetings[locale];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .content { margin: 24px 0; }
    .field { margin: 16px 0; }
    .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #999; letter-spacing: 0.5px; }
    .value { font-size: 16px; margin-top: 4px; color: #333; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MEOCY STUDIO</div>
    </div>

    <div class="content">
      <p>${t.hi} ${b.name},</p>

      <p>${t.thanks} <strong>${b.date}</strong> ${t.at} <strong>${b.time}</strong>.</p>

      <p>${t.review}</p>

      <div class="field">
        <div class="label">${t.date_time}</div>
        <div class="value">${b.date} ${t.at} ${b.time}</div>
      </div>

      <p>${t.looking}</p>

      <div style="margin-top: 32px;">
        <p>${t.best}</p>
      </div>
    </div>

    <div class="footer">
      <p>MEOCY STUDIO • Viale Renato Serra 14, 20148 Milano • hello@meocy.com</p>
    </div>
  </div>
</body>
</html>
`;
};

export const buildNotificationEmail = (b: BookingBody): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { margin-bottom: 32px; background: #f5f5f5; padding: 24px; border-radius: 8px; }
    .logo { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .subheader { font-size: 12px; color: #999; }
    .content { margin: 24px 0; }
    .field { margin: 16px 0; padding: 12px; background: #f9f9f9; border-radius: 6px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #999; letter-spacing: 0.5px; }
    .value { font-size: 14px; margin-top: 4px; color: #333; word-break: break-word; }
    .brief { white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">📧 NEW BOOKING REQUEST</div>
      <div class="subheader">Submission received at ${new Date().toLocaleString()}</div>
    </div>

    <div class="content">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${b.name}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value">${b.email}</div>
      </div>

      ${b.brand ? `<div class="field">
        <div class="label">Brand</div>
        <div class="value">${b.brand}</div>
      </div>` : ''}

      <div class="field">
        <div class="label">Preferred Date & Time</div>
        <div class="value">${b.date} at ${b.time}</div>
      </div>

      ${b.brief ? `<div class="field">
        <div class="label">Brief</div>
        <div class="value brief">${b.brief}</div>
      </div>` : ''}

      <div class="field">
        <div class="label">Site Language</div>
        <div class="value">${(b.locale || 'it').toUpperCase()}</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
};
