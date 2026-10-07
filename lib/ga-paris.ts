// GA4 funnel events for the Paris photoshoot page.
// Same event names as the Milan funnel (lib/ga-booking.ts, unchanged), plus shoot_city: 'paris'
// so Paris can be separated from Milan in GA4. Never pass personal data here.

type ParisBookingEvent =
  | 'booking_cta_click'
  | 'booking_form_start'
  | 'booking_step_view'
  | 'booking_validation_error'
  | 'booking_submit_attempt'
  | 'booking_submit_success';

type ParisEventParams = { step_number?: number; step_name?: string; field_name?: string };

export function trackParisBookingEvent(eventName: ParisBookingEvent, params: ParisEventParams = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return; // Fail silently if GA4 is unavailable
  try {
    gtag('event', eventName, { ...params, shoot_city: 'paris' });
  } catch {
    // Analytics must never block booking
  }
}
