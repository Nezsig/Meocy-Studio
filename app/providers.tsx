'use client';
import { useEffect, useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import type { LanguageCode } from '../types/site';

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>('en');

  useEffect(() => {
    // Check localStorage first for user preference
    const saved = localStorage.getItem('meocy-lang');
    if (saved === 'en' || saved === 'it' || saved === 'fr') {
      setLang(saved);
      return;
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    let detected: LanguageCode = 'en';

    if (browserLang.startsWith('it')) {
      detected = 'it';
    } else if (browserLang.startsWith('fr')) {
      detected = 'fr';
    }

    setLang(detected);
    localStorage.setItem('meocy-lang', detected);
  }, []);

  return <LanguageProvider initial={lang}>{children}</LanguageProvider>;
}
