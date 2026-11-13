import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorsPage } from './SponsorsPage';
import { SponsorSuccessPage } from './SponsorSuccessPage';

vi.mock('../../lib/sponsor-config', () => ({
  DODO_PAYMENT_LINK: '',
  TALLY_FORM_URL: '',
  SPONSOR_CONTACT_EMAIL: 'surajmaurya.pvt@gmail.com',
  isPaymentLinkReady: false,
  isTallyFormReady: false,
  isSponsorContactReady: true,
}));

describe('sponsor unavailable states', () => {
  afterEach(() => window.history.replaceState(null, '', '/'));

  it('disables checkout CTAs and explains sponsorship is not open when Dodo is not configured', () => {
    render(<SponsorsPage />);

    expect(screen.getAllByRole('button', { name: 'Become a sponsor' })).toHaveLength(2);
    expect(screen.getAllByText('Sponsorships opening soon')).toHaveLength(2);
    expect(screen.queryByRole('link', { name: 'Become a sponsor' })).not.toBeInTheDocument();
  });

  it('shows the email fallback when the sponsor details form is unavailable', () => {
    render(<SponsorSuccessPage />);

    expect(screen.getByText('The sponsor form is temporarily unavailable.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Email your logo \+ link to surajmaurya\.pvt@gmail\.com/ })).toBeInTheDocument();
  });

  it('shows a clear retry path when Dodo returns a failed payment status', () => {
    window.history.replaceState(null, '', '/sponsor/success?status=failed');
    render(<SponsorSuccessPage />);

    expect(screen.getByRole('heading', { name: "Payment didn't go through" })).toBeInTheDocument();
    expect(screen.getByText('You can return to sponsorship details and try again.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to sponsors' })).toHaveAttribute('href', '/sponsors');
    expect(screen.queryByTitle('EasyUI sponsor details form')).not.toBeInTheDocument();
  });
});
