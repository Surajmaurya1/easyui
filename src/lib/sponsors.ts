import { DODO_PAYMENT_LINK, TALLY_FORM_URL, isPaymentLinkReady, isTallyFormReady } from './sponsor-config';
import { getActiveSponsorPlacements, MAX_SLOTS, type Sponsor } from './sponsor-data';

export { MAX_SLOTS, sponsors, type Sponsor } from './sponsor-data';

/**
 * How to add a sponsor: drop its logo in /public/sponsors/, add an entry below
 * with a stable slot number and expiresAt (today + 30 days), then deploy.
 * Active entries are ordered by slot and the visible list is capped at MAX_SLOTS.
 */
export const SPONSOR_PRICE = 49;
export const stats = {
  updatedAt: 'Nov 2, 2026',
  last30d: { visitors: '100K+', pageViews: '410K+' },
} as const;

const SPONSOR_QUERY = [
  ['utm_source', 'easyui'],
  ['utm_medium', 'sponsor'],
  ['utm_campaign', 'easyui-sponsor'],
  ['ref', 'easyui'],
] as const;

/** Active sponsors sorted by stable placement number. */
export function getActiveSponsors(now = new Date()): Sponsor[] {
  return getActiveSponsorPlacements(now);
}

export function getOpenSlots(now = new Date()): number {
  return Math.max(0, MAX_SLOTS - getActiveSponsors(now).length);
}

export function getCheckoutHref(): string {
  return isPaymentLinkReady ? DODO_PAYMENT_LINK : '';
}

/** Adds EasyUI attribution while preserving existing query parameters and hashes. */
export function getSponsorHref(sponsor: Sponsor): string {
  try {
    const url = new URL(sponsor.url);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    for (const [key, value] of SPONSOR_QUERY) url.searchParams.set(key, value);
    return url.toString();
  } catch {
    return '';
  }
}

export { DODO_PAYMENT_LINK, TALLY_FORM_URL, isPaymentLinkReady, isTallyFormReady };
