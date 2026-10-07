'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AccordionItem, fmt, formatPrice } from '../milan/parts';
import { parisCopy } from '../../data/paris';
import { trackParisBookingEvent } from '../../lib/ga-paris';
import { fillParisRefund, parisContact, parisPackages, upcomingParisShootDays, type ParisPackageId } from '../../lib/paris-shoot-config';
import { ParisBookingFlow } from './ParisBookingFlow';

// No Paris photographs exist yet: the hero is typographic, and the portrait strip shows real MEOCY
// portrait work, captioned as taken in Milan. Replace with real Eiffel Tower photos when available.
const PORTRAITS = [
  { src: '/work/fashion-05.jpg', width: 1130, height: 1600 },
  { src: '/work/fashion-19.jpg', width: 1127, height: 1600 },
  { src: '/work/fashion-01.jpg', width: 1129, height: 1600 },
];
const INTL_LOCALE = { en: 'en-GB', it: 'it-IT', fr: 'fr-FR' } as const;

const sectionTitle = 'font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] tracking-tighter-display';
const ctaPrimary =
  'inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5';
const ctaGhostDark =
  'inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-chalk ring-1 ring-chalk/35 transition-colors hover:bg-chalk/10';

export function ParisPhotoshootPage() {
  const { lang } = useLanguage();
  const p = parisCopy[lang];

  const [packageId, setPackageId] = useState<ParisPackageId>('experience');
  const [packageChosen, setPackageChosen] = useState(false);

  // The shoot-day date is formatted in the browser only: server and browser Intl output can differ slightly
  // ("Saturday, 14 November" vs "Saturday 14 November"), which would break hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // The page is pre-rendered at build time, so "upcoming" is also decided in the browser.
  const nextDay = mounted ? upcomingParisShootDays()[0] : undefined;
  const shootDay = !mounted
    ? '\u00a0'
    : nextDay
      ? new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${nextDay.date}T00:00:00Z`))
      : p.hero.shootDayTba;

  const goToBooking = useCallback((pkg?: ParisPackageId) => {
    if (pkg) {
      setPackageId(pkg);
      setPackageChosen(true);
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main id="main-content">
      {/* 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-chalk">
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="mx-auto flex min-h-[clamp(520px,75vh,760px)] w-full max-w-[1240px] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-20">
          <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden />
            {p.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,8.4vw,6.4rem)] leading-[0.98] tracking-tighter-display">{p.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-chalk/75 sm:text-[18px]">{p.hero.text}</p>
          <dl className="mt-8 grid max-w-2xl gap-px overflow-hidden rounded-2xl bg-chalk/15 ring-1 ring-chalk/15 sm:grid-cols-2">
            <div className="bg-ink px-5 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk/55">{p.location.label}</dt>
              <dd className="mt-1 flex items-center gap-2 text-[15px] font-semibold">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {p.location.name}
              </dd>
            </div>
            <div className="bg-ink px-5 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk/55">{p.hero.shootDayLabel}</dt>
              <dd className="mt-1 text-[15px] font-semibold" data-testid="paris-shoot-day">{shootDay}</dd>
            </div>
          </dl>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                trackParisBookingEvent('booking_cta_click');
                goToBooking();
              }}
              className={ctaPrimary}>
              {p.hero.ctaPrimary}
            </button>
            <a href={`https://wa.me/${parisContact.whatsappNumber}?text=${encodeURIComponent(p.hero.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className={ctaGhostDark}>
              {p.hero.ctaWhatsapp}
            </a>
          </div>
          <p className="mt-8 text-[12.5px] tracking-[0.04em] text-chalk/55">{p.hero.trust}</p>
        </div>
      </section>

      {/* 2 — INTRODUCTION */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <h2 className={sectionTitle}>{p.intro.title}</h2>
          <div>
            <p className="text-[19px] leading-relaxed text-ink">{p.intro.text1}</p>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate2">{p.intro.text2}</p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1240px] gap-px overflow-hidden px-5 sm:px-8 md:grid-cols-3">
          {p.intro.features.map((f) => (
            <div key={f.t} className="border-t border-ink/15 pt-6 md:pr-8">
              <h3 className="text-[15px] font-semibold">{f.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate2">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — MEOCY PORTRAIT WORK (captioned as Milan) */}
      <section className="bg-ink text-chalk">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
          {PORTRAITS.map((photo, i) => (
            <div key={photo.src} className={`relative aspect-[4/5] sm:aspect-[3/4] ${i > 0 ? 'hidden sm:block' : ''}`}>
              <Image src={photo.src} alt={p.work.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.05] tracking-tighter-display">{p.work.title}</h2>
          <p className="text-[14px] text-chalk/60">{p.work.caption}</p>
        </div>
      </section>

      {/* 4 — PACKAGES */}
      <section id="packages" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className={sectionTitle}>{p.packages.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate2">{p.packages.text}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {parisPackages.map((pk, i) => {
              const text = p.packages[pk.id];
              const dark = pk.id === 'signature';
              const muted = dark ? 'text-chalk/55' : 'text-slate2';
              return (
                <article
                  key={pk.id}
                  className={`relative flex flex-col rounded-[22px] p-7 sm:p-9 ${
                    dark ? 'bg-ink text-chalk' : pk.popular ? 'bg-chalk text-ink ring-2 ring-ink' : 'bg-chalk text-ink ring-1 ring-mist'
                  }`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[11.5px] font-semibold uppercase tracking-[0.18em] ${muted}`}>
                      {p.packages.label} {String(i + 1).padStart(2, '0')}
                    </span>
                    {pk.popular && (
                      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/30" />
                        {p.packages.popular}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-[22px] font-semibold uppercase tracking-[0.08em]">{text.name}</h3>
                  <p className={`mt-4 font-display text-[clamp(3.6rem,8vw,4.6rem)] leading-none tracking-tighter-display ${dark ? 'text-accent' : ''}`}>
                    {formatPrice(pk.price, lang)}
                  </p>

                  <dl className={`mt-7 grid grid-cols-2 gap-x-4 gap-y-4 border-y py-5 ${dark ? 'border-chalk/15' : 'border-mist'}`}>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{p.packages.statTime}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">{text.duration}</dd>
                    </div>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{p.packages.statPhotos}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">{fmt(p.packages.photosValue, { n: pk.photos })}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{p.packages.statLocation}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">{p.packages.locationValue}</dd>
                    </div>
                  </dl>

                  <p className={`mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{p.packages.includes}</p>
                  <ul className="mt-3 space-y-2.5">
                    {pk.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                        </span>
                        {p.features[f]}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => goToBooking(pk.id)}
                      className={`flex min-h-[52px] w-full items-center justify-center rounded-full px-6 text-center text-[12.5px] font-semibold uppercase tracking-[0.1em] transition-transform duration-150 ease-smooth hover:-translate-y-0.5 ${
                        dark || pk.popular ? 'bg-accent text-ink' : 'bg-ink text-chalk'
                      }`}>
                      {text.cta}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — HOW IT WORKS */}
      <section className="border-t border-mist bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className={`${sectionTitle} max-w-3xl`}>{p.how.title}</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] bg-mist ring-1 ring-mist md:grid-cols-2 lg:grid-cols-4">
            {p.how.steps.map((step, i) => (
              <li key={step.t} className="flex flex-col bg-chalk p-7 sm:p-8">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-slate2">
                  {p.how.stepLabel} {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-[1.85rem] leading-[1.08] tracking-tighter-display">{step.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate2">{step.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-[14px] text-slate2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {p.how.note}
          </p>
        </div>
      </section>

      {/* 6 — BOOKING REQUEST */}
      <section id="booking" className="relative scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1240px] rounded-[28px] bg-ink px-5 py-12 text-chalk sm:px-12 sm:py-16">
          <h2 className={`${sectionTitle} max-w-3xl`}>{p.booking.title}</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-chalk/70">{p.booking.subtitle}</p>
          <div className="mt-10">
            <ParisBookingFlow
              packageId={packageChosen ? packageId : null}
              onPackageChange={(id) => {
                setPackageId(id);
                setPackageChosen(true);
              }}
            />
          </div>
        </div>
      </section>

      {/* 7 — BOOKING CONDITIONS */}
      <section id="booking-conditions" className="scroll-mt-20 border-t border-mist py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h2 className={sectionTitle}>{p.policy.title}</h2>
          <div>
            <ul className="divide-y divide-mist border-y border-mist">
              {p.policy.lines.map((line) => (
                <li key={line} className="py-4 text-[16px] leading-relaxed">
                  {fillParisRefund(line)}
                </li>
              ))}
            </ul>
            <Link href="/terms" className="mt-4 inline-flex min-h-[44px] items-center text-[14.5px] font-medium underline decoration-accent decoration-2 underline-offset-4">
              {p.policy.termsLink}
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section id="faq" className="scroll-mt-20 bg-chalk py-24 sm:py-32">
        <div className="mx-auto max-w-[780px] px-5 sm:px-8">
          <h2 className={sectionTitle}>{p.faq.title}</h2>
          <div className="mt-10 border-t border-mist">
            {p.faq.items.map((item, i) => (
              <AccordionItem key={i} id={`paris-faq-${i}`} question={item.q} answer={fillParisRefund(item.a)} />
            ))}
          </div>
        </div>
      </section>

      {/* 9 — FINAL CTA */}
      <section className="bg-ink text-chalk">
        <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-24 sm:px-8 sm:py-32">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[1] tracking-tighter-display">{p.final.title}</h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-chalk/75">{p.final.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => goToBooking()} className={ctaPrimary}>
              {p.final.ctaPrimary}
            </button>
            <a href="#packages" className={ctaGhostDark}>
              {p.final.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
