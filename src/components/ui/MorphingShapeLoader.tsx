'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme/useTheme';

/* =========================================================================
 * MorphingShapeLoader
 * A loading indicator that continuously morphs between configurable SVG
 * shapes. The morph happens through real path interpolation (not fade in /
 * out) — the geometry of the path is interpolated between matched-control-
 * point shapes, so the transition is genuinely continuous.
 * =======================================================================*/

export type ShapeKind = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'pentagon';

// All shapes are expressed with a fixed number of control points so they
// can be smoothly interpolated as SVG paths.
const SHAPE_POINTS = 8;
const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;
const RADIUS = 36;

/**
 * Build a closed SVG path of the shape "kind" using N evenly distributed
 * anchor points. We keep the path command structure identical across
 * shapes (all "M ... L ... L ... Z") so that browsers can interpolate
 * the numeric values smoothly.
 */
function buildPath(kind: ShapeKind, points: number, radius: number): string {
  const anchors: Array<[number, number]> = [];
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
    let r = radius;
    switch (kind) {
      case 'circle':
      case 'hexagon':
      case 'pentagon':
        r = radius;
        break;
      case 'square': {
        // Approximate a square: radius varies by angle so the polygon
        // forms right-angle corners.
        const localAngle = ((angle + Math.PI / 2) % (Math.PI / 2)) - Math.PI / 4;
        r = radius / Math.cos(localAngle);
        break;
      }
      case 'triangle': {
        // 3 large points, 5 small intermediate points
        const phase = (angle + Math.PI / 2) / (Math.PI * 2);
        const peakDist = Math.abs(((phase * 3) % 1) - 0.5);
        const factor = 1 - Math.min(1, peakDist * 1.6);
        r = radius * (0.45 + factor * 0.55);
        break;
      }
      case 'star': {
        // 5 outer points + 5 inner points; with 8 anchors, alternate
        const phase = (angle + Math.PI / 2) / (Math.PI * 2);
        const cycle = phase * 5;
        const within = cycle - Math.floor(cycle);
        const isPeak = within < 0.5;
        r = radius * (isPeak ? 1 : 0.45);
        break;
      }
    }

    const x = CENTER + Math.cos(angle) * r;
    const y = CENTER + Math.sin(angle) * r;
    anchors.push([x, y]);
  }

  // Build path with identical command structure across shapes.
  const cmds = anchors.map(
    ([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(3)},${y.toFixed(3)}`
  );
  return cmds.join(' ') + ' Z';
}

export interface MorphingShapeLoaderProps {
  /** Ordered list of shape kinds to cycle through. */
  shapes?: ShapeKind[];
  /** Morph duration per shape change, in seconds. */
  duration?: number;
  /** Hold duration at each shape, in seconds. */
  holdDuration?: number;
  /** When false, the animation freezes after one cycle. */
  loop?: boolean;
  /** Size in pixels (square). */
  size?: number;
  /** Stroke color. */
  color?: string;
  /** Stroke width as a fraction of size. Default 0.08. */
  strokeWidth?: number;
  /** Filled variant instead of stroke. */
  filled?: boolean;
  /** Optional aria label */
  label?: string;
  /** Optional className */
  className?: string;
}

export const MorphingShapeLoader: React.FC<MorphingShapeLoaderProps> = ({
  shapes = ['circle', 'square', 'triangle', 'circle'],
  duration = 1.6,
  holdDuration = 0.4,
  loop = true,
  size = 96,
  color,
  strokeWidth = 0.08,
  filled = false,
  label = 'Loading',
  className,
}) => {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme-aware colors: white in dark mode, near-black in light mode so the
  // shape stays visible against either background. A caller-provided `color`
  // always wins.
  const fgColor = color ?? (isDark ? '#FAFAFA' : '#0A0A0A');

  const [shapeIndex, setShapeIndex] = useState(0);

  // Pre-compute the path strings for each shape. Because all paths share
  // the same command structure (M L L L L L L L Z), the d-string can be
  // smoothly interpolated by Framer Motion.
  const paths = useMemo(
    () => shapes.map((kind) => buildPath(kind, SHAPE_POINTS, RADIUS)),
    [shapes]
  );

  useEffect(() => {
    if (reducedMotion) return;
    if (shapes.length <= 1) return;
    let cancelled = false;
    let timer: number | undefined;

    const tick = () => {
      if (cancelled) return;
      setShapeIndex((idx) => {
        const next = (idx + 1) % shapes.length;
        if (!loop && idx === shapes.length - 1) {
          // We are at the last shape and not looping. Just stay there.
          return idx;
        }
        return next;
      });
    };

    timer = window.setTimeout(tick, (duration + holdDuration) * 1000);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [shapeIndex, shapes.length, duration, holdDuration, loop, reducedMotion]);

  const currentPath = paths[shapeIndex] ?? paths[0];

  // For reduced motion we just render a single static shape and skip animation.
  if (reducedMotion) {
    return (
      <div
        className={cn(
          'inline-flex flex-col items-center justify-center gap-2 text-text-primary dark:text-[#FAFAFA]',
          className
        )}
        style={{ width: size, height: size }}
        role="status"
        aria-label={label}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d={currentPath}
            fill={filled ? fgColor : 'none'}
            stroke={filled ? 'none' : fgColor}
            strokeWidth={strokeWidth * VIEWBOX}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex flex-col items-center justify-center gap-2 text-text-primary dark:text-[#FAFAFA]',
        className
      )}
      style={{ width: size, height: size }}
      role="status"
      aria-label={label}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="morph-loader-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={fgColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={fgColor} stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Continuously morph the path d-attribute between matched-control
            shape strings. Framer Motion's <motion.path> will interpolate
            commands individually because the structure is identical. */}
        <motion.path
          animate={{ d: currentPath }}
          transition={{
            duration,
            ease: [0.45, 0.05, 0.2, 1],
          }}
          fill={filled ? 'url(#morph-loader-fill)' : 'none'}
          stroke={filled ? 'none' : fgColor}
          strokeWidth={strokeWidth * VIEWBOX}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default MorphingShapeLoader;
