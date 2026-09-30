import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Work } from '../../components/Work';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Work — MEOCY',
  description: 'Photography portfolio — MEOCY Studio',
  robots: 'noindex, nofollow',
};

export default function WorkPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <main className="pt-0">
        <Work />
      </main>
      <Footer />
    </div>
  );
}
