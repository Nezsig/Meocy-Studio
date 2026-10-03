'use client';
import { useId, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

interface FaqItemProps {
  id: string;
  question: string;
  answer: string[];
}

function FaqItem({ id, question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const buttonId = `${id}-q`;
  const panelId = `${id}-a`;

  return (
    <div className="border-b border-mist">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[56px] w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-ink transition-colors hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          <span>{question}</span>
          <span
            aria-hidden
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              open ? 'bg-accent' : 'bg-chalk'
            }`}>
            <span className="absolute h-[1.5px] w-3 rounded-full bg-ink" />
            <span
              className={`absolute h-3 w-[1.5px] rounded-full bg-ink transition-transform duration-300 ease-smooth ${
                open ? 'scale-y-0' : 'scale-y-100'
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-smooth ${
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}>
        <div className="overflow-hidden">
          <div className="space-y-3 pb-6 pr-12 text-[15.5px] leading-relaxed text-slate2">
            {answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqPage() {
  const { t } = useLanguage();
  const f = t.faqPage;
  const baseId = useId();

  return (
    <>
      <main className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {f.howTitle}
          </h1>

          <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {f.steps.map((step, i) => (
              <li key={i} className="flex flex-col rounded-2xl border border-mist bg-chalk p-7">
                <span className="font-display text-[3.2rem] leading-none tracking-tighter-display text-ink/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-6 text-[18px] font-semibold leading-snug">{step.t}</h2>
                <div className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-slate2">
                  {step.d.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 rounded-2xl border border-accent/60 bg-accent/15 p-7 sm:p-8">
            <h2 className="font-display text-[1.9rem] leading-[1.08] tracking-tighter-display">{f.deliveryTitle}</h2>
            <ul className="mt-4 space-y-1.5 text-[16px] font-medium">
              <li>{f.deliveryPhotos}</li>
              <li>{f.deliveryVideos}</li>
            </ul>
            <p className="mt-4 text-[14.5px] text-slate2">{f.deliveryNote}</p>
          </div>

          <section className="mx-auto mt-28 max-w-[780px]">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tighter-display">
              {f.faqTitle}
            </h2>
            <div className="mt-8 border-t border-mist">
              {f.faq.map((item, i) => (
                <FaqItem key={i} id={`${baseId}-faq-${i}`} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <section className="border-t border-mist py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.work.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-slate2">{t.work.ctaText}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
            {t.work.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
