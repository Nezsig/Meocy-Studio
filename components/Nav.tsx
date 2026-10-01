'use client';
import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const linkOrder = [
{ href: '/', key: 'home' },
{ href: '/work', key: 'work' },
{ href: '/services', key: 'services' },
{ href: '/packages', key: 'packages' },
{ href: '/milan-photoshoot', key: 'milan' },
{ href: '/about', key: 'about' },
{ href: '/faq', key: 'faq' },
{ href: '/collaborate', key: 'collaborate' },
{ href: '/contact', key: 'contact' }] as
const;

export function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`transition-[background-color,border-color,backdrop-filter] duration-200 ease-smooth ${
        scrolled || open ?
        'border-b border-mist/80 bg-paper/85 backdrop-blur-xl' :
        'border-b border-transparent bg-transparent'}`
      }>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 sm:h-24">
          
          <a href="/" aria-label="MEOCY home" className="flex shrink-0 items-center rounded-full p-1 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            {/* TODO: Replace with /meocy-mark.png (M letter-mark only) when provided. For now using full logo mark at restored size. */}
            <img
              src="/meocy-logo.png"
              alt=""
              className="h-[72px] w-auto object-contain sm:h-[90px]" />
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {linkOrder.map((l) =>
            <li key={l.href} className="relative">
                <a
                href={l.href}
                className="rounded-full px-3 py-2 text-[13.5px] font-medium text-slate2 transition-colors duration-150 ease-smooth hover:text-ink">

                  {t.nav.links[l.key]}
                  {l.key === 'milan' && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                </a>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="/contact"
              className="hidden whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5 sm:inline-flex">

              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-mist text-ink xl:hidden">
              
              {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </nav>

        {open &&
        <div className="border-t border-mist/70 px-5 pb-5 pt-3 xl:hidden">
            <ul className="grid grid-cols-2 gap-2">
              {linkOrder.map((l) =>
            <li key={l.href}>
                  <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-chalk px-4 py-3 text-[15px] font-medium text-ink">

                    {t.nav.links[l.key]}
                  </a>
                </li>
            )}
            </ul>
            <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-ink px-5 py-3 text-center text-[14px] font-medium text-chalk">

              {t.nav.cta}
            </a>
          </div>
        }
    </header>
  );

}