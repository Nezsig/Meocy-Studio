// Marketing attribution (UTM parameters + landing page) attached to form submissions so MEOCY can
// see which campaign a request came from. Shared by the browser (lib/attribution-client.ts) and the
// API routes (validation in lib/attribution-server.ts). Only whitelisted, sanitised marketing
// parameters are ever read from a URL: no other query parameter is looked at, values containing "@"
// are dropped, and ad click IDs (fbclid/gclid) are reduced to "present" — their values are never
// kept or sent.
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type ClickIdType = 'fbclid' | 'gclid';

export type Attribution = Partial<Record<UtmKey, string>> & {
  landing_page: string;
  click_id?: ClickIdType;
};

export const MAX_VALUE = 100;
export const SAFE_VALUE = /^[A-Za-z0-9 _.+:|~%-]+$/;
export const LANDING_PAGE = /^\/[A-Za-z0-9/_.-]{0,199}$/;

/** Trimmed, length-capped value, or undefined when empty or unsafe (e.g. contains "@"). */
export function cleanUtmValue(raw: string | null | undefined): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const v = raw.trim().slice(0, MAX_VALUE);
  return v && SAFE_VALUE.test(v) ? v : undefined;
}

/** Path only (no query string or hash), or '/' when it does not look like a plain site path. */
export function cleanLandingPage(pathname: string): string {
  return LANDING_PAGE.test(pathname) ? pathname : '/';
}

export const hasUtm = (a: Attribution) => UTM_KEYS.some((k) => !!a[k]);

/** Rows for MEOCY's internal notification emails only (never customer emails). */
export function attributionEmailRows(a: Attribution | null | undefined): [string, string][] {
  if (!a) {
    return [['Marketing attribution', 'Not recorded (no analytics/marketing consent, or not available)']];
  }
  const status = hasUtm(a) ? 'UTM attributed' : a.click_id ? 'Ad click without UTM' : 'No UTM (direct / unknown)';
  const rows: [string, string][] = [['Marketing attribution', status]];
  if (a.utm_source) rows.push(['UTM source', a.utm_source]);
  if (a.utm_medium) rows.push(['UTM medium', a.utm_medium]);
  if (a.utm_campaign) rows.push(['UTM campaign', a.utm_campaign]);
  if (a.utm_content) rows.push(['UTM content', a.utm_content]);
  if (a.utm_term) rows.push(['UTM term', a.utm_term]);
  rows.push(['Landing page', a.landing_page]);
  if (a.click_id) rows.push(['Ad click ID', a.click_id === 'fbclid' ? 'Meta ad click (fbclid present)' : 'Google ad click (gclid present)']);
  return rows;
}
