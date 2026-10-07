// Paris photoshoot (/paris-photoshoot) — single source of truth for packages, shoot days, start times
// and pricing. Fully separate from lib/milan-shoot-config.ts: nothing here changes Milan.
// All visible text lives in data/paris/{en,it,fr}.ts; this file only holds structure, ids and numbers.

export type ParisPackageId = 'memory' | 'experience' | 'signature';

/** Feature line keys. Text: data/paris/<lang>.ts → features.<key>. */
export type ParisFeatureKey =
  | 'photos25'
  | 'photos50'
  | 'photos75'
  | 'location'
  | 'photographer'
  | 'naturalPosing'
  | 'naturalCreative'
  | 'creativePosing'
  | 'editing'
  | 'editingGrading'
  | 'highRes';

export interface ParisPackage {
  id: ParisPackageId;
  /** Price in EUR. */
  price: number;
  durationHours: number;
  photos: number;
  popular?: boolean;
  features: ParisFeatureKey[];
}

/** Paris has one shooting area only (Eiffel Tower / Trocadéro), so there are no location limits or extra-location prices. */
export const parisPackages: ParisPackage[] = [
  {
    id: 'memory',
    price: 200,
    durationHours: 2,
    photos: 25,
    features: ['photos25', 'location', 'photographer', 'naturalPosing', 'editing', 'highRes'],
  },
  {
    id: 'experience',
    price: 300,
    durationHours: 3,
    photos: 50,
    popular: true,
    features: ['photos50', 'location', 'photographer', 'naturalCreative', 'editing', 'highRes'],
  },
  {
    id: 'signature',
    price: 600,
    durationHours: 5,
    photos: 75,
    features: ['photos75', 'location', 'photographer', 'creativePosing', 'editingGrading', 'highRes'],
  },
];

// ---------------------------------------------------------------------------------------------
// PARIS SHOOT DAYS — the only place to set when Paris sessions can be requested.
//
// Add one entry per Paris shoot day (Paris time, 24h):
//   { date: '2026-11-14', firstStart: '08:00', lastEnd: '20:00' }
// Start times are offered every hour from `firstStart`, as long as start + package duration
// ends by `lastEnd`. While this list is empty, the page shows "date to be announced" and no
// request can be sent (the API refuses every date).
// ---------------------------------------------------------------------------------------------
export interface ParisShootDay {
  date: string; // YYYY-MM-DD
  firstStart: string; // HH:MM
  lastEnd: string; // HH:MM
}
export const parisShootDays: ParisShootDay[] = [];

/** Single start times already taken on a shoot day, e.g. { date: '2026-11-14', time: '10:00' }. */
export const parisBlockedSlots: { date: string; time: string }[] = [];

/** Deposit requested only AFTER MEOCY confirms availability (same policy as Milan). Not collected on the website. */
export const parisDepositAmount = 50;
/** Cancelling at least this many days (× 24 hours) before the shoot refunds the deposit in full (same rule as Milan). */
export const parisRefundDaysBefore = 3;
export const parisRefundHoursBefore = parisRefundDaysBefore * 24;
export const fillParisRefund = (text: string) =>
  text.split('{days}').join(String(parisRefundDaysBefore)).split('{hours}').join(String(parisRefundHoursBefore));

export const parisCurrency = 'EUR';

/** Standard session is for two people; larger groups get availability and pricing confirmed separately (same rule as Milan). */
export const parisStandardPeople = 2;
export const parisMaxPeople = 10;

export const parisContact = {
  whatsappNumber: '393791051000',
  email: 'hello@meocy.com',
};

export interface ParisPricing {
  packagePrice: number;
  total: number;
}

/** Single pricing rule, used by the page and recomputed by /api/paris/request. Browser prices are never trusted. */
export function computeParisPricing(packageId: ParisPackageId): ParisPricing {
  const pkg = parisPackages.find((p) => p.id === packageId)!;
  return { packagePrice: pkg.price, total: pkg.price };
}

// --- Dates and slots (all in Paris time) ------------------------------------------------------

const parisParts = (now: Date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` };
};

export const parisNowParts = (now = new Date()) => parisParts(now);

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHhmm = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Shoot days that are today or later (Paris time), in date order. */
export const upcomingParisShootDays = (now = new Date()) => {
  const today = parisParts(now).date;
  return parisShootDays.filter((d) => d.date >= today).sort((a, b) => a.date.localeCompare(b.date));
};

/** Start times for a shoot day and package: hourly from firstStart, ending by lastEnd, not blocked, not already past. */
export const parisSlotsFor = (date: string, packageId: ParisPackageId, now = new Date()): string[] => {
  const day = upcomingParisShootDays(now).find((d) => d.date === date);
  const pkg = parisPackages.find((p) => p.id === packageId);
  if (!day || !pkg) return [];
  const { date: today, time: nowTime } = parisParts(now);
  const slots: string[] = [];
  for (let start = toMinutes(day.firstStart); start + pkg.durationHours * 60 <= toMinutes(day.lastEnd); start += 60) {
    const time = toHhmm(start);
    if (parisBlockedSlots.some((s) => s.date === date && s.time === time)) continue;
    if (date === today && time <= nowTime) continue;
    slots.push(time);
  }
  return slots;
};
