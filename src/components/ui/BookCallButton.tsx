'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * A premium "Book a call" pill with a green expanding capsule.
 *
 * Interaction model:
 *   idle  → 36% green capsule on the left with a dotted arrow + label
 *   hover → capsule expands to full width, label slides out, a phone
 *           icon with ringing lines fades in centered
 *
 * Motion is a small, geometry-aware state choreography — three
 * independently-timed layers (capsule, label/arrow, phone) using
 * framer-motion springs with explicit constants near the top of
 * the file (Rule 41). prefers-reduced-motion collapses all
 * spring transitions to instant (Rule 34).
 */
export interface BookCallButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'onClick' | 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
  > {
  /** Button label rendered on the right of the dotted arrow. */
  children?: string;
  /** Click handler — ignored when `href` is also provided. */
  onClick?: () => void;
  /** When provided, renders an <a> with this href instead of a <button>. */
  href?: string;
  /** Class name merged into the pill root. */
  className?: string;
}

/** Pill geometry. */
const PILL_HEIGHT = 96;
const PILL_INSET = 10; // the breathing room between the pill edge and the capsule
const PILL_RADIUS = PILL_HEIGHT / 2; // 48 — perfect pill
const CAPSULE_REST = '36%'; // capsule width at rest

/** Accent color — a single controlled accent (Rule 3). */
const ACCENT = '#82ff22';
const INK = '#090909';
const FOREGROUND = '#f5f5f5';

/**
 * Spring constants — kept local to this component rather than
 * going through the shared `motionTransitions` because each
 * layer here has a deliberately different feel.
 */
const EXPAND_SPRING = {
  type: 'spring' as const,
  stiffness: 190,
  damping: 24,
  mass: 0.85,
};

const CONTENT_SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 24,
  mass: 0.7,
};

const TAP_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 24,
};

/**
 * A dotted arrow glyph that hints at motion to the right. The
 * exact dot positions came from the original reference and are
 * what makes the icon read as an "arrow at rest" rather than a
 * generic shape.
 */
const DottedArrow: React.FC = () => {
  // Rule 20: SVG for vector icons. Each dot is a single <circle>
  // so it can scale crisply at any preview size.
  const dots: Array<[number, number]> = [
    [17, 13],
    [28, 13],
    [28, 22],
    [38, 29],
    [28, 30],
    [38, 37],
    [28, 44],
    [17, 47],
    [17, 25],
    [17, 36],
  ];

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {dots.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="3" fill="currentColor" />
      ))}
    </svg>
  );
};

/**
 * A phone handset with two "ringing" arcs to the upper-right.
 * The handset path follows the original reference; the arcs
 * are kept short so they sit comfortably within the 52×52
 * viewBox without crowding the capsule.
 */
const PhoneIcon: React.FC = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden="true"
  >
    {/* Handset body */}
    <path
      d="M17.5 11.7C15.4 10.2 12.8 10.8 11.5 13L9.4 16.7C8.3 18.6 8.4 20.9 9.7 22.6C14.4 29.1 20.2 34.9 26.7 39.6C28.4 40.9 30.7 41 32.6 39.9L36.3 37.8C38.5 36.5 39.1 33.9 37.6 31.8L34.2 27C32.9 25.2 30.4 24.7 28.6 26L26.5 27.5C23.8 25.5 21.5 23.2 19.5 20.5L21 18.4C22.3 16.6 21.8 14.1 20 12.8L17.5 11.7Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* First ringing arc — closer to the handset */}
    <path
      d="M32.7 11.4C36.5 12.5 39.5 15.5 40.6 19.3"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Second ringing arc — further out, visually a "louder ring" */}
    <path
      d="M36.4 7.2C42 8.8 46.4 13.2 48 18.8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * The expanding green capsule + content layers. Lives inside
 * the pill so it can take the full pill rect as its reference
 * for animation.
 */
