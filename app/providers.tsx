'use client';
import { LanguageProvider } from '../contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider initial="it">{children}</LanguageProvider>;
}
