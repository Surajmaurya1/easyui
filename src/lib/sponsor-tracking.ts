import { trackTracwellEvent } from './tracwell-client';

export type SponsorPlacement = 'home' | 'sponsors-page';

export function trackSponsorCta({ placement }: { placement: SponsorPlacement }): void {
  trackTracwellEvent('sponsor_cta', { placement });
}

/**
 * Fires the EasyUI-side sponsor click event through Tracewell's custom event
 * API. The outbound link itself carries UTM/ref params so sponsors can also
 * see the visit in their own analytics.
 */
export function trackSponsorClick(sponsorName: string, placement: SponsorPlacement): void {
  trackTracwellEvent('sponsor_click', {
    sponsor: sponsorName,
    placement,
  });
}

