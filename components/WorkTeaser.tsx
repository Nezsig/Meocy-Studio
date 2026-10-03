'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { workItems } from '../data/work';

const teaseImages = [
  { id: 'fashion-06', src: '/work/fashion-06.jpg', width: 1007, height: 857, alt: 'MEOCY fashion photography' },
  { id: 'portrait-05', src: '/work/portrait-05.jpg', width: 1009, height: 853, alt: 'MEOCY portrait photography' },
  { id: 'fashion-07', src: '/work/fashion-07.jpg', width: 1250, height: 1064, alt: 'MEOCY fashion photography' },
  { id: 'portrait-07', src: '/work/portrait-07.jpg', width: 1346, height: 1145, alt: 'MEOCY portrait photography' },
  { id: 'fashion-08', src: '/work/fashion-08.jpg', width: 1358, height: 1147, alt: 'MEOCY fashion photography' },
  { id: 'portrait-08', src: '/work/portrait-08.jpg', width: 1349, height: 1066, alt: 'MEOCY portrait photography' },
];

export function WorkTeaser() {
  const { t } = useLanguage();
  const work = t?.work || {};
  const title = work.title || 'Selected Work';
  const ctaButton = work.ctaButton || 'Request a Quote';

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mb-12">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-tighter-display">
            {title}
          </h2>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {teaseImages.map((img) => (
            <Link
              key={img.id}
              href="/work"
              className="group overflow-hidden rounded-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-slate1">
                <Image
                  src={img.src}
                  alt={workItems.find((w) => w.id === img.id)?.alt ?? img.alt}
                  width={img.width}
                  height={img.height}
                  className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
                  sizes="(min-width: 1240px) 381px, (min-width: 640px) calc((100vw - 96px) / 3), calc((100vw - 52px) / 2)"
                />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-7 text-[15px] font-semibold text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5"
        >
          {ctaButton}
        </Link>
      </div>
    </section>
  );
}
