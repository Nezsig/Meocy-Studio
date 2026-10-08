'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { milanPackages, type MilanPackageId } from '../../lib/milan-shoot-config';
import { formatPrice } from './parts';

interface Props {
  packageChosen: boolean;
  onBookingClick: (packageId: MilanPackageId) => void;
}

export function MobileBookingBar({ packageChosen, onBookingClick }: Props) {
  const { lang, t } = useLanguage();
  const miniPackage = milanPackages.find((p) => p.id === 'mini');
  const m = t.milanShoot;
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!miniPackage) return null;

  // Hide bar if booking flow is open or footer is visible on screen
  if (packageChosen || footerVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-mist bg-chalk px-4 py-3 sm:hidden">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate2">{m.mobileBookingBar.packageName}</span>
          <span className="text-[15px] font-semibold text-ink">{formatPrice(miniPackage.price, lang)}</span>
        </div>
        <button
          type="button"
          onClick={() => onBookingClick('mini')}
          className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 active:translate-y-0"
        >
          {m.mobileBookingBar.bookButton}
          <ChevronRight size={16} className="flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
