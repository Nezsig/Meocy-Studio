'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section className="bg-chalk py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <img
              src="/chamila.png"
              alt="Chamila"
              className="rounded-2xl w-full aspect-square object-cover" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
              {t.about.heading}
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-slate2">
              {t.about.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
