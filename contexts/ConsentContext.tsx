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

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const stored = localStorage.getItem(STORAGE_KEY);
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);

    if (stored) {
      setPreferences(JSON.parse(stored));
    } else if (!bannerDismissed) {
      // Show banner only if no preference is set and banner wasn't dismissed
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newPreferences: ConsentPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setShowBanner(false);
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
