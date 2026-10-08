'use client';
import { useConsent } from '../contexts/ConsentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { XIcon } from 'lucide-react';

type Props = {
  onClose: () => void;
};

export function CookieSettings({ onClose }: Props) {
  const { preferences, updateConsent } = useConsent();
  const { t } = useLanguage();
  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [marketing, setMarketing] = useState(preferences?.marketing ?? false);

  const settings = t.cookieSettings;

  const handleSave = () => {
    updateConsent({ analytics, marketing });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-mist p-5 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">{settings.title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-slate2 hover:text-ink transition-colors"
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-ink mb-2">{settings.essential.title}</h3>
            <p className="text-sm text-slate2 mb-3">{settings.essential.description}</p>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="essential"
                checked={true}
                disabled
                className="w-5 h-5 rounded border-2 border-accent bg-accent cursor-not-allowed"
              />
              <label htmlFor="essential" className="text-sm text-slate2">
                {settings.essential.label}
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-2">{settings.analytics.title}</h3>
            <p className="text-sm text-slate2 mb-3">{settings.analytics.description}</p>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="analytics"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-mist cursor-pointer accent-accent"
              />
              <label htmlFor="analytics" className="text-sm text-slate2 cursor-pointer">
                {settings.analytics.label}
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-2">{settings.marketing.title}</h3>
            <p className="text-sm text-slate2 mb-3">{settings.marketing.description}</p>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="marketing"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-mist cursor-pointer accent-accent"
              />
              <label htmlFor="marketing" className="text-sm text-slate2 cursor-pointer">
                {settings.marketing.label}
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-paper border-t border-mist p-5 sm:p-6 flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
          <button
            onClick={handleSave}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-chalk bg-accent hover:opacity-90 transition-opacity duration-150"
          >
            {settings.save}
          </button>
          <button
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-ink border border-mist hover:bg-chalk transition-colors duration-150"
          >
            {settings.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
