// Milan tourist photoshoot (/milan-photoshoot) — single source of truth for packages,
// locations, booking slots and feature flags. All visible text lives in
// data/locales/{en,it,fr}.ts under `milanShoot`; this file only holds structure, ids and numbers.

export type MilanPackageId = 'mini' | 'memory' | 'experience' | 'signature';
export type MilanLocationId =
  | 'duomo'
  | 'galleria'
  | 'scala'
  | 'brera'
  | 'castello'
  | 'sempione'
  | 'navigli'
  | 'portaNuova'
  | 'gaeAulenti'
  | 'arcoPace';

/** Feature line keys. Text: milanShoot.features.<key>. */
export type MilanFeatureKey =
  | 'photos15'
  | 'photos25'
  | 'photos50'
  | 'photos75'
  | 'locations1'
  | 'locations2'
  | 'locations3'
  | 'locations4'
  | 'photographer'
  | 'naturalPosing'
  | 'naturalCreative'
  | 'creativePosing'
  | 'lightingAd300'
  | 'lightingAd600Ad300'
  | 'softboxes'
  | 'editing'
  | 'editingGrading'
  | 'highRes'
  | 'privateGallery';

export interface MilanPackage {
  id: MilanPackageId;
  /** Price in EUR. */
  price: number;
  durationHours: number;
  photos: number;
  /** Locations included in the price. */
  includedLocations: number;
  /** Price in EUR per location beyond `includedLocations`; null = no extra locations on this package. */
  extraLocationPrice: number | null;
  /** Shown with the refined "Popular choice" label. */
  popular?: boolean;
  /** Feature lines in display order. `privateGallery` only renders when privateGalleryEnabled is true. */
  features: MilanFeatureKey[];
}

export const milanPackages: MilanPackage[] = [
  {
    id: 'mini',
    price: 99,
    durationHours: 0.5,
    photos: 15,
    includedLocations: 1,
    extraLocationPrice: null,
    features: ['photos15', 'locations1', 'photographer', 'naturalPosing', 'editing', 'highRes'],
  },
  {
    id: 'memory',
    price: 200,
    durationHours: 2,
    photos: 25,
    includedLocations: 2,
    extraLocationPrice: null,
    features: ['photos25', 'locations2', 'photographer', 'naturalPosing', 'editing', 'highRes', 'privateGallery'],
  },
  {
    id: 'experience',
    price: 300,
    durationHours: 3,
    photos: 50,
    includedLocations: 3,
    extraLocationPrice: null,
    popular: true,
    features: ['photos50', 'locations3', 'photographer', 'naturalCreative', 'lightingAd300', 'editing', 'highRes', 'privateGallery'],
  },
  {
    id: 'signature',
    price: 600,
    durationHours: 5,
    photos: 75,
    includedLocations: 4,
    extraLocationPrice: 50,
    features: [
      'photos75',
      'locations4',
      'photographer',
      'creativePosing',
      'lightingAd600Ad300',
      'softboxes',
      'editingGrading',
      'highRes',
      'privateGallery',
    ],
  },
];

/** Booking deposit in EUR ("deposit" / "acconto" / "acompte"). */
export const depositAmount = 50;

/**
 * Cancellation rule for the deposit: cancelling at least this many days (× 24 hours) before the shoot
 * refunds it in full; cancelling later means no refund, but a date change can be requested (subject to availability).
 */
export const refundDaysBefore = 3;
export const refundHoursBefore = refundDaysBefore * 24;

/** Fills {days} and {hours} in policy sentences from refundDaysBefore. */
export const fillRefund = (text: string) =>
  text.split('{days}').join(String(refundDaysBefore)).split('{hours}').join(String(refundHoursBefore));
export const currency = 'EUR';

export interface MilanLocation {
  id: MilanLocationId;
  /** Photo in /public/work, or null to render a labelled placeholder until a real photo exists. */
  image: { src: string; width: number; height: number } | null;
}

export const milanLocations: MilanLocation[] = [
  { id: 'duomo', image: { src: '/locations/duomo.jpg', width: 1800, height: 1125 } },
  { id: 'galleria', image: { src: '/locations/galleria.jpg', width: 1800, height: 1209 } },
  { id: 'scala', image: { src: '/locations/scala.jpg', width: 1694, height: 1800 } },
  { id: 'brera', image: { src: '/locations/brera.jpg', width: 1800, height: 1688 } },
  { id: 'castello', image: { src: '/locations/castello.jpg', width: 1800, height: 1200 } },
  { id: 'sempione', image: { src: '/locations/sempione.jpg', width: 1800, height: 1125 } },
  { id: 'navigli', image: { src: '/locations/navigli.jpg', width: 1800, height: 1012 } },
  { id: 'portaNuova', image: { src: '/locations/porta-nuova.jpg', width: 1800, height: 1125 } },
  { id: 'gaeAulenti', image: { src: '/locations/gae-aulenti.jpg', width: 1800, height: 1800 } },
  { id: 'arcoPace', image: { src: '/locations/arco-pace.jpg', width: 1694, height: 1800 } },
];

/** On Milan Memory, the Duomo and its immediate surroundings count as one location. */
export const duomoAreaCountsAsOne = true;

/** Session start times offered in the booking form (24h, Europe/Rome): hourly, 06:00 first, 22:00 last. */
export const slotStartTimes = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

