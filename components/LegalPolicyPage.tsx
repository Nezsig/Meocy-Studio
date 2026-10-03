'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';
import { fillRefund } from '../lib/milan-shoot-config';

type PolicyKey = 'bookingPolicy' | 'cookiePolicy';

/** Booking Policy and Cookie Policy pages, styled like /privacy and /terms, in the visitor's language. */
export function LegalPolicyPage({ policy }: { policy: PolicyKey }) {
  const { t } = useLanguage();
  const legal = t?.legal ?? locales.en.legal;
  const p = legal[policy] ?? locales.en.legal[policy];
  const links =
    policy === 'bookingPolicy'
      ? [
          { href: '/terms', label: legal.bookingPolicy.termsLink },
          { href: '/privacy', label: legal.bookingPolicy.privacyLink },
        ]
      : [{ href: '/privacy', label: legal.cookiePolicy.privacyLink }];

  return (
    <main id="main-content" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">{p.title}</h1>
          <p className="mt-4 text-[14px] text-slate2">{legal.updated}</p>
          <p className="mt-8 text-[16px] leading-relaxed text-ink">{p.intro}</p>

          <div className="mt-12 space-y-8 text-[16px] leading-relaxed text-slate2">
            {p.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-semibold text-ink">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="mt-3">
                    {fillRefund(para)}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 border-t border-mist pt-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium underline decoration-accent decoration-2 underline-offset-4">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/** One extra section on /privacy or /terms about Milan photoshoot booking requests. */
export function MilanLegalSection({ page }: { page: 'privacy' | 'terms' }) {
  const { t } = useLanguage();
  const legal = t?.legal ?? locales.en.legal;
  if (page === 'privacy') {
    return (
      <section>
        <h2 className="font-semibold text-ink">{legal.milanPrivacy.title}</h2>
        <p className="mt-3">{legal.milanPrivacy.text}</p>
      </section>
    );
  }
  return (
    <section>
      <h2 className="font-semibold text-ink">{legal.milanTerms.title}</h2>
      <p className="mt-3">{fillRefund(legal.milanTerms.text)}</p>
      <Link href="/booking-policy" className="mt-2 inline-flex min-h-[44px] items-center font-medium text-ink underline decoration-accent decoration-2 underline-offset-4">
        {legal.milanTerms.link}
      </Link>
    </section>
  );
}
