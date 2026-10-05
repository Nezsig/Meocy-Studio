// Self-hosted fonts (same files, weights and styles as the former Google Fonts import).
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import { DEFAULT_SOCIAL_IMAGE } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://meocy.com'),
  title: 'MEOCY — Photo & Video Studio in Milan',
  description:
    'Photo & video studio in Milan creating content that grows your business. Fashion, product, food, and model shoots in-studio or on-location.',
  // Site-wide fallbacks only (e.g. the 404 page). Pages set their own URL/title/description via pageMetadata().
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: { type: 'website', siteName: 'MEOCY', locale: 'en_US', images: [DEFAULT_SOCIAL_IMAGE] },
  twitter: { card: 'summary_large_image', images: [{ url: DEFAULT_SOCIAL_IMAGE.url, alt: DEFAULT_SOCIAL_IMAGE.alt }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZL81S630JL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZL81S630JL');`}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
