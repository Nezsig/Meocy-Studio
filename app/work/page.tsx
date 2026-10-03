import { Metadata } from 'next';
import { pageMetadata, SOCIAL_IMAGES } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { WorkGallery } from '../../components/WorkGallery';

export const metadata: Metadata = pageMetadata({
  path: '/work',
  title: 'Selected Work — Photography & Video in Milan | MEOCY',
  description:
    'A selection of photography and video created for brands, businesses, fashion, products and people in Milan.',
  image: SOCIAL_IMAGES.work,
  indexable: true,
});

export default function WorkPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <WorkGallery />
      <Footer />
    </div>
  );
}
