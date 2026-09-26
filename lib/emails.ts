// lib/emails.ts — MEOCY STUDIO transactional emails
const c = { ink:'#0b0b0c', paper:'#f6f5f2', chalk:'#ffffff', mist:'#e5e3dd', slate:'#6b6a66', accent:'#c8f169' };
const sans = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const LOGO = 'https://meocy-studio.vercel.app/meocy-logo.png';
const esc = (s: string = '') => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export type Locale = 'en' | 'it' | 'fr';
export interface Booking {
  name: string; email: string; brand?: string; package?: string; shootType?: string;
  where?: string; preferredDate?: string; preferredTime?: string; specialRequests?: string; locale?: Locale;
}

export const subjects: Record<Locale, string> = {
  en: "We've got your booking request — MEOCY STUDIO",
  it: 'Abbiamo ricevuto la tua richiesta — MEOCY STUDIO',
  fr: 'Nous avons bien reçu votre demande — MEOCY STUDIO',
};

const T: Record<Locale, any> = {
  en:{ badge:'Request received', h1a:'Thanks — your request ', h1em:'is in.',
    intro:(n:string)=>`Hi ${n}, thanks for reaching out to MEOCY STUDIO. We&rsquo;ve received your booking request and we&rsquo;ll reply <strong style="color:${c.ink}">within one working day</strong> with a shot list and a fixed price to confirm your date.`,
    summary:'Your booking request', rP:'Package', rS:'What we&rsquo;re shooting', rW:'Where', rD:'Preferred date', rT:'Preferred time', rN:'Your notes',
    nextT:'What happens next.', steps:[['We review your brief','We read your request and check the date.','Same day'],['You get a shot list + fixed price','Every frame planned, one clear price — no surprises.','Within 1 working day'],['We lock your date','Confirm, and your shoot day is held for you.','On your OK']],
    rea:'Nothing is charged yet.', reb:'Your price is fixed in writing before we start — you approve it first, always.', sign:'Speak soon,' },
  it:{ badge:'Richiesta ricevuta', h1a:'Grazie — la tua richiesta ', h1em:'è arrivata.',
    intro:(n:string)=>`Ciao ${n}, grazie per aver contattato MEOCY STUDIO. Abbiamo ricevuto la tua richiesta e ti risponderemo <strong style="color:${c.ink}">entro un giorno lavorativo</strong> con una shot list e un prezzo fisso per confermare la data.`,
    summary:'La tua richiesta', rP:'Pacchetto', rS:'Cosa fotografiamo', rW:'Dove', rD:'Data preferita', rT:'Orario preferito', rN:'Note',
    nextT:'Cosa succede ora.', steps:[['Esaminiamo il tuo brief','Leggiamo la richiesta e controlliamo la data.','In giornata'],['Ricevi shot list + prezzo fisso','Ogni scatto pianificato, un prezzo chiaro — nessuna sorpresa.','Entro 1 giorno lavorativo'],['Blocchiamo la data','Confermi, e la data è riservata per te.','Al tuo OK']],
    rea:'Non viene addebitato nulla ora.', reb:'Il prezzo è fissato per iscritto prima di iniziare — lo approvi tu, sempre.', sign:'A presto,' },
  fr:{ badge:'Demande reçue', h1a:'Merci — votre demande ', h1em:'est bien reçue.',
    intro:(n:string)=>`Bonjour ${n}, merci d&rsquo;avoir contacté MEOCY STUDIO. Nous avons bien reçu votre demande et nous vous répondrons <strong style="color:${c.ink}">sous un jour ouvré</strong> avec une shot list et un prix fixe pour confirmer votre date.`,
    summary:'Votre demande', rP:'Formule', rS:'Ce que nous photographions', rW:'Où', rD:'Date souhaitée', rT:'Heure souhaitée', rN:'Vos notes',
    nextT:'La suite.', steps:[['Nous étudions votre brief','Nous lisons la demande et vérifions la date.','Le jour même'],['Shot list + prix fixe','Chaque image planifiée, un prix clair — sans surprise.','Sous 1 jour ouvré'],['Nous bloquons la data','Vous confirmez, et votre date est réservée.','À votre accord']],
    rea:'Rien n&rsquo;est facturé pour l&rsquo;instant.', reb:'Le prix est fixé par écrit avant de commencer — vous l&rsquo;approuvez, toujours.', sign:'À bientôt,' },
};

function row(l: string, v?: string){ if(!v) return ''; return `<tr><td valign="top" width="150" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate}">${l}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;font-weight:600;color:${c.ink}">${esc(v)}</td></tr>`; }

