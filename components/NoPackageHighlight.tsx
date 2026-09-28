'use client';
import { useLanguage } from '../contexts/LanguageContext';

export function NoPackageHighlight() {
  const { t } = useLanguage();

  return (
    <div className="py-6 sm:py-8 border-t border-b border-mist">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <p className="text-sm sm:text-[15px] font-medium text-ink">
            {t.hero.noPackageNeeded}
          </p>
        </div>
      </div>
    </div>
  );
}
