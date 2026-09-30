'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { workItems } from '../data/work';

export function Work() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'fashion' | 'portrait'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return workItems;
    return workItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const previousImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  return (
    <section id="work" className="bg-paper py-32 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Heading */}
        <h2 className="font-display text-[clamp(2rem,5vw,2.8rem)] leading-[1.05] tracking-tighter-display mb-12">
          {t.work.sectionHeading}
        </h2>

        {/* Filter buttons */}
        <div className="flex gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 border transition-colors text-[14px] font-medium ${
              activeFilter === 'all'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-mist hover:border-ink'
            }`}
          >
            {t.work.filterAll}
          </button>
          <button
            onClick={() => setActiveFilter('fashion')}
            className={`px-4 py-2 border transition-colors text-[14px] font-medium ${
              activeFilter === 'fashion'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-mist hover:border-ink'
            }`}
          >
            {t.work.filterFashion}
          </button>
          <button
            onClick={() => setActiveFilter('portrait')}
            className={`px-4 py-2 border transition-colors text-[14px] font-medium ${
              activeFilter === 'portrait'
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink border-mist hover:border-ink'
            }`}
          >
            {t.work.filterPortrait}
          </button>
        </div>

        {/* Masonry grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: 'auto',
          }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="relative overflow-hidden bg-mist cursor-pointer group"
              onClick={() => openLightbox(index)}
              style={{
                aspectRatio: `${item.width} / ${item.height}`,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[110]"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-[110]"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <Image
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-[110]"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-[14px] bg-black/50 px-3 py-1 rounded">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
