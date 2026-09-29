'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        {/* Main grid: 4 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16 pb-12 border-b border-white/10">

          {/* COLUMN 1: Brand */}
          <div className="flex flex-col">
            {/* Logo - white version, larger */}
            <div className="mb-4">
              <img
                src="/meocy-wordmark-white.png"
                alt="MEOCY Studio"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Lime accent underline */}
            <div className="h-1 w-11 bg-accent mb-6 rounded-full" />

            {/* Brand blurb */}
            <p className="text-sm leading-relaxed text-chalk/90 mb-6">
              {t.footer.brand.blurb}
            </p>

            {/* Social icons - 40px circles with inline SVGs */}
            <div className="flex gap-3 mb-4">
              {/* Instagram @chamila.it */}
              <a
                href="https://instagram.com/chamila.it"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @chamila.it"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>

              {/* Instagram @chami.eu */}
              <a
                href="https://instagram.com/chami.eu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @chami.eu"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/393791051000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Website */}
              <a
                href="https://meocy.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20M3.5 7h17M3.5 17h17"/>
                </svg>
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
