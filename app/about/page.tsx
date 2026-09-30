import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { AboutPage } from '../../components/AboutPage';

export const metadata: Metadata = {
  title: 'About MEOCY — Photography & Video Studio in Milan',
  description:
    'MEOCY is a Milan-based photography and video studio founded by Chamila. Work directly with the founder from the first brief to the final delivery.',
  alternates: {
    canonical: 'https://meocy.com/about',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function About() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <AboutPage />
      <Footer />
    </div>
  );
}
