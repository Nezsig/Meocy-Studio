// lib/emails.ts — MEOCY STUDIO transactional emails
import { refundDaysBefore, refundHoursBefore } from './milan-shoot-config';
import { attributionEmailRows, type Attribution } from './attribution';
const c = { ink:'#0b0b0c', paper:'#f6f5f2', chalk:'#ffffff', mist:'#e5e3dd', slate:'#6b6a66', accent:'#c8f169' };
const sans = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const LOGO = 'https://meocy.com/meocy-wordmark.png';
export const esc = (s: string = '') => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

export type Locale = 'en' | 'it' | 'fr';
export interface Booking {
  name: string; email: string; brand?: string; package?: string; shootType?: string;
  where?: string; preferredDate?: string; preferredTime?: string; specialRequests?: string; locale?: Locale;
  projectType?: string; projectTypeLabel?: string; contentType?: ContentType; quantity?: string; message?: string;
  phone?: string; extras?: string;
  /** Internal notification only; never shown in the customer confirmation. */
  attribution?: Attribution | null;
}
export type ContentType = 'photography' | 'video' | 'both';

export const subjects: Record<Locale, string> = {
  en: "We've got your booking request — MEOCY STUDIO",
  it: 'Abbiamo ricevuto la tua richiesta — MEOCY STUDIO',
  fr: 'Nous avons bien reçu votre demande — MEOCY STUDIO',
};

const T: Record<Locale, any> = {
  en:{ badge:'Request received', h1a:'Thanks — your request ', h1em:'is in.',
    intro:(n:string)=>`Hi ${n}, thanks for reaching out to MEOCY STUDIO. We&rsquo;ve received your booking request and we&rsquo;ll reply <strong style="color:${c.ink}">within one working day</strong> with a shot list and a fixed price to confirm your date.`,
    summary:'Your booking request', rP:'Package', rS:'What we&rsquo;re shooting', rW:'Where', rD:'Preferred date', rT:'Preferred time', rN:'Your notes',
    rPT:'Project type', rC:'Content', rQ:'Products / outfits', rPh:'Phone', rE:'Extras', content:{ photography:'Photography', video:'Video', both:'Both' },
    nextT:'What happens next.', steps:[['We review your brief','We read your request and check the date.','Same day'],['You get a shot list + fixed price','Every frame planned, one clear price — no surprises.','Within 1 working day'],['We lock your date','Confirm, and your shoot day is held for you.','On your OK']],
    rea:'Nothing is charged yet.', reb:'Your price is fixed in writing before we start — you approve it first, always.', sign:'Speak soon,' },
  it:{ badge:'Richiesta ricevuta', h1a:'Grazie — la tua richiesta ', h1em:'è arrivata.',
    intro:(n:string)=>`Ciao ${n}, grazie per aver contattato MEOCY STUDIO. Abbiamo ricevuto la tua richiesta e ti risponderemo <strong style="color:${c.ink}">entro un giorno lavorativo</strong> con una shot list e un prezzo fisso per confermare la data.`,
    summary:'La tua richiesta', rP:'Pacchetto', rS:'Cosa fotografiamo', rW:'Dove', rD:'Data preferita', rT:'Orario preferito', rN:'Note',
    rPT:'Tipo di progetto', rC:'Contenuto', rQ:'Prodotti / outfit', rPh:'Telefono', rE:'Extra', content:{ photography:'Fotografia', video:'Video', both:'Entrambi' },
    nextT:'Cosa succede ora.', steps:[['Esaminiamo il tuo brief','Leggiamo la richiesta e controlliamo la data.','In giornata'],['Ricevi shot list + prezzo fisso','Ogni scatto pianificato, un prezzo chiaro — nessuna sorpresa.','Entro 1 giorno lavorativo'],['Blocchiamo la data','Confermi, e la data è riservata per te.','Al tuo OK']],
    rea:'Non viene addebitato nulla ora.', reb:'Il prezzo è fissato per iscritto prima di iniziare — lo approvi tu, sempre.', sign:'A presto,' },
  fr:{ badge:'Demande reçue', h1a:'Merci — votre demande ', h1em:'est bien reçue.',
    intro:(n:string)=>`Bonjour ${n}, merci d&rsquo;avoir contacté MEOCY STUDIO. Nous avons bien reçu votre demande et nous vous répondrons <strong style="color:${c.ink}">sous un jour ouvré</strong> avec une shot list et un prix fixe pour confirmer votre date.`,
    summary:'Votre demande', rP:'Formule', rS:'Ce que nous photographions', rW:'Où', rD:'Date souhaitée', rT:'Heure souhaitée', rN:'Vos notes',
    rPT:'Type de projet', rC:'Contenu', rQ:'Produits / tenues', rPh:'Téléphone', rE:'Extras', content:{ photography:'Photographie', video:'Vidéo', both:'Les deux' },
    nextT:'La suite.', steps:[['Nous étudions votre brief','Nous lisons la demande et vérifions la date.','Le jour même'],['Shot list + prix fixe','Chaque image planifiée, un prix clair — sans surprise.','Sous 1 jour ouvré'],['Nous bloquons la data','Vous confirmez, et votre date est réservée.','À votre accord']],
    rea:'Rien n&rsquo;est facturé pour l&rsquo;instant.', reb:'Le prix est fixé par écrit avant de commencer — vous l&rsquo;approuvez, toujours.', sign:'À bientôt,' },
};

