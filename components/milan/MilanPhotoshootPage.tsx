'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackBookingEvent } from '../../lib/ga-booking';
import {
  milanLocations,
  milanPackages,
  milanContact,
  visibleFeatures,
  showGalleryPlaceholders,
  type MilanLocationId,
  type MilanPackageId,
  fillRefund,
} from '../../lib/milan-shoot-config';
import { AccordionItem, PhotoPlaceholder, fmt, formatPrice } from './parts';
import { LocationSelector } from './LocationSelector';
import { BookingFlow } from './BookingFlow';

const PACKAGE_IDS = milanPackages.map((p) => p.id);
const LOCATION_IDS = milanLocations.map((l) => l.id);

// Real MEOCY photographs taken in Milan (Galleria Vittorio Emanuele II and city streets).
const PHOTOS = {
  // Wide editorial band built from three real Milan portraits (no wide Milan photo exists yet).
  experienceBand: [
    { src: '/work/fashion-17.jpg', width: 1128, height: 1600 },
    { src: '/work/fashion-03.jpg', width: 1131, height: 1600 },
    { src: '/work/fashion-04.jpg', width: 1130, height: 1600 },
  ],
  why: { src: '/work/fashion-02.jpg', width: 1137, height: 1600 },
  final: { src: '/work/fashion-18.jpg', width: 1129, height: 1600 },
};
type GalleryItem =
  | { kind: 'photo'; src: string; width: number; height: number; alt: 'galleria' | 'street' }
  | { kind: 'placeholder'; id: string; ph: 'couple' | 'duomo' | 'lighting'; aspect: string };
const GALLERY: GalleryItem[] = [
  { kind: 'placeholder', id: 'gallery-couple-1', ph: 'couple', aspect: 'aspect-[4/5]' },
  { kind: 'photo', src: '/work/fashion-17.jpg', width: 1128, height: 1600, alt: 'galleria' },
  { kind: 'photo', src: '/work/fashion-03.jpg', width: 1131, height: 1600, alt: 'street' },
  { kind: 'placeholder', id: 'gallery-duomo', ph: 'duomo', aspect: 'aspect-[3/4]' },
  { kind: 'photo', src: '/work/fashion-04.jpg', width: 1130, height: 1600, alt: 'street' },
  { kind: 'photo', src: '/work/fashion-01.jpg', width: 1129, height: 1600, alt: 'galleria' },
  { kind: 'photo', src: '/work/fashion-19.jpg', width: 1127, height: 1600, alt: 'street' },
  { kind: 'placeholder', id: 'gallery-lighting', ph: 'lighting', aspect: 'aspect-[4/5]' },
  { kind: 'photo', src: '/work/fashion-05.jpg', width: 1130, height: 1600, alt: 'street' },
  { kind: 'photo', src: '/work/fashion-18.jpg', width: 1129, height: 1600, alt: 'street' },
  { kind: 'photo', src: '/work/fashion-02.jpg', width: 1137, height: 1600, alt: 'street' },
];

