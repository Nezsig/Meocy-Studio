'use client';
import { useEffect } from 'react';
import { useConsent } from '../contexts/ConsentContext';
import { capturePageAttribution, syncAttributionWithConsent } from '../lib/attribution-client';

/** Reads UTM parameters on page load and keeps stored attribution in line with consent. Renders nothing. */
export function AttributionCapture() {
  const { preferences } = useConsent();

  useEffect(() => {
    capturePageAttribution();
    syncAttributionWithConsent(preferences);
  }, [preferences]);

  return null;
}
