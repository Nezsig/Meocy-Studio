'use client';
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { packageMeta } from '../data/site';
import { euro } from '../utils/estimate';

export function Packages() {
  const { t, lang } = useLanguage();

  return (
    <section id="packages" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate2">
            {t.packages.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.packages.title}
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate2">{t.packages.lead}</p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {packageMeta.map((p) => {
            const tier = t.packages.tiers[p.id as keyof typeof t.packages.tiers];
            return (
              <article
                key={p.id}
                className={`flex flex-col rounded-xl2 p-7 sm:p-8 ${
                p.best ?
                'bg-ink text-chalk shadow-lift' :
                'bg-chalk text-ink ring-1 ring-ink/8'}`
                }>
                
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[20px] font-semibold tracking-tight">{tier.name}</h3>
                  {p.best &&
                  <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink">
                      {t.packages.best}
                    </span>
                  }
                </div>
                <p
                  className={`mt-2 min-h-[44px] text-[14.5px] leading-snug ${
                  p.best ? 'text-chalk/60' : 'text-slate2'}`
                  }>
                  
                  {tier.tagline}
                </p>

                <p className="mt-6 font-display text-[2.6rem] leading-none tracking-tighter-display">
                  {euro(p.priceFrom, lang)}
                  <span
                    className={`ml-2 font-sans text-[13px] font-medium tracking-normal ${
                    p.best ? 'text-chalk/50' : 'text-slate2'}`
                    }>
                    
                    {t.packages.from}
                  </span>
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-3">
                  <div className={`rounded-xl p-3.5 ${p.best ? 'bg-chalk/[0.07]' : 'bg-paper'}`}>
                    <dt className={`text-[12px] ${p.best ? 'text-chalk/50' : 'text-slate2'}`}>
                      {t.packages.volume}
                    </dt>
                    <dd className="mt-1 text-[13.5px] font-medium">{tier.shots}</dd>
                  </div>
                  <div className={`rounded-xl p-3.5 ${p.best ? 'bg-chalk/[0.07]' : 'bg-paper'}`}>
                    <dt className={`text-[12px] ${p.best ? 'text-chalk/50' : 'text-slate2'}`}>
                      {t.packages.delivery}
                    </dt>
                    <dd className="mt-1 text-[13.5px] font-medium">{tier.turnaround}</dd>
                  </div>
                </dl>

                <ul className="mb-8 mt-7 space-y-2.5">
                  {tier.includes.map((inc) =>
                  <li
                    key={inc}
                    className={`flex items-start gap-2.5 text-[14.5px] ${
                    p.best ? 'text-chalk/80' : 'text-ink/80'}`
                    }>
                    
                      <CheckIcon
                      size={15}
                      strokeWidth={2.5}
                      className={`mt-1 flex-none ${p.best ? 'text-accent' : 'text-ink'}`} />
                    
                      {inc}
                    </li>
                  )}
                </ul>

                <a
                  href="#booking"
                  className={`mt-auto block rounded-full px-6 py-3 text-center text-[14.5px] font-medium transition-transform duration-150 ease-smooth hover:-translate-y-0.5 ${
                  p.best ?
                  'bg-accent text-ink' :
                  'bg-ink text-chalk'}`
                  }>
                  
                  {t.packages.choose(tier.name)}
                </a>
              </article>);

          })}
        </div>
      </div>
    </section>);

}