'use client';
import { useState } from 'react';
import { Nav } from '../components/Nav';
import { OfferBanner } from '../components/OfferBanner';
import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { HowItWorks } from '../components/HowItWorks';
import { Equipment } from '../components/Equipment';
import { AboutModal } from '../components/AboutModal';
import { Estimator } from '../components/Estimator';
import { Packages } from '../components/Packages';
import { Faq } from '../components/Faq';
import { Booking } from '../components/Booking';
import { Footer } from '../components/Footer';

export default function Page() {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <div className="sticky top-0 z-50">
        <OfferBanner />
        <Nav onAboutClick={() => setAboutModalOpen(true)} />
      </div>
      <main className="pt-0">
        <Hero />
        <Process />
        <HowItWorks />
        <Equipment />
        <Estimator />
        <Packages />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </div>
  );
}
