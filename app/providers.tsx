'use client';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ConsentProvider } from '../contexts/ConsentContext';
import { SkipLink } from '../components/SkipLink';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <LanguageProvider>
        {/* Visitors who ask for reduced motion get no transform/slide animations (opacity fades remain). */}
        <MotionConfig reducedMotion="user">
          <SkipLink />
          {children}
        </MotionConfig>
      </LanguageProvider>
    </ConsentProvider>
  );
}
