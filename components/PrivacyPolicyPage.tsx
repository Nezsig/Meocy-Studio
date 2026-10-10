'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';
import { PrivacyCollabSection } from './PrivacyCollabSection';
import { MilanLegalSection } from './LegalPolicyPage';

function withCookieLink(text: string, label: string) {
  const [before, after] = text.split('{link}');
  return (
    <>
      {before}
      <Link href="/cookie-policy" className="underline underline-offset-2">
        {label}
      </Link>
      {after}
    </>
  );
}

/** Privacy Policy page body, shown in the visitor's language. Markup matches the previous English page. */
export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const c = { ...locales.en.privacyPage, ...(t?.privacyPage ?? {}) };
  const updated = t?.legal?.updated ?? locales.en.legal.updated;
  const cookieLabel = c.cookieLinkLabel;

  return (
    <main id="main-content" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {c.title}
          </h1>
          <p className="mt-4 text-[14px] text-slate2">{updated}</p>

          <div className="mt-12 space-y-8 text-[16px] leading-relaxed text-slate2">
            {c.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-semibold text-ink">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="mt-3">
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <PrivacyCollabSection />

            <MilanLegalSection page="privacy" />

            <section>
              <h2 className="font-semibold text-ink">{c.legalBasisTitle}</h2>
              <p className="mt-3">{c.legalBasisText}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.processorsTitle}</h2>
              <p className="mt-3">{c.processorsText}</p>
              <p className="mt-3">{withCookieLink(c.analyticsText, cookieLabel)}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.technicalTitle}</h2>
              <p className="mt-3">{c.technicalText}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.retentionTitle}</h2>
              <p className="mt-3">{withCookieLink(c.retentionText, cookieLabel)}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.rightsTitle}</h2>
              <p className="mt-3">{c.rightsText}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.cookiesTitle}</h2>
              <p className="mt-3">{c.cookiesText}</p>
              <p className="mt-3">{withCookieLink(c.cookiesText2, cookieLabel)}</p>
            </section>

            <section>
              <h2 className="font-semibold text-ink">{c.changesTitle}</h2>
              <p className="mt-3">{c.changesText}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
