import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { PrivacyPolicyPage } from '../../components/PrivacyPolicyPage';

export const metadata: Metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy — MEOCY',
  description:
    'How MEOCY Studio collects, uses and keeps personal data from project requests, collaboration forms and Milan photoshoot booking requests, and your rights under GDPR.',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <PrivacyPolicyPage />
      <Footer />
    </div>
  );
}
