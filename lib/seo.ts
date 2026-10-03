import type { Metadata } from 'next';

// Shared technical-SEO constants. Canonical host is https://meocy.com (no www).
// Structured data uses only facts the owner approved as public business details.

export const SITE_URL = 'https://meocy.com';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'MEOCY Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/meocy-logo.png`,
  email: 'hello@meocy.com',
  telephone: '+39 379 105 1000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Viale Renato Serra 14',
    postalCode: '20148',
    addressLocality: 'Milano',
    addressCountry: 'IT',
  },
};

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'MEOCY',
  url: SITE_URL,
  publisher: { '@id': ORGANIZATION_ID },
};

// --- Page metadata (canonical + Open Graph + Twitter) -------------------------------------


export interface SocialImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/** Branded 1200x630 card used for every page without a page-specific photo. */
export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'MEOCY — Photo & video studio in Milan',
};

/** Resized copies (originals untouched) of real photos already used on these pages. */
export const SOCIAL_IMAGES = {
  milan: { url: `${SITE_URL}/og/milan-photoshoot.jpg`, width: 1200, height: 750, alt: 'Duomo di Milano' },
  work: { url: `${SITE_URL}/og/work.jpg`, width: 1200, height: 685, alt: 'Fashion portrait by MEOCY' },
} satisfies Record<string, SocialImage>;

export const pageUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

/**
 * One source for a page's title, description, canonical, og:* and twitter:* tags.
 * Next.js replaces (does not merge) openGraph/twitter objects from the root layout, so every
 * page sets its own; this keeps og:url equal to the canonical URL.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = DEFAULT_SOCIAL_IMAGE,
  indexable,
}: {
  path: string;
  title: string;
  description: string;
  image?: SocialImage;
  /** Emit an explicit index/follow robots tag (pages that already declared one). */
  indexable?: boolean;
}): Metadata {
  const url = pageUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'MEOCY', locale: 'en_US', url, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image.url, alt: image.alt }] },
    ...(indexable ? { robots: { index: true, follow: true } } : {}),
  };
}
