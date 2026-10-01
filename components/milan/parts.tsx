'use client';
import { useState } from 'react';
import type { LanguageCode } from '../../types/site';

/** "{n} edited" → "25 edited". */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((s, [k, v]) => s.split(`{${k}}`).join(String(v)), text);

/** €200 in English and Italian copy, 200 € in French (matches the locale texts). */
export const formatPrice = (amount: number, lang: LanguageCode) => (lang === 'fr' ? `${amount} €` : `€${amount}`);

/**
 * Clean, labelled stand-in for a photo that does not exist yet.
 * Replace by swapping the <PhotoPlaceholder> for a next/image with the real file.
 */
export function PhotoPlaceholder({
  id,
  label,
  description,
  className = '',
  dark = true,
}: {
  id: string;
  label: string;
  description: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${description}`}
      data-placeholder={id}
      className={`flex flex-col justify-between overflow-hidden p-5 ${
        dark ? 'bg-graphite text-chalk/55 ring-1 ring-inset ring-chalk/10' : 'bg-mist/60 text-slate2 ring-1 ring-inset ring-ink/5'
      } ${className}`}>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em]">{label}</span>
      <span className={`max-w-[18rem] text-[13px] leading-snug ${dark ? 'text-chalk/75' : 'text-ink/70'}`}>{description}</span>
    </div>
  );
}

export function AccordionItem({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-mist">
      <h3>
        <button
          id={`${id}-q`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[56px] w-full items-center justify-between gap-6 py-5 text-left text-[16.5px] font-medium text-ink transition-colors hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          <span>{question}</span>
          <span
            aria-hidden
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${open ? 'bg-accent' : 'bg-chalk'}`}>
            <span className="absolute h-[1.5px] w-3 rounded-full bg-ink" />
            <span className={`absolute h-3 w-[1.5px] rounded-full bg-ink transition-transform duration-300 ease-smooth ${open ? 'scale-y-0' : 'scale-y-100'}`} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-smooth ${open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 text-[15.5px] leading-relaxed text-slate2">{answer}</p>
        </div>
      </div>
    </div>
  );
}
