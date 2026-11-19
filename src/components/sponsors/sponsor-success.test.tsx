import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorSuccessPage } from './SponsorSuccessPage';

vi.mock('../../lib/sponsor-config', () => ({
  DODO_PAYMENT_LINK: 'https://checkout.dodopayments.com/buy/easyui-sponsor',
  TALLY_FORM_URL: 'https://tally.so/r/easyui-sponsor?source=checkout',
  SPONSOR_CONTACT_EMAIL: 'surajmaurya.pvt@gmail.com',
  isPaymentLinkReady: true,
  isTallyFormReady: true,
  isSponsorContactReady: true,
}));

describe('sponsor success page', () => {
  beforeEach(() => window.history.replaceState(
    null,
    '',
    '/sponsor/success?payment_id=pay_123&status=succeeded',
  ));

  it('shows a compact sponsor form card linked to Tally with Dodo payment details', () => {
    render(<SponsorSuccessPage />);

    expect(screen.getByText('Sponsor details')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fill out the EasyUI sponsor details form' })).toHaveAttribute(
      'href',
      'https://tally.so/r/easyui-sponsor?source=checkout&payment_id=pay_123&status=succeeded',
    );
    expect(screen.queryByTitle('EasyUI sponsor details form')).not.toBeInTheDocument();
  });
});
