'use client';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

/** One-line notice under forms that collect personal data: what it's used for + link to the Privacy Policy. Not a consent checkbox. */
export function FormPrivacyNotice({ className = '', linkClassName = '' }: { className?: string; linkClassName?: string }) {
  const { t } = useLanguage();
  const [before, after = ''] = t.legal.formNotice.split('{link}');
  return (
    <p className={className}>
      {before}
      <Link href="/privacy" className={`underline underline-offset-2 ${linkClassName}`}>
        {t.legal.footer.privacy}
      </Link>
      {after}
    </p>
  );
}
