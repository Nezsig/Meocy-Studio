import { Metadata } from 'next';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { MilanLegalSection } from '../../components/LegalPolicyPage';

export const metadata: Metadata = pageMetadata({
  path: '/terms',
  title: 'Terms & Conditions — MEOCY',
  description:
    'Terms & Conditions for MEOCY Studio services: enquiries and bookings, Milan photoshoot requests, prices, payment, cancellation, portfolio use and liability.',
});

export default function TermsPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <main className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-[14px] text-slate2">
              Last updated: September 2026
            </p>

            <div className="mt-12 space-y-8 text-[16px] leading-relaxed text-slate2">
              <section>
                <h2 className="font-semibold text-ink">Services.</h2>
                <p className="mt-3">
                  MEOCY is a photo and video studio based in Milan, Italy. We provide professional photography and videography services as agreed for each booking, including fashion, product, food, model, and brand content creation.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Enquiries & bookings.</h2>
                <p className="mt-3">
                  Submitting a form is an enquiry, not a confirmed booking. A booking is confirmed
                  only once we agree the details and price in writing (email).
                </p>
              </section>

              <MilanLegalSection page="terms" />

              <section>
                <h2 className="font-semibold text-ink">Prices & offers.</h2>
                <p className="mt-3">
                  All prices are in euro (€). Promotional offers are valid only until the date
                  stated. Prices may change before a booking is confirmed.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Payment.</h2>
                <p className="mt-3">
                  Payment terms are set out in your quote or confirmation.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Cancellation & rescheduling.</h2>
                <p className="mt-3">
                  If you need to cancel or move a shoot, please let us know as early as possible so
                  we can find a new date.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Portfolio & usage.</h2>
                <p className="mt-3">
                  Unless we agree otherwise in writing, MEOCY may show delivered work in its own
                  portfolio and social media. You receive the usage rights agreed for your project
                  once payment is complete.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Liability.</h2>
                <p className="mt-3">
                  We deliver our work with care, but to the extent permitted by law our liability
                  is limited to the amount you paid for the service.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Governing law.</h2>
                <p className="mt-3">
                  These terms are governed by the laws of Italy.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Contact.</h2>
                <p className="mt-3">
                  hello@meocy.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
