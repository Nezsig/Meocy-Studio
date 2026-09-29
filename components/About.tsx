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

        {/* Bio paragraph - darker text for readability */}
        <p className="text-[16.5px] leading-relaxed text-[#3a3a38] max-w-3xl mb-8">
          {t.about.bio}
        </p>

        {/* What I shoot tags */}
        <div className="mb-8">
          <p className="text-[15px] leading-relaxed text-[#3a3a38] max-w-3xl">
            {t.about.whatIShoots}
          </p>
        </div>

        {/* Kit line */}
        <div className="mb-12">
          <p className="text-[15px] leading-relaxed text-[#3a3a38] max-w-3xl">
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

          {/* Expanded signature card - WHITE BACKGROUND with email signature style */}
          {isOpen && (
            <div className="overflow-hidden">
              <div className="py-8 px-6 sm:px-8">
                <div className="bg-white border border-[#ecebe6] rounded-[20px] p-8 sm:p-10">
                  {/* Logo with lime underline */}
                  <div className="mb-8 flex flex-col items-start">
                    <img
                      src="/meocy-wordmark.png"
                      alt="MEOCY"
                      className="h-12 w-auto object-contain mb-3"
                    />
                    <div className="h-1 w-11 bg-accent rounded-full" />
                  </div>

                  {/* Two-column layout: photo left, details right */}
                  <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6 sm:gap-8">
                    {/* Photo - larger, rounded 16px */}
                    <div className="flex-shrink-0">
                      <Image
                        src="/chamila-about.jpg"
                        alt={t.about.name}
                        width={160}
                        height={160}
                        className="rounded-2xl w-[160px] h-[160px] object-cover"
                      />
                    </div>

                    {/* Details column */}
                    <div className="flex flex-col">
                      {/* Name - bold, dark text */}
                      <h3 className="text-[22px] font-semibold text-[#0b0b0c] leading-tight mb-1">
                        {t.about.name}
                      </h3>
                      {/* Role - muted gray, NOT lime */}
                      <p className="text-[14px] text-[#6b6a66] mb-5">
                        {t.about.role}
                      </p>

                      {/* Contact info rows */}
                      <div className="space-y-2 mb-5">
                        <a
                          href="https://wa.me/393791051000"
                          className="flex items-center gap-3 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
                        >
                          <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                            {t.about.contact.phoneLabel}
                          </span>
                          <span>{t.about.contact.phone}</span>
                        </a>

                        <a
                          href={`tel:${t.about.contact.mobile.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
                        >
                          <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                            {t.about.contact.mobileLabel}
                          </span>
                          <span>{t.about.contact.mobile}</span>
                        </a>

                        <a
                          href={`mailto:${t.about.contact.email}`}
                          className="flex items-center gap-3 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
                        >
                          <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                            {t.about.contact.emailLabel}
                          </span>
                          <span>{t.about.contact.email}</span>
                        </a>

                        <a
                          href={`https://${t.about.contact.website}`}
                          className="flex items-center gap-3 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
                        >
                          <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                            {t.about.contact.websiteLabel}
                          </span>
                          <span className="font-medium">{t.about.contact.website}</span>
                        </a>
                      </div>

                      {/* Social icons row - 36px circles with hosted PNGs */}
                      <div className="flex gap-3 items-center mb-3">
                        <a
                          href="https://instagram.com/chamila.it"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#0b0b0c]/10 hover:bg-accent transition-all"
                          title="Instagram @chamila.it"
                        >
                          <Image src="/ic-instagram.png" alt="Instagram @chamila.it" width={20} height={20} className="object-contain" />
                        </a>

                        <a
                          href="https://instagram.com/chami.eu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#0b0b0c]/10 hover:bg-accent transition-all"
                          title="Instagram @chami.eu"
                        >
                          <Image src="/ic-instagram.png" alt="Instagram @chami.eu" width={20} height={20} className="object-contain" />
                        </a>

                        <a
                          href="https://wa.me/393791051000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#0b0b0c]/10 hover:bg-accent transition-all"
                          title="WhatsApp"
                        >
                          <Image src="/ic-whatsapp.png" alt="WhatsApp" width={20} height={20} className="object-contain" />
                        </a>

                        <a
                          href="https://meocy.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#0b0b0c]/10 hover:bg-accent transition-all"
                          title="Website"
                        >
                          <Image src="/ic-web.png" alt="Website" width={20} height={20} className="object-contain" />
                        </a>
                      </div>

                      {/* Social handles line */}
                      <p className="text-[13px] text-[#9a998f]">{t.about.socialHandles}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
