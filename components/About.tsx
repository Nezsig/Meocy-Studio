'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FounderCard } from './FounderCard';

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
                <FounderCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
