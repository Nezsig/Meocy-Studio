// GA4, Meta Pixel and Meta Lead run only in the Vercel production build (VERCEL_ENV=production, set in next.config.js).
export const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