function row(l: string, v?: string){ if(!v) return ''; return `<tr><td valign="top" width="150" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate}">${l}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;font-weight:600;color:${c.ink}">${esc(v)}</td></tr>`; }

export function buildConfirmationEmail(b: Booking, locale: Locale = 'it'): string {
  const t = T[locale] || T.it; const first = esc(b.name) || 'there';
  const steps = t.steps.map((s: string[], i: number)=>`<tr><td valign="top" width="36" style="padding:0 0 16px 0"><div style="width:26px;height:26px;border-radius:999px;background:${c.ink};color:${c.chalk};font-family:${sans};font-size:12px;font-weight:600;line-height:26px;text-align:center">${i+1}</div></td><td valign="top" style="padding:2px 0 16px 0"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${s[0]}</div><div style="font-family:${sans};font-size:13px;line-height:1.5;color:${c.slate};padding-top:2px">${s[1]}</div></td><td valign="top" align="right" style="padding:3px 0 16px 12px;font-family:${sans};font-size:12px;color:${c.slate};white-space:nowrap">${s[2]}</td></tr>`).join('');
  const content = b.contentType ? t.content[b.contentType] : undefined;
  const summary = [row(t.rPT,b.projectTypeLabel||b.projectType),row(t.rC,content),row(t.rQ,b.quantity),row(t.rP,b.package),row(t.rS,b.shootType),row(t.rW,b.where),row(t.rPh,b.phone),row(t.rE,b.extras),row(t.rD,b.preferredDate),row(t.rT,b.preferredTime),row(t.rN,b.specialRequests||b.message)].join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0}img{border:0;display:block}@media(max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${c.paper}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${c.chalk};border-radius:24px;overflow:hidden">
  <tr><td class="px" style="padding:28px 40px 20px"><table role="presentation" width="100%"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="MEOCY STUDIO" height="40" style="height:40px;width:auto"></td><td align="right" style="font-family:${sans};font-size:12px;color:${c.slate};vertical-align:middle">Photo &amp; video &middot; Milan</td></tr></table></td></tr>
  <tr><td class="px" style="padding:16px 40px 8px"><div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.accent};font-family:${sans};font-size:12px;font-weight:600;color:${c.ink}">${t.badge}</div>
    <h1 class="h1" style="margin:16px 0 0;font-family:${serif};font-weight:400;font-size:42px;line-height:1.04;color:${c.ink}">${t.h1a}<em>${t.h1em}</em></h1>
    <p style="margin:20px 0 0;font-family:${sans};font-size:16px;line-height:1.6;color:#3a3a38">${t.intro(first)}</p></td></tr>
  <tr><td class="px" style="padding:24px 40px 0"><table role="presentation" width="100%" style="background:${c.paper};border-radius:16px"><tr><td style="padding:8px 22px 14px"><div style="font-family:${sans};font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${c.slate};padding:12px 0 4px">${t.summary}</div><table role="presentation" width="100%">${summary}</table></td></tr></table></td></tr>
  <tr><td class="px" style="padding:40px 40px 0"><h2 style="margin:0 0 20px;font-family:${serif};font-weight:400;font-size:30px;color:${c.ink}">${t.nextT}</h2><table role="presentation" width="100%">${steps}</table></td></tr>
  <tr><td class="px" style="padding:20px 40px 0"><table role="presentation" width="100%" bgcolor="${c.accent}" style="border-radius:16px"><tr><td style="padding:20px 24px"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${t.rea}</div><div style="font-family:${sans};font-size:14px;line-height:1.55;color:${c.ink};padding-top:6px">${t.reb}</div></td></tr></table></td></tr>
  <tr><td class="px" style="padding:32px 40px 40px"><p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${c.ink}">${t.sign}<br><strong>Chamila</strong><br><span style="color:${c.slate}">MEOCY STUDIO &middot; hello@meocy.com &middot; +39 379 105 1000</span></p></td></tr>
