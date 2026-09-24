'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languageOrder, locales } from '../data/locales';

interface LanguageSwitcherProps {
  tone?: 'light' | 'dark';
  className?: string;
}

export function LanguageSwitcher({ tone = 'light', className = '' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  const shell =
  tone === 'light' ?
  'border-ink/12 bg-chalk' :
  'border-chalk/15 bg-chalk/5';

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${shell} ${className}`}>
      
      {languageOrder.map((code) => {
        const isActive = code === lang;
        const activeClass =
        tone === 'light' ? 'bg-ink text-chalk' : 'bg-chalk text-ink';
        const idleClass =
        tone === 'light' ?
        'text-slate2 hover:text-ink' :
        'text-chalk/60 hover:text-chalk';
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            title={locales[code].label}
            className={`rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors duration-150 ease-smooth ${
            isActive ? activeClass : idleClass}`
            }>
            
            {locales[code].short}
          </button>);

      })}
    </div>);

}