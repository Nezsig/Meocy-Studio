import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { MilanPhotoshootPage } from '../../components/milan/MilanPhotoshootPage';
import { en } from '../../data/locales/en';
import { currency, milanPackages, visibleFeatures } from '../../lib/milan-shoot-config';
import { organizationJsonLd, pageMetadata, SOCIAL_IMAGES } from '../../lib/seo';

const URL = 'https://meocy.com/milan-photoshoot';
const m = en.milanShoot;

export const metadata: Metadata = pageMetadata({
  path: '/milan-photoshoot',
  title: m.seo.title,
  description: m.seo.description,
  image: SOCIAL_IMAGES.milan,
  indexable: true,
});

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