</table>
<table role="presentation" class="container" width="600" style="width:600px;max-width:600px"><tr><td class="px" style="padding:20px 40px 8px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.slate};text-align:center">MEOCY STUDIO &middot; Milan<br>Instagram <a href="https://www.instagram.com/meocystudio/" style="color:${c.slate};text-decoration:none">@meocystudio</a></td></tr></table>
</td></tr></table></body></html>`;
}

export function buildNotificationEmail(b: Booking): string {
  const rows = ([['Name',b.name],['Email',b.email],['Phone',b.phone],['Brand',b.brand],['Project type',b.projectType],['Content',b.contentType ? T.en.content[b.contentType] : undefined],['Quantity',b.quantity],['Package',b.package],['Shoot',b.shootType],['Where',b.where],['Extras',b.extras],['Date',b.preferredDate],['Time',b.preferredTime],['Notes',b.specialRequests],['Message',b.message],...attributionEmailRows(b.attribution)] as [string,string?][])
    .filter(r=>r[1]).map(r=>`<tr><td style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate};width:120px">${r[0]}</td><td style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;color:${c.ink};font-weight:600">${esc(r[1])}</td></tr>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:${c.paper};font-family:${sans}"><table role="presentation" width="100%" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="560" style="width:560px;max-width:560px;background:${c.chalk};border-radius:16px"><tr><td style="padding:28px 32px"><div style="font-family:${serif};font-size:26px;color:${c.ink}">New booking request 🎬</div><p style="font-size:14px;color:${c.slate};margin:6px 0 18px">Reply directly to this email to reach ${esc(b.name)}.</p><table role="presentation" width="100%">${rows}</table></td></tr></table></td></tr></table></body></html>`;
}

// ---------------------------------------------------------------------------
// Collaboration requests (/collaborate) — separate from the booking emails above.
// ---------------------------------------------------------------------------
export type CollabTrack = 'models' | 'agencies';
export const collabTrackLabels: Record<CollabTrack, string> = { models: 'Models', agencies: 'Agencies' };

export const collabSubjects: Record<Locale, string> = {
  en: "We've received your message — MEOCY STUDIO",
  it: 'Abbiamo ricevuto il tuo messaggio — MEOCY STUDIO',
  fr: 'Nous avons bien reçu votre message — MEOCY STUDIO',
};

