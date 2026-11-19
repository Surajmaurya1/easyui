export const MAX_SLOTS = 4;

export interface Sponsor {
  /** Stable placement number (1–4) used to prevent two sponsors claiming the same slot. */
  slot: number;
  name: string;
  url: string;
  logo: string;
  logoDark?: string;
  /** Inclusive UTC expiry date, formatted YYYY-MM-DD. */
  expiresAt: string;
}

export const sponsors: Sponsor[] = [];

function isValidExpiry(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/** Shared server/client source of truth for currently active, numbered placements. */
export function getActiveSponsorPlacements(now = new Date()): Sponsor[] {
  const today = now.toISOString().slice(0, 10);
  return sponsors
    .filter((sponsor) =>
      isValidExpiry(sponsor.expiresAt) &&
      sponsor.expiresAt >= today &&
      Number.isInteger(sponsor.slot) &&
      sponsor.slot >= 1 &&
      sponsor.slot <= MAX_SLOTS,
    )
    .sort((a, b) => a.slot - b.slot)
    .filter((sponsor, index, active) => active.findIndex((candidate) => candidate.slot === sponsor.slot) === index)
    .slice(0, MAX_SLOTS);
}
