'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AccordionItem, fmt, formatPrice } from '../milan/parts';
import { parisCopy } from '../../data/paris';
import { trackParisBookingEvent } from '../../lib/ga-paris';
import { fillParisRefund, parisContact, parisPackages, type ParisPackageId } from '../../lib/paris-shoot-config';
import { ParisBookingFlow } from './ParisBookingFlow';

// Real Paris photographs by MEOCY Studio (originals supplied by Chamila; resized copies, metadata removed).
const PARIS = {
  eiffel: { src: '/paris/eiffel-tower-trocadero.jpg', width: 1500, height: 2000 },
  arcSunset: { src: '/paris/arc-de-triomphe-sunset.jpg', width: 1500, height: 2000 },
  arcNight: { src: '/paris/arc-de-triomphe-night.jpg', width: 1500, height: 2000 },
  seine: { src: '/paris/pont-alexandre-iii-seine.jpg', width: 1500, height: 2000 },
  eiffelGardens: { src: '/paris/eiffel-tower-gardens.jpg', width: 1500, height: 2000 },
  eiffelRain: { src: '/paris/eiffel-tower-rain.jpg', width: 1500, height: 2000 },
  reflections: { src: '/paris/pont-alexandre-iii-reflections.jpg', width: 1500, height: 2000 },
  pillars: { src: '/paris/pont-alexandre-iii-pillars.jpg', width: 1500, height: 2000 },
};

// Real MEOCY portrait / lifestyle work. NOT taken in Paris — captioned as such on the page.
const PORTRAITS = [
  { src: '/work/fashion-08.jpg', pos: '50% 30%' },
  { src: '/work/portrait-03.jpg', pos: '50% 35%' },
  { src: '/work/portrait-07.jpg', pos: '45% 40%' },
  { src: '/work/fashion-10.jpg', pos: '50% 30%' },
  { src: '/work/portrait-02.jpg', pos: '62% 40%' },
  { src: '/work/fashion-09.jpg', pos: '55% 45%' },
];

const sectionTitle = 'font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] tracking-tighter-display';
const ctaPrimary =
  'inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5';
const ctaGhostDark =
  'inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-chalk ring-1 ring-chalk/35 transition-colors hover:bg-chalk/10';
const ctaGhostLight =
  'inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink ring-1 ring-ink/25 transition-colors hover:bg-ink/5';

