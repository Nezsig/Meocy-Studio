'use client';
import React from 'react';
import { X, Mail, Phone, Globe, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5">
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 text-ink hover:opacity-60 transition-opacity"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-12">
          {/* Header with photo and name */}
          <div className="flex gap-6 items-start mb-8">
            <div className="flex-shrink-0">
              <Image
                src="/chamila-about.png"
                alt="Chamila Prasanna"
                width={120}
                height={120}
                className="rounded-full w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl sm:text-3xl font-medium leading-tight tracking-tight">
                {t.about.heading}
              </h2>
              <p className="mt-1 text-sm font-medium text-accent tracking-wide">
                {t.about.role}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[15.5px] leading-relaxed text-slate2 mb-8">
            {t.about.body}
          </p>

          {/* What I shoot */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-ink mb-3">What I shoot</h3>
            <p className="text-[14px] leading-relaxed text-slate2">
              {t.about.whatIShoots}
            </p>
          </div>

          {/* Kit line */}
          <div className="mb-8">
            <p className="text-[14px] leading-relaxed text-slate2">
              {t.about.kitLine}
            </p>
          </div>

          {/* Contact block */}
          <div className="border-t border-mist pt-8">
            <h3 className="text-sm font-semibold text-ink mb-4">Get in touch</h3>
            <div className="space-y-3">
              {/* Phone */}
              <a
                href={`tel:${t.about.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Phone size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.phone}</span>
              </a>

              {/* Mobile */}
              <a
                href={`tel:${t.about.contact.mobile.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Phone size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.mobile}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${t.about.contact.email}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Mail size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.email}</span>
              </a>

              {/* Website */}
              <a
                href={`https://${t.about.contact.website}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Globe size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.website}</span>
              </a>

              {/* Instagram 1 */}
              <a
                href={`https://instagram.com/${t.about.contact.instagram1.replace('@', '')}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Instagram size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.instagram1}</span>
              </a>

              {/* Instagram 2 */}
              <a
                href={`https://instagram.com/${t.about.contact.instagram2.replace('@', '')}`}
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Instagram size={16} className="flex-shrink-0 text-accent" />
                <span>{t.about.contact.instagram2}</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/393791051000"
                className="flex items-center gap-3 text-[14px] text-slate2 hover:text-ink transition-colors"
              >
                <Globe size={16} className="flex-shrink-0 text-accent" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
