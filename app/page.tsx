import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { ClientStrip } from '../components/ClientStrip';
import { Work } from '../components/Work';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
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
        <ClientStrip />
        <Work />
        <Process />
        <Testimonials />
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
