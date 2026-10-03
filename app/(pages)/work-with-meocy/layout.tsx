import type { Metadata } from 'next';
import { pageMetadata } from '../../../lib/seo';

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = pageMetadata({
  path: '/work-with-meocy',
  title: 'Work With MEOCY — Freelance Creative Crew in Milan',
  description:
    'MEOCY is building a network of freelance photographers, videographers, lighting and production assistants in Milan for selected photo and video productions.',
  indexable: true,
});

export default function WorkWithMeocyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
