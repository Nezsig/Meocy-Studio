'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { studioContact } from '../data/site';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-paper py-14">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-mist pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <img
              src="/meocy-logo.png"
              alt="MEOCY Studio"
              className="h-14 w-auto object-contain" />
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate2">
              {t.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
              <li>
                <a
                  href={`mailto:${studioContact.email}`}
                  className="inline-flex items-center gap-2 text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  {studioContact.email}
                </a>
              </li>
              <li>
                <a
                  href={studioContact.phoneHref}
                  className="inline-flex items-center gap-2 text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.92 7.02C17.45 6.18 16.48 5.6 15.41 5.6c-1.07 0-2.04.58-2.51 1.41l-1.73 2.99c-.13.23-.27.43-.43.58-.34.32-.76.52-1.22.52-.87 0-1.66-.42-2.15-1.07l-3.93-5.12C3.27 3.47 3 2.76 3 2.01V2c0-.55.45-1 1-1h5.5c.55 0 1 .45 1 1s-.45 1-1 1H5.03c.1.84.5 1.65 1.12 2.28l3.93 5.12c.36.47.93.76 1.56.76.63 0 1.2-.29 1.56-.76l1.73-2.99c.13-.23.27-.43.43-.58.34-.32.76-.52 1.22-.52.63 0 1.2.29 1.56.75l4.02 4.02c.36.47.93.76 1.56.76.63 0 1.2-.29 1.56-.76l2.07-2.07c.36-.47.93-.76 1.56-.76.63 0 1.2.29 1.56.76l2.49 2.49c.36.47.93.76 1.56.76.63 0 1.2-.29 1.56-.76l.71-.71c.55 0 1-.45 1-1v-5.5c0-.55-.45-1-1-1z"/>
                  </svg>
                  {studioContact.phone}
                </a>
              </li>
              <li>
                <a
                  href={studioContact.instagram1Href}
                  className="inline-flex items-center gap-2 text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                  {studioContact.instagram1}
                </a>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[13px] text-slate2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} MEOCY Studio · {t.footer.rights}
            </p>
            <p className="mt-1 text-[12px] text-slate2/60">{t.footer.rebrand}</p>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
              Privacy
            </a>
            <a href="/terms" className="text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
              Terms
            </a>
          </div>
          <p>{studioContact.address}, Italia</p>
        </div>
      </div>
    </footer>
  );
}