export function ParisPhotoshootPage() {
  const { lang } = useLanguage();
  const p = parisCopy[lang];

  const [packageId, setPackageId] = useState<ParisPackageId>('experience');
  const [packageChosen, setPackageChosen] = useState(false);

  const goToBooking = useCallback((pkg?: ParisPackageId) => {
    if (pkg) {
      setPackageId(pkg);
      setPackageChosen(true);
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main id="main-content">
      {/* 1 — HERO: real Eiffel Tower photograph (Trocadéro) + light content panel */}
      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1400px] lg:min-h-[calc(100svh-96px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10 lg:px-8 lg:py-8">
          {/* Photo — first on mobile, right on desktop */}
          <div className="relative aspect-[4/5] max-h-[72svh] w-full overflow-hidden sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:max-h-none lg:rounded-[28px]">
            <Image src={PARIS.eiffel.src} alt={p.hero.imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_42%]" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-chalk/90 px-3.5 py-2 text-[12px] font-semibold text-ink shadow-sm backdrop-blur sm:left-5 sm:top-5">
              <MapPin className="h-3.5 w-3.5 text-ink" aria-hidden />
              {p.packages.locationValue}
            </span>
            <span className="absolute bottom-3 right-4 rounded-full bg-ink/45 px-3 py-1 text-[11px] text-chalk/90 backdrop-blur">{p.hero.photoCredit}</span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-5 pb-14 pt-10 sm:px-8 lg:order-1 lg:px-0 lg:py-10">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink">
              <span className="h-[3px] w-10 rounded-full bg-accent" aria-hidden />
              {p.hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[0.98] tracking-tighter-display text-ink">{p.hero.title}</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate2 sm:text-[18px]">{p.hero.text}</p>
            <dl className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-chalk px-5 py-4 ring-1 ring-mist">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate2">{p.location.label}</dt>
                <dd className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <MapPin className="h-4 w-4 shrink-0 text-ink" aria-hidden />
                  {p.location.name}
                </dd>
              </div>
              <div className="rounded-2xl bg-chalk px-5 py-4 ring-1 ring-mist">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate2">{p.hero.datesLabel}</dt>
                <dd className="mt-1 text-[15px] font-semibold text-ink">{p.hero.datesValue}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  trackParisBookingEvent('booking_cta_click');
                  goToBooking();
                }}
                className={ctaPrimary}>
                {p.hero.ctaPrimary}
              </button>
              <a href={`https://wa.me/${parisContact.whatsappNumber}?text=${encodeURIComponent(p.hero.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className={ctaGhostLight}>
                {p.hero.ctaWhatsapp}
              </a>
            </div>
            <p className="mt-7 text-[12.5px] tracking-[0.04em] text-slate2">{p.hero.trust}</p>
          </div>
        </div>
      </section>

      {/* 2 — INTRODUCTION */}
      <section className="bg-chalk py-24 sm:py-28">
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
              <h3 className="flex items-center gap-2.5 text-[15px] font-semibold">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                {f.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate2">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — PARIS GALLERY: real Paris photographs by MEOCY */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className={sectionTitle}>{p.gallery.title}</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-slate2">{p.gallery.text}</p>
          </div>
          {/* The Eiffel Tower / Trocadéro photo leads (the product's location); other Paris photos support it. */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
            <figure className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-[16/13] lg:col-span-2 lg:row-span-2 lg:aspect-auto">
              <Image src={PARIS.eiffel.src} alt={p.hero.imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[50%_45%]" />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
              <Image src={PARIS.eiffelGardens.src} alt={p.gallery.eiffelGardens} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-[58%_40%]" />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
              <Image src={PARIS.arcSunset.src} alt={p.gallery.arcSunset} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-[50%_45%]" />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
              <Image src={PARIS.pillars.src} alt={p.gallery.pillars} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-[55%_40%]" />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
              <Image src={PARIS.arcNight.src} alt={p.gallery.arcNight} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-[50%_40%]" />
            </figure>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px] lg:aspect-auto lg:h-[440px]">
              <Image src={PARIS.seine.src} alt={p.gallery.seine} fill sizes="(min-width: 1024px) 390px, 50vw" className="object-cover object-[45%_50%]" />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-[22px] lg:col-span-2 lg:aspect-auto lg:h-[440px]">
              <Image src={PARIS.reflections.src} alt={p.gallery.reflections} fill sizes="(min-width: 1024px) 790px, 50vw" className="object-cover object-[50%_58%]" />
            </figure>
          </div>
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
                    {pk.lighting && (
                      <div>
                        <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{p.packages.statLighting}</dt>
                        <dd className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[13px] font-semibold text-ink">{p.packages.lightingValue}</span>
                        </dd>
                      </div>
                    )}
                    <div className={pk.lighting ? '' : 'col-span-2'}>
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

      {/* 5 — PORTRAIT WORK (real MEOCY portraits, clearly labelled as not taken in Paris) */}
      <section className="bg-chalk py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className={sectionTitle}>{p.work.title}</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-slate2">{p.work.caption}</p>
          </div>
          <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
            {PORTRAITS.map((photo) => (
              <li key={photo.src} className="relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden rounded-[18px] sm:w-auto">
                <Image src={photo.src} alt={p.work.alt} fill sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 62vw" className="object-cover" style={{ objectPosition: photo.pos }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — HOW IT WORKS */}
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

      {/* 7 — BOOKING REQUEST */}
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

      {/* 8 — BOOKING CONDITIONS */}
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

      {/* 9 — FAQ */}
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

      {/* 10 — FINAL CTA: real Eiffel Tower photograph (full-bleed on mobile, right-hand panel on desktop so the whole tower shows) */}
      <section className="relative isolate overflow-hidden bg-ink text-chalk">
        <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[46%]">
          <Image src={PARIS.eiffelRain.src} alt={p.gallery.eiffelRain} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover object-[50%_45%] lg:object-[50%_38%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/15 sm:from-ink/85 sm:via-ink/40 sm:to-ink/10 lg:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-ink to-transparent lg:block" />
        </div>
        <div className="mx-auto flex min-h-[72svh] max-w-[1240px] flex-col justify-end px-5 py-20 sm:px-8 sm:py-24 lg:min-h-[760px] lg:justify-center">
          <div className="lg:max-w-[52%]">
            <h2 className="max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1] tracking-tighter-display">{p.final.title}</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-chalk/85">{p.final.text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => goToBooking()} className={ctaPrimary}>
                {p.final.ctaPrimary}
              </button>
              <a href="#packages" className={ctaGhostDark}>
                {p.final.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
