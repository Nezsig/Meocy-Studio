import type { LanguageCode } from '../../types/site';
import { en } from './en';
import { fr } from './fr';
import { it } from './it';
import type { Dict } from './en';

export type { Dict };

export const locales: Record<LanguageCode, Dict> = { en, fr, it };

export const languageOrder: LanguageCode[] = ['en', 'it', 'fr'];