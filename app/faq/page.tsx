import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { FaqPage } from '../../components/FaqPage';

export const metadata: Metadata = pageMetadata({
  path: '/faq',
  title: 'How It Works & FAQ — Photography & Video in Milan | MEOCY',
  description:
    'How a MEOCY production works, delivery times and answers to common questions about photography and video shoots in Milan.',
  indexable: true,
});

export default function Faq() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <FaqPage />
      <Footer />
    </div>
  );
}
