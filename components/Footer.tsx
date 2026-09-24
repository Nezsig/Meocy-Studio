'use client';
import React from 'react';
import { InstagramIcon, MailIcon, PhoneIcon } from 'lucide-react';
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
            <p className="font-display text-[2.4rem] leading-none tracking-tighter-display">
              MEOCY <span className="italic text-slate2">Studio</span>
            </p>
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
                  
                  <MailIcon size={15} /> {studioContact.email}
                </a>
              </li>
              <li>
                <a
                  href={studioContact.phoneHref}
                  className="inline-flex items-center gap-2 text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
                  
                  <PhoneIcon size={15} /> {studioContact.phone}
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">
                  
                  <InstagramIcon size={15} /> {studioContact.instagram}
                </a>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[13px] text-slate2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MEOCY Studio · {studioContact.vat} · {t.footer.rights}
          </p>
          <p>{studioContact.address}, Italia</p>
        </div>
      </div>
    </footer>);

}