import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { HowItWorks } from '../components/HowItWorks';
import { Equipment } from '../components/Equipment';
import { Estimator } from '../components/Estimator';
import { Packages } from '../components/Packages';
import { Faq } from '../components/Faq';
import { Booking } from '../components/Booking';
import { Footer } from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <main>
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
    </div>
  );
}
