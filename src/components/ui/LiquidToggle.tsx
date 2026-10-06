'use client';

import React, { useId, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme/useTheme';

/* =========================================================================
 * LiquidToggle
 * A toggle with a liquid/blob-like transition. The internal "blob" shape
 * morphs and stretches between the off and on positions rather than
 * simply translating. The blob deforms organically as it travels.
 * =======================================================================*/

export interface LiquidToggleProps {
  /** Controlled value */
  value?: boolean;
  /** Uncontrolled initial value */
  defaultValue?: boolean;
  /** Fired on toggle */
  onChange?: (value: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Off / on labels for accessibility (announced via aria-label) */
  offLabel?: string;
  onLabel?: string;
  /** Optional accent color for the blob when on */
  accentColor?: string;
  /** Optional className */
  className?: string;
  /** Show off/on text inside the toggle. Default true. */
  showLabels?: boolean;
  /** Width in px. Default 56. */
  width?: number;
  /** Height in px. Default 32. */
  height?: number;
}

// Number of control points for the blob path. Higher = smoother.
const BLOB_POINTS = 12;

// Generate a closed blob path for the toggle. `t` is a 0..1 progress where
// 0 = blob sits at the left (off) and 1 = blob sits at the right (on).
// We add a stretch along the travel axis and slight perpendicular
// compression to make the blob feel like it's "squirting" between sides.
//
// The path uses quadratic Bézier curves between control points to keep
// the silhouette perfectly smooth at every value of t and stretch —
// straight-line segments (a polygon) would show visible corners at this
// scale.
function buildBlobPath(
  width: number,
  height: number,
  t: number,
  stretch: number
): string {
  // The blob's base centerX is interpolated between left and right.
  const padding = 4;
  const leftX = padding + (height - padding * 2) / 2;
  const rightX = width - padding - (height - padding * 2) / 2;
  const cy = height / 2;
  const baseRadius = (height - padding * 2) / 2;

  // Travel axis: stretch elongates along X based on velocity of t change.
  // We blend stretch into the X radius only.
  const stretchX = 1 + stretch * 0.35;
  const stretchY = 1 - stretch * 0.12;
  const radiusX = baseRadius * stretchX;
  const radiusY = baseRadius * stretchY;

  const cx = leftX + (rightX - leftX) * t;

  // Generate N anchors on the elliptical perimeter with a very subtle
  // wobble that activates only when the blob is moving (stretch > 0).
  // At rest the blob is a perfect circle/oval — clean, no facets.
  const points: Array<[number, number]> = [];
  for (let i = 0; i < BLOB_POINTS; i++) {
    const angle = (Math.PI * 2 * i) / BLOB_POINTS - Math.PI / 2;
    // Wobble scales with stretch so the resting shape is purely circular.
    const wobble = 1 + stretch * 0.18 * Math.sin(angle * 3 + t * Math.PI * 2);
    const x = cx + Math.cos(angle) * radiusX * wobble;
    const y = cy + Math.sin(angle) * radiusY * wobble;
    points.push([x, y]);
  }

  // Build a closed smooth path with quadratic Béziers. Each anchor
  // serves as a curve handle for the next segment: the endpoint of
  // segment i is the midpoint between anchors i and i+1, and the
  // control point is anchor i+1. This is the standard "midpoint
  // smoothing" technique — every curve passes through the same set of
  // midpoints, so the silhouette is C1-continuous and rotationally
  // symmetric.
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];

  // Start at the midpoint between the last and first anchor.
  const start = mid(points[points.length - 1], points[0]);
  let d = `M ${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
  for (let i = 0; i < BLOB_POINTS; i++) {
    const ctrl = points[i];
    const next = points[(i + 1) % BLOB_POINTS];
    const end = mid(ctrl, next);
    d += ` Q ${ctrl[0].toFixed(2)} ${ctrl[1].toFixed(2)} ${end[0].toFixed(2)} ${end[1].toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

export const LiquidToggle: React.FC<LiquidToggleProps> = ({
  value: controlledValue,
  defaultValue = false,
  onChange,
  disabled = false,
  offLabel = 'Off',
  onLabel = 'On',
  accentColor,
  className,
  showLabels = true,
  width = 56,
  height = 32,
}) => {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const uniqueId = useId();
  const labelId = `liquid-toggle-label-${uniqueId}`;

  // Theme-aware defaults: blob is white in dark mode (so it pops on the
  // black track), near-black in light mode (so it pops on the white track).
  const blobColor = accentColor ?? (isDark ? '#FAFAFA' : '#0A0A0A');

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const isOn = isControlled ? Boolean(controlledValue) : internalValue;

  const setValue = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  // Drive the blob position with a MotionValue so we can sample it on
  // every frame and re-build the SVG path without re-rendering React.
  const progress = useMotionValue(isOn ? 1 : 0);
  // Apple-style: ~350ms travel, slight overshoot for that liquid feel.
  const progressSpring = useSpring(progress, {
    stiffness: 280,
    damping: 24,
    mass: 0.55,
  });

  // Track the stretch amount: a transient value that spikes when the
  // progress is moving, then decays. Tuned for a soft elastic settle.
  const stretch = useMotionValue(0);
  const stretchSpring = useSpring(stretch, {
    stiffness: 240,
    damping: 18,
    mass: 0.4,
  });

  // Keep progress in sync with state.
  useEffect(() => {
    progress.set(isOn ? 1 : 0);
  }, [isOn, progress]);

  // Stretch: when the value changes, we momentarily spike the stretch and
  // let it decay back to 0. We observe velocity of the progress spring.
  useEffect(() => {
    if (reducedMotion) return;
    let prev = progressSpring.get();
    const unsubscribe = progressSpring.on('change', (latest) => {
      const velocity = Math.abs(latest - prev);
      const desired = Math.min(1, velocity * 6);
      stretch.set(desired);
      prev = latest;
    });
    return () => unsubscribe();
  }, [progressSpring, stretch, reducedMotion]);

  // Animate stretch back to 0 whenever the progress stops changing.
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      const current = stretch.get();
      if (current > 0.01) {
        stretch.set(current * 0.85);
      } else {
        stretch.set(0);
      }
    }, 32);
    return () => window.clearInterval(timer);
  }, [stretch, reducedMotion]);

  // Combine progress and stretch into a single path MotionValue so the
  // SVG path attribute can be animated by Framer Motion.
  const path = useTransform<number, string>(
    [progressSpring, stretchSpring],
    ([t, s]) => buildBlobPath(width, height, t as number, s as number)
  );

  // Position the labels — they fade in/out opposite to the blob.
  const handleClick = useCallback(() => {
    if (disabled) return;
    setValue(!isOn);
  }, [disabled, isOn, setValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setValue(!isOn);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOn) setValue(true);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (isOn) setValue(false);
      }
    },
    [disabled, isOn, setValue]
  );

  const stateLabel = isOn ? onLabel : offLabel;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-labelledby={labelId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'relative inline-flex items-center rounded-full select-none focus-ring cursor-pointer transition-colors',
        // Track and blob follow an Apple-style inversion: in light mode the
        // off track is white with a dark blob; in dark mode the off track
        // is near-black with a white blob. Toggling the state slides the
        // blob across but does not change the track color, so the blob
        // always reads against the page surface.
        isOn
          ? 'bg-surface border border-border dark:bg-[#141414] dark:border-[#1F1F1F]'
          : 'bg-surface border border-border dark:bg-[#141414] dark:border-[#1F1F1F]',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      style={{ width, height }}
    >
      <span id={labelId} className="sr-only">
        {stateLabel}
      </span>

      {/* Off/On labels inside the track */}
      {showLabels && (
        <div className="absolute inset-0 flex items-center justify-between px-2.5 text-[10px] font-medium pointer-events-none">
          <motion.span
            animate={{ opacity: isOn ? 0 : 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-muted dark:text-[#6B6B6B]"
          >
            OFF
          </motion.span>
          <motion.span
            animate={{ opacity: isOn ? 0.7 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-secondary dark:text-[#A1A1A1] ml-auto"
          >
            ON
          </motion.span>
        </div>
      )}

      {/* The blob — single morphing path. */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`liquid-blob-grad-${uniqueId}`} cx="0.35" cy="0.35" r="0.85">
            <stop offset="0%" stopColor={blobColor} stopOpacity="1" />
            <stop offset="100%" stopColor={blobColor} stopOpacity="0.75" />
          </radialGradient>
        </defs>
        <motion.path
          d={path}
          fill={`url(#liquid-blob-grad-${uniqueId})`}
        />
      </svg>
    </button>
  );
};

export default LiquidToggle;
