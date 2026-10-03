'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export function PackagesTeaser() {
  const { t } = useLanguage();
  const pkg = t?.pkgPage || {};
  const title = pkg.title || 'Photography & Video Packages';
  const intro = pkg.intro1 || 'Simple packages for different production needs.';
  const cta = pkg.customButton || 'Request a custom quote';

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-tighter-display">
            {title}
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-slate2">
            {intro}
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-7 text-[15px] font-semibold text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
