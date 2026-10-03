import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { AboutPage } from '../../components/AboutPage';

export const metadata: Metadata = pageMetadata({
  path: '/about',
  title: 'About MEOCY — Photography & Video Studio in Milan',
  description:
    'MEOCY is a Milan-based photography and video studio founded by Chamila. Work directly with the founder from the first brief to the final delivery.',
  indexable: true,
});

export default function About() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <AboutPage />
      <Footer />
    </div>
  );
}
