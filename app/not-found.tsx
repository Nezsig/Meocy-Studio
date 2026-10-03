import type { Metadata } from 'next';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { NotFoundContent } from '../components/NotFoundContent';

export const metadata: Metadata = {
  // Next.js already adds noindex to not-found responses.
  title: 'Page not found — MEOCY',
};

export default function NotFound() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <NotFoundContent />
      <Footer />
    </div>
  );
}
