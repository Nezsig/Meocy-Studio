'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const SERVICES = [
  { title: 's1t', desc: 's1d' },
  { title: 's2t', desc: 's2d' },
  { title: 's3t', desc: 's3d' },
  { title: 's4t', desc: 's4d' },
  { title: 's5t', desc: 's5d' },
  { title: 's6t', desc: 's6d' },
] as const;

export function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main id="main-content">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {t.svcPage.title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-3 text-[17px] leading-relaxed text-slate2">
            <p className="text-ink">{t.svcPage.intro1}</p>
            <p>{t.svcPage.intro2}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-mist bg-chalk p-7 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift">
                <span className="text-[13px] font-medium tabular-nums text-slate2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-6 font-display text-[1.9rem] leading-[1.08] tracking-tighter-display">
                  {t.svcPage[s.title]}
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate2">{t.svcPage[s.desc]}</p>
                <Link
                  href="/contact"
                  className="-mb-2 mt-4 inline-flex items-center gap-1.5 self-start py-2 text-[14px] font-medium text-ink underline-offset-4 hover:underline">
                  {t.svcPage.cta} <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-ink py-20 text-chalk sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.svcPage.ctaTitle}
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
            {t.svcPage.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
