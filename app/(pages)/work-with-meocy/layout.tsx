import type { Metadata } from 'next';

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: 'Work With MEOCY — Freelance Creative Crew in Milan',
  description:
    'MEOCY is building a network of freelance photographers, videographers, lighting and production assistants in Milan for selected photo and video productions.',
  alternates: { canonical: 'https://meocy.com/work-with-meocy' },
  robots: { index: true, follow: true },
};

export default function WorkWithMeocyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