const CT: Record<Locale, { badge: string; h1a: string; h1em: string; body: (n: string) => string; sign: string }> = {
  en: { badge:'Message received', h1a:'Thank you — your message ', h1em:'is in.',
    body:(n)=>`Hi ${n}, thank you for getting in touch. I read every message personally, and if it&rsquo;s a good fit for an upcoming project I&rsquo;ll get back to you.`, sign:'Speak soon,' },
  it: { badge:'Messaggio ricevuto', h1a:'Grazie — il tuo messaggio ', h1em:'è arrivato.',
    body:(n)=>`Ciao ${n}, grazie per avermi contattato. Leggo ogni messaggio personalmente e, se è adatto a un prossimo progetto, ti risponderò.`, sign:'A presto,' },
  fr: { badge:'Message reçu', h1a:'Merci — votre message ', h1em:'est bien arrivé.',
    body:(n)=>`Bonjour ${n}, merci de m&rsquo;avoir contacté. Je lis chaque message personnellement et, si cela correspond à un prochain projet, je vous répondrai.`, sign:'À bientôt,' },
};

export function buildCollabConfirmationEmail(name: string, locale: Locale = 'it'): string {
  const t = CT[locale] || CT.it;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0}img{border:0;display:block}@media(max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${c.paper}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${c.chalk};border-radius:24px;overflow:hidden">
  <tr><td class="px" style="padding:28px 40px 20px"><table role="presentation" width="100%"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="MEOCY STUDIO" height="40" style="height:40px;width:auto"></td><td align="right" style="font-family:${sans};font-size:12px;color:${c.slate};vertical-align:middle">Photo &amp; video &middot; Milan</td></tr></table></td></tr>
  <tr><td class="px" style="padding:16px 40px 8px"><div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.accent};font-family:${sans};font-size:12px;font-weight:600;color:${c.ink}">${t.badge}</div>
    <h1 class="h1" style="margin:16px 0 0;font-family:${serif};font-weight:400;font-size:42px;line-height:1.04;color:${c.ink}">${t.h1a}<em>${t.h1em}</em></h1>
    <p style="margin:20px 0 0;font-family:${sans};font-size:16px;line-height:1.6;color:#3a3a38">${t.body(esc(name))}</p></td></tr>
  <tr><td class="px" style="padding:32px 40px 40px"><p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${c.ink}">${t.sign}<br><strong>Chamila</strong><br><span style="color:${c.slate}">MEOCY STUDIO &middot; hello@meocy.com &middot; +39 379 105 1000</span></p></td></tr>
