'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { workItems, type WorkCategory } from '../data/work';

type Filter = 'all' | WorkCategory;

const CATEGORY_ORDER: WorkCategory[] = ['fashion', 'portrait', 'commercial', 'product', 'food', 'video'];

export function WorkGallery() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const tabs = useMemo<Filter[]>(
    () => ['all', ...CATEGORY_ORDER.filter((c) => workItems.some((item) => item.category === c))],
    []
  );

  const visible = useMemo(
    () => (filter === 'all' ? workItems : workItems.filter((item) => item.category === filter)),
    [filter]
  );
  const photos = useMemo(() => visible.filter((item) => item.type === 'photo'), [visible]);
  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, close, prev, next]);

  const labelFor = (f: Filter) => t.work[f];

  return (
    <>
      <main className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {t.work.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate2">{t.work.intro}</p>

          {workItems.length === 0 ? (
            <p className="mt-14 rounded-2xl border border-mist bg-chalk px-6 py-12 text-center text-[16px] text-slate2">
              {t.work.empty}
            </p>
          ) : (
            <>
              <div
                role="tablist"
                aria-label={t.work.title}
                className="-mx-5 mt-12 flex gap-2 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                  const active = tab === filter;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(tab)}
                      className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-150 ${
                        active
                          ? 'bg-accent text-ink'
                          : 'border border-mist bg-chalk text-slate2 hover:border-ink hover:text-ink'
                      }`}>
                      {labelFor(tab)}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
                {visible.map((item, index) => {
                  const img = (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      // The first photo is the page's largest above-the-fold image (LCP); the rest load lazily.
                      {...(index === 0 ? { priority: true } : { loading: 'lazy' as const })}
                      sizes="(min-width: 1240px) 379px, (min-width: 1024px) calc((100vw - 104px) / 3), (min-width: 640px) calc((100vw - 84px) / 2), calc(100vw - 40px)"
                      className="h-auto w-full transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
                    />
                  );
                  const caption = item.caption ? (
                    <span className="mt-2 block text-[13px] text-slate2">{item.caption}</span>
                  ) : null;

                  if (item.type === 'video') {
                    return (
                      <figure key={item.id} className="mb-5 break-inside-avoid">
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.work.watch}: ${item.alt}`}
                          className="group relative block overflow-hidden rounded-2xl bg-mist">
                          {img}
                          <span className="absolute inset-0 -z-10 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" aria-hidden />
                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[12px] font-medium text-chalk backdrop-blur">
                            <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                            {t.work.watch}
                          </span>
                        </a>
                        {caption}
                      </figure>
                    );
                  }

                  const photoIndex = photos.indexOf(item);
                  return (
                    <figure key={item.id} className="mb-5 break-inside-avoid">
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(photoIndex)}
                        aria-label={item.alt}
                        className="group relative block w-full overflow-hidden rounded-2xl bg-mist">
                        {img}
                        <span className="absolute inset-0 -z-10 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" aria-hidden />
                      </button>
                      {caption}
                    </figure>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <section className="bg-ink py-20 text-chalk sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.work.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-chalk/70">{t.work.ctaText}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
            {t.work.ctaButton}
          </Link>
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-12">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.work.close}
            className="absolute right-4 top-4 rounded-full bg-chalk/10 p-3 text-chalk transition-colors hover:bg-chalk/20">
            <X className="h-5 w-5" aria-hidden />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={t.work.prev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-chalk/10 p-3 text-chalk transition-colors hover:bg-chalk/20 sm:left-6">
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={t.work.next}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-chalk/10 p-3 text-chalk transition-colors hover:bg-chalk/20 sm:right-6">
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </>
          )}
          <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              quality={85}
              loading="eager"
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
            />
            {current.caption && (
              <figcaption className="mt-3 text-center text-[14px] text-chalk/70">{current.caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
