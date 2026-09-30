import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { WorkGallery } from '../../components/WorkGallery';

export const metadata: Metadata = {
  title: 'Selected Work — Photography & Video in Milan | MEOCY',
  description:
    'A selection of photography and video created for brands, businesses, fashion, products and people in Milan.',
  alternates: {
    canonical: 'https://meocy.com/work',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WorkPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <WorkGallery />
      <Footer />
    </div>
  );
}
