'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextType = {
  preferences: ConsentPreferences | null;
  updateConsent: (preferences: ConsentPreferences) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'meocy-consent';
const BANNER_DISMISSED_KEY = 'meocy-consent-dismissed';
const GA_MEASUREMENT_ID = 'G-ZL81S630JL';

// Applied synchronously on each consent change so withdrawal takes effect before any later GA4 hit.
export function setAnalyticsEnabled(enabled: boolean) {
  (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = !enabled;
}

// Storage can be blocked or throw. Unreadable or malformed values count as "no choice made",
// so optional tracking stays off until the visitor chooses.
function readStoredPreferences(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === 'boolean' && typeof parsed?.marketing === 'boolean') {
      return { analytics: parsed.analytics, marketing: parsed.marketing };
    }
    return null;
  } catch {
    return null;
  }
}

function isBannerDismissed(): boolean {
  try {
    return localStorage.getItem(BANNER_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function persistConsent(preferences: ConsentPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  } catch {
    // Choice still applies for this page session; it just won't be remembered.
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
    } else if (!isBannerDismissed()) {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newPreferences: ConsentPreferences) => {
    setAnalyticsEnabled(newPreferences.analytics);
    setPreferences(newPreferences);
    setShowBanner(false);
    persistConsent(newPreferences);
  };

  const acceptAll = () => {
    updateConsent({ analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    updateConsent({ analytics: false, marketing: false });
  };

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        updateConsent,
        acceptAll,
        rejectOptional,
        showBanner,
        setShowBanner,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}
