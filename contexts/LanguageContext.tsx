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
  initial: LanguageCode;
  children: React.ReactNode;
}

export function LanguageProvider({ initial, children }: LanguageProviderProps) {
  const [lang, setLang] = useState<LanguageCode>(initial);

  useEffect(() => {
    setLang(initial);
  }, [initial]);

  useEffect(() => {
    document.documentElement.lang = locales[lang].htmlLang;
  }, [lang]);

  const value = useMemo<LanguageValue>(() => ({ lang, setLang, t: locales[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}