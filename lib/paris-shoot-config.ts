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
  | 'lighting300'
  | 'editing'
  | 'editingGrading'
  | 'highRes';

export interface ParisPackage {
  id: ParisPackageId;
  /** Price in EUR. */
  price: number;
  durationHours: number;
  photos: number;
  /** Shows the professional lighting setup (stat + feature line). */
  lighting: boolean;
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
    lighting: false,
    features: ['photos25', 'location', 'photographer', 'naturalPosing', 'editing', 'highRes'],
  },
  {
    id: 'experience',
    price: 300,
    durationHours: 3,
    photos: 50,
    lighting: true,
    popular: true,
    features: ['photos50', 'lighting300', 'location', 'photographer', 'naturalCreative', 'editing', 'highRes'],
  },
  {
    id: 'signature',
    price: 600,
    durationHours: 5,
    photos: 75,
    lighting: true,
    features: ['photos75', 'lighting300', 'location', 'photographer', 'creativePosing', 'editingGrading', 'highRes'],
  },
];

// ---------------------------------------------------------------------------------------------
// PARIS DATES — customers request their PREFERRED date and time (not guaranteed).
// MEOCY reviews every request, agrees the final date/time with the customer (or proposes an
// alternative), and only then sends the €50 deposit link. Nothing is confirmed automatically.
// ---------------------------------------------------------------------------------------------

/** Start times offered in the form (Paris time): hourly from 06:00; a session must end by parisDayEnd. */
export const parisSlotStartTimes = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];
export const parisDayEnd = '22:00';

/** Dates that cannot be requested at all, e.g. ['2026-12-24', '2026-12-25']. */
export const parisBlockedDates: string[] = [];

/** Single start times already taken, e.g. { date: '2026-11-14', time: '10:00' }. Pending requests do NOT block a slot. */
export const parisBlockedSlots: { date: string; time: string }[] = [];

/** Deposit requested only AFTER MEOCY and the customer agree the final date/time (same policy as Milan). Not collected on the website. */
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

/** Today's date in Paris as YYYY-MM-DD. */
export const todayInParis = (now = new Date()) => parisParts(now).date;

/** True for a real calendar date written as YYYY-MM-DD. */
export const isValidParisIsoDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
};

/** A preferred date can be requested when it is today or later (Paris time) and not blocked. */
export const isParisDateSelectable = (date: string, now = new Date()) =>
  isValidParisIsoDate(date) && date >= todayInParis(now) && !parisBlockedDates.includes(date);

/** Preferred start times for a date and package: the session must end by parisDayEnd, not blocked, not already past. */
export const parisSlotsFor = (date: string, packageId: ParisPackageId, now = new Date()): string[] => {
  const pkg = parisPackages.find((p) => p.id === packageId);
  if (!pkg || !isParisDateSelectable(date, now)) return [];
  const { date: today, time: nowTime } = parisParts(now);
  return parisSlotStartTimes.filter((time) => {
    if (toMinutes(time) + pkg.durationHours * 60 > toMinutes(parisDayEnd)) return false;
    if (parisBlockedSlots.some((s) => s.date === date && s.time === time)) return false;
    return date > today || time > nowTime;
  });
};
