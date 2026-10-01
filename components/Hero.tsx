'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { images } from '../data/site';
import { euro } from '../utils/estimate';

export function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] as const }
  });

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-1 lg:items-center lg:gap-16">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {t.hero.eyebrow}
            </span>

            <h1 className="mt-6 font-display text-[clamp(2.9rem,6.6vw,5.4rem)] leading-[0.95] tracking-tighter-display">
              {t.hero.titleA}
              <br />
              <span className="italic">{t.hero.titleB}</span>
            </h1>

            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate2">{t.hero.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#estimator"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5">

                {t.hero.ctaPrimary}
                <ArrowRightIcon
                  size={17}
                  className="transition-transform duration-200 ease-smooth group-hover:translate-x-1" />

              </a>
            </div>

            <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-slate2">{t.hero.studioCaption}</p>

            {/* Two-path section */}
            <div className="mt-16 pt-12 border-t border-mist sm:mt-20">
              <h2 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-slate2 mb-6">
                {t.hero.pathsTitle}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
                <a
                  href="/services"
                  className="group flex items-center justify-between gap-4 rounded-xl border-2 border-mist p-5 transition-all hover:border-ink hover:bg-paper/50">
                  <span className="text-[15px] font-medium text-ink">{t.hero.pathsCommercial}</span>
                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 text-slate2 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/milan-photoshoot"
                  className="group relative flex items-center justify-between gap-4 rounded-xl border-2 border-mist p-5 transition-all hover:border-ink hover:bg-paper/50">
                  <span className="text-[15px] font-medium text-ink">{t.hero.pathsMilan}</span>
                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 text-slate2 transition-transform group-hover:translate-x-1" />
                  <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent" aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.dl
          {...rise(0.18)}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-mist pt-10 lg:grid-cols-4">

          {t.hero.stats.map((s) =>
          <div key={s.value}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2rem,3vw,2.6rem)] leading-none tracking-tighter-display">
                  {s.value}
                </span>
                {s.label && (
                  <span className="mt-2.5 block text-[12px] font-medium uppercase tracking-[0.14em] text-slate2">
                    {s.label}
                  </span>
                )}
              </dd>
            </div>
          )}
        </motion.dl>

        <motion.div
          {...rise(0.26)}
          className="mt-12 rounded-lg bg-slate2/5 px-6 py-5 sm:px-8 border-l-4 border-accent">
          <p className="text-[14px] leading-relaxed text-slate2">
            {t.hero.rebrandCallout}
          </p>
        </motion.div>
      </div>
    </section>);

}