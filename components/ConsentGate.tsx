'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setAnalyticsEnabled, useConsent } from '../contexts/ConsentContext';

type FbQ = (...args: any[]) => void;

const GA_ID = 'G-ZL81S630JL';
const META_PIXEL_ID = '962361566323718';

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

  // Analytics: GA4 is loaded once and then kept switched off with its per-property disable flag,
  // which stops hits and cookie writes without a page reload.
  useEffect(() => {
    const analyticsOn = preferences?.analytics === true;
    setAnalyticsEnabled(analyticsOn);
    if (!analyticsOn) return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', { page_location: window.location.href });
      return;
    }

    const ga4Code = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;

    loadInlineScript(ga4Code, () => {});
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, () => {});
  }, [preferences?.analytics]);

  // Marketing: the Pixel is loaded once; withdrawal pauses it with the consent API and every
  // PageView/event is also gated on current preferences, so nothing fires while withdrawn.
  useEffect(() => {
    const fbq = (window as any).fbq as FbQ | undefined;

    if (preferences?.marketing !== true) {
      fbq?.('consent', 'revoke');
      return;
    }

    if (fbq) {
      fbq('consent', 'grant');
      return;
    }

    const metaPixelCode = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_PIXEL_ID}');
    `;

    loadInlineScript(metaPixelCode, () => {});
  }, [preferences?.marketing]);

  // Single PageView per navigation, only while marketing consent is on (effects run in declaration order,
  // so the Pixel is initialized before this fires).
  useEffect(() => {
    if (!preferences?.marketing) return;

    const fbq = (window as any).fbq as FbQ | undefined;
    if (fbq) {
      fbq('track', 'PageView');
    }
  }, [pathname, preferences?.marketing]);

  return null;
}
