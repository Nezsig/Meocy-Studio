'use client';
import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        {/* Main grid: 4 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12 pb-12 border-b border-white/10">

          {/* COLUMN 1: Brand */}
          <div className="flex flex-col">
            {/* Logo - white version, larger */}
            <div className="mb-4">
              <Image
                src="/meocy-wordmark-white.png"
                alt="MEOCY Studio"
                width={200}
                height={56}
                className="w-auto h-auto object-contain"
              />
            </div>

            {/* Lime accent underline */}
            <div className="h-1 w-11 bg-accent mb-6 rounded-full" />

            {/* Brand blurb */}
            <p className="text-sm leading-relaxed text-chalk/90 mb-6">
              {t.footer.brand.blurb}
            </p>

            {/* Social icons - 40px white containers with dark PNG icons */}
            <div className="flex gap-3 mb-4">
              {/* Instagram @chamila.it */}
              <a
                href="https://instagram.com/chamila.it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:opacity-80 transition-opacity"
              >
                <Image src="/instagram.png" alt="Instagram @chamila.it" width={22} height={22} className="object-contain" />
              </a>

              {/* Instagram @chami.eu */}
              <a
                href="https://instagram.com/chami.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:opacity-80 transition-opacity"
              >
                <Image src="/instagram.png" alt="Instagram @chami.eu" width={22} height={22} className="object-contain" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/393791051000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:opacity-80 transition-opacity"
              >
                <Image src="/whatsapp.png" alt="WhatsApp" width={22} height={22} className="object-contain" />
              </a>

              {/* Website */}
              <a
                href="https://meocy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:opacity-80 transition-opacity"
              >
                <Image src="/world-wide-web.png" alt="Website" width={22} height={22} className="object-contain" />
              </a>
            </div>

            {/* Social handles */}
            <p className="text-xs text-[#9a998f]">
              {t.footer.brand.handles}
            </p>
          </div>

          {/* COLUMN 2: Contact */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-[#9a998f] uppercase tracking-wide mb-6">Contact</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                  {t.footer.contact.phoneLabel}
                </span>
                <a
                  href="https://wa.me/393791051000"
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.phone}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                  {t.footer.contact.mobileLabel}
                </span>
                <a
                  href={`tel:${t.footer.contact.mobile.replace(/\s/g, '')}`}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.mobile}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                  {t.footer.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${t.footer.contact.email}`}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                  {t.footer.contact.websiteLabel}
                </span>
                <a
                  href={`https://${t.footer.contact.website}`}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.website}
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Navigation */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-[#9a998f] uppercase tracking-wide mb-6">Navigation</h3>

            <ul className="space-y-3 text-sm">
              {t.footer.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-chalk hover:text-accent transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN: Tourist Photography (Milan photoshoot landing page) */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-[#9a998f] uppercase tracking-wide mb-6">{t.footer.tourist.title}</h3>

            <ul className="space-y-3 text-sm">
              {t.footer.tourist.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-chalk hover:text-accent transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Services */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-[#9a998f] uppercase tracking-wide mb-6">Services</h3>

            <ul className="space-y-3 text-sm">
              {t.footer.services.map((service, idx) => (
                <li key={idx} className="text-chalk">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm">
          <div className="text-[#9a998f]">
            <p>{t.footer.rights}</p>
            <p className="text-xs mt-1">{t.footer.rebrand}</p>
          </div>

          <div className="flex gap-6 text-[#9a998f]">
            <a
              href="/privacy"
              className="hover:text-chalk transition-colors duration-150"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-chalk transition-colors duration-150"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
