import { Metadata } from 'next';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { LegalPolicyPage } from '../../components/LegalPolicyPage';

export const metadata: Metadata = {
  title: 'Booking Policy — MEOCY',
  description: 'Booking Policy for MEOCY Milan photoshoots: €50 non-refundable deposit, date changes, manual confirmation and photo delivery.',
  alternates: { canonical: 'https://meocy.com/booking-policy' },
};

export default function BookingPolicy() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <LegalPolicyPage policy="bookingPolicy" />
      <Footer />
    </div>
  );
}
