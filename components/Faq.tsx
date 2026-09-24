'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { studioContact } from '../data/site';

export function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-y border-mist bg-chalk py-24 sm:py-32">
      
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)]">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.03] tracking-tighter-display">
            {t.faq.title}
          </h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-slate2">
            {t.faq.leadBefore}{' '}
            <a
              href={`mailto:${studioContact.email}`}
              className="text-ink underline decoration-accent decoration-2 underline-offset-4">
              
              {studioContact.email}
            </a>{' '}
            {t.faq.leadAfter}
          </p>
        </div>

        <ul className="space-y-2.5">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className={`rounded-xl2 bg-paper transition-shadow duration-200 ease-smooth ${
                isOpen ? 'ring-1 ring-ink/15' : 'ring-1 ring-transparent'}`
                }>
                
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left">
                  
                  <span className="text-[16.5px] font-medium leading-snug text-ink">{f.q}</span>
                  <PlusIcon
                    size={18}
                    className={`mt-0.5 flex-none text-slate2 transition-transform duration-200 ease-smooth ${
                    isOpen ? 'rotate-45' : ''}`
                    } />
                  
                </button>
                <AnimatePresence initial={false}>
                  {isOpen &&
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden">
                    
                      <p className="px-6 pb-6 pr-10 text-[15.5px] leading-relaxed text-slate2">
                        {f.a}
                      </p>
                    </motion.div>
                  }
                </AnimatePresence>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}