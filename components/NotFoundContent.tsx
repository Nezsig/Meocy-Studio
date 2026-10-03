'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export function NotFoundContent() {
  const { t } = useLanguage();
  return (
    <main className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate2">404</p>
      <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.02] tracking-tighter-display">{t.notFound.title}</h1>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate2">{t.notFound.text}</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-chalk">
          {t.nav.links.home}
        </Link>
        <Link href="/work" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium text-ink">
          {t.nav.links.work}
        </Link>
        <Link href="/contact" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium text-ink">
          {t.nav.links.contact}
        </Link>
      </div>
    </main>
  );
}
