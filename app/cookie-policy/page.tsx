import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { LegalPolicyPage } from '../../components/LegalPolicyPage';

export const metadata: Metadata = pageMetadata({
  path: '/cookie-policy',
  title: 'Cookie Policy — MEOCY',
  description:
    'Cookie Policy for meocy.com: no advertising or tracking cookies; one language preference stored in your browser.',
});

export default function CookiePolicy() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <LegalPolicyPage policy="cookiePolicy" />
      <Footer />
    </div>
  );
}
