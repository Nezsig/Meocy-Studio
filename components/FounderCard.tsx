'use client';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

// Founder signature card (email-signature style), shared by the homepage About and /about.
export function FounderCard() {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-[#ecebe6] rounded-[20px] p-8 sm:p-10">
      {/* Logo with lime underline */}
      <div className="mb-8 flex flex-col items-start">
        <img
          src="/meocy-wordmark.png"
          width={297}
          height={91}
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
          <div className="mb-5">
            <a
              href="https://wa.me/393791051000"
              className="flex items-center gap-3 py-1 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
            >
              <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                {t.about.contact.phoneLabel}
              </span>
              <span>{t.about.contact.phone}</span>
            </a>

            <a
              href={`mailto:${t.about.contact.email}`}
              className="flex items-center gap-3 py-1 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
            >
              <span className="text-[#9a998f] font-medium w-6 flex-shrink-0">
                {t.about.contact.emailLabel}
              </span>
              <span>{t.about.contact.email}</span>
            </a>

            <a
              href={`https://${t.about.contact.website}`}
              className="flex items-center gap-3 py-1 text-[14px] text-[#0b0b0c] hover:text-accent transition-colors"
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
  );
}
