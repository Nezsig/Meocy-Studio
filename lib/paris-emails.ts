// lib/paris-emails.ts — emails for Paris photoshoot requests (/api/paris/request).
// Separate from lib/emails.ts so Milan emails are never affected. Same visual style as the Milan emails.
import { parisDepositAmount, parisRefundDaysBefore, parisRefundHoursBefore } from './paris-shoot-config';
import { attributionEmailRows, type Attribution } from './attribution';

const c = { ink: '#0b0b0c', paper: '#f6f5f2', chalk: '#ffffff', mist: '#e5e3dd', slate: '#6b6a66', accent: '#c8f169' };
const sans = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const LOGO = 'https://meocy.com/meocy-wordmark.png';
const esc = (s: string = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export type ParisEmailLang = 'en' | 'it' | 'fr';
export const parisEmailLang = (locale?: string): ParisEmailLang => (locale === 'it' ? 'it' : locale === 'fr' ? 'fr' : 'en');

export interface ParisRequestEmail {
  reference: string;
  packageName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  people: number;
  largerGroup: boolean;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  locale: 'en' | 'it' | 'fr';
  submittedAt: string;
  total: number;
  /** Internal notification only; never shown in the customer email. */
  attribution?: Attribution | null;
}

const eur = (n: number, lang: ParisEmailLang) => (lang === 'fr' ? `${n} €` : `€${n}`);
const INTL = { en: 'en-GB', it: 'it-IT', fr: 'fr-FR' } as const;
const longDate = (date: string, lang: ParisEmailLang) =>
  new Intl.DateTimeFormat(INTL[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
const row = (l: string, v?: string) =>
  v
    ? `<tr><td valign="top" width="150" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate}">${l}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;font-weight:600;color:${c.ink}">${esc(v)}</td></tr>`
    : '';

const D = parisDepositAmount;
const days = parisRefundDaysBefore;
const hours = parisRefundHoursBefore;

const PT: Record<ParisEmailLang, any> = {
  en: {
    subject: (ref: string) => `We've received your Paris photoshoot request — ${ref}`,
    badge: 'Paris · Request received', h1a: 'Thank you — your request ', h1em: 'is in.',
    intro: (n: string) => `Hi ${n}, thank you for your Paris photoshoot request. Your requested date and time are subject to MEOCY confirmation and are not reserved yet: MEOCY reviews every request personally and will reply by email and WhatsApp to agree the final date and time with you. If your requested time is unavailable, MEOCY may propose an alternative.`,
    status: 'Status: Pending — not yet a confirmed booking', summary: 'Your Paris request',
    rRef: 'Reference', rShoot: 'Photoshoot', rShootV: 'Paris Photoshoot', rLoc: 'Location', rPkg: 'Package', rDate: 'Requested date', rTime: 'Requested time', rPeople: 'Number of people', rTotal: 'Total',
    group: 'For groups larger than two people, MEOCY will confirm availability and pricing separately.',
    noPay: 'No payment is required for this request.',
    nextT: 'What happens next.',
    steps: [['MEOCY reviews your request', 'We check availability for your requested date and time.'],
            ['You agree the final date and time', 'MEOCY contacts you by email or WhatsApp to confirm your requested date or propose an alternative.'],
            [`You receive the €${D} deposit link`, `Once the final date and time are agreed, the €${D} deposit reserves that date. Your booking is confirmed after the deposit is received.`]],
    depT: `€${D} booking deposit (only after the date is agreed): refunded in full if you cancel at least ${days} days before your shoot.`,
    depB: `If you cancel at least ${days} days (${hours} hours) before your shoot, the €${D} deposit is refunded in full. If you cancel less than ${days} days before, it is not refunded, but you may request a date change instead, subject to availability. The remaining balance is settled separately.`,
    sign: 'Speak soon,',
  },
  it: {
    subject: (ref: string) => `Abbiamo ricevuto la tua richiesta per lo shooting a Parigi — ${ref}`,
    badge: 'Parigi · Richiesta ricevuta', h1a: 'Grazie — la tua richiesta ', h1em: 'è arrivata.',
    intro: (n: string) => `Ciao ${n}, grazie per la tua richiesta di shooting a Parigi. La data e l'orario richiesti sono soggetti alla conferma di MEOCY e non sono ancora riservati: MEOCY esamina personalmente ogni richiesta e ti risponderà via email e WhatsApp per concordare con te data e orario definitivi. Se l'orario richiesto non è disponibile, MEOCY può proporti un'alternativa.`,
    status: 'Stato: In attesa — non ancora una prenotazione confermata', summary: 'La tua richiesta per Parigi',
    rRef: 'Codice', rShoot: 'Shooting', rShootV: 'Shooting a Parigi', rLoc: 'Location', rPkg: 'Pacchetto', rDate: 'Data richiesta', rTime: 'Orario richiesto', rPeople: 'Numero di persone', rTotal: 'Totale',
    group: 'Per gruppi di più di due persone, MEOCY confermerà disponibilità e prezzo separatamente.',
    noPay: 'Per questa richiesta non è richiesto alcun pagamento.',
    nextT: 'Cosa succede ora.',
    steps: [['MEOCY esamina la tua richiesta', "Verifichiamo la disponibilità per la data e l'orario richiesti."],
            ['Concordate data e orario definitivi', "MEOCY ti contatta via email o WhatsApp per confermare la data richiesta o proporti un'alternativa."],
            [`Ricevi il link per l'acconto di €${D}`, `Una volta concordati data e orario definitivi, l'acconto di €${D} riserva quella data. La prenotazione è confermata alla ricezione dell'acconto.`]],
    depT: `Acconto di prenotazione di €${D} (solo dopo aver concordato la data): rimborsato per intero se annulli almeno ${days} giorni prima dello shooting.`,
    depB: `Se annulli almeno ${days} giorni (${hours} ore) prima dello shooting, l'acconto di €${D} viene rimborsato per intero. Se annulli meno di ${days} giorni prima, l'acconto non viene rimborsato, ma puoi chiedere un cambio di data, in base alla disponibilità. Il saldo restante si regola a parte.`,
    sign: 'A presto,',
  },
  fr: {
    subject: (ref: string) => `Nous avons bien reçu votre demande de séance photo à Paris — ${ref}`,
    badge: 'Paris · Demande reçue', h1a: 'Merci — votre demande ', h1em: 'est bien arrivée.',
    intro: (n: string) => `Bonjour ${n}, merci pour votre demande de séance photo à Paris. La date et l'heure demandées sont soumises à la confirmation de MEOCY et ne sont pas encore réservées : MEOCY examine personnellement chaque demande et vous répondra par email et WhatsApp pour convenir avec vous de la date et de l'heure définitives. Si l'heure demandée n'est pas disponible, MEOCY peut vous proposer une alternative.`,
    status: 'Statut : en attente — pas encore une réservation confirmée', summary: 'Votre demande pour Paris',
    rRef: 'Référence', rShoot: 'Séance', rShootV: 'Séance photo à Paris', rLoc: 'Lieu', rPkg: 'Formule', rDate: 'Date demandée', rTime: 'Heure demandée', rPeople: 'Nombre de personnes', rTotal: 'Total',
    group: 'Pour les groupes de plus de deux personnes, MEOCY confirmera la disponibilité et le prix séparément.',
    noPay: "Aucun paiement n'est demandé pour cette demande.",
    nextT: 'Les prochaines étapes.',
    steps: [['MEOCY examine votre demande', "Nous vérifions la disponibilité pour la date et l'heure demandées."],
            ["Vous convenez de la date et de l'heure définitives", 'MEOCY vous contacte par email ou WhatsApp pour confirmer la date demandée ou vous proposer une alternative.'],
            [`Vous recevez le lien pour l'acompte de ${D} €`, `Une fois la date et l'heure définitives convenues, l'acompte de ${D} € réserve cette date. Votre réservation est confirmée à réception de l'acompte.`]],
    depT: `Acompte de réservation de ${D} € (uniquement après accord sur la date) : intégralement remboursé si vous annulez au moins ${days} jours avant votre séance.`,
    depB: `Si vous annulez au moins ${days} jours (${hours} heures) avant votre séance, l'acompte de ${D} € est intégralement remboursé. Si vous annulez moins de ${days} jours avant, il n'est pas remboursé, mais vous pouvez demander un changement de date, selon les disponibilités. Le solde est réglé séparément.`,
    sign: 'À bientôt,',
  },
};

export const parisCustomerSubject = (ref: string, locale?: string) => PT[parisEmailLang(locale)].subject(ref);

export function buildParisCustomerEmail(d: ParisRequestEmail): string {
  const lang = parisEmailLang(d.locale);
  const t = PT[lang];
  const summary = [
    row(t.rRef, d.reference), row(t.rShoot, t.rShootV), row(t.rLoc, d.location), row(t.rPkg, d.packageName),
    row(t.rDate, longDate(d.date, lang)), row(t.rTime, d.time), row(t.rPeople, String(d.people)), row(t.rTotal, eur(d.total, lang)),
  ].join('');
  const steps = t.steps
    .map((s: string[], i: number) => `<tr><td valign="top" width="36" style="padding:0 0 16px 0"><div style="width:26px;height:26px;border-radius:999px;background:${c.ink};color:${c.chalk};font-family:${sans};font-size:12px;font-weight:600;line-height:26px;text-align:center">${i + 1}</div></td><td valign="top" style="padding:2px 0 16px 0"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${s[0]}</div><div style="font-family:${sans};font-size:13px;line-height:1.5;color:${c.slate};padding-top:2px">${s[1]}</div></td></tr>`)
    .join('');
  const group = d.largerGroup ? `<p style="margin:14px 0 0;font-family:${sans};font-size:13px;line-height:1.55;color:${c.ink}">${t.group}</p>` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0}img{border:0;display:block}@media(max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${c.paper}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${c.chalk};border-radius:24px;overflow:hidden">
  <tr><td class="px" style="padding:28px 40px 20px"><table role="presentation" width="100%"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="MEOCY STUDIO" height="40" style="height:40px;width:auto"></td><td align="right" style="font-family:${sans};font-size:12px;color:${c.slate};vertical-align:middle">Paris &middot; Eiffel Tower / Trocadéro</td></tr></table></td></tr>
  <tr><td class="px" style="padding:16px 40px 8px"><div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.accent};font-family:${sans};font-size:12px;font-weight:600;color:${c.ink}">${t.badge}</div>
    <h1 class="h1" style="margin:16px 0 0;font-family:${serif};font-weight:400;font-size:42px;line-height:1.04;color:${c.ink}">${t.h1a}<em>${t.h1em}</em></h1>
    <p style="margin:20px 0 0;font-family:${sans};font-size:16px;line-height:1.6;color:#3a3a38">${t.intro(esc(d.name))}</p>
    <p style="margin:12px 0 0;font-family:${sans};font-size:13px;font-weight:600;color:${c.slate}">${t.status}</p></td></tr>
  <tr><td class="px" style="padding:24px 40px 0"><table role="presentation" width="100%" style="background:${c.paper};border-radius:16px"><tr><td style="padding:8px 22px 14px"><div style="font-family:${sans};font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${c.slate};padding:12px 0 4px">${t.summary}</div><table role="presentation" width="100%">${summary}</table>${group}<p style="margin:14px 0 0;font-family:${sans};font-size:13px;font-weight:600;color:${c.ink}">${t.noPay}</p></td></tr></table></td></tr>
  <tr><td class="px" style="padding:40px 40px 0"><h2 style="margin:0 0 20px;font-family:${serif};font-weight:400;font-size:30px;color:${c.ink}">${t.nextT}</h2><table role="presentation" width="100%">${steps}</table></td></tr>
  <tr><td class="px" style="padding:20px 40px 0"><table role="presentation" width="100%" bgcolor="${c.accent}" style="border-radius:16px"><tr><td style="padding:20px 24px"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${t.depT}</div><div style="font-family:${sans};font-size:14px;line-height:1.55;color:${c.ink};padding-top:6px">${t.depB}</div></td></tr></table></td></tr>
  <tr><td class="px" style="padding:32px 40px 40px"><p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${c.ink}">${t.sign}<br><strong>Chamila</strong><br><span style="color:${c.slate}">MEOCY STUDIO &middot; hello@meocy.com &middot; +39 379 105 1000</span></p></td></tr>
</table>
<table role="presentation" class="container" width="600" style="width:600px;max-width:600px"><tr><td class="px" style="padding:20px 40px 8px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.slate};text-align:center">MEOCY STUDIO<br>Instagram <a href="https://www.instagram.com/meocystudio/" style="color:${c.slate};text-decoration:none">@meocystudio</a></td></tr></table>
</td></tr></table></body></html>`;
}

/** Prefilled WhatsApp text MEOCY can send to the customer, in the customer's language. */
export function parisWhatsAppToCustomer(d: ParisRequestEmail): string {
  const lang = parisEmailLang(d.locale);
  if (lang === 'it') return `Ciao ${d.name}, sono MEOCY: riguardo alla tua richiesta ${d.reference} — shooting a Parigi (${d.location}), ${d.packageName}, ${longDate(d.date, 'it')} alle ${d.time}.`;
  if (lang === 'fr') return `Bonjour ${d.name}, c'est MEOCY au sujet de votre demande ${d.reference} — séance photo à Paris (${d.location}), ${d.packageName}, ${longDate(d.date, 'fr')} à ${d.time}.`;
  return `Hi ${d.name}, this is MEOCY about your request ${d.reference} — Paris photoshoot (${d.location}), ${d.packageName}, ${longDate(d.date, 'en')} at ${d.time}.`;
}

export function buildParisNotificationEmail(d: ParisRequestEmail): string {
  const waDigits = d.phone.replace(/[^\d]/g, '');
  const rows = ([
    ['Reference', d.reference], ['City', 'PARIS'], ['Photoshoot', 'Paris Photoshoot'], ['Location', d.location],
    ['Status', 'Pending — waiting for your review'], ['Package', d.packageName],
    ['Requested date', `${longDate(d.date, 'en')} (${d.date}) — not confirmed: agree the final date with the customer`], ['Requested time', `${d.time} (Paris time)`],
    ['Number of people', d.largerGroup ? `${d.people} — more than two people: confirm availability and pricing separately` : String(d.people)],
    ['Full name', d.name], ['Email', d.email], ['WhatsApp / Phone', d.phone], ['Country', d.country],
    ['Site language', d.locale.toUpperCase()], ['Special request / Notes', d.notes || '—'],
    ['Total', eur(d.total, 'en')], ['Booking deposit', `€${D} only after you and the customer agree the final date (not collected online — send the deposit link)`],
    ['Submitted', `${d.submittedAt} (Paris time)`],
    ...attributionEmailRows(d.attribution),
  ] as [string, string][])
    .map((r) => `<tr><td valign="top" style="padding:8px 12px 8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate};width:170px">${esc(r[0])}</td><td valign="top" style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;color:${c.ink};font-weight:600;white-space:pre-wrap;word-break:break-word">${esc(r[1])}</td></tr>`)
    .join('');
  const wa = waDigits ? `<a href="https://wa.me/${waDigits}?text=${encodeURIComponent(parisWhatsAppToCustomer(d))}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:${c.accent};color:${c.ink};font-size:13px;font-weight:600;text-decoration:none">Reply on WhatsApp</a>` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:${c.paper};font-family:${sans}"><table role="presentation" width="100%" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="560" style="width:560px;max-width:560px;background:${c.chalk};border-radius:16px"><tr><td style="padding:28px 32px"><div style="display:inline-block;padding:4px 10px;border-radius:999px;background:${c.ink};font-size:12px;font-weight:600;color:${c.chalk}">PARIS photoshoot · ${esc(d.reference)}</div><div style="font-family:${serif};font-size:26px;color:${c.ink};margin-top:10px">New PARIS photoshoot request</div><p style="font-size:14px;color:${c.slate};margin:6px 0 18px">Eiffel Tower / Trocadéro, Paris. Reply to this email to reach ${esc(d.name)}. The request is not in any calendar: review it and reply to the customer.</p><div>${wa}<a href="mailto:${esc(d.email)}?subject=${encodeURIComponent('MEOCY Paris — ' + d.reference)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:${c.ink};color:${c.chalk};font-size:13px;font-weight:600;text-decoration:none">Reply by email</a></div><table role="presentation" width="100%" style="margin-top:10px">${rows}</table></td></tr></table></td></tr></table></body></html>`;
}
