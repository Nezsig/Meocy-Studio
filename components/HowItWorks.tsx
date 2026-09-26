'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function HowItWorks() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  const steps = [
    {
      en: { title: 'Send or book', text: 'Ship us your products, or book an on-location shoot anywhere in Milan.' },
      it: { title: 'Invia o prenota', text: 'Spediscici i tuoi prodotti, o prenota uno shooting on-location a Milano.' },
      fr: { title: 'Envoyez ou réservez', text: 'Envoyez-nous vos produits, ou réservez une séance sur place à Milan.' }
    },
    {
      en: { title: 'We shoot', text: 'A fixed price agreed in writing before we start. No surprises.' },
      it: { title: 'Scattiamo', text: 'Un prezzo fisso concordato per iscritto prima di iniziare. Nessuna sorpresa.' },
      fr: { title: 'On photographie', text: 'Un prix fixe convenu par écrit avant de commencer. Sans surprise.' }
    },
    {
      en: { title: 'You receive', text: 'A complete, channel-ready set of images, ready for your store and socials.' },
      it: { title: 'Ricevi', text: 'Un set completo di immagini pronte all\'uso, per il tuo shop e i social.' },
      fr: { title: 'Vous recevez', text: 'Un ensemble complet d\'images prêtes à l\'emploi, pour votre boutique et vos réseaux.' }
    }
  ];

  const headings = {
    en: 'How it works',
    it: 'Come funziona',
    fr: 'Comment ça marche'
  };

  const appear = (i: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] as const }
  });

  return (
    <section className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
          {headings[lang as keyof typeof headings]}
        </h2>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => {
          const stepData = step[lang as keyof typeof step];
          return (
            <motion.div
              key={i}
              {...appear(i)}
              className="flex flex-col">

              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[14px] font-bold text-ink">
                {i + 1}
              </div>
              <h3 className="text-[19px] font-semibold leading-snug tracking-tight">
                {stepData.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate2">
                {stepData.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>);
}
