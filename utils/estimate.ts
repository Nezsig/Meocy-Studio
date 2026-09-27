import type { ShootCategory } from '../types/site';

export type VideoType = 'basic' | 'voiceover' | 'social' | 'pack' | 'commercial';

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
}

const videoTypeConfig: Record<VideoType, { price: number; unit: string }> = {
  basic: { price: 100, unit: 'video' },
  voiceover: { price: 150, unit: 'video' },
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

  if (videoType === 'pack') {
    photos = quantity * 50;
    showPhotos = quantity > 0;
    photosLabel = `${photos} final retouched photos — included`;
  } else if (videoType === 'commercial') {
    photos = 0;
    showPhotos = false;
    noteLabel = 'Photos for commercial shoots are quoted to fit the production.';
  } else if (quantity > 4) {
    photos = 25;
    showPhotos = true;
    photosLabel = '25 final retouched photos — included';
  } else if (quantity > 0) {
    photos = 0;
    showPhotos = false;
    noteLabel = 'Want photos too? Add 5+ videos or choose the pack — otherwise we quote photos separately.';
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
    lines
  };
}

export function euro(value: number, locale: string): string {
  return `€${value.toLocaleString(locale === 'en' ? 'en-GB' : locale === 'fr' ? 'fr-FR' : 'it-IT')}`;
}