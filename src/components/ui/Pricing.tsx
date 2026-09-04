import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

// Pro CTA — a quiet, premium EasyUI surface.
//
// The Pro button is a solid EasyUI monochrome surface with a
// *very* subtle inner gradient that gives it a polished-metal feel,
// plus a one-pass shimmer on hover that mirrors the existing
// Button.tsx "gradient" variant.  No blue, no neon, no rainbow —
// the premium feel comes from restraint, not saturation.
//
//   Layer 1 — Inner sheen (always visible).
//             A 180° gradient in the same hue family, with a very
//             gentle bright middle band.  In light mode the button
//             is dark: #1A1A1A → #2A2A2D → #1A1A1A.  In dark mode
//             the button is light: #FAFAFA → #FFFFFF → #F4F4F5.
//             Just enough to read as polished, never as "colorful".
//
//   Layer 2 — One-pass shimmer (hover only).
//             A single bright white beam that crosses the button
//             on hover, exactly like the existing Button.tsx
//             "gradient" variant (via-white/5, translateX, 1.6s).
//
// All animation respects `prefers-reduced-motion`.
const PRO_SHIMMER_STYLES = `
  /* ---------------------------------------------------------------- */
  /* Layer 1 — inner sheen.  Subtle vertical gradient in the same    */
  /* hue as the button.  Defined here (not inline) so the .dark       */
  /* override reliably wins specificity.                              */
  /* ---------------------------------------------------------------- */
  [data-pro-sheen] {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.04) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  .dark [data-pro-sheen] {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  /* ---------------------------------------------------------------- */
  /* Layer 2 — one-pass shimmer (hover only).                         */
  /* Single bright white beam crossing the button on hover, same     */
  /* vocabulary as the existing Button.tsx "gradient" variant.       */
  /* ---------------------------------------------------------------- */
  [data-pro-shimmer] {
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.45) 50%,
      transparent 100%
    );
  }
  .dark [data-pro-shimmer] {
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.7) 50%,
      transparent 100%
    );
  }

  /* ---------------------------------------------------------------- */
  /* Keyframes                                                        */
  /* ---------------------------------------------------------------- */
  @keyframes easyui-pro-shimmer {
    0%   { transform: translateX(-110%); }
    100% { transform: translateX(110%); }
  }

  /* ---------------------------------------------------------------- */
  /* Hover: only the shimmer beam animates.  The inner sheen is       */
  /* always-on, so the "polished metal" surface reads at rest too.    */
  /* ---------------------------------------------------------------- */
  .group\\/cta:hover [data-pro-shimmer] {
    animation: easyui-pro-shimmer 1600ms ease-out forwards;
    opacity: 1;
  }

  /* ---------------------------------------------------------------- */
  /* Reduced motion: disable all motion but keep the static sheen.    */
  /* ---------------------------------------------------------------- */
  @media (prefers-reduced-motion: reduce) {
    @keyframes easyui-pro-shimmer {
      0%, 100% { transform: translateX(-110%); opacity: 0; }
    }
    [data-pro-shimmer] {
      animation: none !important;
      opacity: 0 !important;
    }
  }
`;

export interface PricingFeature {
  /** Feature label, e.g. "All core components" */
  label: string;
  /** Optional supporting line shown beneath the label */
  description?: string;
}

export interface PricingTier {
  /** Display name, e.g. "Free" or "Pro" */
  name: string;
  /** Short descriptor, e.g. "Everything you need to start." */
  tagline?: string;
  /** Price string, e.g. "$0" or "$29" */
  price: string;
  /** Cadence, e.g. "Forever" or "One-time" */
  cadence: string;
  /** Feature list rendered under the price */
  features: (string | PricingFeature)[];
  /** Action button label */
  ctaLabel: string;
  /** Action button click handler */
  onCtaClick?: () => void;
}

export interface PricingProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Free (or left) tier */
  freeTier?: PricingTier;
  /** Pro (or right) tier */
  proTier?: PricingTier;
  /** Reverse layout: Pro on the left, Free on the right */
  reverse?: boolean;
  /** Force grid column layout: 1, 2, or 'auto' (default: 1 on mobile, 2 on md+) */
  columns?: 1 | 2 | 'auto';
  /** Optional caption rendered above the cards */
  eyebrow?: string;
  /** Optional headline rendered above the cards */
  heading?: string;
  /** Optional supporting copy */
  subheading?: string;
  className?: string;
}

