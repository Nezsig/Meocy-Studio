'use client';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { studioContact } from '../data/site';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        {/* Main grid: 4 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16 pb-12 border-b border-slate2/20">

          {/* COLUMN 1: Brand */}
          <div className="flex flex-col">
            {/* Logo - enlarged */}
            <div className="mb-3">
              <img
                src="/meocy-logo.png"
                alt="MEOCY Studio"
                className="h-28 w-auto object-contain"
              />
            </div>

            {/* Lime accent underline */}
            <div className="h-1 w-16 bg-accent mb-5 rounded-full" />

            {/* Brand blurb */}
            <p className="text-sm leading-relaxed text-chalk/90 mb-6">
              {t.footer.brand.blurb}
            </p>

            {/* Social icons - 4 round icons */}
            <div className="flex gap-4 mb-6">
              {/* Instagram @chamila.it */}
              <a
                href={studioContact.instagram1Href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @chamila.it"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate2/10 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>

              {/* Instagram @chami.eu */}
              <a
                href={studioContact.instagram2Href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @chami.eu"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate2/10 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={studioContact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate2/10 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.899 1.488c-1.47.823-2.631 1.982-2.994 3.353-.931 3.516 1.203 7.224 4.383 8.905.661.386 1.243.72 1.349.762.466.149.881.119 1.213-.041.329-.158.659-.493.915-1.417.133-.459.77-1.988.882-2.22.112-.232.055-.399-.088-.571-.143-.172-.566-.434-1.148-.757-.582-.323-1.075-.713-1.149-1.213-.074-.512.463-1.052 1.136-1.722.673-.67 1.141-.779 1.566-.78.425-.001.779.1 1.052.285.273.185.639.577.885 1.087l.21.35c.166.278.236.481.348.695.112.213.247.45.13.646-.117.196-.445.282-.804.282-.359 0-.843-.056-1.466-.221"/>
                </svg>
              </a>

              {/* Website */}
              <a
                href={`https://${t.footer.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate2/10 text-chalk hover:bg-accent hover:text-ink transition-all duration-150"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
            </div>

            {/* Social handles */}
            <p className="text-xs text-slate2/70">
              {t.footer.brand.handles}
            </p>
          </div>

          {/* COLUMN 2: Contact */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-slate2 uppercase tracking-wide mb-6">Contact</h3>

            <div className="space-y-4 text-sm">
              {/* T - Phone */}
              <div className="flex items-start gap-3">
                <span className="text-slate2/70 font-medium w-4 flex-shrink-0">
                  {t.footer.contact.phoneLabel}
                </span>
                <a
                  href={studioContact.whatsappHref}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.phone}
                </a>
              </div>

              {/* M - Mobile */}
              <div className="flex items-start gap-3">
                <span className="text-slate2/70 font-medium w-4 flex-shrink-0">
                  {t.footer.contact.mobileLabel}
                </span>
                <a
                  href={`tel:${t.footer.contact.mobile.replace(/\s/g, '')}`}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.mobile}
                </a>
              </div>

              {/* E - Email */}
              <div className="flex items-start gap-3">
                <span className="text-slate2/70 font-medium w-4 flex-shrink-0">
                  {t.footer.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${t.footer.contact.email}`}
                  className="text-chalk hover:text-accent transition-colors duration-150"
                >
                  {t.footer.contact.email}
                </a>
              </div>

              {/* W - Website */}
              <div className="flex items-start gap-3">
                <span className="text-slate2/70 font-medium w-4 flex-shrink-0">
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
            <h3 className="text-xs font-semibold text-slate2 uppercase tracking-wide mb-6">Navigation</h3>

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
            <h3 className="text-xs font-semibold text-slate2 uppercase tracking-wide mb-6">Services</h3>

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
          {/* Left: Rights + Rebrand */}
          <div className="text-slate2/70">
            <p>{t.footer.rights}</p>
            <p className="text-xs mt-1">{t.footer.rebrand}</p>
          </div>

          {/* Right: Links */}
          <div className="flex gap-6 text-slate2/70">
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