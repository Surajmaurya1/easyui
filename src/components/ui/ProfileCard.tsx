'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * A premium dark profile card: a painted cover-art panel on top with a
 * Follow action, and a detail panel below holding avatar, name,
 * description, follower stats, and an outbound website link.
 *
 * Spring-tap on Follow (Rule 11) and a soft hover lift on the avatar
 * (Rule 12) are the only motion — everything else is static, in
 * keeping with the "minimal at idle, sophisticated on interaction"
 * philosophy (Rule 1).
 *
 * The Follow button lives in an isolated motion context so its scale
 * change never reflows the rest of the card.
 */
export interface ProfileCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Display name shown in the detail panel header. */
  name?: string;
  /** Handle rendered as the small caption under the name. */
  username?: string;
  /** Biographical text shown under the name. */
  description?: string;
  /** Pre-formatted follower count (e.g. "24,3K"). */
  followers?: string;
  /** Pre-formatted post count (e.g. "72"). */
  posts?: string;
  /** Website domain (e.g. "jether.com"). */
  website?: string;
  /** Label for the primary action button. */
  actionLabel?: string;
  /** Optional click handler for the action button. */
  onAction?: () => void;
  className?: string;
}

const RADIUS = 'rounded-[40px]';
const MOBILE_RADIUS = 'sm:rounded-[30px]';

/**
 * A blue star burst verification badge (Rule 20: SVG for vector icons).
 */
const VerifiedIcon: React.FC = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 27 27"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13.5 .8L16.1 2.15L19 1.9L20.7 4.25L23.4 5.15L23.55 8.05L25.25 10.45L23.75 12.95L23.9 15.85L21.35 17.2L20.05 19.85L17.15 19.7L14.7 21.3L12.2 19.8L9.3 19.95L7.95 17.4L5.3 16.1L5.45 13.2L3.9 10.75L5.4 8.3L5.25 5.4L7.9 4.1L9.2 1.45L12.1 1.6L13.5 .8Z"
      fill="#1597E8"
    />
    <path
      d="M9.3 10.9L12.05 13.6L18 7.8"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A simple outbound link glyph.
 */
const LinkIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M10 13.9L14 10.1" stroke="#8799D4" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M9.2 16.8L7.65 18.35C6.15 19.85 3.7 19.85 2.2 18.35C0.7 16.85 0.7 14.4 2.2 12.9L6.7 8.4C8.2 6.9 10.65 6.9 12.15 8.4"
      stroke="#8799D4"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M11.85 15.6C13.35 17.1 15.8 17.1 17.3 15.6L21.8 11.1C23.3 9.6 23.3 7.15 21.8 5.65C20.3 4.15 17.85 4.15 16.35 5.65L14.8 7.2"
      stroke="#8799D4"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * The official X (formerly Twitter) logo. Source: about.twitter.com
 * brand guidelines. Rendered as a single filled path so the strokes
 * stay crisp at any size.
 */
const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * The cover-art surface. A single absolutely-positioned stack of
 * blue and black radial / linear gradients produces the "blue moon"
 * appearance. The art is purely decorative and is hidden from
 * assistive tech (Rule 32).
 */