/**
 * Dates that cannot be booked at all, as 'YYYY-MM-DD' strings.
 * To block a day, add it here, e.g. blockedDates: ['2026-12-24', '2026-12-25'].
 */
export const blockedDates: string[] = [];

/**
 * Single start times that are already taken, e.g. { date: '2026-11-14', time: '10:00' }.
 * Add one entry per confirmed booking. Pending (unconfirmed) requests do NOT block a slot.
 */
export const blockedSlots: { date: string; time: string }[] = [];

/** Show the "Private online gallery" line only when a gallery delivery is actually offered. */
export const privateGalleryEnabled = false;

/** Show placeholder tiles in gallery until couple photos arrive. Set to true to render placeholders, false to show only real images. */
export const showGalleryPlaceholders = false;

/** Working day ends at this time (24h format). Used for duration-aware slot calculation. */
export const availabilityEndTime = '22:00';

/** Calculate the latest valid start time for a package based on its duration and availability end time. */
export const maxStartTimeFor = (packageId: MilanPackageId): string => {
  const pkg = milanPackages.find((p) => p.id === packageId)!;
  const [endHour, endMin] = availabilityEndTime.split(':').map(Number);
  const endMinutes = endHour * 60 + endMin;
  const durationMinutes = pkg.durationHours * 60;
  const maxStartMinutes = endMinutes - durationMinutes;
  const maxHour = Math.floor(maxStartMinutes / 60);
  const maxMin = maxStartMinutes % 60;
  return `${String(maxHour).padStart(2, '0')}:${String(maxMin).padStart(2, '0')}`;
};

/** Contact options used by the booking section. */
export const milanContact = {
  whatsappNumber: '393791051000',
  whatsappDisplay: '+39 379 105 1000',
  email: 'hello@meocy.com',
};

export const visibleFeatures = (pkg: MilanPackage): MilanFeatureKey[] =>
  pkg.features.filter((f) => f !== 'privateGallery' || privateGalleryEnabled);

/** Standard experience is for two people; larger groups get availability and pricing confirmed separately. */
export const standardPeople = 2;
export const maxPeople = 10;

export interface MilanPricing {
  packagePrice: number;
  includedLocations: number;
  extraLocations: number;
  extraLocationPrice: number;
  extraLocationsTotal: number;
  total: number;
  deposit: number;
  remaining: number;
}

/**
 * Single pricing rule, used by the page (live summary) and recomputed by /api/milan/request.
 * Prices sent by the browser are never trusted.
 */
export function computePricing(packageId: MilanPackageId, locationCount: number): MilanPricing {
  const pkg = milanPackages.find((p) => p.id === packageId)!;
  const extraLocations = pkg.extraLocationPrice === null ? 0 : Math.max(0, locationCount - pkg.includedLocations);
  const extraLocationPrice = pkg.extraLocationPrice ?? 0;
  const extraLocationsTotal = extraLocations * extraLocationPrice;
  const total = pkg.price + extraLocationsTotal;
  const deposit = pkg.id === 'mini' ? 0 : depositAmount;
  return {
    packagePrice: pkg.price,
    includedLocations: pkg.includedLocations,
    extraLocations,
    extraLocationPrice,
    extraLocationsTotal,
    total,
    deposit,
    remaining: total - deposit,
  };
}

/** Maximum locations a package accepts (Signature can add extras up to every listed location). */
export const maxLocationsFor = (packageId: MilanPackageId) => {
  const pkg = milanPackages.find((p) => p.id === packageId)!;
  return pkg.extraLocationPrice === null ? pkg.includedLocations : milanLocations.length;
};

// --- Dates and slots (all in Milan time) -------------------------------------------------

const romeParts = (now: Date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
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

/** Today's date in Milan as YYYY-MM-DD. */
export const todayInMilan = (now = new Date()) => romeParts(now).date;

/** True for a real calendar date written as YYYY-MM-DD. */
export const isValidIsoDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
};

/** A date can be requested when it is today or later (Milan time) and not in blockedDates. */
export const isDateSelectable = (date: string, now = new Date()) =>
  isValidIsoDate(date) && date >= todayInMilan(now) && !blockedDates.includes(date);

/** A start time can be requested when it is listed, not blocked, and not already past (for today). */
export const isSlotSelectable = (date: string, time: string, now = new Date()) => {
  if (!isDateSelectable(date, now) || !slotStartTimes.includes(time)) return false;
  if (blockedSlots.some((s) => s.date === date && s.time === time)) return false;
  const { date: today, time: nowTime } = romeParts(now);
  return date > today || time > nowTime;
};

/**
 * Get available time slots for a date and package.
 * Filters out times that would exceed the availability end window based on package duration.
 * IMPORTANT: Double-booking prevention is NOT implemented. This only checks duration fit and manual blocks.
 */
export const selectableSlots = (date: string, packageId?: MilanPackageId, now = new Date()) => {
  const baseSlots = slotStartTimes.filter((time) => isSlotSelectable(date, time, now));
  if (!packageId) return baseSlots;

  const [endHour, endMin] = availabilityEndTime.split(':').map(Number);
  const endMinutes = endHour * 60 + endMin;
  const pkg = milanPackages.find((p) => p.id === packageId)!;
  const durationMinutes = pkg.durationHours * 60;

  return baseSlots.filter((time) => {
    const [hour, min] = time.split(':').map(Number);
    const startMinutes = hour * 60 + min;
    const endMinutes_ = startMinutes + durationMinutes;
    return endMinutes_ <= endMinutes;
  });
};
