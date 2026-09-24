'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function Process() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="process" className="scroll-mt-24 bg-ink py-24 text-chalk sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {t.process.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] tracking-tighter-display">
              {t.process.title}
            </h2>
          </div>
          <p className="max-w-lg text-[16.5px] leading-relaxed text-chalk/60 lg:pb-2">
            {t.process.lead}
          </p>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {t.process.steps.map((step, i) =>
          <motion.li
            key={step.title}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i % 2 * 0.06, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-lg">
            
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[2.4rem] leading-none tracking-tighter-display text-accent">
                  {String(i + 1)}
                </span>
                <div>
                  <h3 className="text-[21px] font-semibold tracking-tight">{step.title}</h3>
                  <span className="mt-1 block text-[12px] font-medium uppercase tracking-[0.16em] text-chalk/45">
                    {step.duration}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-[15.5px] leading-relaxed text-chalk/60">{step.body}</p>
            </motion.li>
          )}
        </ol>
      </div>
    </section>);

}