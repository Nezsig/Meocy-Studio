'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { equipmentGroups } from '../data/site';

export function Equipment() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const titles = t.equipment.groups as Record<string, string>;

  return (
    <section id="equipment" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate2">
              {t.equipment.eyebrow}
            </p>
            <h2 className="mt-4 whitespace-pre-line font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
              {t.equipment.title}
            </h2>
          </div>
          <p className="max-w-lg text-[16.5px] leading-relaxed text-slate2 lg:pb-2">
            {t.equipment.lead}
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {equipmentGroups.map((group, i) =>
          <motion.div
            key={group.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i % 4 * 0.04, ease: [0.23, 1, 0.32, 1] }}>
            
              <h3 className="flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {titles[group.id]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) =>
              <li
                key={item}
                className="rounded-full bg-chalk px-3 py-1.5 text-[13.5px] text-ink/75 ring-1 ring-ink/8">
                
                    {item}
                  </li>
              )}
              </ul>
            </motion.div>
          )}
        </div>

        <p className="mt-14 max-w-2xl text-[15px] leading-relaxed text-slate2">
          {t.equipment.note}
        </p>
      </div>
    </section>);

}