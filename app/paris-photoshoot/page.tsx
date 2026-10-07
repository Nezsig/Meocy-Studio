import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { ParisPhotoshootPage } from '../../components/paris/ParisPhotoshootPage';
import { parisEn } from '../../data/paris/en';
import { parisCurrency, parisPackages } from '../../lib/paris-shoot-config';
import { organizationJsonLd, pageMetadata, SITE_URL } from '../../lib/seo';

const URL = 'https://meocy.com/paris-photoshoot';
const p = parisEn;

// Standalone landing page: not linked from the navigation or the sitemap yet.
export const metadata: Metadata = pageMetadata({
  path: '/paris-photoshoot',
  title: p.seo.title,
  description: p.seo.description,
  // Real MEOCY photo of the Eiffel Tower from Trocadéro (public/og/paris-photoshoot.jpg, 1200×630).
  image: { url: `${SITE_URL}/og/paris-photoshoot.jpg`, width: 1200, height: 630, alt: 'Eiffel Tower from Trocadéro, Paris' },
  indexable: true,
});

// Offers and provider only — no ratings or reviews.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Paris Photoshoot',
  serviceType: 'Photoshoot',
  url: URL,
  description: p.seo.description,
  areaServed: { '@type': 'City', name: 'Paris' },
  provider: organizationJsonLd,
  offers: parisPackages.map((pk) => ({
    '@type': 'Offer',
    name: p.packages[pk.id].name,
    price: pk.price.toFixed(2),
    priceCurrency: parisCurrency,
    url: `${URL}#packages`,
    description: pk.features.map((f) => p.features[f]).join(', '),
  })),
};

export default function ParisPhotoshoot() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <ParisPhotoshootPage />
      <Footer />
    </div>
  );
}
