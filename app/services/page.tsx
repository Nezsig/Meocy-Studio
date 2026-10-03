import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { ServicesPage } from '../../components/ServicesPage';

export const metadata: Metadata = pageMetadata({
  path: '/services',
  title: 'Photography & Video Services in Milan | MEOCY',
  description:
    'Fashion, commercial, product, restaurant and social media photography and video for brands, businesses, models and people in Milan.',
  indexable: true,
});

export default function Services() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <ServicesPage />
      <Footer />
    </div>
  );
}
