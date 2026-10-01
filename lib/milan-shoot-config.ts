// Milan tourist photoshoot (/milan-photoshoot) — single source of truth for packages,
// locations, booking slots and feature flags. All visible text lives in
// data/locales/{en,it,fr}.ts under `milanShoot`; this file only holds structure, ids and numbers.

export type MilanPackageId = 'memory' | 'experience' | 'signature';
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
  | 'photos25'
  | 'photos50'
  | 'photos75'
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

/** Booking deposit in EUR (non-refundable; a date change can be requested instead). */
export const depositAmount = 50;
export const currency = 'EUR';

export interface MilanLocation {
  id: MilanLocationId;
  /** Photo in /public/work, or null to render a labelled placeholder until a real photo exists. */
  image: { src: string; width: number; height: number } | null;
}

export const milanLocations: MilanLocation[] = [
  { id: 'duomo', image: null },
  { id: 'galleria', image: { src: '/work/fashion-01.jpg', width: 1129, height: 1600 } },
  { id: 'scala', image: null },
  { id: 'brera', image: null },
  { id: 'castello', image: null },
  { id: 'sempione', image: null },
  { id: 'navigli', image: null },
  { id: 'portaNuova', image: null },
  { id: 'gaeAulenti', image: null },
  { id: 'arcoPace', image: null },
];

/** On Milan Memory, the Duomo and its immediate surroundings count as one location. */
export const duomoAreaCountsAsOne = true;

/** Session start times offered in the booking form (24h, Europe/Rome). First slot is 06:00. */
export const slotStartTimes = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
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

/** Link where the €50 deposit is paid (set in Step 2). Empty = not available yet. */
export const depositPaymentUrl = '';

/** Contact options used by the booking section. */
export const milanContact = {
  whatsappNumber: '393791051000',
  whatsappDisplay: '+39 379 105 1000',
  email: 'hello@meocy.com',
};

export const visibleFeatures = (pkg: MilanPackage): MilanFeatureKey[] =>
  pkg.features.filter((f) => f !== 'privateGallery' || privateGalleryEnabled);
