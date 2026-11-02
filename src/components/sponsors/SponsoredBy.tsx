import React from 'react';
import { Plus } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Container } from '../layout/Container';
import { getActiveSponsors, getOpenSlots, getSponsorHref } from '../../lib/sponsors';
import { trackSponsorClick, trackSponsorCta } from '../../lib/sponsor-tracking';
import { SponsorLogo } from './SponsorLogo';

export interface SponsoredByProps {
  onNavigateSponsors?: () => void;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const TRACWELL_HREF =
  'https://tracwell.app/?utm_source=easyui&utm_medium=referral&utm_campaign=analytics_sponsor';

export const SponsoredBy: React.FC<SponsoredByProps> = ({ onNavigateSponsors }) => {
  const activeSponsors = getActiveSponsors();
  const openSlots = getOpenSlots();
  const shouldReduceMotion = useReducedMotion();

  const handlePlaceholderClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigateSponsors) return;
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigateSponsors();
    }
  };

  return (
    <section aria-labelledby="sponsored-by-label" className="pb-8 sm:pb-10">
      <Container size="lg">
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'show'}
          variants={shouldReduceMotion ? undefined : containerVariants}
          className="flex flex-col items-center gap-3"
        >
          <motion.span
            id="sponsored-by-label"
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="text-[10px] uppercase tracking-[0.18em] text-text-muted"
          >
            Supported by
          </motion.span>

          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5" aria-label="Analytics provider and sponsors">
            <motion.li variants={shouldReduceMotion ? undefined : itemVariants}>
              <a
                href={TRACWELL_HREF}
                target="_blank"
                rel="noopener noreferrer sponsored"
                aria-label="Visit Tracwell, EasyUI’s analytics provider (opens in a new tab)"
                title="Tracwell"
                onClick={() => trackSponsorClick('Tracwell', 'home')}
                className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border bg-surface p-2 transition-colors duration-200 hover:border-border-hover focus-ring"
              >
                <img src="/tracwell-icon-dark.svg" alt="" width="22" height="22" className="h-[22px] w-[22px] object-contain" />
              </a>
            </motion.li>

            {activeSponsors.map((sponsor) => (
              <motion.li key={sponsor.name} variants={shouldReduceMotion ? undefined : itemVariants}>
                <a
                  href={getSponsorHref(sponsor) || undefined}
                  target="_blank"
                  rel="noopener sponsored"
                  aria-label={`Visit ${sponsor.name} (opens in a new tab)`}
                  onClick={() => trackSponsorClick(sponsor.name, 'home')}
                  title={sponsor.name}
                  className="group flex h-10 w-10 items-center justify-center rounded-[14px] border border-border bg-surface p-2 transition-colors duration-200 hover:border-border-hover focus-ring"
                >
                  <SponsorLogo
                    sponsor={sponsor}
                    imgClassName="h-5 max-w-6"
                    className="opacity-70 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
                  />
                </a>
              </motion.li>
            ))}

            <motion.li variants={shouldReduceMotion ? undefined : itemVariants}>
              <a
                href="/sponsors"
                aria-label={openSlots > 0 ? 'Become a sponsor' : 'View sponsorship options and contact EasyUI'}
                title={openSlots > 0 ? 'Become a sponsor' : 'Sponsorships are full; view contact options'}
                onClick={(event) => {
                  trackSponsorCta({ placement: 'home' });
                  handlePlaceholderClick(event);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-dashed border-border text-text-muted transition-colors duration-200 hover:border-border-hover hover:text-text-primary focus-ring"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.li>
          </ul>
        </motion.div>
      </Container>
    </section>
  );
};
