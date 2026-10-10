// WhatsApp click tracking (GA4 "whatsapp_click" + Meta Pixel "Contact").
// Consent-gated on the visitor's current choice: GA4 only with analytics consent, Meta only with
// marketing consent. Never sends personal data, booking references or message text, and never
// blocks or delays opening WhatsApp. Analytics errors are swallowed.
import { useCallback } from 'react';
import { useConsent } from '../contexts/ConsentContext';

export type WhatsAppCtaLocation =
  | 'milan_hero'
  | 'paris_hero'
  | 'milan_booking_confirmation'
  | 'paris_booking_confirmation'
  | 'footer_icon'
  | 'footer_phone'
  | 'contact_phone'
  | 'contact_icon'
  | 'about_phone'
  | 'about_icon';

export type ShootCity = 'milan' | 'paris';

type Gtag = (...args: unknown[]) => void;
type Fbq = (cmd: string, event: string) => void;

// One click can bubble through several handlers or be double-tapped; count it once.
const DEDUPE_MS = 1000;
let lastClick: { location: WhatsAppCtaLocation; at: number } | null = null;

/** Returns an onClick-safe function: track(ctaLocation, shootCity?). */
export function useWhatsAppClickTracking() {
  const { preferences } = useConsent();
  const analytics = preferences?.analytics === true;
  const marketing = preferences?.marketing === true;

  return useCallback(
    (ctaLocation: WhatsAppCtaLocation, shootCity?: ShootCity) => {
      if (typeof window === 'undefined') return;

      const now = Date.now();
      if (lastClick && lastClick.location === ctaLocation && now - lastClick.at < DEDUPE_MS) return;
      lastClick = { location: ctaLocation, at: now };

      if (analytics) {
        const gtag = (window as unknown as { gtag?: Gtag }).gtag;
        if (typeof gtag === 'function') {
          try {
            gtag('event', 'whatsapp_click', {
              page_path: window.location.pathname,
              cta_location: ctaLocation,
              ...(shootCity ? { shoot_city: shootCity } : {}),
            });
          } catch {
            // Analytics must never block WhatsApp
          }
        }
      }

      if (marketing) {
        const fbq = (window as unknown as { fbq?: Fbq }).fbq;
        if (typeof fbq === 'function') {
          try {
            fbq('track', 'Contact');
          } catch {
            // Analytics must never block WhatsApp
          }
        }
      }
    },
    [analytics, marketing],
  );
}