// Default tier data — matches the EasyUI pricing story so the component
// renders meaningful content out of the box.
const DEFAULT_FREE_TIER: PricingTier = {
  name: 'Free',
  tagline: 'For personal & open-source projects',
  price: '$0',
  cadence: 'Forever',
  features: [
    'All components',
    'Copy & paste',
    'React + Tailwind',
    'MIT licensed',
  ],
  ctaLabel: 'Get started',
};

const DEFAULT_PRO_TIER: PricingTier = {
  name: 'Pro',
  tagline: 'For production teams',
  price: '$129',
  cadence: 'One-time payment',
  features: [
    'Everything in Free',
    'Premium components',
    'Advanced animations',
    'Future updates',
  ],
  ctaLabel: 'Get Pro',
};

const CARD_RADIUS = 'rounded-2xl';
const SHADOW_IDLE =
  'shadow-[0_0.5px_1px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.08)]';
const SHADOW_IDLE_DARK =
  'dark:shadow-[0_0.5px_1px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.5)]';
const SHADOW_PRO_LIGHT =
  'shadow-[0_1px_2px_rgba(15,15,20,0.06),0_8px_24px_-12px_rgba(15,15,20,0.18)]';
const SHADOW_PRO_DARK =
  'dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_12px_28px_-12px_rgba(0,0,0,0.6)]';

const TIER_BASE = cn(
  'group relative flex flex-col w-full min-w-0',
  CARD_RADIUS,
  'border bg-surface',
  'p-6 sm:p-8 md:p-10',
  'transition-[border-color,background-color,box-shadow] duration-300 ease-out',
  'focus-within:ring-2 focus-within:ring-[var(--indicator-active)]/40 focus-within:ring-offset-2 focus-within:ring-offset-bg',
);

const TIER_FREE = cn(
  'border-border text-text-primary',
  SHADOW_IDLE,
  SHADOW_IDLE_DARK,
  'hover:border-border-hover',
);

const TIER_PRO = cn(
  // Light mode: brighter surface to communicate premium
  'border-[#D4D4D8] bg-white',
  'text-[#0A0A0A]',
  // Dark mode: restrained elevation, slightly brighter surface
  'dark:border-[#2A2A2A] dark:bg-[#141414] dark:text-[#FAFAFA]',
  SHADOW_PRO_LIGHT,
  SHADOW_PRO_DARK,
  'hover:border-[#A1A1AA]',
  'dark:hover:border-[#3F3F46]',
);

const PRICE_NUM = 'text-4xl sm:text-5xl font-semibold tracking-[-0.035em] text-text-primary dark:text-white';
const PRICE_CADENCE = 'text-xs sm:text-sm text-text-muted';

function normalizeFeature(feature: string | PricingFeature): PricingFeature {
  return typeof feature === 'string' ? { label: feature } : feature;
}

