export type ShootCategory = 'product' | 'restaurant' | 'fashion' | 'brand';

export type LanguageCode = 'en' | 'fr' | 'it';

export interface ProjectMeta {
  id: string;
  client: string;
  year: string;
  category: ShootCategory;
  featured: boolean;
  image?: string;
}

export interface PackageMeta {
  id: string;
  priceFrom: number;
  best: boolean;
}

export interface EquipmentGroupMeta {
  id: string;
  items: string[];
}

export interface TestimonialMeta {
  id: string;
  name: string;
  company: string;
}