'use client';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Dict } from '../data/locales';

type Pkg = Dict['pkgPage']['p1'];

interface PackageCardProps {
  pkg: Pkg;
  number: number;
  labels: { packageLabel: string; includesLabel: string; idealLabel: string };
  featured?: boolean;
}

function PackageCard({ pkg, number, labels, featured = false }: PackageCardProps) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-7 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift ${
        featured ? 'border-ink bg-ink text-chalk' : 'border-mist bg-chalk text-ink'
      }`}>
      <span
        className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-chalk/60' : 'text-slate2'}`}>
        {labels.packageLabel} {String(number).padStart(2, '0')}
      </span>
      <h3 className="mt-5 font-display text-[1.9rem] leading-[1.08] tracking-tighter-display">{pkg.name}</h3>
      <p
        className={`mt-3 text-[2.4rem] font-semibold leading-none tracking-tight ${featured ? 'text-accent' : 'text-ink'}`}>
        {pkg.price}
      </p>
      {pkg.desc && (
        <p className={`mt-4 text-[15px] leading-relaxed ${featured ? 'text-chalk/70' : 'text-slate2'}`}>{pkg.desc}</p>
      )}

      {pkg.includes.length > 0 && (
        <div className="mt-6">
          <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-chalk/60' : 'text-slate2'}`}>
            {labels.includesLabel}
          </p>
          <ul className="mt-3 space-y-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-snug">
                <span className="mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pkg.ideal.length > 0 && (
        <div className="mt-6">
          <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-chalk/60' : 'text-slate2'}`}>
            {labels.idealLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {pkg.ideal.map((tag) => (
              <li
                key={tag}
                className={`rounded-full px-3 py-1 text-[12px] ${
                  featured ? 'bg-chalk/10 text-chalk/80' : 'bg-paper text-slate2'
                }`}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-8">
        <Link
          href="/#booking"
          className={`flex w-full items-center justify-center rounded-full px-6 py-3 text-center text-[14px] font-semibold transition-transform duration-150 ease-smooth hover:-translate-y-0.5 ${
            featured ? 'bg-accent text-ink' : 'bg-ink text-chalk'
          }`}>
          {pkg.button}
        </Link>
      </div>
    </article>
  );
}

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tighter-display">{title}</h2>
      {intro && <p className="mt-3 text-[16px] leading-relaxed text-slate2">{intro}</p>}
    </div>
  );
}

export function PackagesPage() {
  const { t } = useLanguage();
  const p = t.pkgPage;
  const labels = { packageLabel: p.packageLabel, includesLabel: p.includesLabel, idealLabel: p.idealLabel };
  const photoPackages = [p.p1, p.p2, p.p3, p.p4, p.p5];
  const videoPackages = [p.v1, p.v2, p.v3];

  return (
    <>
      <main className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {p.title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-3 text-[17px] leading-relaxed text-slate2">
            <p className="text-ink">{p.intro1}</p>
            <p>{p.intro2}</p>
          </div>

          <section className="mt-20">
            <SectionHeading title={p.photoTitle} />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photoPackages.map((pkg, i) => (
                <PackageCard key={i} pkg={pkg} number={i + 1} labels={labels} featured={i === 4} />
              ))}
            </div>
          </section>

          <section className="mt-24">
            <SectionHeading title={p.videoTitle} intro={p.videoIntro} />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videoPackages.map((pkg, i) => (
                <PackageCard key={i} pkg={pkg} number={photoPackages.length + i + 1} labels={labels} />
              ))}
            </div>
          </section>

          <section className="mt-24">
            <SectionHeading title={p.extrasTitle} intro={p.extrasIntro} />
            <ul className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
              {p.extras.map((extra) => (
                <li key={extra.label} className="flex items-baseline gap-3 border-b border-mist py-4 text-[15px]">
                  <span className="min-w-0">{extra.label}</span>
                  <span className="min-w-[1.5rem] flex-1 translate-y-[-3px] border-b border-dotted border-slate2/50" aria-hidden />
                  <span className="shrink-0 text-right font-semibold">{extra.price}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <section className="bg-ink py-20 text-chalk sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/60">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              {p.customTitle}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-tighter-display">
              {p.customHeadline}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-chalk/70">{p.customText1}</p>
            <p className="mt-3 text-[17px] leading-relaxed text-chalk/70">{p.customText2}</p>
            <Link
              href="/#booking"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
              {p.customButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.work.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-slate2">{t.work.ctaText}</p>
          <Link
            href="/#booking"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
            {t.work.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
