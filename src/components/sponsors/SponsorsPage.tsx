import React from 'react';
import { Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { SPONSOR_CONTACT_EMAIL, isPaymentLinkReady, isSponsorContactReady } from '../../lib/sponsor-config';
import {
  MAX_SLOTS,
  SPONSOR_PRICE,
  getActiveSponsors,
  getCheckoutHref,
  getOpenSlots,
  getSponsorHref,
  stats,
  type Sponsor,
} from '../../lib/sponsors';
import { trackSponsorClick, trackSponsorCta } from '../../lib/sponsor-tracking';
import { Reveal } from './Reveal';
import { SponsorLogo } from './SponsorLogo';
import { UnfoldAccordion } from '../ui/UnfoldAccordion';

const CTA_CLASS =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-2.5 text-[14px] font-medium text-background transition-opacity duration-150 hover:opacity-90 focus-ring disabled:pointer-events-none disabled:border disabled:border-border disabled:bg-surface disabled:text-text-muted disabled:opacity-100 sm:w-auto';

const WHY_SPONSOR = [
  'Real developers, they come to copy and ship',
  'Growing every month, new components every week',
  'UTM-tagged links for campaign attribution',
];

const BENEFITS = [
  'Logo on the home page',
  'Logo on this page',
  'UTM-tagged link',
  'Live in 24h',
];

const SPONSOR_FAQS = [
  {
    id: 'how-it-works',
    title: 'How does it work',
    content: (
      <p>
        You pay securely through checkout with a one-time payment, then send your logo, company name, and link through a short Tally form. I’ll email to confirm I received your details, and your logo will go live within 24 hours. No calls, back and forth, or account to create.
      </p>
    ),
  },
  {
    id: 'what-you-get',
    title: 'What exactly do I get',
    content: (
      <p>
        Your logo appears on the home page and sponsors page, alongside a link to your site with UTM tags for campaign attribution in your analytics. Your placement goes live within 24 hours of sending your details and stays up for one full month. It’s one payment with no auto-renewal.
      </p>
    ),
  },
  {
    id: 'why-easyui',
    title: 'Why sponsor EasyUI',
    content: (
      <p>
        EasyUI grows every day, with new components and developers using them in real products. Your logo appears where developers choose tools for a project. Early sponsors get the launch price and help keep EasyUI free and open source.
      </p>
    ),
  },
  {
    id: 'after-the-month',
    title: 'What happens after the month ends, and how many spots are there',
    content: (
      <p>
        There are only four spots, filled first come, first placed. Your payment doesn’t renew automatically, and your logo comes down when the month ends. You can sponsor again if a spot is open. The launch price may increase next month.
      </p>
    ),
  },
  {
    id: 'placement-order',
    title: 'How is my sponsor slot assigned',
    content: (
      <p>
        Checkout does not reserve a specific slot. I’ll verify completed payments in Dodo Payments and assign placements by Dodo’s payment time, then email you to confirm. If all four slots fill before your payment completes, I’ll contact you about a refund or waitlist.
      </p>
    ),
  },
];
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function SponsorSlot({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={getSponsorHref(sponsor) || undefined}
      target="_blank"
      rel="noopener sponsored"
      aria-label={`Visit ${sponsor.name} (opens in a new tab)`}
      onClick={() => trackSponsorClick(sponsor.name, 'sponsors-page')}
      className="group flex min-h-11 items-center gap-3 border-b border-border py-3 transition-colors duration-200 hover:text-text-primary focus-ring"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SponsorLogo sponsor={sponsor} imgClassName="h-5" />
        <div className="min-w-0">
          <div className="truncate text-[14px] font-medium text-text-primary">{sponsor.name}</div>
          <div className="truncate text-[12px] text-text-muted">{displayUrl(sponsor.url)}</div>
        </div>
      </div>
    </a>
  );
}

export const SponsorsPage: React.FC = () => {
  const activeSponsors = getActiveSponsors().slice(0, MAX_SLOTS);
  const paymentReady = isPaymentLinkReady;
  const checkoutHref = getCheckoutHref();
  const openSlots = getOpenSlots();
  const emailHref = `mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent('EasyUI sponsorship')}`;
  const waitlistHref = `mailto:${SPONSOR_CONTACT_EMAIL}?subject=${encodeURIComponent('EasyUI sponsor availability')}`;
  const handleSponsorCta = () => trackSponsorCta({ placement: 'sponsors-page' });

  const numbers = [
    { value: stats.last30d.visitors, label: 'Visitors', countUp: true },
    { value: stats.last30d.pageViews, label: 'Page views', countUp: true },
  ];

  return (
    <main className="min-h-screen bg-background pb-24 text-text-primary">
      <Container size="lg">
        <section className="scroll-mt-28 pt-4 sm:pt-8">
          <Reveal>
            <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
              <span className="text-[12px] uppercase tracking-[0.18em] text-text-muted">Sponsorship</span>
              <h1 aria-label="Get your brand in front of developers" className="mt-4 max-w-[18ch] text-[clamp(2rem,6vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.04em] text-text-primary">
                <span className="block">Get your brand in</span>
                <span className="block">front of developers</span>
              </h1>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-text-secondary">
                <span className="block sm:inline">Reach a global community of developers</span>{' '}
                <span className="block sm:inline">building with EasyUI</span>
              </p>
              <div className="mt-5">{openSlots === 0 ? (
                    <div className="flex flex-col items-center gap-3">
                      <button type="button" disabled className={CTA_CLASS}>Sold out</button>
                      <p className="max-w-[48ch] text-[13px] leading-relaxed text-text-muted">
                        Interested in sponsoring? <a href={waitlistHref} className="text-text-secondary underline underline-offset-4 hover:text-text-primary focus-ring">Email {SPONSOR_CONTACT_EMAIL}</a> and I can discuss a future placement or waitlist.
                      </p>
                    </div>
                  ) : paymentReady ? (
                    <a href={checkoutHref} target="_blank" rel="noopener" onClick={handleSponsorCta} className={CTA_CLASS}>Become a sponsor</a>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <button type="button" disabled className={CTA_CLASS}>Become a sponsor</button>
                      <span className="text-[12px] text-text-muted">Sponsorships opening soon</span>
                    </div>
                  )}</div>
            </div>
          </Reveal>
        </section>

        <Reveal delay={0.04} className="mt-8 sm:mt-10">
          <section id="slots" aria-labelledby="slots-heading" className="mx-auto max-w-[720px] scroll-mt-28">
            <h2 id="slots-heading" className="text-[15px] font-medium text-text-primary">
              Sponsors
            </h2>
            <p className="mt-1 text-[14px] font-medium text-text-secondary">First come, first placed · only 4 slots</p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Four sponsor placements">
              {Array.from({ length: MAX_SLOTS }, (_, index) => {
                const slot = index + 1;
                const sponsor = activeSponsors.find((candidate) => candidate.slot === slot);
                if (sponsor) return <SponsorSlot key={sponsor.name} sponsor={sponsor} />;
                return (
                  <div
                    key={slot}
                    className="flex aspect-square min-h-11 items-center justify-center rounded-md border border-dashed border-border px-2 text-[12px] text-text-muted"
                  >
                    Your logo
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.04} className="mt-[clamp(4rem,10vw,9rem)]">
          <section aria-labelledby="numbers-heading" className="mx-auto max-w-[720px]">
            <h2 id="numbers-heading" className="text-[15px] font-medium text-text-primary">
              By the numbers
            </h2>
            <p className="mt-2 text-[15px] text-text-secondary">We’re growing every day</p>

            <div className="mt-4 grid grid-cols-2 border-y border-border">
              {numbers.map((number) => (
                <div key={number.label} className={`py-4 sm:py-5 ${number.label === 'Visitors' ? 'border-r border-border pr-4 sm:pr-6' : 'pl-4 sm:pl-6'}`}>
                  <div className="text-[32px] font-medium tracking-[-0.04em] text-text-primary sm:text-[40px]">
                    {number.value}
                  </div>
                  <div className="mt-1 text-[14px] text-text-muted">{number.label}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-right text-[12px] text-text-muted">
              Last 30 days, from Tracewell. Checked Nov 2, 2026
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.08} className="mt-[clamp(4rem,10vw,9rem)]">
          <section aria-labelledby="why-heading" className="mx-auto max-w-[720px]">
            <h2 id="why-heading" className="text-[15px] font-medium text-text-primary">
              Why sponsor
            </h2>

            <ul className="mt-4 grid md:grid-cols-3">
              {WHY_SPONSOR.map((point) => (
                <li key={point} className="border-t border-border py-4 text-[15px] leading-relaxed text-text-secondary md:border-t-0 md:border-r md:pr-6 md:last:border-r-0 md:pl-6 md:first:pl-0">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.16} className="mt-[clamp(4rem,10vw,9rem)]">
          <section aria-labelledby="process-heading" className="mx-auto max-w-[720px] scroll-mt-28">
            <h2 id="process-heading" className="text-[20px] font-medium tracking-[-0.025em] text-text-primary">How it works</h2>
            <ol className="relative mt-5 grid gap-5 pl-5 before:absolute before:bottom-1 before:left-[5px] before:top-1 before:w-px before:bg-border lg:grid-cols-4 lg:gap-0 lg:pl-0 lg:before:left-0 lg:before:right-0 lg:before:top-[5px] lg:before:h-px lg:before:w-auto">
              {[
                { title: 'Pay', detail: 'Secure checkout' }, { title: 'Send details', detail: 'Via the Tally form' }, { title: 'We confirm', detail: 'By email' }, { title: 'Go live in 24h', detail: 'We’ll email you' },
              ].map((step, index) => (
                <li key={step.title} className="relative min-w-0 lg:pr-5 lg:pt-5">
                  <span className="absolute -left-5 top-0 bg-background pr-2 text-[12px] text-text-muted lg:left-0 lg:top-0 lg:pr-3">{index + 1}</span>
                  <h3 className="pt-5 text-[15px] font-medium text-text-primary lg:pt-0">{step.title}</h3>
                  <p className="mt-1 text-[12px] text-text-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={0.2} className="mt-[clamp(4rem,10vw,9rem)]">
          <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto max-w-[720px] scroll-mt-24">
            <h2 id="pricing-heading" className="sr-only">
              Pricing
            </h2>

            <div className="py-2">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-text-muted">
                    Launch offer, one month
                  </p>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[52px] font-medium leading-none tracking-[-0.045em] text-text-primary">
                      ${SPONSOR_PRICE}
                    </span>
                    <span className="text-[21px] font-medium text-text-muted line-through decoration-text-muted/70">
                      $69
                    </span>
                    <span className="text-[13px] text-text-muted">/ month</span>
                  </div>
                  <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-text-secondary">
                    One-time payment. No auto-renewal. Launch pricing may go up next month, so early sponsors get the best rate.
                  </p>

                  <div className="mt-7">
                    {openSlots > 0 && paymentReady ? (
                      <a href={checkoutHref} target="_blank" rel="noopener" onClick={handleSponsorCta} className={CTA_CLASS}>
                        Become a sponsor
                      </a>
                    ) : openSlots === 0 ? (
                      <button
                        type="button"
                        disabled
                        className={CTA_CLASS}
                        title="All sponsor slots are full"
                      >
                        Sold out
                      </button>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        <button type="button" disabled className={CTA_CLASS} title="Sponsorships opening soon">Become a sponsor</button>
                        <p className="text-[12px] text-text-muted">Sponsorships opening soon</p>
                      </div>
                    )}

                    {openSlots === 0 && isSponsorContactReady && (
                      <p className="mt-3 max-w-[48ch] text-[12px] leading-relaxed text-text-muted">
                        Interested in sponsoring? <a
                          href={waitlistHref}
                          className="text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary focus-ring"
                        >
                          Email {SPONSOR_CONTACT_EMAIL
                        }</a> and I can discuss a future placement or waitlist.
                      </p>
                    )}

                  </div>
                </div>

                <div className="pt-2 lg:pl-10">
                  <h3 className="text-[12px] uppercase tracking-[0.16em] text-text-muted">
                    What you get
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {BENEFITS.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-text-secondary">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.24} className="mt-[clamp(4rem,10vw,9rem)]">
          <section aria-labelledby="faq-heading" className="mx-auto max-w-[720px]">
            <h2 id="faq-heading" className="mb-4 text-[20px] font-medium tracking-[-0.025em] text-text-primary">Questions</h2>
            <UnfoldAccordion
              items={SPONSOR_FAQS}
              className="rounded-none border-x-0 border-t-0 bg-transparent [&_button]:min-h-14 [&>div]:rounded-xl [&>div:has(button:hover)]:bg-surface-raised/40 [&>div:has(button:focus-visible)]:bg-surface-raised/40 [&_button]:rounded-xl [&_button]:px-3 [&_button]:py-5 [&_button:hover]:bg-transparent [&_button]:transition-colors [&_button>div>div:first-child]:text-base [&_div.overflow-hidden>div]:px-3 [&_div.overflow-hidden>div]:pb-6 [&_div.overflow-hidden>div]:text-[15px] [&_div.overflow-hidden>div]:leading-relaxed"
            />
            <p className="mt-5 text-[12px] text-text-muted">
              Still have a question?{' '}
              {isSponsorContactReady ? <a href={emailHref} className="text-text-secondary underline-offset-4 hover:text-text-primary hover:underline focus-ring">Email us</a> : 'Sponsorships opening soon'}
            </p>
          </section>
        </Reveal>
      </Container>
    </main>
  );
};

export default SponsorsPage;
