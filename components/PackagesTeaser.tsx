'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { workItems } from '../data/work';

const photos = ['fashion-05', 'fashion-04'].map((id) => workItems.find((w) => w.id === id)!).filter(Boolean);

export function PackagesTeaser() {
  const { t } = useLanguage();
  const pkg = t?.pkgPage || {};
  const title = pkg.title || 'Photography & Video Packages';
  const intro = pkg.intro1 || 'Simple packages for different production needs.';
  const cta = pkg.customButton || 'Request a custom quote';

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-12">
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

        {/* Supporting photography (real Milan street work); lazy-loaded, fixed 3:4 frames. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {photos.map((p) => (
            <div key={p.id} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-mist">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1240px) 280px, (min-width: 1024px) calc((100vw - 128px) / 4), (min-width: 640px) calc((100vw - 80px) / 2), calc((100vw - 52px) / 2)"
                className="object-cover object-[50%_25%]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
