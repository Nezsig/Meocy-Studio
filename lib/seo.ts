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
