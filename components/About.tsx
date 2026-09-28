'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="about" className="bg-paper py-32 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Heading */}
        <h2 className="font-display text-[clamp(2rem,5vw,2.8rem)] leading-[1.05] tracking-tighter-display mb-12">
          {t.about.sectionHeading}
        </h2>

        {/* Bio paragraph */}
        <p className="text-[16.5px] leading-relaxed text-slate2 max-w-3xl mb-8">
          {t.about.bio}
        </p>

        {/* What I shoot tags */}
        <div className="mb-8">
          <p className="text-[15px] leading-relaxed text-slate2 max-w-3xl">
            {t.about.whatIShoots}
          </p>
        </div>

        {/* Kit line */}
        <div className="mb-12">
          <p className="text-[15px] leading-relaxed text-slate2 max-w-3xl">
            {t.about.kitLine}
          </p>
        </div>

        {/* Expandable bar */}
        <div className="border-t border-b border-mist">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 sm:py-5 flex items-center justify-between gap-3 hover:text-accent transition-colors text-left"
          >
            <span className="text-[15px] font-medium text-ink">
              {t.about.toggleLabel}
            </span>
            <div className="flex-shrink-0">
              <ChevronDown
                size={20}
                className={`text-accent transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {/* Expanded signature card - DARK BACKGROUND */}
          {isOpen && (
            <div className="overflow-hidden">
              <div className="py-8 sm:py-10 bg-ink rounded-2xl px-6 sm:px-8 mt-6">
                <div className="flex gap-6 sm:gap-8 mb-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <Image
                      src="/chamila-about.png"
                      alt={t.about.name}
                      width={110}
                      height={110}
                      className="rounded-full w-[110px] h-[110px] object-cover shadow-lg"
                    />
                  </div>

                  {/* Name and role */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl sm:text-2xl font-medium leading-tight tracking-tight text-paper">
                      {t.about.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {t.about.role}
                    </p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-2 mb-6">
                  <a
                    href={`tel:${t.about.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-[14px] text-chalk hover:text-accent transition-colors"
                  >
                    <span className="font-medium w-6 text-accent">
                      {t.about.contact.phoneLabel}
                    </span>
                    <span>{t.about.contact.phone}</span>
                  </a>

                  <a
                    href={`tel:${t.about.contact.mobile.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-[14px] text-chalk hover:text-accent transition-colors"
                  >
                    <span className="font-medium w-6 text-accent">
                      {t.about.contact.mobileLabel}
                    </span>
                    <span>{t.about.contact.mobile}</span>
                  </a>

                  <a
                    href={`mailto:${t.about.contact.email}`}
                    className="flex items-center gap-3 text-[14px] text-chalk hover:text-accent transition-colors"
                  >
                    <span className="font-medium w-6 text-accent">
                      {t.about.contact.emailLabel}
                    </span>
                    <span>{t.about.contact.email}</span>
                  </a>

                  <a
                    href={`https://${t.about.contact.website}`}
                    className="flex items-center gap-3 text-[14px] text-chalk hover:text-accent transition-colors"
                  >
                    <span className="font-medium w-6 text-accent">
                      {t.about.contact.websiteLabel}
                    </span>
                    <span>{t.about.contact.website}</span>
                  </a>
                </div>

                {/* Social icons row */}
                <div className="flex gap-4 items-center">
                  <a
                    href="https://instagram.com/chamila.it"
                    className="w-8 h-8 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/chami.eu"
                    className="w-8 h-8 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/393791051000"
                    className="w-8 h-8 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center transition-colors"
                    title="WhatsApp"
                  >
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.176c-.759.464-1.45 1.086-2.043 1.845C3.768 10.645 3.25 12.011 3.25 13.441c0 1.487.342 2.917 1.003 4.247l-1.065 3.892 3.995-1.058c1.307.708 2.794 1.085 4.327 1.085 5.433 0 9.859-4.414 9.859-9.85 0-2.631-.997-5.109-2.808-6.979a9.844 9.844 0 00-6.662-2.753" />
                    </svg>
                  </a>

                  <a
                    href="https://meocy.com"
                    className="w-8 h-8 rounded-full bg-accent/20 hover:bg-accent/40 flex items-center justify-center transition-colors"
                    title="Website"
                  >
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                </div>

                {/* Social handles line */}
                <p className="text-xs text-chalk/80 mt-4">{t.about.socialHandles}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
