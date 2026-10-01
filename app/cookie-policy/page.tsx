import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { LegalPolicyPage } from '../../components/LegalPolicyPage';

export const metadata: Metadata = {
  title: 'Cookie Policy — MEOCY',
  description: 'Cookie Policy for meocy.com: no advertising or tracking cookies; one language preference stored in your browser.',
  alternates: { canonical: 'https://meocy.com/cookie-policy' },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <LegalPolicyPage policy="cookiePolicy" />
      <Footer />
    </div>
  );
}
