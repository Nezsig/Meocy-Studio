import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'MEOCY — Photography Studio, Milan',
  description:
    'MEOCY is a professional photography studio in Milan, Italy. Product, fashion, restaurant and model shoots — in studio or on location.',
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
