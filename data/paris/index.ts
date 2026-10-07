import type { LanguageCode } from '../../types/site';
import { parisEn, type ParisCopy } from './en';
import { parisIt } from './it';
import { parisFr } from './fr';

// Paris-only copy, picked with the site's current language (useLanguage().lang).
export const parisCopy: Record<LanguageCode, ParisCopy> = { en: parisEn, it: parisIt, fr: parisFr };
export type { ParisCopy };