</table>
<table role="presentation" class="container" width="600" style="width:600px;max-width:600px"><tr><td class="px" style="padding:20px 40px 8px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.slate};text-align:center">MEOCY STUDIO &middot; Milan<br>Instagram <a href="https://www.instagram.com/meocystudio/" style="color:${c.slate};text-decoration:none">@meocystudio</a></td></tr></table>
</td></tr></table></body></html>`;
}

export function buildCollabNotificationEmail(track: CollabTrack, name: string, rows: [string, string][]): string {
  const body = rows.map(r=>`<tr><td valign="top" style="padding:8px 12px 8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate};width:170px">${esc(r[0])}</td><td valign="top" style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;color:${c.ink};font-weight:600;white-space:pre-wrap;word-break:break-word">${esc(r[1])}</td></tr>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:${c.paper};font-family:${sans}"><table role="presentation" width="100%" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="560" style="width:560px;max-width:560px;background:${c.chalk};border-radius:16px"><tr><td style="padding:28px 32px"><div style="display:inline-block;padding:4px 10px;border-radius:999px;background:${c.accent};font-size:12px;font-weight:600;color:${c.ink}">${collabTrackLabels[track]}</div><div style="font-family:${serif};font-size:26px;color:${c.ink};margin-top:10px">New collaboration request</div><p style="font-size:14px;color:${c.slate};margin:6px 0 18px">Reply directly to this email to reach ${esc(name)}.</p><table role="presentation" width="100%">${body}</table></td></tr></table></td></tr></table></body></html>`;
}

// ---------------------------------------------------------------------------
// Milan photoshoot booking requests (/milan-photoshoot → /api/milan/request).
// Emails to MEOCY are in English; the customer email is Italian for Italian-site visitors, otherwise English.
// Wording never claims a session is paid, booked or confirmed: it is a request until MEOCY replies.
// ---------------------------------------------------------------------------
export type MilanEmailLang = 'en' | 'it';
export const milanEmailLang = (locale?: string): MilanEmailLang => (locale === 'it' ? 'it' : 'en');

export interface MilanRequestEmail {
  reference: string;
  packageName: string;
  durationMinutes: number;
  photos: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  locations: string[];
  people: number;
  largerGroup: boolean;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  locale: Locale;
  submittedAt: string;
  pricing: { packagePrice: number; extraLocations: number; extraLocationsTotal: number; total: number; deposit: number; remaining: number };
  /** Internal notification only; never shown in the customer email. */
  attribution?: Attribution | null;
}

const eur = (n: number) => `€${n}`;
const milanDate = (date: string, lang: MilanEmailLang) =>
  new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));

const durationLabel = (minutes: number, lang: MilanEmailLang) =>
  minutes < 60
    ? `${minutes} ${lang === 'it' ? 'minuti' : 'minutes'}`
    : `${minutes / 60} ${lang === 'it' ? 'ore' : 'hours'}`;

const MT: Record<MilanEmailLang, any> = {
  en: {
    subject: (ref: string) => `We've received your Milan photoshoot request — ${ref}`,
    badge: 'Request received', h1a: 'Thank you — your request ', h1em: 'is in.',
    intro: (n: string) => `Hi ${n}, thank you for your Milan photoshoot request. Your date is not reserved yet: MEOCY reviews every request personally and will reply by email and WhatsApp to confirm your session.`,
    status: 'Status: Pending', summary: 'Your request',
    rRef: 'Reference', rPkg: 'Package', rDate: 'Date', rTime: 'Time', rLoc: 'Locations', rPeople: 'Number of people', rDur: 'Duration', rPhotos: 'Edited photos',
    rPrice: 'Package price', rExtra: 'Additional locations', rNone: 'None', rDeposit: 'Booking deposit', rRemaining: 'Remaining balance',
    group: 'For groups larger than the standard two-person experience, MEOCY will confirm availability and pricing separately.',
    nextT: 'What happens next.',
    steps: [['MEOCY reviews your request', 'We check availability for your date and time.'],
            ['You receive the €50 deposit link', 'Once MEOCY confirms availability, pay the €50 deposit to hold your date. Your booking is confirmed after payment is received.'],
            ['MEOCY confirms your session', 'By email and WhatsApp.']],
    depT: `€50 booking deposit: refunded in full if you cancel at least ${refundDaysBefore} days before your shoot.`,
    depB: `If you cancel at least ${refundDaysBefore} days (${refundHoursBefore} hours) before your shoot, the €50 deposit is refunded in full. If you cancel less than ${refundDaysBefore} days before, it is not refunded, but you may request a date change instead, subject to availability. The remaining balance is settled separately.`,
    mini: {
      rDeposit: 'Advance payment', rRemaining: 'Payable on the photoshoot day', depositValue: 'None — no deposit required',
      steps: [['MEOCY reviews your request', 'We check availability for your date and time.'],
              ['MEOCY confirms your session manually', 'By email and WhatsApp. The full €99 is payable on the photoshoot day.']],
      depT: 'No deposit or advance payment for Milan Mini.',
      depB: 'You do not pay anything when you send your request, and no deposit is required to reserve your session. The full €99 is payable on the photoshoot day. Date changes must be requested in advance and are subject to availability.',
      waDeposit: 'No deposit. The full €99 is payable on the photoshoot day.',
    },
    sign: 'Speak soon,',
  },
  it: {
    subject: (ref: string) => `Abbiamo ricevuto la tua richiesta per lo shooting a Milano — ${ref}`,
    badge: 'Richiesta ricevuta', h1a: 'Grazie — la tua richiesta ', h1em: 'è arrivata.',
    intro: (n: string) => `Ciao ${n}, grazie per la tua richiesta di shooting fotografico a Milano. La data non è ancora riservata: MEOCY esamina personalmente ogni richiesta e ti risponderà via email e WhatsApp per confermare la sessione.`,
    status: 'Stato: In attesa', summary: 'La tua richiesta',
    rRef: 'Codice', rPkg: 'Pacchetto', rDate: 'Data', rTime: 'Orario', rLoc: 'Location', rPeople: 'Numero di persone', rDur: 'Durata', rPhotos: 'Foto modificate',
    rPrice: 'Prezzo del pacchetto', rExtra: 'Location aggiuntive', rNone: 'Nessuna', rDeposit: 'Acconto di prenotazione', rRemaining: 'Saldo restante',
    group: "Per gruppi più numerosi rispetto all'esperienza standard per due persone, MEOCY confermerà disponibilità e prezzo separatamente.",
    nextT: 'Cosa succede ora.',
    steps: [['MEOCY esamina la tua richiesta', "Verifichiamo la disponibilità per la data e l'orario scelti."],
            ["Ricevi il link per l'acconto di €50", "Quando MEOCY conferma la disponibilità, versa l'acconto di €50 per riservare la data. La prenotazione è confermata dopo la ricezione del pagamento."],
            ['MEOCY conferma la sessione', 'Via email e WhatsApp.']],
    depT: `Acconto di prenotazione di €50: rimborsato per intero se annulli almeno ${refundDaysBefore} giorni prima dello shooting.`,
    depB: `Se annulli almeno ${refundDaysBefore} giorni (${refundHoursBefore} ore) prima dello shooting, l'acconto di €50 viene rimborsato per intero. Se annulli meno di ${refundDaysBefore} giorni prima, l'acconto non viene rimborsato, ma puoi chiedere un cambio di data, in base alla disponibilità. Il saldo restante si regola a parte.`,
    mini: {
      rDeposit: 'Pagamento anticipato', rRemaining: 'Da pagare il giorno dello shooting', depositValue: 'Nessuno — nessun acconto richiesto',
      steps: [['MEOCY esamina la tua richiesta', "Verifichiamo la disponibilità per la data e l'orario scelti."],
              ['MEOCY conferma la sessione manualmente', "Via email e WhatsApp. L'intero importo di €99 si paga il giorno dello shooting."]],
      depT: 'Nessun acconto né pagamento anticipato per Milan Mini.',
      depB: "Non devi pagare nulla quando invii la richiesta e non è richiesto alcun acconto per riservare la sessione. L'intero importo di €99 si paga il giorno dello shooting. Eventuali cambi di data vanno richiesti in anticipo e sono soggetti alla disponibilità.",
      waDeposit: "Nessun acconto. L'intero importo di €99 si paga il giorno dello shooting.",
    },
    sign: 'A presto,',
  },
};

