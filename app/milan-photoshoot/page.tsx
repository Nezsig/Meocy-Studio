import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { MilanPhotoshootPage } from '../../components/milan/MilanPhotoshootPage';
import { en } from '../../data/locales/en';
import { currency, milanPackages, visibleFeatures } from '../../lib/milan-shoot-config';
import { organizationJsonLd } from '../../lib/seo';

const URL = 'https://meocy.com/milan-photoshoot';
const m = en.milanShoot;

export const metadata: Metadata = {
  title: m.seo.title,
  description: m.seo.description,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    url: URL,
    type: 'website',
    title: m.seo.title,
    description: m.seo.description,
    locale: 'en_US',
    alternateLocale: ['it_IT', 'fr_FR'],
    images: [{ url: 'https://meocy.com/og-image.png', width: 1200, height: 630, alt: m.seo.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: m.seo.title,
    description: m.seo.description,
    images: ['https://meocy.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Offers and provider only — no ratings or reviews.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Milan Photoshoot',
  serviceType: 'Couple photoshoot',
  url: URL,
  description: m.seo.description,
  areaServed: { '@type': 'City', name: 'Milan' },
  provider: organizationJsonLd,
  offers: milanPackages.map((p) => ({
    '@type': 'Offer',
    name: m.packages[p.id].name,
    price: p.price.toFixed(2),
    priceCurrency: currency,
    url: `${URL}#packages`,
    description: visibleFeatures(p).map((f) => m.features[f]).join(', '),
  })),
};

export default function MilanPhotoshoot() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <MilanPhotoshootPage />
      <Footer />
    </div>
  );
}
