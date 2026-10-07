'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * A premium dark "wallet" card with a blue gradient surface, balance
 * display, a small iOS-style toggle, and a primary action button.
 *
 * The card responds subtly to the pointer with a soft cyan shine
 * following the cursor — same architecture as `SpotlightCard`:
 *
 *   pointer  →  MotionValue  →  motion template  →  radial gradient
 *
 * No React state is updated per frame; the shine is driven entirely
 * through MotionValues.
 */
export interface WalletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Balance string rendered as the headline figure. */
  balance?: string;
  /** Card brand label (e.g. "Mastercard", "Visa"). */
  cardType?: string;
  /** Last four digits of the underlying card. */
  cardLastFour?: string;
  /** Label for the action button. */
  buttonLabel?: string;
  /** Optional click handler for the action button. */
  onUseWallet?: () => void;
  /** Disable the action button. */
  disabled?: boolean;
  /** Caption rendered as the small label under the balance. */
  balanceLabel?: string;
  className?: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance = '$4,566.00',
  cardType = 'Mastercard',
  cardLastFour = '3040',
  buttonLabel = 'Use Wallet',
  onUseWallet,
  disabled = false,
  balanceLabel = 'Total Balance',
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Initialise the values far off-canvas so the shine is hidden at rest.
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    pointerX.set(-1000);
    pointerY.set(-1000);
  };

  // Cyan-tinted spotlight that follows the cursor. The 0.18 opacity at
  // peak keeps it as a hint rather than a wash.
  const shineBackground = useMotionTemplate`radial-gradient(220px circle at ${pointerX}px ${pointerY}px, rgba(56, 224, 240, 0.18), transparent 70%)`;

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative isolate w-full max-w-[458px] aspect-[458/285]',
        'overflow-hidden rounded-[26px]',
        'bg-[#020202]',
        'text-white',
        'shadow-[0_24px_42px_rgba(0,0,0,0.48),0_8px_20px_rgba(0,0,0,0.28)]',
        'font-sans select-none',
        className
      )}
      {...props}
    >
      {/* =====================================================
          Header — title, subtitle, action button
      ====================================================== */}
      <div className="relative z-10 flex min-h-[84px] items-start justify-between px-[22px] pt-[23px]">
        <div className="min-w-0">
          <h2 className="m-0 text-[22px] font-normal leading-[1.05] tracking-[-0.025em] text-white/90">
            Wallet
          </h2>
          <p className="m-0 mt-[7px] text-[12px] font-normal leading-[1.2] tracking-[-0.01em] text-white/40">
            {cardType} Ending with {cardLastFour}
          </p>
        </div>

        <motion.button
          type="button"
          onClick={onUseWallet}
          disabled={disabled}
          aria-label={buttonLabel}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          className={cn(
            'shrink-0 min-h-[35px] rounded-full border-0 px-4',
            'bg-gradient-to-br from-[#1675e8] to-[#4698ed]',
            'text-[12px] font-medium tracking-[-0.01em] text-white/95',
            'shadow-[inset_0_1px_1px_rgba(255,255,255,0.16),0_3px_9px_rgba(0,71,180,0.24)]',
            'transition-[transform,filter,box-shadow] duration-150 ease-out',
            'hover:-translate-y-px hover:brightness-110',
            'hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_5px_13px_rgba(0,71,180,0.32)]',
            'active:translate-y-0 active:scale-[0.98]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-3',
            'disabled:pointer-events-none disabled:opacity-50',
            'cursor-pointer'
          )}
        >
          {buttonLabel}
        </motion.button>
      </div>

      {/* =====================================================
          Blue Card Surface — the gradient "card" inside the card
      ====================================================== */}
      <div
        className={cn(
          'absolute inset-[84px_4px_4px_4px] overflow-hidden rounded-[22px]',
          'bg-[radial-gradient(ellipse_34%_68%_at_88%_38%,rgba(8,207,230,0.98)_0%,rgba(6,169,220,0.92)_20%,rgba(9,100,211,0.45)_42%,transparent_68%),radial-gradient(ellipse_48%_75%_at_63%_72%,rgba(10,48,206,0.95)_0%,rgba(18,53,207,0.68)_43%,transparent_72%),radial-gradient(ellipse_70%_85%_at_25%_65%,rgba(11,70,225,0.94)_0%,rgba(19,43,199,0.78)_48%,transparent_78%),linear-gradient(145deg,#213bd6_0%,#1232d4_45%,#102ac5_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.14)]'
        )}
      >
        {/* Pointer-driven shine — sits above the gradient but below
            the toggle / balance content. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: shineBackground }}
        />

        {/* Soft outer glow bloom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[20%_-10%] -z-10 rotate-[-9deg] blur-[18px] bg-[radial-gradient(ellipse_24%_58%_at_73%_38%,rgba(0,214,232,0.75),transparent_72%),radial-gradient(ellipse_17%_42%_at_82%_54%,rgba(25,218,239,0.54),transparent_72%)]"
        />

        {/* Diagonal specular sweep — gives the surface a glassy depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(124deg,transparent_0%,rgba(255,255,255,0.025)_36%,rgba(255,255,255,0.07)_47%,transparent_59%)]"
        />

        {/* iOS-style toggle */}
        <div
          aria-hidden="true"
          className="absolute left-[21px] top-[25px] h-[27px] w-[47px] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0_50%,rgba(255,255,255,0.13)_50%_100%)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.16)]"
        >
          <span className="absolute left-[2px] top-[2px] h-[23px] w-[23px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,rgba(218,224,239,0.94)_70%,rgba(191,201,224,0.9)_100%)] shadow-[0_2px_5px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.9)]" />
        </div>

        {/* Balance */}
        <div className="absolute bottom-[23px] left-[22px] flex flex-col items-start">
          <span className="whitespace-nowrap text-[clamp(29px,4.1vw,38px)] font-light leading-[0.95] tracking-[-0.045em] text-white/85">
            {balance}
          </span>
          <span className="mt-[8px] text-[12px] font-normal leading-none tracking-[-0.01em] text-white/40">
            {balanceLabel}
          </span>
        </div>
      </div>
    </article>
  );
};

export default WalletCard;