function PricingCard({
  tier,
  featured,
  reduceMotion,
  className,
}: {
  tier: PricingTier;
  featured: boolean;
  reduceMotion: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...motionTransitions.springSmooth, delay: featured ? 0.05 : 0 }}
      className={cn(TIER_BASE, featured ? TIER_PRO : TIER_FREE, className)}
    >
      {/* Header — tier name + tagline */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-text-primary dark:text-white">
            {tier.name}
          </h3>
        </div>
        {tier.tagline && (
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {tier.tagline}
          </p>
        )}
      </div>

      {/* Price block */}
      <div className="mt-6 sm:mt-8 flex items-baseline gap-2 flex-wrap">
        <span className={PRICE_NUM}>{tier.price}</span>
        <span className={PRICE_CADENCE}>{tier.cadence}</span>
      </div>

      {/* Divider — visual rhythm */}
      <div
        aria-hidden="true"
        className={cn(
          'mt-6 sm:mt-8 h-px w-full',
          'bg-[#EDEDEF] dark:bg-[#1F1F1F]'
        )}
      />

      {/* Features list */}
      <ul className="mt-5 sm:mt-6 flex flex-col gap-3 sm:gap-3.5 flex-1">
        {tier.features.map((feature, i) => {
          const f = normalizeFeature(feature);
          return (
            <li
              key={`${tier.name}-${i}`}
              className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-text-secondary dark:text-text-secondary"
            >
              <Check
                aria-hidden="true"
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  featured
                    ? 'text-[#0A0A0A] dark:text-white'
                    : 'text-text-secondary'
                )}
                strokeWidth={2.25}
              />
              <span className="leading-relaxed">{f.label}</span>
            </li>
          );
        })}
      </ul>

      {/* CTA — reuses the existing EasyUI button system via button element
          styled to match Button.tsx "default" / "secondary" appearance. */}
      <button
        type="button"
        onClick={tier.onCtaClick}
        className={cn(
          'group/cta relative mt-8 sm:mt-10 inline-flex h-11 w-full items-center justify-center overflow-hidden',
          'rounded-lg px-5 text-sm font-medium select-none',
          'transition-transform duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--indicator-active)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          'active:scale-[0.98]',
          'hover:scale-[1.015]',
          featured
            ? // Pro CTA — solid EasyUI monochrome surface in the
              // gradient Button variant style, with a subtle
              // always-on inner sheen (Layer 1) and a one-pass
              // white shimmer on hover (Layer 2).  The sheen and
              // shimmer are defined in <style> below so the .dark
              // override reliably wins specificity.
              'bg-[#0E0E0E] text-white border border-[#1F1F1F] hover:border-[#3F3F46] hover:bg-[#141414] dark:bg-white dark:text-[#0A0A0A] dark:border-[#E4E4E7] dark:hover:border-[#A1A1AA] dark:hover:bg-[#FAFAFA]'
            : // Free CTA — secondary outline tone
              'bg-transparent text-text-primary border border-border hover:bg-surface-hover hover:border-border-hover dark:text-white dark:border-[#1F1F1F] dark:hover:bg-[#1A1A1A] dark:hover:border-[#4A4A4A]'
        )}
      >
        {featured && (
          <>
            {/* Layer 1 — Always-on inner sheen.
                A subtle 180° gradient in the same hue as the button
                that gives the surface a quietly polished feel.
                Defined entirely in <style> below. */}
            <span
              aria-hidden="true"
              data-pro-sheen
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
            />
            {/* Layer 2 — One-pass shimmer (hover only).
                A bright white beam that crosses the button on hover,
                mirroring the existing Button.tsx "gradient" variant. */}
            <span
              aria-hidden="true"
              data-pro-shimmer
              className={cn(
                'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0',
                'motion-reduce:group-hover/cta:animate-none motion-reduce:group-hover/cta:opacity-0'
              )}
            />
          </>
        )}
        <span className="relative z-10">{tier.ctaLabel}</span>
      </button>
    </motion.div>
  );
}

export const Pricing: React.FC<PricingProps> = ({
  freeTier = DEFAULT_FREE_TIER,
  proTier = DEFAULT_PRO_TIER,
  reverse = false,
  columns = 'auto',
  eyebrow,
  heading,
  subheading,
  className,
  ...props
}) => {
  const reduceMotion = useReducedMotion();

  const leftTier = reverse ? proTier : freeTier;
  const rightTier = reverse ? freeTier : proTier;
  const leftFeatured = reverse;
  const rightFeatured = !reverse;

  return (
    <section
      aria-label="Pricing"
      className={cn('w-full', className)}
      {...props}
    >
      {/* One-time injection of the Pro CTA shimmer keyframes. React deduplicates
          <style> tags, so this only mounts once per session. */}
      <style dangerouslySetInnerHTML={{ __html: PRO_SHIMMER_STYLES }} />
      {(eyebrow || heading || subheading) && (
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.035em] text-text-primary dark:text-white">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          'mx-auto grid w-full max-w-4xl min-w-0 gap-5 sm:gap-6 md:gap-8 items-stretch',
          columns === 2
            ? 'grid-cols-2'
            : columns === 1
            ? 'grid-cols-1'
            : 'grid-cols-1 md:grid-cols-2'
        )}
      >
        <PricingCard
          tier={leftTier}
          featured={leftFeatured}
          reduceMotion={!!reduceMotion}
        />
        <PricingCard
          tier={rightTier}
          featured={rightFeatured}
          reduceMotion={!!reduceMotion}
        />
      </div>
    </section>
  );
};

export default Pricing;