const CoverArtwork: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 overflow-hidden bg-black"
  >
    {/* Upper blue glow */}
    <div className="absolute -left-[170px] -top-[150px] h-[340px] w-[760px] rounded-full bg-[radial-gradient(ellipse_at_55%_60%,#6e87ed_0%,#354e9a_28%,#101a36_57%,#020307_78%)]" />
    {/* Upper black curve */}
    <div className="absolute -left-[220px] -top-[155px] h-[300px] w-[880px] rounded-[50%] bg-black [transform:rotate(-16deg)]" />
    {/* Main blue curve */}
    <div className="absolute -left-[55px] top-[120px] h-[220px] w-[720px] rounded-[50%] bg-[radial-gradient(ellipse_at_45%_35%,#5b72cf_0%,#273967_34%,#0a1225_62%,#000_82%)]" />
    {/* Black separator */}
    <div className="absolute -left-[110px] top-[100px] h-[140px] w-[820px] rounded-[50%] bg-black [transform:rotate(-4deg)]" />
    {/* Lower blue region */}
    <div className="absolute -left-[65px] top-[160px] h-[170px] w-[760px] rounded-[50%] bg-[radial-gradient(ellipse_at_48%_0%,#7188e7_0%,#394e92_35%,#101a35_66%,#020307_88%)]" />
    {/* Lower darkness */}
    <div className="absolute -right-[180px] -bottom-[90px] h-[240px] w-[520px] rounded-full bg-[radial-gradient(circle,#0d152c_0%,#03050b_55%,#000_78%)] opacity-90" />
  </div>
);

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name = 'Suraj',
  username = '@surajmaurya_m',
  description = 'Building EasyUI. Engineer.',
  followers = '200K',
  posts = '72',
  website = 'easyui.site',
  actionLabel = 'Follow',
  onAction,
  className,
  ...props
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <article
      className={cn(
        'relative mx-auto w-full max-w-[586px] overflow-hidden text-white',
        RADIUS,
        MOBILE_RADIUS,
        'bg-black shadow-[0_18px_45px_rgba(0,0,0,0.14)]',
        className
      )}
      {...props}
    >
      {/* ============== Cover ============== */}
      <div
        className={cn(
          'relative h-[260px] w-full',
          'max-sm:h-[180px]'
        )}
      >
        <CoverArtwork />

        {/* Secondary + primary action — grouped at the bottom-right
            of the cover. The Follow button is a motion.button so the
            spring-tap (Rule 11) is owned by the Motion runtime. */}
        <div
          className={cn(
            'absolute bottom-[20px] right-[24px] flex items-center gap-[10px]',
            'max-sm:bottom-[14px] max-sm:right-[16px] max-sm:gap-[5px]'
          )}
        >
          <button
            type="button"
            aria-label="Open X (Twitter) profile in a new tab"
            className={cn(
              'flex h-[36px] w-[36px] items-center justify-center text-[#A5ACBD]',
              'transition-colors duration-150 ease-out hover:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
              'max-sm:h-[32px] max-sm:w-[32px]'
            )}
          >
            <XLogo />
          </button>

          <motion.button
            type="button"
            onClick={onAction}
            aria-label={actionLabel}
            // Rule 11: subtle press response via Motion, not raw CSS.
            // Rule 34: when reduced-motion is preferred, the press
            // scales are skipped entirely.
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            className={cn(
              'h-[36px] min-w-[112px] rounded-full bg-[#E4E9F9] px-5',
              'text-[15px] font-semibold tracking-[-0.02em] text-[#141414]',
              'transition-[transform,filter] duration-150 ease-out',
              'hover:scale-[1.025] hover:brightness-[1.02]',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30',
              'max-sm:h-[32px] max-sm:min-w-[88px] max-sm:px-4 max-sm:text-[13px]'
            )}
          >
            {actionLabel}
          </motion.button>
        </div>
      </div>

      {/* ============== Details ============== */}
      <div
        className={cn(
          'relative min-h-[280px] bg-[#030303] px-[41px] pb-[28px] pt-[78px]',
          'max-sm:min-h-[260px] max-sm:px-[27px] max-sm:pb-[24px] max-sm:pt-[64px]'
        )}
      >
        {/* Avatar — slightly elevates on hover (Rule 12). Stays
            pinned to the cover seam regardless of responsive padding
            because the surrounding detail panel owns its position. */}
        <div
          className={cn(
            'absolute left-[38px] top-[-58px] flex h-[110px] w-[110px] items-center justify-center',
            'overflow-hidden rounded-[28px] border-[5px] border-black bg-[#DCE5FF]',
            'transition-transform duration-200 ease-out hover:-translate-y-[3px]',
            'max-sm:left-[25px] max-sm:top-[-46px] max-sm:h-[92px] max-sm:w-[92px] max-sm:rounded-[23px]'
          )}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 82 82"
            fill="none"
            aria-hidden="true"
          >
            <rect width="82" height="82" rx="23" fill="#DCE5FF" />
            <path d="M29 20H48V38H29V20Z" fill="#000" />
            <path d="M48 20H67V47L48 58V20Z" fill="#000" />
            <path d="M29 38H48V67L29 57V38Z" fill="#000" />
            <path d="M48 48H67V67H48V48Z" fill="#000" />
          </svg>
        </div>

        {/* Name + verified tick — kept inline so the tick never drops
            to a new line regardless of the name's length. */}
        <div className="flex items-center gap-[9px]">
          <h2
            className={cn(
              'm-0 text-[30px] font-normal leading-none tracking-[-0.045em] text-white',
              'max-sm:text-[24px]'
            )}
          >
            {name}
          </h2>
          <VerifiedIcon />
        </div>

        {/* Handle */}
        <p
          className={cn(
            'mt-[7px] text-[16px] leading-none tracking-[-0.02em] text-[#747474]',
            'max-sm:text-[13px]'
          )}
        >
          {username}
        </p>

        {/* Bio */}
        <p
          className={cn(
            'mt-[18px] max-w-[500px] text-[15px] leading-[1.25] tracking-[-0.025em] text-[#8B8B8B]',
            'max-sm:text-[13px]'
          )}
        >
          {description}
        </p>

        {/* Follower + post counts */}
        <div
          className={cn(
            'mt-[18px] flex flex-wrap items-center gap-x-[22px] gap-y-2',
            'text-[15px] leading-none tracking-[-0.025em]',
            'max-sm:text-[13px]'
          )}
        >
          <span>
            <strong className="font-medium text-white">{followers}</strong>{' '}
            <span className="text-[#6F6F6F]">Followers</span>
          </span>
          <span>
            <strong className="font-medium text-white">{posts}</strong>{' '}
            <span className="text-[#6F6F6F]">Posts</span>
          </span>
        </div>

        {/* Outbound link — Rule 33: a visible focus ring keeps the
            card keyboard-navigable. target="_blank" gets a rel
            pairing for safety (Rule 75: external link hygiene). */}
        <a
          href={`https://${website}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Visit ${website} (opens in a new tab)`}
          className={cn(
            'mt-[18px] flex w-fit items-center gap-[7px]',
            'text-[15px] font-medium tracking-[-0.02em] text-[#6285D5]',
            'transition-opacity duration-150 ease-out hover:opacity-75',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6285D5] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            'max-sm:text-[13px]'
          )}
        >
          <LinkIcon />
          {website}
        </a>
      </div>
    </article>
  );
};

export default ProfileCard;
