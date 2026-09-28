'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function OfferBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-accent text-ink py-4 px-5 sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] sm:text-[14px] font-medium leading-snug flex-1">
          {t.estimator.bannerText}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-none mt-0.5 hover:opacity-60 transition-opacity"
          aria-label="Close banner">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
