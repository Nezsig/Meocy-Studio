export const confirmationEmailEN = (name: string, date: string, time: string) => `
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
    .cta { display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 24px 0; font-weight: 500; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MEOCY STUDIO</div>
    </div>

    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for reaching out! We received your booking request for <strong>${date}</strong> at <strong>${time}</strong>.</p>

      <p>We're reviewing your brief and will send you a shot list and fixed price quote within one working day. If you have any questions in the meantime, feel free to reply to this email.</p>

      <div class="field">
        <div class="label">Requested Date & Time</div>
        <div class="value">${date} at ${time}</div>
      </div>

      <p>Looking forward to working with you!</p>

      <div style="margin-top: 32px;">
        <p>Best,<br/>The MEOCY STUDIO team</p>
      </div>
    </div>

    <div class="footer">
      <p>MEOCY STUDIO • Viale Renato Serra 14, 20148 Milano • hello@meocy.com</p>
    </div>
  </div>
</body>
</html>
`;

export const confirmationEmailIT = (name: string, date: string, time: string) => `
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
    .cta { display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 24px 0; font-weight: 500; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MEOCY STUDIO</div>
    </div>

    <div class="content">
      <p>Ciao ${name},</p>

      <p>Grazie per averci contattato! Abbiamo ricevuto la tua richiesta di shooting per <strong>${date}</strong> alle <strong>${time}</strong>.</p>

      <p>Stiamo revisionando il tuo brief e ti invieremo uno shot list e il preventivo a prezzo fisso entro un giorno lavorativo. Se hai domande, non esitare a rispondere a questa email.</p>

      <div class="field">
        <div class="label">Data e Orario Richiesti</div>
        <div class="value">${date} alle ${time}</div>
      </div>

      <p>Non vediamo l'ora di lavorare con te!</p>

      <div style="margin-top: 32px;">
        <p>Un saluto,<br/>Il team MEOCY STUDIO</p>
      </div>
    </div>

    <div class="footer">
      <p>MEOCY STUDIO • Viale Renato Serra 14, 20148 Milano • hello@meocy.com</p>
    </div>
  </div>
</body>
</html>
`;

export const confirmationEmailFR = (name: string, date: string, time: string) => `
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
    .cta { display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 24px 0; font-weight: 500; }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">MEOCY STUDIO</div>
    </div>

    <div class="content">
      <p>Bonjour ${name},</p>

      <p>Merci de nous avoir contactés ! Nous avons reçu votre demande de séance pour <strong>${date}</strong> à <strong>${time}</strong>.</p>

      <p>Nous examinons votre brief et vous enverrons un plan de prise de vue et un devis à prix fixe dans un jour ouvrable. Si vous avez des questions, n'hésitez pas à répondre à cet email.</p>

      <div class="field">
        <div class="label">Date et Heure Demandées</div>
        <div class="value">${date} à ${time}</div>
      </div>

      <p>Nous avons hâte de travailler avec vous !</p>

      <div style="margin-top: 32px;">
        <p>Cordialement,<br/>L'équipe MEOCY STUDIO</p>
      </div>
    </div>

    <div class="footer">
      <p>MEOCY STUDIO • Viale Renato Serra 14, 20148 Milano • hello@meocy.com</p>
    </div>
  </div>
</body>
</html>
`;

export const notificationEmail = (name: string, email: string, date: string, time: string, brief: string, locale: string) => `
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
        <div class="value">${name}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email}</div>
      </div>

      <div class="field">
        <div class="label">Preferred Date & Time</div>
        <div class="value">${date} at ${time}</div>
      </div>

      <div class="field">
        <div class="label">Brief</div>
        <div class="value brief">${brief}</div>
      </div>

      <div class="field">
        <div class="label">Site Language</div>
        <div class="value">${locale.toUpperCase()}</div>
      </div>
    </div>
  </div>
</body>
</html>
`;
