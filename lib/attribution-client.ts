// Browser side of marketing attribution (see lib/attribution.ts).
//
// Consent rules (existing consent system, nothing new stored before a choice):
// - The landing page's UTM parameters are read into memory on page load. They are written to
//   sessionStorage only once the visitor has granted analytics or marketing consent.
// - Ad click ID presence (fbclid/gclid) is kept only with marketing consent.
// - Withdrawing both analytics and marketing consent deletes the stored attribution; withdrawing
//   marketing removes the click ID. No choice yet (preferences === null) never stores anything.
// - Submissions carry attribution only while analytics or marketing consent is granted.
import type { ConsentPreferences } from '../contexts/ConsentContext';
import { UTM_KEYS, cleanLandingPage, cleanUtmValue, type Attribution } from './attribution';

const STORAGE_KEY = 'meocy_attribution';

// What this page load's URL carried. Memory only: lost on reload, never persisted without consent.
let pageAttribution: Attribution | null = null;

/** Reads whitelisted marketing parameters from the current URL once per page load. */
export function capturePageAttribution() {
  if (pageAttribution || typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const a: Attribution = { landing_page: cleanLandingPage(url.pathname) };
  for (const key of UTM_KEYS) {
    const value = cleanUtmValue(url.searchParams.get(key));
    if (value) a[key] = value;
  }
  if (url.searchParams.has('fbclid')) a.click_id = 'fbclid';
  else if (url.searchParams.has('gclid')) a.click_id = 'gclid';
  pageAttribution = a;
}

const attributionAllowed = (p: ConsentPreferences | null) => p?.analytics === true || p?.marketing === true;

/** Re-validates stored data so a tampered or old entry can never inject unexpected values. */
function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed?.landing_page !== 'string') return null;
    const a: Attribution = { landing_page: cleanLandingPage(parsed.landing_page) };
    for (const key of UTM_KEYS) {
      const value = cleanUtmValue(typeof parsed[key] === 'string' ? (parsed[key] as string) : undefined);
      if (value) a[key] = value;
    }
    if (parsed.click_id === 'fbclid' || parsed.click_id === 'gclid') a.click_id = parsed.click_id;
    return a;
  } catch {
    return null;
  }
}

function writeStored(a: Attribution) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    // Storage blocked: attribution still works for this page from memory.
  }
}

function clearStored() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored or storage blocked.
  }
}

const withoutClickId = ({ click_id: _drop, ...rest }: Attribution): Attribution => rest;

/** Applies the current consent choice to stored attribution. Call on load and on every consent change. */
export function syncAttributionWithConsent(preferences: ConsentPreferences | null) {
  if (typeof window === 'undefined' || preferences === null) return; // No choice yet: store nothing, delete nothing.

  if (!attributionAllowed(preferences)) {
    clearStored();
    return;
  }

  // First touch of this browser tab: keep the first attributed landing, don't overwrite it later.
  const stored = readStored();
  const current = stored ?? pageAttribution;
  if (!current) return;
  const next = preferences.marketing ? current : withoutClickId(current);
  if (!stored || JSON.stringify(next) !== JSON.stringify(stored)) writeStored(next);
}

/** Attribution to send with a form submission, or null when consent does not allow it. */
export function getSubmissionAttribution(preferences: ConsentPreferences | null): Attribution | null {
  if (typeof window === 'undefined' || !attributionAllowed(preferences)) return null;
  const current = readStored() ?? pageAttribution;
  if (!current) return null;
  return preferences?.marketing ? current : withoutClickId(current);
}
