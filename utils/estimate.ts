import type { ShootCategory } from '../types/site';

export type AddOnId = 'simpleVideo' | 'styledVideo' | 'express';

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
  total: number;
  days: number;
  express: boolean;
  large: boolean;
  recommended: string;
  lines: EstimateLine[];
}

export const addOnIds: AddOnId[] = ['simpleVideo', 'styledVideo', 'express'];

export const addOnPrices: Record<AddOnId, number> = {
  simpleVideo: 100,
  styledVideo: 250,
  express: 150
};

const baseByCategory: Record<ShootCategory, {base: number;perImage: number;}> = {
  product: { base: 500, perImage: 10 },
  restaurant: { base: 500, perImage: 10 },
  fashion: { base: 500, perImage: 10 },
  brand: { base: 500, perImage: 10 }
};

export function estimate({ category, images, onLocation, addOns }: EstimateInput): EstimateResult {
  const cfg = baseByCategory[category];
  const lines: EstimateLine[] = [
  { key: 'studio', amount: cfg.base },
  { key: 'images', amount: images * cfg.perImage }];


  if (onLocation) lines.push({ key: 'location', amount: 340 });
  addOns.forEach((id) => lines.push({ key: id, amount: addOnPrices[id] }));

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const total = Math.round(subtotal / 10) * 10;

  return {
    total,
    days: images > 55 ? 2 : 1,
    express: addOns.includes('express'),
    large: images > 40,
    recommended: subtotal > 1000 ? 'platinum' : subtotal > 750 ? 'gold' : 'silver',
    lines
  };
}

export function euro(value: number, locale: string): string {
  return `€${value.toLocaleString(locale === 'en' ? 'en-GB' : locale === 'fr' ? 'fr-FR' : 'it-IT')}`;
}