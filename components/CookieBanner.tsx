'use client';
import { useConsent } from '../contexts/ConsentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { CookieSettings } from './CookieSettings';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectOptional } = useConsent();
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);

  if (!showBanner) return null;

  const banner = t.cookieBanner;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white border border-mist shadow-lg">
          <div className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-ink mb-2">{banner.title}</h2>
            <p className="text-sm text-slate2 mb-6">{banner.description}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={rejectOptional}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-ink border border-mist hover:bg-chalk transition-colors duration-150"
              >
                {banner.rejectOptional}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-ink border border-mist hover:bg-chalk transition-colors duration-150"
              >
                {banner.customize}
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-chalk bg-accent hover:opacity-90 transition-opacity duration-150"
              >
                {banner.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSettings && <CookieSettings onClose={() => setShowSettings(false)} />}
    </>
  );
}
