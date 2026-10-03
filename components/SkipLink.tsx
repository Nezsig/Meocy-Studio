'use client';
import { useLanguage } from '../contexts/LanguageContext';

/** First focusable element on every page: jumps past the header to <main id="main-content">. Hidden until focused. */
export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[14px] focus:font-medium focus:text-chalk">
      {t.a11y.skipToContent}
    </a>
  );
}
