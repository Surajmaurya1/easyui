import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  MAX_SLOTS,
  getActiveSponsors,
  getOpenSlots,
  getSponsorHref,
  sponsors,
  type Sponsor,
} from './sponsors';

const NOW = new Date('2026-10-27T12:00:00.000Z'); // Stable UTC comparison date

const fakeSponsors: Sponsor[] = [
  {
    slot: 1,
    name: 'Expired Co',
    url: 'https://expired.example.com',
    logo: '/sponsors/expired.svg',
    expiresAt: '2026-10-26',
  },
  {
    slot: 1,
    name: 'Active Co',
    url: 'https://active.example.com/pricing?plan=pro#team',
    logo: '/sponsors/active.svg',
    expiresAt: '2026-10-27',
  },
  {
    slot: 2,
    name: 'Future Co',
    url: 'https://future.example.com',
    logo: '/sponsors/future.svg',
    expiresAt: '2026-11-30',
  },
];

describe('sponsor helpers', () => {
  let originalSponsors: Sponsor[];

  beforeEach(() => {
    originalSponsors = sponsors.splice(0, sponsors.length);
    sponsors.push(...fakeSponsors);
  });

  afterEach(() => {
    sponsors.splice(0, sponsors.length, ...originalSponsors);
  });

  it('filters expired sponsors and keeps entries that expire today', () => {
    const active = getActiveSponsors(NOW);

    expect(active.map((sponsor) => sponsor.name)).toEqual(['Active Co', 'Future Co']);
  });

  it('counts open slots from active sponsors', () => {
    expect(getOpenSlots(NOW)).toBe(MAX_SLOTS - 2);
  });

  it('adds tracking params to a clean sponsor URL', () => {
    const href = getSponsorHref({
      slot: 1,
      name: 'Acme',
      url: 'https://acme.dev',
      logo: '/sponsors/acme.svg',
      expiresAt: '2026-12-31',
    });

    expect(href).toBe(
      'https://acme.dev/?utm_source=easyui&utm_medium=sponsor&utm_campaign=easyui-sponsor&ref=easyui'
    );
  });

  it('preserves an existing query string and hash while adding tracking params', () => {
    const href = getSponsorHref(fakeSponsors[1]);

    expect(href).toBe(
      'https://active.example.com/pricing?plan=pro&utm_source=easyui&utm_medium=sponsor&utm_campaign=easyui-sponsor&ref=easyui#team'
    );
  });

  it('overrides a sponsor-provided tracking value instead of duplicating it', () => {
    const href = getSponsorHref({
      slot: 1,
      name: 'Acme',
      url: 'https://acme.dev/?utm_source=newsletter&ref=old',
      logo: '/sponsors/acme.svg',
      expiresAt: '2026-12-31',
    });

    expect(href).toBe(
      'https://acme.dev/?utm_source=easyui&ref=easyui&utm_medium=sponsor&utm_campaign=easyui-sponsor'
    );
  });

});