export const milanCustomerSubject = (ref: string, locale?: string) => MT[milanEmailLang(locale)].subject(ref);

export function buildMilanCustomerEmail(d: MilanRequestEmail): string {
  const lang = milanEmailLang(d.locale); const t = MT[lang];
  const noDeposit = d.pricing.deposit === 0; const v = noDeposit ? t.mini : t;
  const extra = d.pricing.extraLocations ? `${d.pricing.extraLocations} × €50 = ${eur(d.pricing.extraLocationsTotal)}` : t.rNone;
  const summary = [row(t.rRef, d.reference), row(t.rPkg, d.packageName), row(t.rDate, milanDate(d.date, lang)), row(t.rTime, d.time),
    row(t.rLoc, d.locations.join(', ')), row(t.rPeople, String(d.people)), row(t.rDur, durationLabel(d.durationMinutes, lang)), row(t.rPhotos, String(d.photos)),
    row(t.rPrice, eur(d.pricing.packagePrice)), row(t.rExtra, extra),
    row(v.rDeposit, noDeposit ? v.depositValue : eur(d.pricing.deposit)), row(v.rRemaining, eur(d.pricing.remaining))].join('');
  const steps = v.steps.map((s: string[], i: number)=>`<tr><td valign="top" width="36" style="padding:0 0 16px 0"><div style="width:26px;height:26px;border-radius:999px;background:${c.ink};color:${c.chalk};font-family:${sans};font-size:12px;font-weight:600;line-height:26px;text-align:center">${i+1}</div></td><td valign="top" style="padding:2px 0 16px 0"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${s[0]}</div><div style="font-family:${sans};font-size:13px;line-height:1.5;color:${c.slate};padding-top:2px">${s[1]}</div></td></tr>`).join('');
  const group = d.largerGroup ? `<p style="margin:14px 0 0;font-family:${sans};font-size:13px;line-height:1.55;color:${c.ink}">${t.group}</p>` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0}img{border:0;display:block}@media(max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${c.paper}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${c.chalk};border-radius:24px;overflow:hidden">
  <tr><td class="px" style="padding:28px 40px 20px"><table role="presentation" width="100%"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="MEOCY STUDIO" height="40" style="height:40px;width:auto"></td><td align="right" style="font-family:${sans};font-size:12px;color:${c.slate};vertical-align:middle">Photo &amp; video &middot; Milan</td></tr></table></td></tr>
  <tr><td class="px" style="padding:16px 40px 8px"><div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.accent};font-family:${sans};font-size:12px;font-weight:600;color:${c.ink}">${t.badge}</div>
    <h1 class="h1" style="margin:16px 0 0;font-family:${serif};font-weight:400;font-size:42px;line-height:1.04;color:${c.ink}">${t.h1a}<em>${t.h1em}</em></h1>
    <p style="margin:20px 0 0;font-family:${sans};font-size:16px;line-height:1.6;color:#3a3a38">${t.intro(esc(d.name))}</p>
    <p style="margin:12px 0 0;font-family:${sans};font-size:13px;font-weight:600;color:${c.slate}">${t.status}</p></td></tr>
  <tr><td class="px" style="padding:24px 40px 0"><table role="presentation" width="100%" style="background:${c.paper};border-radius:16px"><tr><td style="padding:8px 22px 14px"><div style="font-family:${sans};font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${c.slate};padding:12px 0 4px">${t.summary}</div><table role="presentation" width="100%">${summary}</table>${group}</td></tr></table></td></tr>
  <tr><td class="px" style="padding:40px 40px 0"><h2 style="margin:0 0 20px;font-family:${serif};font-weight:400;font-size:30px;color:${c.ink}">${t.nextT}</h2><table role="presentation" width="100%">${steps}</table></td></tr>
  <tr><td class="px" style="padding:20px 40px 0"><table role="presentation" width="100%" bgcolor="${c.accent}" style="border-radius:16px"><tr><td style="padding:20px 24px"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${v.depT}</div><div style="font-family:${sans};font-size:14px;line-height:1.55;color:${c.ink};padding-top:6px">${v.depB}</div></td></tr></table></td></tr>
  <tr><td class="px" style="padding:32px 40px 40px"><p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${c.ink}">${t.sign}<br><strong>Chamila</strong><br><span style="color:${c.slate}">MEOCY STUDIO &middot; hello@meocy.com &middot; +39 379 105 1000</span></p></td></tr>