export function buildConfirmationEmail(b: Booking, locale: Locale = 'it'): string {
  const t = T[locale] || T.it; const first = esc(b.name) || 'there';
  const steps = t.steps.map((s: string[], i: number)=>`<tr><td valign="top" width="36" style="padding:0 0 16px 0"><div style="width:26px;height:26px;border-radius:999px;background:${c.ink};color:${c.chalk};font-family:${sans};font-size:12px;font-weight:600;line-height:26px;text-align:center">${i+1}</div></td><td valign="top" style="padding:2px 0 16px 0"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${s[0]}</div><div style="font-family:${sans};font-size:13px;line-height:1.5;color:${c.slate};padding-top:2px">${s[1]}</div></td><td valign="top" align="right" style="padding:3px 0 16px 12px;font-family:${sans};font-size:12px;color:${c.slate};white-space:nowrap">${s[2]}</td></tr>`).join('');
  const summary = [row(t.rP,b.package),row(t.rS,b.shootType),row(t.rW,b.where),row(t.rD,b.preferredDate),row(t.rT,b.preferredTime),row(t.rN,b.specialRequests)].join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Instrument+Serif:ital@0;1&display=swap');body{margin:0;padding:0}img{border:0;display:block}@media(max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${c.paper}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${c.chalk};border-radius:24px;overflow:hidden">
  <tr><td class="px" style="padding:28px 40px 20px"><table role="presentation" width="100%"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="MEOCY STUDIO" height="28" style="height:28px;width:auto"></td><td align="right" style="font-family:${sans};font-size:12px;color:${c.slate};vertical-align:middle">Photo &amp; video &middot; Milan</td></tr></table></td></tr>
  <tr><td class="px" style="padding:16px 40px 8px"><div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${c.accent};font-family:${sans};font-size:12px;font-weight:600;color:${c.ink}">${t.badge}</div>
    <h1 class="h1" style="margin:16px 0 0;font-family:${serif};font-weight:400;font-size:42px;line-height:1.04;color:${c.ink}">${t.h1a}<em>${t.h1em}</em></h1>
    <p style="margin:20px 0 0;font-family:${sans};font-size:16px;line-height:1.6;color:#3a3a38">${t.intro(first)}</p></td></tr>
  <tr><td class="px" style="padding:24px 40px 0"><table role="presentation" width="100%" style="background:${c.paper};border-radius:16px"><tr><td style="padding:8px 22px 14px"><div style="font-family:${sans};font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${c.slate};padding:12px 0 4px">${t.summary}</div><table role="presentation" width="100%">${summary}</table></td></tr></table></td></tr>
  <tr><td class="px" style="padding:40px 40px 0"><h2 style="margin:0 0 20px;font-family:${serif};font-weight:400;font-size:30px;color:${c.ink}">${t.nextT}</h2><table role="presentation" width="100%">${steps}</table></td></tr>
  <tr><td class="px" style="padding:20px 40px 0"><table role="presentation" width="100%" bgcolor="${c.accent}" style="border-radius:16px"><tr><td style="padding:20px 24px"><div style="font-family:${sans};font-size:15px;font-weight:600;color:${c.ink}">${t.rea}</div><div style="font-family:${sans};font-size:14px;line-height:1.55;color:${c.ink};padding-top:6px">${t.reb}</div></td></tr></table></td></tr>
  <tr><td class="px" style="padding:32px 40px 40px"><p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${c.ink}">${t.sign}<br><strong>Chamila</strong><br><span style="color:${c.slate}">MEOCY STUDIO &middot; hello@meocy.com &middot; +39 379 105 1000</span></p></td></tr>
</table>
<table role="presentation" class="container" width="600" style="width:600px;max-width:600px"><tr><td class="px" style="padding:20px 40px 8px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.slate};text-align:center">MEOCY STUDIO &middot; Viale Renato Serra 14, 20148 Milano<br>Instagram @chamila.eu &middot; EN &middot; IT &middot; FR</td></tr></table>
</td></tr></table></body></html>`;
}

export function buildNotificationEmail(b: Booking): string {
  const rows = ([['Name',b.name],['Email',b.email],['Brand',b.brand],['Package',b.package],['Shoot',b.shootType],['Where',b.where],['Date',b.preferredDate],['Time',b.preferredTime],['Notes',b.specialRequests]] as [string,string?][])
    .filter(r=>r[1]).map(r=>`<tr><td style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:13px;color:${c.slate};width:120px">${r[0]}</td><td style="padding:8px 0;border-bottom:1px solid ${c.mist};font-family:${sans};font-size:14px;color:${c.ink};font-weight:600">${esc(r[1])}</td></tr>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:${c.paper};font-family:${sans}"><table role="presentation" width="100%" bgcolor="${c.paper}"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="560" style="width:560px;max-width:560px;background:${c.chalk};border-radius:16px"><tr><td style="padding:28px 32px"><div style="font-family:${serif};font-size:26px;color:${c.ink}">New booking request 🎬</div><p style="font-size:14px;color:${c.slate};margin:6px 0 18px">Reply directly to this email to reach ${esc(b.name)}.</p><table role="presentation" width="100%">${rows}</table></td></tr></table></td></tr></table></body></html>`;
}
