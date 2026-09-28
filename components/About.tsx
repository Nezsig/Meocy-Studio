'use client';
import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-paper py-32 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-sm lg:max-w-full">
              <Image
                src="/chamila-about.png"
                alt="Chamila Prasanna"
                width={480}
                height={480}
                priority
                className="rounded-3xl w-full aspect-square object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-start gap-6">
            <div>
              <h2 className="font-display text-[clamp(2rem,5vw,2.8rem)] leading-[1.05] tracking-tighter-display">
                {t.about.heading}
              </h2>
              <p className="mt-2 text-[15px] font-medium text-accent tracking-wide">
                {t.about.role}
              </p>
            </div>

            <p className="text-[16.5px] leading-relaxed text-slate2 max-w-md">
              {t.about.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
