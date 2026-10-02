'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { locales } from '../data/locales';
import type { Dict } from '../data/locales';
import type { LanguageCode } from '../types/site';

interface LanguageValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';

  const saved = localStorage.getItem('meocy-lang');
  if (saved === 'en' || saved === 'it' || saved === 'fr') {
    return saved;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('fr')) return 'fr';

  return 'en';
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLang(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locales[lang].htmlLang;
    try {
      localStorage.setItem('meocy-lang', lang);
    } catch (e) {
      // localStorage might not be available in some contexts
    }
  }, [lang]);

  const value = useMemo<LanguageValue>(() => ({ lang, setLang, t: locales[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}