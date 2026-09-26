'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/site';
import type { ProjectMeta } from '../types/site';

export function Work() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const featured = projects.find((p) => p.featured);
  const rest = featured ? projects.filter((p) => !p.featured) : projects;
  const copy = t.work.projects as Record<
    string,
    {title: string;sector: string;scope: string;outcome: string;}>;


  const appear = (i: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] as const }
  });

  return (
    <section id="work" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate2">
          {t.work.eyebrow}
        </p>
        <h2 className="mt-4 whitespace-pre-line font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
          {t.work.title}
        </h2>
        <p className="mt-4 text-[16.5px] leading-relaxed text-slate2">{t.work.lead}</p>
      </div>

      {featured && featured.image && (
      <motion.article
        {...appear(0)}
        className="mt-12 grid overflow-hidden rounded-xl2 bg-chalk ring-1 ring-ink/8 shadow-lift lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">

        <div className="bg-paper">
          <img
            src={featured.image}
            alt={copy[featured.id].title}
            className="h-full w-full object-cover" />

        </div>
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate2">
              {featured.client} · {featured.year}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.05] tracking-tighter-display">
            {copy[featured.id].title}
          </h3>
          <p className="mt-2 text-[14px] text-slate2">{copy[featured.id].sector}</p>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/80">
            {copy[featured.id].scope}
          </p>
          <p className="mt-auto pt-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate2">
              {t.work.outcomeLabel}
            </span>
            <span className="mt-2 block text-[19px] font-medium leading-snug text-ink">
              {copy[featured.id].outcome}
            </span>
          </p>
        </div>
      </motion.article>
      )}

      <div className={`${featured && featured.image ? 'mt-5' : ''} grid gap-5 md:grid-cols-3`}>
        {rest.map((p, i) =>
        <motion.article
          key={p.id}
          {...appear(i + 1)}
          className="flex flex-col rounded-xl2 bg-chalk p-7 ring-1 ring-ink/8">
          
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                {p.client}
              </span>
              <span className="text-[11.5px] tabular-nums text-slate2">{p.year}</span>
            </div>
            <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight">
              {copy[p.id].title}
            </h3>
            <p className="mt-1.5 text-[13.5px] text-slate2">{copy[p.id].sector}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70">{copy[p.id].scope}</p>
            <p className="mt-auto pt-6">
              <span className="inline-flex items-center gap-2 text-[14px] font-medium text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {copy[p.id].outcome}
              </span>
            </p>
          </motion.article>
        )}
      </div>
    </section>);

}