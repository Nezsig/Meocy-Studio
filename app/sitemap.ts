import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

// Canonical, indexable public pages only. No lastModified/changeFrequency/priority:
// the previous values (build time, guessed frequencies) carried no real information.
const PATHS = [
  '/',
  '/work',
  '/services',
  '/packages',
  '/milan-photoshoot',
  '/about',
  '/faq',
  '/contact',
  '/collaborate',
  '/work-with-meocy',
  '/privacy',
  '/terms',
  '/booking-policy',
  '/cookie-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: path === '/' ? SITE_URL : `${SITE_URL}${path}` }));
}
