import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { PackagesPage } from '../../components/PackagesPage';

export const metadata: Metadata = pageMetadata({
  path: '/packages',
  title: 'Photography & Video Packages in Milan | MEOCY',
  description:
    'Clear photography and video packages for brands, businesses, fashion and restaurants in Milan. Final price agreed before production begins.',
  indexable: true,
});

export default function Packages() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <PackagesPage />
      <Footer />
    </div>
  );
}
