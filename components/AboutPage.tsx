'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { FounderCard } from './FounderCard';

export function AboutPage() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <main id="main-content">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            {a.title}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {a.headline}
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Image
                src="/chamila-about.jpg"
                alt={t.about.name}
                width={1400}
                height={1400}
                priority
                sizes="(min-width: 1240px) 505px, (min-width: 1024px) calc((100vw - 128px) * 0.45), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="space-y-5 text-[17px] leading-relaxed text-[#3a3a38]">
                <p>{a.p1}</p>
                <p>{a.p2}</p>
                <p className="text-ink">{a.p3}</p>
              </div>

              <div className="mt-12">
                <FounderCard />
              </div>
            </div>
          </div>

          <section className="mt-28">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tighter-display">
              {a.whyTitle}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {a.why.map((item, i) => (
                <article
                  key={item.t}
                  className="rounded-2xl border border-mist bg-chalk p-7 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift">
                  <span className="text-[13px] font-medium tabular-nums text-slate2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 font-display text-[1.75rem] leading-[1.1] tracking-tighter-display">{item.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate2">{item.d}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-28">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tighter-display">
                {a.eqTitle}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-slate2">{a.eqIntro}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {a.eq.map((group) => (
                <div key={group.label} className="rounded-2xl border border-mist bg-chalk p-6">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">{group.label}</h3>
                  <ul className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="max-w-full rounded-full border border-mist bg-paper px-3.5 py-1.5 text-[14px] text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-slate2">{a.eqNote}</p>
          </section>
        </div>
      </div>

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
    </main>
  );
}