/** Reads `#booking?package=experience&locations=duomo,brera`. */
function parseBookingHash(hash: string): { pkg?: MilanPackageId; locs?: MilanLocationId[] } | null {
  const h = hash.replace(/^#/, '');
  if (!h.startsWith('booking')) return null;
  const params = new URLSearchParams(h.split('?')[1] ?? '');
  const pkg = params.get('package') as MilanPackageId | null;
  const locs = (params.get('locations') ?? '')
    .split(',')
    .filter((l): l is MilanLocationId => (LOCATION_IDS as string[]).includes(l));
  return { pkg: pkg && PACKAGE_IDS.includes(pkg) ? pkg : undefined, locs };
}

const sectionTitle = 'font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] tracking-tighter-display';
const ctaPrimary =
  'inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5';
const ctaGhostDark =
  'inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-chalk ring-1 ring-chalk/35 transition-colors hover:bg-chalk/10';

export function MilanPhotoshootPage() {
  const { t, lang } = useLanguage();
  const m = t.milanShoot;

  const [packageId, setPackageId] = useState<MilanPackageId>('experience');
  const [packageChosen, setPackageChosen] = useState(false);
  const [locations, setLocations] = useState<MilanLocationId[]>([]);

  // Deep link from another page or a shared URL: #booking?package=…&locations=…
  useEffect(() => {
    const parsed = parseBookingHash(window.location.hash);
    if (!parsed) return;
    if (parsed.pkg) {
      setPackageId(parsed.pkg);
      setPackageChosen(true);
    }
    if (parsed.locs?.length) setLocations(parsed.locs);
    window.setTimeout(() => document.getElementById('booking')?.scrollIntoView(), 50);
  }, []);

  const goToBooking = useCallback(
    (pkg?: MilanPackageId) => {
      const id = pkg ?? (packageChosen ? packageId : undefined);
      if (pkg) {
        setPackageId(pkg);
        setPackageChosen(true);
      }
      const params = new URLSearchParams();
      if (id) params.set('package', id);
      if (locations.length) params.set('locations', locations.join(','));
      const query = params.toString();
      window.history.replaceState(null, '', `#booking${query ? `?${query.replace(/%2C/g, ',')}` : ''}`);
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [packageChosen, packageId, locations],
  );

  return (
    <main id="main-content">
      {/* 1 — HERO */}
      <section className="relative isolate flex min-h-[clamp(520px,75vh,760px)] items-end overflow-hidden bg-ink text-chalk">
        {/* TODO: Replace /locations/duomo.jpg with real couple photo hero-couple-duomo when available. */}
        <Image
          src="/locations/duomo.jpg"
          alt="Duomo di Milano"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink/90 to-transparent" />
        <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-20 sm:px-8 sm:pb-20">
          <h1 className="max-w-4xl font-display text-[clamp(2.8rem,8.4vw,6.4rem)] leading-[0.98] tracking-tighter-display">{m.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-chalk/75 sm:text-[18px]">{m.hero.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                trackBookingEvent('booking_cta_click');
                goToBooking();
              }}
              className={ctaPrimary}>
              {m.hero.ctaPrimary}
            </button>
            <a href={`https://wa.me/${milanContact.whatsappNumber}?text=${encodeURIComponent(m.hero.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className={ctaGhostDark}>
              {m.hero.ctaWhatsapp}
            </a>
          </div>
          <p className="mt-8 text-[12.5px] tracking-[0.04em] text-chalk/55">{m.hero.trust}</p>
        </div>
      </section>

      {/* 2 — INTRODUCTION */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <h2 className={sectionTitle}>{m.intro.title}</h2>
          <div>
            <p className="text-[19px] leading-relaxed text-ink">{m.intro.text1}</p>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate2">{m.intro.text2}</p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1240px] gap-px overflow-hidden px-5 sm:px-8 md:grid-cols-3">
          {m.intro.features.map((f) => (
            <div key={f.t} className="border-t border-ink/15 pt-6 md:pr-8">
              <h3 className="text-[15px] font-semibold">{f.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate2">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — PHOTO EXPERIENCE */}
      <section className="bg-ink text-chalk">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
          {PHOTOS.experienceBand.map((photo, i) => (
            <div key={photo.src} className={`relative aspect-[4/5] sm:aspect-[3/4] ${i > 0 ? 'hidden sm:block' : ''}`}>
              <Image
                src={photo.src}
                alt={i === 0 ? m.alt.experience : m.alt.street}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
            <h2 className={sectionTitle}>{m.experience.title}</h2>
            <div>
              <p className="text-[17px] leading-relaxed text-chalk/75">{m.experience.text}</p>
              <p className="mt-3 text-[14px] text-chalk/50">{m.experience.note}</p>
            </div>
          </div>
          <ul tabIndex={0} aria-label={m.experience.title} className="-mx-5 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
            {milanLocations.map((loc) => (
              <li key={loc.id} className="w-[72%] shrink-0 snap-start border-t border-chalk/20 pt-4 sm:w-auto">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em]">{m.locations[loc.id].name}</p>
                <p className="mt-1.5 text-[14px] text-chalk/60">{m.locations[loc.id].desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — PACKAGES */}
      <section id="packages" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className={sectionTitle}>{m.packages.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate2">{m.packages.text}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {milanPackages.map((p, i) => {
              const text = m.packages[p.id];
              const dark = p.id === 'signature';
              const lighting = p.id === 'experience' ? m.packages.lightingAd300 : p.id === 'signature' ? m.packages.lightingAd600Ad300 : null;
              const muted = dark ? 'text-chalk/55' : 'text-slate2';
              return (
                <article
                  key={p.id}
                  className={`relative flex flex-col rounded-[22px] p-7 sm:p-9 ${
                    dark ? 'bg-ink text-chalk' : p.popular ? 'bg-chalk text-ink ring-2 ring-ink' : 'bg-chalk text-ink ring-1 ring-mist'
                  }`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[11.5px] font-semibold uppercase tracking-[0.18em] ${muted}`}>
                      {m.packages.label} {String(i + 1).padStart(2, '0')}
                    </span>
                    {p.popular && (
                      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/30" />
                        {m.packages.popular}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-[22px] font-semibold uppercase tracking-[0.08em]">{text.name}</h3>
                  <p className={`mt-4 font-display text-[clamp(3.6rem,8vw,4.6rem)] leading-none tracking-tighter-display ${dark ? 'text-accent' : ''}`}>
                    {formatPrice(p.price, lang)}
                  </p>

                  <dl className={`mt-7 grid grid-cols-2 gap-x-4 gap-y-4 border-y py-5 ${dark ? 'border-chalk/15' : 'border-mist'}`}>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.statTime}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">{text.duration}</dd>
                    </div>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.statPhotos}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">{fmt(m.packages.photosValue, { n: p.photos })}</dd>
                    </div>
                    <div>
                      <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.statLocations}</dt>
                      <dd className="mt-1 text-[15px] font-semibold">
                        {fmt(p.extraLocationPrice !== null ? m.packages.locationsIncluded : m.packages.locationsUpTo, { n: p.includedLocations })}
                      </dd>
                    </div>
                    {lighting && (
                      <div>
                        <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.statLighting}</dt>
                        <dd className="mt-1 text-[15px] font-semibold">{lighting}</dd>
                      </div>
                    )}
                  </dl>

                  <p className={`mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.includes}</p>
                  <ul className="mt-3 space-y-2.5">
                    {visibleFeatures(p).map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14.5px] leading-snug">
                        <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                        </span>
                        {m.features[f]}
                      </li>
                    ))}
                  </ul>

                  {p.id === 'memory' && (
                    <p className={`mt-6 rounded-xl px-4 py-3 text-[13.5px] ${dark ? 'bg-chalk/10' : 'bg-paper'}`}>
                      <span className={`block text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>{m.packages.recommendedLabel}</span>
                      <span className="mt-1 block font-medium">{m.packages.recommended}</span>
                    </p>
                  )}
                  {p.id === 'signature' && (
                    <p className="mt-6 rounded-xl bg-chalk/10 px-4 py-3 text-[13.5px]">
                      <span className="block font-medium">{m.packages.signatureIncluded}</span>
                      <span className="mt-0.5 block text-chalk/70">{m.packages.signatureExtra}</span>
                    </p>
                  )}

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => goToBooking(p.id)}
                      className={`flex min-h-[52px] w-full items-center justify-center rounded-full px-6 text-center text-[12.5px] font-semibold uppercase tracking-[0.1em] transition-transform duration-150 ease-smooth hover:-translate-y-0.5 ${
                        dark || p.popular ? 'bg-accent text-ink' : 'bg-ink text-chalk'
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

      {/* 5 — LOCATION SELECTION */}
      <section id="locations" className="scroll-mt-20 border-t border-mist bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className={sectionTitle}>{m.selector.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate2">{m.selector.text}</p>
          </div>
          <div className="mt-12">
            <LocationSelector
              packageId={packageId}
              onPackageChange={(id) => {
                setPackageId(id);
                setPackageChosen(true);
              }}
              selected={locations}
              onSelectedChange={setLocations}
              onContinue={() => goToBooking(packageId)}
            />
          </div>
        </div>
      </section>

      {/* 6 — WHY BOOK WITH MEOCY */}
      <section className="bg-chalk py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
            <Image src={PHOTOS.why.src} alt={m.alt.why} fill sizes="(min-width: 1240px) 498px, (min-width: 1024px) calc((100vw - 144px) * 0.45), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" className="object-cover" />
          </div>
          <div>
            <h2 className={sectionTitle}>{m.why.title}</h2>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {m.why.items.map((item) => (
                <div key={item.t} className="border-t border-ink/15 pt-5">
                  <h3 className="text-[15.5px] font-semibold">{item.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate2">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 — HOW IT WORKS */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className={`${sectionTitle} max-w-3xl`}>{m.how.title}</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] bg-mist ring-1 ring-mist md:grid-cols-2 lg:grid-cols-4">
            {m.how.steps.map((step, i) => (
              <li key={step.t} className="flex flex-col bg-chalk p-7 sm:p-8">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-slate2">
                  {m.how.stepLabel} {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-[1.85rem] leading-[1.08] tracking-tighter-display">{step.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate2">{step.d}</p>
                {i === 3 && <p className="mt-3 text-[14px] leading-relaxed text-ink">{m.how.afterPayment}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-[14px] text-slate2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {m.how.note}
          </p>
        </div>
      </section>

      {/* 8 — BOOKING: multi-step booking request flow */}
      <section id="booking" className="relative scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1240px] rounded-[28px] bg-ink px-5 py-12 text-chalk sm:px-12 sm:py-16">
          <h2 className={`${sectionTitle} max-w-3xl`}>{m.booking.title}</h2>
          <p className="mt-4 max-w-2xl text-[17px] text-chalk/70">{m.booking.subtitle}</p>
          <div className="mt-10">
            <BookingFlow
              packageId={packageChosen ? packageId : null}
              onPackageChange={(id) => {
                setPackageId(id);
                setPackageChosen(true);
              }}
              locations={locations}
              onLocationsChange={setLocations}
            />
          </div>
        </div>
      </section>

      {/* 9 — BOOKING POLICY */}
      <section id="booking-policy" className="scroll-mt-20 border-t border-mist py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h2 className={sectionTitle}>{m.policy.title}</h2>
          <div>
            <ul className="divide-y divide-mist border-y border-mist">
              {m.policy.lines.map((line) => (
                <li key={line} className="py-4 text-[16px] leading-relaxed">
                  {fillRefund(line)}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-6">
              <Link href="/booking-policy" className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium underline decoration-accent decoration-2 underline-offset-4">
                {m.policy.fullPolicyLink}
              </Link>
              <Link href="/terms" className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium underline decoration-accent decoration-2 underline-offset-4">
              {m.policy.termsLink}
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — GALLERY */}
      <section id="gallery" className="scroll-mt-20 bg-ink py-24 text-chalk sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className={sectionTitle}>{m.gallery.title}</h2>
          <div role="region" tabIndex={0} aria-label={m.gallery.title} className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:block md:columns-2 md:gap-4 md:space-y-4 md:overflow-visible md:px-0 lg:columns-3 [&::-webkit-scrollbar]:hidden">
            {GALLERY.filter((item) => showGalleryPlaceholders || item.kind === 'photo').map((item, i) => (
              <figure key={i} className="w-[78%] shrink-0 snap-center break-inside-avoid overflow-hidden rounded-2xl md:w-auto">
                {item.kind === 'photo' ? (
                  <Image
                    src={item.src}
                    alt={m.alt[item.alt]}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    sizes="(min-width: 1240px) 381px, (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 768px) calc((100vw - 80px) / 2), 78vw"
                    className="h-auto w-full transition-transform duration-700 ease-smooth md:hover:scale-[1.03]"
                  />
                ) : (
                  <PhotoPlaceholder id={item.id} label={m.ph.label} description={m.ph[item.ph]} className={`w-full ${item.aspect}`} />
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto max-w-[780px] px-5 sm:px-8">
          <h2 className={sectionTitle}>{m.faq.title}</h2>
          <div className="mt-10 border-t border-mist">
            {m.faq.items.map((item, i) => (
              <AccordionItem key={i} id={`milan-faq-${i}`} question={item.q} answer={fillRefund(item.a)} />
            ))}
          </div>
        </div>
      </section>

      {/* 12 — FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-ink text-chalk">
        <Image src={PHOTOS.final.src} alt={m.alt.final} fill sizes="100vw" className="-z-10 object-cover object-[50%_35%]" />
        <div className="absolute inset-0 -z-10 bg-ink/65" />
        <div className="mx-auto flex min-h-[78svh] max-w-[1240px] flex-col justify-end px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[1] tracking-tighter-display">{m.final.title}</h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-chalk/75">{m.final.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => goToBooking()} className={ctaPrimary}>
              {m.final.ctaPrimary}
            </button>
            <a href="#packages" className={ctaGhostDark}>
              {m.final.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
