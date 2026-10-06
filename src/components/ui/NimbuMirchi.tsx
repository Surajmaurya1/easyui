'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * A hanging "nimbu-mirchi" charm — a stack of green chillies with a lemon
 * suspended beneath — that swings with physical inertia as the pointer
 * moves across it.
 *
 * The illustration is a single SVG painted with gradients and highlights
 * so it stays crisp at any size and adapts naturally to light / dark
 * surfaces.
 *
 * Motion runs on a pointer-driven MotionValue pipeline that never touches
 * React state during a frame:
 *
 *   pointer  →  MotionValue  →  spring  →  transform  →  rotation / lift
 *
 * The chillies, lemon, knot, and trailing strings each have slightly
 * softer rotation so the layers feel like independent bodies hanging from
 * the same string.
 */
export interface NimbuMirchiProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation in degrees at full pointer offset. */
  maxRotation?: number;
  /** Pointer X spring stiffness. Higher = snappier follow. */
  stiffnessX?: number;
  /** Pointer Y spring stiffness. */
  stiffnessY?: number;
  /** Spring damping. Higher = less swing overshoot. */
  damping?: number;
  /** Optional caption rendered for screen readers. */
  caption?: string;
  className?: string;
}

const VIEW_BOX_WIDTH = 360;
const VIEW_BOX_HEIGHT = 520;
const ANCHOR_X = VIEW_BOX_WIDTH / 2;