const BookCallPillLayers: React.FC<{
  hovered: boolean;
  reduceMotion: boolean | null;
  label: string;
}> = ({ hovered, reduceMotion, label }) => {
  // Rule 34: when reduced motion is preferred, jump straight
  // to the final state — no spring travel, no phone entrance.
  const expandTransition = reduceMotion ? { duration: 0 } : EXPAND_SPRING;
  const contentTransition = reduceMotion ? { duration: 0 } : CONTENT_SPRING;

  return (
    <>
      {/* Layer 0 — black pill body. Pure decoration, no event handlers. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: INK, borderRadius: PILL_RADIUS }}
      />

      {/* Layer 1 — the green expanding capsule. transformOrigin
          is "left center" so the expansion feels directional —
          the capsule grows to the right rather than scaling
          from its own midpoint. */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          hovered
            ? { left: PILL_INSET, right: PILL_INSET, width: 'auto', scaleX: 1 }
            : { left: PILL_INSET, right: 'auto', width: CAPSULE_REST, scaleX: 1 }
        }
        transition={expandTransition}
        className="absolute z-[1]"
        style={{
          top: PILL_INSET,
          bottom: PILL_INSET,
          backgroundColor: ACCENT,
          borderRadius: 999,
          transformOrigin: 'left center',
        }}
      />

      {/* Layer 2 — rest state content. A 36% column on the left
          with the dotted arrow, followed by the label. The
          whole layer fades and slides right as the capsule
          takes over. */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 0 : 1,
          x: hovered ? 18 : 0,
        }}
        transition={contentTransition}
        className="absolute inset-0 z-[2] flex items-center"
        style={{ color: INK }}
      >
        <div
          className="flex h-full items-center justify-center"
          style={{ width: CAPSULE_REST }}
        >
          <DottedArrow />
        </div>
        <span
          className={cn(
            'whitespace-nowrap pl-[8px] font-normal leading-none tracking-[-0.045em] text-[30px]',
            'sm:text-[31px]'
          )}
          style={{ color: FOREGROUND }}
        >
          {label}
        </span>
      </motion.div>

      {/* Layer 3 — hover state content. The phone icon with
          ringing arcs, centered. pointer-events-none so it
          never intercepts clicks intended for the underlying
          <button>/<a>. */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.5,
          rotate: hovered ? 0 : -8,
        }}
        transition={contentTransition}
        className="absolute inset-0 z-[3] flex items-center justify-center"
        style={{ color: INK, pointerEvents: 'none' }}
      >
        <PhoneIcon />
      </motion.div>
    </>
  );
};

/**
 * The exported button. Resolves to <a> when `href` is given so
 * the component can sit on a marketing page (rendered as a link)
 * or as a true form action (rendered as a button) without a
 * second API (Rule 40: no unnecessary configuration).
 */
export const BookCallButton: React.FC<BookCallButtonProps> = ({
  children = 'Book a call',
  onClick,
  href,
  className,
  ...props
}) => {
  // hovered is a single boolean; it's used to drive three
  // independent motion layers, so React state is the right
  // fit here (Rule 23: React state for semantic UI state, not
  // for continuous pointer values).
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // Rule 11/12: hover + tap are present but small. The 1.01
  // hover scale and 0.975 tap scale leave the underlying
  // expanding capsule's geometry untouched — those springs
  // own the visual story.
  const hoverProps = reduceMotion
    ? {}
    : { scale: 1.01, transition: TAP_SPRING };
  const tapProps = reduceMotion ? {} : { scale: 0.975, transition: TAP_SPRING };

  // The shared motion props for both <a> and <button> variants.
  // Class names are Tailwind-only (no `<style jsx>` — Rule 69)
  // and merged with `cn()` (Rule 39).
  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    onPointerDown: () => setHovered(true),
    onPointerUp: () => setHovered(false),
    onPointerCancel: () => setHovered(false),
    whileHover: hoverProps,
    whileTap: tapProps,
    'aria-label': children,
    className: cn(
      'relative block overflow-hidden rounded-full border-0 bg-transparent p-0 text-left outline-none',
      // Rule 33: visible focus ring tied to the accent so the
      // button stays keyboard-navigable without changing the
      // surface palette.
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#82ff22]',
      // Default geometry — overridable via className.
      'h-24 w-[306px]',
      className
    ),
    // Inline `style` is reserved for dynamic values (Rule 70).
    // Here we want the inner shadow to be a constant inset
    // border that survives arbitrary className width changes.
    style: {
      boxShadow: 'inset 0 0 0 3px #111',
    },
  } as const;

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        rel="noreferrer"
      >
        <BookCallPillLayers hovered={hovered} reduceMotion={reduceMotion} label={children} />
      </motion.a>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      type="button"
      onClick={onClick}
      {...props}
    >
      <BookCallPillLayers hovered={hovered} reduceMotion={reduceMotion} label={children} />
    </motion.button>
  );
};

export default BookCallButton;
