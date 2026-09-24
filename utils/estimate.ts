import type { ShootCategory } from '../types/site';

export type AddOnId = 'model' | 'styling' | 'video' | 'express';

export interface EstimateInput {
  category: ShootCategory;
  images: number;
  onLocation: boolean;
  addOns: AddOnId[];
}

export interface EstimateLine {
  key: string;
  amount: number;
}

export interface EstimateResult {
  low: number;
  high: number;
  days: number;
  express: boolean;
  large: boolean;
  recommended: string;
  lines: EstimateLine[];
}

export const addOnIds: AddOnId[] = ['model', 'styling', 'video', 'express'];

export const addOnPrices: Record<AddOnId, number> = {
  model: 650,
  styling: 480,
  video: 540,
  express: 390
};

const baseByCategory: Record<ShootCategory, {base: number;perImage: number;}> = {
  product: { base: 420, perImage: 22 },
  restaurant: { base: 520, perImage: 26 },
  fashion: { base: 780, perImage: 30 },
  brand: { base: 900, perImage: 34 }
};

export function estimate({ category, images, onLocation, addOns }: EstimateInput): EstimateResult {
  const cfg = baseByCategory[category];
  const lines: EstimateLine[] = [
  { key: 'studio', amount: cfg.base },
  { key: 'images', amount: images * cfg.perImage }];


  if (onLocation) lines.push({ key: 'location', amount: 340 });
  addOns.forEach((id) => lines.push({ key: id, amount: addOnPrices[id] }));

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const low = Math.round(subtotal * 0.95 / 10) * 10;
  const high = Math.round(subtotal * 1.12 / 10) * 10;

  return {
    low,
    high,
    days: images > 55 ? 2 : 1,
    express: addOns.includes('express'),
    large: images > 40,
    recommended: subtotal > 1500 ? 'platinum' : subtotal > 700 ? 'gold' : 'silver',
    lines
  };
}

export function euro(value: number, locale: string): string {
  return `€${value.toLocaleString(locale === 'en' ? 'en-GB' : locale === 'fr' ? 'fr-FR' : 'it-IT')}`;
}