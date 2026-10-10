// Server-side validation of marketing attribution sent with form submissions (see lib/attribution.ts).
import { z } from 'zod';
import { LANDING_PAGE, MAX_VALUE, SAFE_VALUE, type Attribution } from './attribution';

const utmValue = z.string().trim().min(1).max(MAX_VALUE).regex(SAFE_VALUE);

export const AttributionSchema = z
  .object({
    utm_source: utmValue.optional(),
    utm_medium: utmValue.optional(),
    utm_campaign: utmValue.optional(),
    utm_content: utmValue.optional(),
    utm_term: utmValue.optional(),
    landing_page: z.string().regex(LANDING_PAGE),
    click_id: z.enum(['fbclid', 'gclid']).optional(),
  })
  .strict();

/**
 * Server side: valid attribution or null. Never throws and never rejects the request —
 * a booking or enquiry must go through whether or not attribution is present or valid.
 */
export function parseAttribution(input: unknown): Attribution | null {
  if (input === undefined || input === null) return null;
  const parsed = AttributionSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}
