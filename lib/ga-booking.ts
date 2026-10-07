// GA4 booking funnel event tracking
// Fails silently if gtag is unavailable

type BookingEventName =
  | 'booking_cta_click'
  | 'booking_form_start'
  | 'booking_step_view'
  | 'booking_validation_error'
  | 'booking_submit_attempt'
  | 'booking_submit_success'
  | 'collaborate_form_start'
  | 'collaborate_validation_error'
  | 'collaborate_submit_attempt'
  | 'collaborate_submit_success';

interface BookingEventParams {
  booking_cta_click?: Record<string, never>;
  booking_form_start?: Record<string, never>;
  booking_step_view?: { step_number: number; step_name: string };
  booking_validation_error?: { step_number: number; field_name: string };
  booking_submit_attempt?: Record<string, never>;
  booking_submit_success?: Record<string, never>;
  collaborate_form_start?: Record<string, never>;
  collaborate_validation_error?: { field_name: string };
  collaborate_submit_attempt?: Record<string, never>;
  collaborate_submit_success?: Record<string, never>;
}

export function trackBookingEvent<T extends BookingEventName>(
  eventName: T,
  params?: BookingEventParams[T]
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return; // Fail silently if gtag unavailable
  }
  try {
    window.gtag('event', eventName, params || {});
  } catch {
    // Analytics error must never block booking
  }
}

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
