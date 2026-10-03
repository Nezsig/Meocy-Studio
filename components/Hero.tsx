'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { HomePhotoStrip } from './HomePhotoStrip';
import { images } from '../data/site';
import { euro } from '../utils/estimate';

// Homepage shoot paths. Text: hero.paths.<key>. Crew recruitment (/work-with-meocy) is deliberately not a path here.
const paths = [
  { key: 'commercial', href: '/contact', style: 'bg-ink text-chalk' },
  { key: 'milan', href: '/milan-photoshoot', style: 'bg-accent text-ink' },
  { key: 'collaborate', href: '/collaborate', style: 'border border-ink text-ink hover:bg-ink hover:text-chalk' },
] as const;

export function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] as const }
  });

  return (
    <section id="top" className="relative overflow-hidden pt-12 sm:pt-24">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5">

                {t.hero.ctaPrimary}
                <ArrowRightIcon
                  size={17}
                  className="transition-transform duration-200 ease-smooth group-hover:translate-x-1" />

              </a>
            </div>

            {/* Positioning + choose your shoot */}
            <div className="mt-10 border-t border-mist pt-8 sm:mt-14 sm:pt-12">
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,2.8rem)] leading-[1.05] tracking-tighter-display">
                {t.hero.positionTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate2">{t.hero.positionText}</p>

              <h3 className="mt-8 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate2">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                {t.hero.pathsTitle}
              </h3>
              <ul className="mt-5 grid gap-4 lg:grid-cols-3">
                {paths.map((path) => {
                  const copy = t.hero.paths[path.key];
                  return (
                    <li key={path.key} className="flex flex-col rounded-[20px] border border-mist bg-chalk p-5 sm:p-7 lg:p-5 xl:p-7">
                      <div className="flex-1">
                        <p className="font-display text-[1.9rem] leading-[1.05] tracking-tighter-display">{copy.title}</p>
                        <p className="mt-2 text-[14px] font-medium text-slate2">{copy.line}</p>
                      </div>
                      <a
                        href={path.href}
                        className={`group mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-4 text-center text-[14.5px] font-semibold leading-tight sm:text-[15px] lg:px-3 lg:text-[14px] xl:px-4 xl:text-[15px] transition-transform duration-150 ease-smooth hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${path.style}`}>
                        {copy.cta}
                        <ArrowRightIcon size={17} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 lg:hidden xl:block" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-slate2">{t.hero.studioCaption}</p>
            </div>
          </motion.div>

        </div>

        <HomePhotoStrip />

        <motion.dl
          {...rise(0.18)}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-mist pt-10 sm:mt-16 lg:grid-cols-4">

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

      </div>
    </section>);

}