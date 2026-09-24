'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { testimonialMeta } from '../data/site';

export function Testimonials() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const copy = t.testimonials.items as Record<
    string,
    {quote: string;role: string;result: string;}>;


  return (
    <section
      id="testimonials"
      aria-label={t.testimonials.eyebrow}
      className="scroll-mt-24 border-y border-mist bg-chalk py-24 sm:py-32">
      
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate2">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.03] tracking-tighter-display">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonialMeta.map((person, i) =>
          <motion.figure
            key={person.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col rounded-xl2 bg-paper p-7">
            
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                {copy[person.id].result}
              </span>
              <blockquote className="mt-6 text-[17px] leading-relaxed text-ink/85">
                “{copy[person.id].quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <span
                aria-hidden="true"
                className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-[13px] font-semibold text-chalk">
                
                  {person.name.
                split(' ').
                map((n) => n[0]).
                join('')}
                </span>
                <span>
                  <span className="block text-[14.5px] font-medium text-ink">{person.name}</span>
                  <span className="block text-[13.5px] text-slate2">
                    {copy[person.id].role}, {person.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </div>
    </section>);

}