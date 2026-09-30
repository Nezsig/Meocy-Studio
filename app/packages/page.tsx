import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { PackagesPage } from '../../components/PackagesPage';

export const metadata: Metadata = {
  title: 'Photography & Video Packages in Milan | MEOCY',
  description:
    'Clear photography and video packages for brands, businesses, fashion and restaurants in Milan. Final price agreed before production begins.',
  alternates: {
    canonical: 'https://meocy.com/packages',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Packages() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <PackagesPage />
      <Footer />
    </div>
  );
}
