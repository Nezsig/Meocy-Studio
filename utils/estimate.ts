import type { ShootCategory } from '../types/site';

export type VideoType = 'basic' | 'social' | 'pack' | 'commercial';

export interface EstimateInput {
  category: ShootCategory;
  videoType: VideoType;
  quantity: number;
}

export interface EstimateLine {
  key: string;
  amount: number;
  label?: string;
}

export interface EstimateResult {
  total: number;
  videoType: VideoType;
  quantity: number;
  photos: number;
  showPhotos: boolean;
  photosLabel: string;
  noteLabel: string;
  lines: EstimateLine[];
  benefits: string[];
}

const videoTypeConfig: Record<VideoType, { price: number; unit: string }> = {
  basic: { price: 100, unit: 'video' },
  social: { price: 150, unit: 'video' },
  pack: { price: 500, unit: 'pack' },
  commercial: { price: 500, unit: 'video' }
};

export function estimate({ category, videoType, quantity }: EstimateInput): EstimateResult {
  const cfg = videoTypeConfig[videoType];
  const total = quantity * cfg.price;

  let photos = 0;
  let showPhotos = false;
  let photosLabel = '';
  let noteLabel = '';
  let benefits: string[] = [];

  if (videoType === 'pack') {
    photos = quantity * 20;
    showPhotos = quantity > 0;
    photosLabel = `${photos} retouched photos — included`;
    benefits = [
      `${quantity * 4} commercial short videos (under 20s) — Reels, TikTok & ads`,
      `${photos} retouched photos — included`
    ];
  } else if (videoType === 'commercial') {
    photos = 0;
    showPhotos = false;
    noteLabel = 'Photos for commercial shoots are quoted to fit the production.';
    benefits = [
      `${quantity} commercial video${quantity > 1 ? 's' : ''}`,
      '4-hour shoot · lighting changed every shot',
      'Location change · model voice · voiceover · full production'
    ];
  } else if (videoType === 'social') {
    if (quantity > 4) {
      photos = 25;
      showPhotos = true;
      photosLabel = '25 final retouched photos — included';
    } else if (quantity > 0) {
      photos = 0;
      showPhotos = false;
      noteLabel = 'Want photos? Add 5+ videos or choose a pack — otherwise we quote photos separately.';
    }
    benefits = [
      `${quantity} social media video${quantity > 1 ? 's' : ''}`,
      'Model voice · 2 lighting setups',
      'One location with lighting change · 2 hours recording'
    ];
  } else {
    if (quantity > 4) {
      photos = 25;
      showPhotos = true;
      photosLabel = '25 final retouched photos — included';
    } else if (quantity > 0) {
      photos = 0;
      showPhotos = false;
      noteLabel = 'Want photos? Add 5+ videos or choose a pack — otherwise we quote photos separately.';
    }
    benefits = [
      `${quantity} social media video${quantity > 1 ? 's' : ''}`,
      '1 location · 1 lighting setup',
      'Simple edit · standard delivery'
    ];
  }

  const lines: EstimateLine[] = [
    { key: 'videoType', amount: total, label: `${quantity} ${quantity === 1 ? cfg.unit : cfg.unit + 's'}` },
    ...(showPhotos ? [{ key: 'photos', amount: 0, label: photosLabel }] : [])
  ];

  return {
    total,
    videoType,
    quantity,
    photos,
    showPhotos,
    photosLabel: photosLabel,
    noteLabel: noteLabel,
    lines,
    benefits
  };
}

export function euro(value: number, locale: string): string {
  return `€${value.toLocaleString(locale === 'en' ? 'en-GB' : locale === 'fr' ? 'fr-FR' : 'it-IT')}`;
}