export const NimbuMirchi: React.FC<NimbuMirchiProps> = ({
  maxRotation = 13,
  stiffnessX = 55,
  stiffnessY = 45,
  damping = 9,
  caption,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Normalized pointer offset in [-1, 1] relative to container center.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Springs give the charm its physical weight and decay behavior.
  const springX = useSpring(pointerX, {
    stiffness: stiffnessX,
    damping,
    mass: 1.8,
  });
  const springY = useSpring(pointerY, {
    stiffness: stiffnessY,
    damping: damping + 1,
    mass: 1.6,
  });

  // Pointer offset → visible motion.
  const rotate = useTransform(springX, [-1, 1], [-maxRotation, maxRotation]);
  const translateY = useTransform(springY, [-1, 1], [-5, 5]);

  // Secondary motion: each layer swings a little less so the whole
  // illustration never reads as a single rigid object.
  const clusterRotation = useTransform(springX, [-1, 1], [-7, 7]);
  const lemonRotation = useTransform(springX, [-1, 1], [-3, 3]);
  const stringRotation = useTransform(springX, [-1, 1], [-5, 5]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || reducedMotion) return;
    if (typeof element.addEventListener !== 'function') return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamp so the spring never runs beyond its intended range.
      pointerX.set(Math.max(-1, Math.min(1, x)));
      pointerY.set(Math.max(-1, Math.min(1, y)));
    };

    const handlePointerLeave = () => {
      // Let the spring ease back to rest rather than snapping.
      pointerX.set(0);
      pointerY.set(0);
    };

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={caption || 'Hanging nimbu-mirchi charm that swings with the pointer'}
      className={cn(
        'relative flex w-full min-h-[600px] items-start justify-center overflow-hidden touch-none select-none',
        className
      )}
      {...props}
    >
      {/* Thin ceiling line the charm hangs from. */}
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700" />

      <motion.div
        style={{ rotate, y: translateY }}
        className="relative mt-14 w-[360px] max-w-full origin-top will-change-transform"
      >
        {/* Suspending string connecting the charm to the anchor. */}
        <div className="absolute left-1/2 -top-14 h-14 w-px -translate-x-1/2 bg-neutral-400 dark:bg-neutral-600" />

        <svg
          viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
          className="block w-full h-auto overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Chillies: deep green body with a hand-painted glossy highlight. */}
            <linearGradient id="nm-chilli-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3F8B2A" />
              <stop offset="55%" stopColor="#2E6B1E" />
              <stop offset="100%" stopColor="#234F18" />
            </linearGradient>
            <linearGradient id="nm-chilli-shine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9BD86A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9BD86A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nm-chilli-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3F14" />
              <stop offset="100%" stopColor="#0F2409" />
            </linearGradient>

            {/* Lemon: warm yellow with a soft 3D falloff. */}
            <radialGradient id="nm-lemon-body" cx="40%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#FFE36B" />
              <stop offset="60%" stopColor="#F2C72F" />
              <stop offset="100%" stopColor="#C2901A" />
            </radialGradient>
            <radialGradient id="nm-lemon-shadow" cx="65%" cy="80%" r="55%">
              <stop offset="0%" stopColor="#7A5A0E" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7A5A0E" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nm-lemon-highlight" cx="35%" cy="30%" r="22%">
              <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFBE0" stopOpacity="0" />
            </radialGradient>

            {/* Knot: dark paper with a subtle vertical seam. */}
            <linearGradient id="nm-knot-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A3A3A" />
              <stop offset="100%" stopColor="#161616" />
            </linearGradient>
          </defs>

          {/* =====================================================
              GREEN CHILLIES — stacked cluster
              Each chilli is a soft organic blob with a stem cap
              and a painted highlight band along its top edge.
          ====================================================== */}
          <motion.g style={{ rotate: clusterRotation, transformOrigin: `${ANCHOR_X}px 10px` }}>
            <Chilli
              bodyD="M50 30 C 80 14, 220 16, 305 50 C 318 56, 318 70, 305 76 C 220 100, 90 96, 56 80 C 42 70, 38 42, 50 30 Z"
              shineD="M70 32 C 140 24, 230 26, 290 50"
              stem={{ x: 305, y: 60 }}
              rotate={-3}
            />
            <Chilli
              bodyD="M30 92 C 90 78, 260 82, 320 110 C 332 118, 330 130, 316 138 C 240 158, 90 156, 44 142 C 28 134, 18 102, 30 92 Z"
              shineD="M60 96 C 150 86, 250 88, 308 112"
              stem={{ x: 320, y: 120 }}
              rotate={2}
            />
            <Chilli
              bodyD="M52 158 C 100 144, 250 146, 308 170 C 322 178, 320 192, 304 198 C 230 218, 90 216, 60 200 C 44 192, 40 168, 52 158 Z"
              shineD="M70 162 C 160 152, 240 154, 296 174"
              stem={{ x: 308, y: 180 }}
              rotate={-2}
            />
            <Chilli
              bodyD="M40 220 C 90 206, 260 208, 314 232 C 326 240, 322 254, 308 260 C 230 278, 100 276, 52 262 C 38 254, 28 230, 40 220 Z"
              shineD="M64 224 C 160 214, 250 216, 302 236"
              stem={{ x: 314, y: 240 }}
              rotate={4}
            />
          </motion.g>

          {/* =====================================================
              LEMON — single big yellow body with painted highlight
          ====================================================== */}
          <motion.g
            style={{ rotate: lemonRotation, transformOrigin: `${ANCHOR_X}px 340px` }}
          >
            <ellipse
              cx={ANCHOR_X}
              cy={340}
              rx={92}
              ry={86}
              fill="url(#nm-lemon-body)"
            />
            {/* Inner shadow for soft volume. */}
            <ellipse
              cx={ANCHOR_X + 8}
              cy={340 + 10}
              rx={92}
              ry={86}
              fill="url(#nm-lemon-shadow)"
            />
            {/* Specular highlight blob. */}
            <ellipse
              cx={ANCHOR_X - 22}
              cy={340 - 28}
              rx={36}
              ry={22}
              fill="url(#nm-lemon-highlight)"
            />
            {/* Painted lemon nipple on the right. */}
            <path
              d="M254 332 q 6 -2 10 4 q -2 8 -10 6 z"
              fill="#C28A12"
              opacity="0.85"
            />
            {/* Pore texture — sparse, organic dots. */}
            <circle cx={ANCHOR_X - 38} cy={340 - 8} r="1.6" fill="#E0A91A" opacity="0.55" />
            <circle cx={ANCHOR_X + 28} cy={340 - 18} r="1.4" fill="#E0A91A" opacity="0.55" />
            <circle cx={ANCHOR_X - 12} cy={340 + 30} r="1.6" fill="#E0A91A" opacity="0.5" />
            <circle cx={ANCHOR_X + 36} cy={340 + 22} r="1.4" fill="#E0A91A" opacity="0.5" />
            <circle cx={ANCHOR_X - 42} cy={340 + 16} r="1.2" fill="#E0A91A" opacity="0.45" />
            <circle cx={ANCHOR_X + 4} cy={340 - 2} r="1.2" fill="#E0A91A" opacity="0.4" />
          </motion.g>

          {/* =====================================================
              KNOT — small dark cap that holds the lemon
          ====================================================== */}
          <g>
            <rect
              x={ANCHOR_X - 28}
              y={418}
              width={56}
              height={28}
              rx={6}
              fill="url(#nm-knot-body)"
            />
            <rect
              x={ANCHOR_X - 1}
              y={418}
              width={2}
              height={28}
              fill="#0A0A0A"
              opacity="0.7"
            />
            <rect
              x={ANCHOR_X - 16}
              y={418}
              width={1}
              height={28}
              fill="#2A2A2A"
              opacity="0.6"
            />
          </g>

          {/* =====================================================
              TRAILING STRINGS — three soft curves below the knot
          ====================================================== */}
          <motion.g
            style={{ rotate: stringRotation, transformOrigin: `${ANCHOR_X}px 446px` }}
          >
            <path
              d="M168 446 C 162 466, 174 482, 158 500 C 152 506, 156 514, 150 520"
              stroke="#5A5A5A"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M180 446 C 188 466, 172 482, 188 500 C 196 508, 192 514, 200 520"
              stroke="#777777"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M156 446 C 144 462, 156 478, 142 494"
              stroke="#8C8C8C"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>
      </motion.div>

      {caption && <span className="sr-only">{caption}</span>}
    </div>
  );
};

/**
 * A single painted chilli: organic body, dark stem cap on the right,
 * glossy highlight band along the top.
 *
 * Coordinates are pre-baked so the whole cluster feels hand-placed rather
 * than procedurally generated.
 */
const Chilli: React.FC<{
  bodyD: string;
  shineD: string;
  stem: { x: number; y: number };
  rotate: number;
}> = ({ bodyD, shineD, stem, rotate }) => {
  return (
    <g transform={`rotate(${rotate} ${ANCHOR_X} 60)`}>
      {/* Body fill */}
      <path d={bodyD} fill="url(#nm-chilli-body)" />
      {/* Darker underside for volume */}
      <path d={bodyD} fill="url(#nm-chilli-dark)" opacity="0.35" />
      {/* Glossy highlight band running along the top edge */}
      <path
        d={shineD}
        stroke="url(#nm-chilli-shine)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Stem cap — the dark tip where the chilli was cut from its branch */}
      <ellipse cx={stem.x} cy={stem.y} rx="5" ry="3.4" fill="#1B3A11" />
      <ellipse cx={stem.x - 1.5} cy={stem.y - 1} rx="2" ry="1.2" fill="#2E5A1F" opacity="0.8" />
    </g>
  );
};

export default NimbuMirchi;
