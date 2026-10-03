'use client';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';

// Privacy Policy paragraph about the /collaborate forms, shown in the visitor's language.
export function PrivacyCollabSection() {
  const { t } = useLanguage();
  const p = { ...locales.en.privacyCollab, ...(t?.privacyCollab ?? {}) };
  const crew = { ...locales.en.privacyCrew, ...(t?.privacyCrew ?? {}) };

  return (
    <>
      <section>
        <h2 className="font-semibold text-ink">{p.title}</h2>
        <p className="mt-3">{p.text}</p>
      </section>
      <section>
        <h2 className="font-semibold text-ink">{crew.title}</h2>
        <p className="mt-3">{crew.text}</p>
      </section>
    </>
  );
}
