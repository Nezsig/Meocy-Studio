'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { clients } from '../data/site';

export function ClientStrip() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.clients.label}
      className="mt-20 border-y border-mist bg-chalk py-7 sm:mt-28">
      
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-12">
        <p className="flex-none text-[11px] font-semibold uppercase tracking-[0.2em] text-slate2/70">
          {t.clients.label}
        </p>
        <div className="flex flex-wrap items-center gap-x-9 gap-y-3 lg:justify-between lg:gap-x-6">
          {clients.map((c) =>
          <span
            key={c}
            className="text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            
              {c}
            </span>
          )}
        </div>
      </div>
    </section>);

}