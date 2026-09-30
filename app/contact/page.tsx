import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { ContactPage } from '../../components/ContactPage';

export const metadata: Metadata = {
  title: 'Contact & Project Request — MEOCY | Photography & Video Milan',
  description:
    'Send your photography or video project brief to MEOCY in Milan. Tell us what you need and get a clear quotation.',
  alternates: {
    canonical: 'https://meocy.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <ContactPage />
      <Footer />
    </div>
  );
}
