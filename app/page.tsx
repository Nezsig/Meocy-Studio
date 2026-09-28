import { Nav } from '../components/Nav';
import { OfferBanner } from '../components/OfferBanner';
import { Hero } from '../components/Hero';
import { NoPackageHighlight } from '../components/NoPackageHighlight';
import { Process } from '../components/Process';
import { HowItWorks } from '../components/HowItWorks';
import { Equipment } from '../components/Equipment';
import { About } from '../components/About';
import { Estimator } from '../components/Estimator';
import { Packages } from '../components/Packages';
import { Faq } from '../components/Faq';
import { Booking } from '../components/Booking';
import { Footer } from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <div className="sticky top-0 z-50">
        <OfferBanner />
        <Nav />
      </div>
      <main className="pt-0">
        <Hero />
        <NoPackageHighlight />
        <Process />
        <HowItWorks />
        <Equipment />
        <Estimator />
        <Packages />
        <Faq />
        <Booking />
        <About />
      </main>
      <Footer />
    </div>
  );
}
