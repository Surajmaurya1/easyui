import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SponsorsPage } from './SponsorsPage';
import { SponsoredBy } from './SponsoredBy';
import { getCheckoutHref, sponsors, type Sponsor } from '../../lib/sponsors';

vi.mock('../../lib/sponsor-config', () => ({
  DODO_PAYMENT_LINK: 'https://checkout.dodopayments.com/buy/easyui-sponsor',
  TALLY_FORM_URL: 'https://tally.so/r/easyui-sponsor',
  SPONSOR_CONTACT_EMAIL: 'surajmaurya.pvt@gmail.com',
  isPaymentLinkReady: true,
  isTallyFormReady: true,
  isSponsorContactReady: true,
}));

const paidSponsors: Sponsor[] = Array.from({ length: 4 }, (_, index) => ({
  slot: index + 1,
  name: `Sponsor ${index + 1}`,
  url: `https://sponsor${index + 1}.example`,
  logo: `/sponsors/sponsor-${index + 1}.svg`,
  expiresAt: '2027-12-31',
}));

describe('sponsor UI', () => {
  let originalSponsors: Sponsor[];

  beforeEach(() => {
    originalSponsors = sponsors.splice(0, sponsors.length);
  });

  afterEach(() => {
    sponsors.splice(0, sponsors.length, ...originalSponsors);
  });

  it('renders the sponsors page sections and four open placements', () => {
    render(<SponsorsPage />);

    expect(
      screen.getByRole('heading', { name: 'Get your brand in front of developers' })
    ).toBeInTheDocument();
    expect(screen.getByText('By the numbers')).toBeInTheDocument();
    expect(screen.getByText(/^Visitors/)).toBeInTheDocument();
    expect(screen.getByText(/^Page views/)).toBeInTheDocument();
    expect(screen.getByText('100K+', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('410K+', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Last 30 days, from Tracewell. Checked Nov 2, 2026')).toBeInTheDocument();
    expect(screen.getByText('First come, first placed · only 4 slots')).toBeInTheDocument();
    expect(screen.getAllByText('Your logo')).toHaveLength(4);
    fireEvent.click(screen.getByRole('button', { name: 'How is my sponsor slot assigned' }));
    expect(screen.getByText(/assign placements by Dodo’s payment time/)).toBeInTheDocument();
    expect(screen.getByText(/refund or waitlist/)).toBeInTheDocument();
  });

  it('sends both sponsor CTAs directly to the configured Dodo checkout', () => {
    render(<SponsorsPage />);

    const links = screen.getAllByRole('link', { name: 'Become a sponsor' });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute('href', getCheckoutHref());
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('shows both sponsor CTAs as sold out and offers the email fallback when all slots are filled', () => {
    sponsors.push(...paidSponsors);
    render(<SponsorsPage />);

    expect(screen.getAllByRole('button', { name: 'Sold out' })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Email surajmaurya\.pvt@gmail\.com/ })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /Visit Sponsor/ })).toHaveLength(4);
    expect(screen.queryByText('Your logo')).not.toBeInTheDocument();
  });

  it('renders the home sponsor row with the placeholder when there are no sponsors', () => {
    render(<SponsoredBy />);

    expect(screen.getByText('Supported by')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Visit Tracwell/ })).toHaveAttribute(
      'href',
      'https://tracwell.app/?utm_source=easyui&utm_medium=referral&utm_campaign=analytics_sponsor'
    );
    expect(screen.getByRole('link', { name: 'Become a sponsor' })).toHaveAttribute('href', '/sponsors');
  });
});