</table>
<table role="presentation" class="container" width="600" style="width:600px;max-width:600px"><tr><td class="px" style="padding:20px 40px 8px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.slate};text-align:center">MEOCY STUDIO &middot; Milan<br>Instagram <a href="https://www.instagram.com/meocystudio/" style="color:${c.slate};text-decoration:none">@meocystudio</a></td></tr></table>
</td></tr></table></body></html>`;
}

/** Prefilled WhatsApp text MEOCY can send to the customer (same essentials as the emails, in the customer's email language). */
export function milanWhatsAppToCustomer(d: MilanRequestEmail): string {
  const lang = milanEmailLang(d.locale);
  const pay = d.pricing.deposit === 0 ? MT[lang].mini.waDeposit
    : lang === 'it' ? `Acconto €50, saldo restante ${eur(d.pricing.remaining)}.`
    : `Deposit €50, remaining balance ${eur(d.pricing.remaining)}.`;
  return lang === 'it'
    ? `Ciao ${d.name}, sono MEOCY: riguardo alla tua richiesta ${d.reference} — ${d.packageName}, ${milanDate(d.date, 'it')} alle ${d.time}, location: ${d.locations.join(', ')}. ${pay}`
    : `Hi ${d.name}, this is MEOCY about your request ${d.reference} — ${d.packageName}, ${milanDate(d.date, 'en')} at ${d.time}, locations: ${d.locations.join(', ')}. ${pay}`;
}

const payRows = (d: MilanRequestEmail): [string, string][] =>
  d.pricing.deposit === 0
    ? [['Advance payment', 'None — no deposit required'], ['Payable on the photoshoot day', eur(d.pricing.remaining)]]
    : [['Booking deposit', `${eur(d.pricing.deposit)} (not collected online — send the deposit link)`], ['Remaining balance', eur(d.pricing.remaining)]];

export function buildMilanNotificationEmail(d: MilanRequestEmail): string {
  const waDigits = d.phone.replace(/[^\d]/g, '');
  const rows = ([
    ['Reference', d.reference], ['Status', 'Pending — waiting for your review'], ['Package', d.packageName],
    ['Date', `${milanDate(d.date, 'en')} (${d.date})`], ['Time', d.time], ['Locations', d.locations.join(', ')],
    ['Number of people', d.largerGroup ? `${d.people} — larger than the standard two-person experience: confirm availability and pricing separately` : String(d.people)],
    ['Duration', durationLabel(d.durationMinutes, 'en')], ['Edited photos', String(d.photos)],
    ['Full name', d.name], ['Email', d.email], ['WhatsApp / Phone', d.phone], ['Country', d.country],
    ['Site language', d.locale.toUpperCase()], ['Special request / Notes', d.notes || '—'],
    ['Package price', eur(d.pricing.packagePrice)],
    ['Additional locations', d.pricing.extraLocations ? `${d.pricing.extraLocations} × €50 = ${eur(d.pricing.extraLocationsTotal)}` : 'None'],
    ['Total', eur(d.pricing.total)], ...payRows(d), ['Submitted', `${d.submittedAt} (Milan time)`],
    ...attributionEmailRows(d.attribution),
  ] as [string, string][]).map(r=>`<tr><td valign="top" style="padding:8px 12px 8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate};width:170px">${esc(r[0])}</td><td valign="top" style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;color:${c.ink};font-weight:600;white-space:pre-wrap;word-break:break-word">${esc(r[1])}</td></tr>`).join('');
  const wa = waDigits ? `<a href="https://wa.me/${waDigits}?text=${encodeURIComponent(milanWhatsAppToCustomer(d))}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:${c.accent};color:${c.ink};font-size:13px;font-weight:600;text-decoration:none">Reply on WhatsApp</a>` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:${c.paper};font-family:${sans}"><table role="presentation" width="100%" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="560" style="width:560px;max-width:560px;background:${c.chalk};border-radius:16px"><tr><td style="padding:28px 32px"><div style="display:inline-block;padding:4px 10px;border-radius:999px;background:${c.accent};font-size:12px;font-weight:600;color:${c.ink}">Milan photoshoot · ${esc(d.reference)}</div><div style="font-family:${serif};font-size:26px;color:${c.ink};margin-top:10px">New Milan photoshoot request</div><p style="font-size:14px;color:${c.slate};margin:6px 0 18px">Reply to this email to reach ${esc(d.name)}. The request is not in any calendar: review it and reply to the customer.</p><div>${wa}<a href="mailto:${esc(d.email)}?subject=${encodeURIComponent('MEOCY — ' + d.reference)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:${c.ink};color:${c.chalk};font-size:13px;font-weight:600;text-decoration:none">Reply by email</a></div><table role="presentation" width="100%" style="margin-top:10px">${rows}</table></td></tr></table></td></tr></table></body></html>`;
}
