import React from 'react';
import { ArrowLeft, ArrowUpRight, HeartHandshake } from 'lucide-react';
import { Container } from '../layout/Container';
import { SPONSOR_CONTACT_EMAIL, TALLY_FORM_URL, isSponsorContactReady, isTallyFormReady } from '../../lib/sponsor-config';

export interface SponsorSuccessPageProps {
  onNavigateHome?: () => void;
}

function getRedirectValue(params: URLSearchParams, keys: string[]): string {
  for (const [key, value] of params.entries()) {
    if (keys.includes(key.toLowerCase()) && value) return value;
  }
  return '';
}

function buildTallyUrl(paymentId: string, status: string): string {
  try {
    const url = new URL(TALLY_FORM_URL);
    if (paymentId) url.searchParams.set('payment_id', paymentId);
    if (status) url.searchParams.set('status', status);
    return url.toString();
  } catch {
    return '';
  }
}

export const SponsorSuccessPage: React.FC<SponsorSuccessPageProps> = ({ onNavigateHome }) => {
  const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
  const paymentId = getRedirectValue(params, ['payment_id', 'paymentid', 'payment-id', 'id']);
  const status = getRedirectValue(params, ['status', 'payment_status', 'paymentstatus']).toLowerCase();
  const isFailure = /fail|cancel|declin|error|expired|void/.test(status);
  const tallyHref = buildTallyUrl(paymentId, status);
  const emailHref = `mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent('EasyUI sponsor details')}`;

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigateHome || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onNavigateHome();
  };

  if (isFailure) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background py-16 text-text-primary sm:py-24">
        <Container size="sm">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Payment didn't go through</h1>
            <p className="mt-3 text-[14px] text-text-secondary">You can return to sponsorship details and try again.</p>
            <a href="/sponsors" className="mt-7 inline-flex rounded-full bg-text-primary px-5 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90 focus-ring">Back to sponsors</a>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] justify-center bg-background pt-6 pb-12 text-text-primary sm:pt-8 sm:pb-16">
      <Container size="sm">
        <header className="mx-auto max-w-lg text-center">
          <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted">Sponsor</span>
          <h1 className="mt-3 text-[clamp(1.75rem,5vw,2.25rem)] font-semibold tracking-[-0.035em]">Thanks for supporting EasyUI</h1>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
            Send your brand details. We’ll review your submission and verify payment before approving your placement.
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-text-muted">
            <strong className="font-medium text-text-secondary">Already paid?</strong> Submit your details and we’ll email you when your placement is live.
          </p>
          <p className="mt-2 text-[12px] text-text-muted">
            Questions? <a href={`mailto:${SPONSOR_CONTACT_EMAIL}`} className="underline-offset-4 hover:text-text-secondary hover:underline">{SPONSOR_CONTACT_EMAIL}</a>
          </p>
        </header>

        {isTallyFormReady && tallyHref ? (
          <a
            href={tallyHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fill out the EasyUI sponsor details form"
            className="group mx-auto mt-7 flex aspect-[1.1/1] w-full max-w-md flex-col justify-between rounded-[24px] border border-border bg-surface p-6 transition-colors hover:border-border-hover focus-ring sm:p-7"
          >
            <span className="mb-auto mt-2 flex min-h-[150px] flex-1 items-center justify-center text-text-secondary" aria-hidden="true">
              <HeartHandshake className="h-16 w-16" strokeWidth={1.25} />
            </span>
            <span className="flex min-w-0 flex-col items-start gap-2">
              <span className="block text-[18px] font-medium tracking-[-0.02em] text-text-primary">Sponsor details</span>
              <span className="block text-[13px] leading-relaxed text-text-muted">Company, website, and logo · SVG or PNG preferred</span>
              <span className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-text-primary px-4 text-[12px] font-medium text-background transition-opacity group-hover:opacity-80">
                Submit sponsor details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </a>
        ) : (
          <div className="mt-7 rounded-xl border border-border bg-surface p-5 text-center sm:p-6">
            <p className="text-[13px] text-text-secondary">The sponsor form is temporarily unavailable.</p>
            {isSponsorContactReady && <a href={emailHref} className="mt-2 inline-block text-[12px] text-text-secondary underline-offset-4 hover:text-text-primary hover:underline">Email your logo + link to {SPONSOR_CONTACT_EMAIL}</a>}
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/" onClick={handleHomeClick} className="inline-flex items-center gap-2 rounded text-[12px] text-text-secondary transition-colors hover:text-text-primary focus-ring">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />Back to EasyUI
          </a>
        </div>
      </Container>
    </main>
  );
};

export default SponsorSuccessPage;
