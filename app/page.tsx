import type { Metadata } from 'next';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { Equipment } from '../components/Equipment';
import { WorkTeaser } from '../components/WorkTeaser';
import { PackagesTeaser } from '../components/PackagesTeaser';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { organizationJsonLd, pageMetadata, websiteJsonLd } from '../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'MEOCY — Photo & Video Studio in Milan',
  description:
    'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
});

const jsonLd = { '@context': 'https://schema.org', '@graph': [organizationJsonLd, websiteJsonLd] };

export default function Page() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <main className="pt-0">
        <Hero />
        <WorkTeaser />
        <PackagesTeaser />
        <Process />
        <Testimonials />
        <Equipment />
      </main>
      <Footer />
    </div>
  );
}
