import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { CollaboratePage } from '../../components/CollaboratePage';

export const metadata: Metadata = {
  title: 'Collaborate With MEOCY — Models & Model Agencies in Milan',
  description:
    'MEOCY collaborates with models and model agencies in Milan on selected fashion, editorial and portfolio projects. Send your details.',
  alternates: {
    canonical: 'https://meocy.com/collaborate',
  },
  robots: {
    index: true,
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
