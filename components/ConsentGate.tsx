'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useConsent } from '../contexts/ConsentContext';

type GtTag = (command: string, ...args: any[]) => void;
type FbQ = (...args: any[]) => void;

function loadScript(src: string, callback: () => void) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadInlineScript(code: string, callback: () => void) {
  const script = document.createElement('script');
  script.textContent = code;
  script.onload = callback;
  document.head.appendChild(script);
}

export function ConsentGate() {
  const { preferences } = useConsent();
  const pathname = usePathname();

  // Load GA4 script only when Analytics consent is granted
  useEffect(() => {
    if (preferences?.analytics !== true) return;

    // Only load if not already loaded
    if ((window as any).gtag) return;

    const ga4Code = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZL81S630JL', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;

    loadInlineScript(ga4Code, () => {
      // GA4 is now initialized
    });

    loadScript('https://www.googletagmanager.com/gtag/js?id=G-ZL81S630JL', () => {
      // GA4 script loaded
    });
  }, [preferences?.analytics]);

  // Load Meta Pixel script only when Marketing consent is granted
  useEffect(() => {
    if (preferences?.marketing !== true) return;

    // Only load if not already loaded
    if ((window as any).fbq) return;

    const metaPixelCode = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '962361566323718');
      fbq('track', 'PageView');
    `;

    loadInlineScript(metaPixelCode, () => {
      // Meta Pixel is now initialized
    });
  }, [preferences?.marketing]);

  // Track PageView on client-side navigation (only if consent is set)
  useEffect(() => {
    if (!preferences?.marketing) return;

    const fbq = (window as any).fbq as FbQ | undefined;
    if (fbq) {
      fbq('track', 'PageView');
    }
  }, [pathname, preferences?.marketing]);

  return null;
}
