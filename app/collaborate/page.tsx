import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { CollaboratePage } from '../../components/CollaboratePage';

export const metadata: Metadata = {
  title: 'Work With MEOCY — Models, Agencies & Creatives in Milan',
  description:
    'Models, modeling agencies, photographers and creatives: see how MEOCY collaborates in Milan and send your details.',
  alternates: {
    canonical: 'https://meocy.com/collaborate',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Collaborate() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <CollaboratePage />
      <Footer />
    </div>
  );
}
