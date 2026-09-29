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
    images: [
      {
        url: 'https://meocy.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MEOCY — Photo & video studio in Milan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEOCY — Photo & Video Studio in Milan',
    description: 'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
    images: ['https://meocy.com/og-image.png'],
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
