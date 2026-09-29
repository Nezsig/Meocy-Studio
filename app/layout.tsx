import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://meocy.com'),
  title: 'MEOCY — Photo & Video Studio in Milan',
  description:
    'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
  alternates: {
    canonical: 'https://meocy.com',
  },
  openGraph: {
    url: 'https://meocy.com',
    type: 'website',
    title: 'MEOCY — Photo & Video Studio in Milan',
    description: 'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEOCY — Photo & Video Studio in Milan',
    description: 'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
