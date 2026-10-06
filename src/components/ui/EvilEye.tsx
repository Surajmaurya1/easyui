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
 * A hanging "evil eye" charm — a deep navy amulet disc with concentric
 * rings (white, sky blue, navy pupil) and a braided cord — that swings
 * with physical inertia as the pointer moves across it.
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
 * The cord, the cap, and the disc each have slightly softer rotation so
 * the layers feel like independent bodies hanging from the same string.
 */
export interface EvilEyeProps extends React.HTMLAttributes<HTMLDivElement> {
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
const DISC_CX = ANCHOR_X;
const DISC_CY = 280;
const DISC_R = 118;

export const EvilEye: React.FC<EvilEyeProps> = ({
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
  const cordRotation = useTransform(springX, [-1, 1], [-9, 9]);
  const discRotation = useTransform(springX, [-1, 1], [-5, 5]);
  const capRotation = useTransform(springX, [-1, 1], [-7, 7]);

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
      aria-label={caption || 'Hanging evil eye amulet that swings with the pointer'}
      className={cn(
        'relative flex w-full min-h-[600px] items-start justify-center overflow-hidden touch-none select-none',
        className
      )}
      {...props}
    >
      {/* Thin ceiling line the amulet hangs from. */}
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-500" />

      <motion.div
        style={{ rotate, y: translateY }}
        className="relative mt-14 w-[360px] max-w-full origin-top will-change-transform"
      >
        <svg
          viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
          className="block w-full h-auto overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Outer disc — deep navy with a soft 3D falloff. */}
            <radialGradient id="ee-disc-body" cx="38%" cy="32%" r="78%">
              <stop offset="0%" stopColor="#3A55B0" />
              <stop offset="55%" stopColor="#1B2C73" />
              <stop offset="100%" stopColor="#0A1340" />
            </radialGradient>
            <radialGradient id="ee-disc-shadow" cx="65%" cy="80%" r="55%">
              <stop offset="0%" stopColor="#04082A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#04082A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-disc-highlight" cx="32%" cy="22%" r="22%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ee-disc-rim" cx="50%" cy="50%" r="50%">
              <stop offset="92%" stopColor="#3A55B0" stopOpacity="0" />
              <stop offset="100%" stopColor="#3A55B0" stopOpacity="0.9" />
            </radialGradient>

            {/* White ring — gentle painted gradient. */}
            <radialGradient id="ee-ring-white" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D8DCEA" />
            </radialGradient>

            {/* Sky blue ring. */}
            <radialGradient id="ee-ring-blue" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#A6D9F2" />
              <stop offset="100%" stopColor="#5FA8DA" />
            </radialGradient>

            {/* Pupil. */}
            <radialGradient id="ee-pupil" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1B2C73" />
              <stop offset="100%" stopColor="#04082A" />
            </radialGradient>

            {/* Metallic cap. */}
            <linearGradient id="ee-cap-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D8D8E0" />
              <stop offset="50%" stopColor="#9C9CA8" />
              <stop offset="100%" stopColor="#6A6A78" />
            </linearGradient>
            <linearGradient id="ee-cap-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5A5A66" />
              <stop offset="50%" stopColor="#E8E8F0" />
              <stop offset="100%" stopColor="#5A5A66" />
            </linearGradient>

            {/* Braided cord — saturated blue so it stays visible on dark surfaces. */}
            <linearGradient id="ee-cord" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1F3FB0" />
              <stop offset="50%" stopColor="#4F7AE8" />
              <stop offset="100%" stopColor="#1F3FB0" />
            </linearGradient>

            {/* Soft floor shadow. */}
            <radialGradient id="ee-floor" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* =====================================================
              BRAIDED CORD — the two strands the cap is threaded on
          ====================================================== */}
          <motion.g style={{ rotate: cordRotation, transformOrigin: `${ANCHOR_X}px 0px` }}>
            <path
              d={`M${ANCHOR_X - 14} 0 C ${ANCHOR_X - 22} 30, ${ANCHOR_X - 6} 60, ${ANCHOR_X - 10} 92`}
              stroke="url(#ee-cord)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${ANCHOR_X - 14} 0 C ${ANCHOR_X - 22} 30, ${ANCHOR_X - 6} 60, ${ANCHOR_X - 10} 92`}
              stroke="#A8C4F5"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 3"
              opacity="0.85"
            />
            <path
              d={`M${ANCHOR_X + 14} 0 C ${ANCHOR_X + 22} 30, ${ANCHOR_X + 6} 60, ${ANCHOR_X + 10} 92`}
              stroke="url(#ee-cord)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${ANCHOR_X + 14} 0 C ${ANCHOR_X + 22} 30, ${ANCHOR_X + 6} 60, ${ANCHOR_X + 10} 92`}
              stroke="#A8C4F5"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 3"
              opacity="0.85"
            />
          </motion.g>

          {/* =====================================================
              METALLIC CAP — the small loop at the top of the disc
          ====================================================== */}
          <motion.g style={{ rotate: capRotation, transformOrigin: `${DISC_CX}px ${DISC_CY - DISC_R + 10}px` }}>
            {/* Cap body */}
            <rect
              x={DISC_CX - 18}
              y={DISC_CY - DISC_R - 4}
              width={36}
              height={22}
              rx={6}
              fill="url(#ee-cap-body)"
            />
            {/* Cap rim highlight */}
            <rect
              x={DISC_CX - 18}
              y={DISC_CY - DISC_R + 14}
              width={36}
              height={4}
              fill="url(#ee-cap-rim)"
              opacity="0.7"
            />
            {/* Tiny pin where the cord threads through */}
            <rect
              x={DISC_CX - 1.5}
              y={DISC_CY - DISC_R - 4}
              width={3}
              height={22}
              fill="#3A3A44"
              opacity="0.9"
            />
            {/* Soft metal highlight */}
            <ellipse
              cx={DISC_CX - 8}
              cy={DISC_CY - DISC_R + 4}
              rx={8}
              ry={2}
              fill="#FFFFFF"
              opacity="0.4"
            />
          </motion.g>

          {/* =====================================================
              EVIL EYE DISC — the main painted amulet
          ====================================================== */}
          <motion.g
            style={{ rotate: discRotation, transformOrigin: `${DISC_CX}px ${DISC_CY}px` }}
          >
            {/* Outer navy disc */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R} fill="url(#ee-disc-body)" />
            {/* Soft inner shadow for volume */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R} fill="url(#ee-disc-shadow)" />
            {/* Subtle rim light */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R} fill="url(#ee-disc-rim)" />
            {/* Specular highlight blob in the upper-left */}
            <ellipse
              cx={DISC_CX - 36}
              cy={DISC_CY - 48}
              rx={36}
              ry={22}
              fill="url(#ee-disc-highlight)"
            />
            {/* White ring */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R * 0.72} fill="url(#ee-ring-white)" />
            {/* Sky blue ring */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R * 0.48} fill="url(#ee-ring-blue)" />
            {/* Pupil */}
            <circle cx={DISC_CX} cy={DISC_CY} r={DISC_R * 0.26} fill="url(#ee-pupil)" />
            {/* Pupil highlight (the signature "alive" glint) */}
            <ellipse
              cx={DISC_CX - DISC_R * 0.08}
              cy={DISC_CY - DISC_R * 0.1}
              rx={6}
              ry={4}
              fill="#FFFFFF"
              opacity="0.9"
            />
            <circle
              cx={DISC_CX + DISC_R * 0.1}
              cy={DISC_CY + DISC_R * 0.08}
              r={1.6}
              fill="#FFFFFF"
              opacity="0.7"
            />
          </motion.g>

          {/* =====================================================
              FLOOR SHADOW — a soft painted ellipse beneath the disc
          ====================================================== */}
          <ellipse
            cx={DISC_CX}
            cy={DISC_CY + DISC_R + 60}
            rx={DISC_R * 0.9}
            ry={10}
            fill="url(#ee-floor)"
          />
        </svg>
      </motion.div>

      {caption && <span className="sr-only">{caption}</span>}
    </div>
  );
};

export default EvilEye;
