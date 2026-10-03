import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { CollaboratePage } from '../../components/CollaboratePage';

export const metadata: Metadata = pageMetadata({
  path: '/collaborate',
  title: 'Collaborate With MEOCY — Models & Model Agencies in Milan',
  description:
    'MEOCY collaborates with models and model agencies in Milan on selected fashion, editorial and portfolio projects. Send your details.',
  indexable: true,
});

export default function Collaborate() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <CollaboratePage />
      <Footer />
    </div>
  );
}
