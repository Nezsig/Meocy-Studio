import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { Equipment } from '../components/Equipment';
import { WorkTeaser } from '../components/WorkTeaser';
import { PackagesTeaser } from '../components/PackagesTeaser';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <main className="pt-0">
        <Hero />
        <WorkTeaser />
        <PackagesTeaser />
        <Process />
        <Testimonials />
        <Equipment />
      </main>
      <Footer />
    </div>
  );
}
