'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function OfferBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-accent text-ink py-3 px-5 sm:px-8 flex items-center justify-between">
      <p className="text-[14px] font-medium">{t.estimator.bannerText}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 flex-none hover:opacity-60 transition-opacity"
        aria-label="Close banner">
        <X size={18} />
      </button>
    </div>
  );
}
