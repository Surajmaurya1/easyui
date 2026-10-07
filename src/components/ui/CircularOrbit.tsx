'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * A single tile floating in the circular orbit.
 */
export interface OrbitItem {
  id: string;
  src: string;
  alt?: string;
  /** Pixel size of the square tile. */
  size?: number;
  className?: string;
}

export interface CircularOrbitProps extends React.HTMLAttributes<HTMLElement> {
  /** Items to place around the orbit. */
  items?: OrbitItem[];
  /** Centered headline. */
  title?: string;
  /** Radians per millisecond. Smaller = slower. */
  speed?: number;
  /** Pixel radius of the orbit on the desktop layout. */
  radius?: number;
  /** Pause the orbit when the pointer is over the gallery. */
  pauseOnHover?: boolean;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
}

const DEFAULT_ITEMS: OrbitItem[] = [
  { id: '01', src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=90', alt: 'Portrait' },
  { id: '02', src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&q=90', alt: 'Landscape' },
  { id: '03', src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=90', alt: 'Abstract artwork' },
  { id: '04', src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=90', alt: 'Artwork' },
  { id: '05', src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=90', alt: 'Abstract artwork' },
  { id: '06', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=90', alt: 'Abstract artwork' },
  { id: '07', src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=90', alt: 'Abstract artwork' },
  { id: '08', src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=90', alt: 'Abstract artwork' },
  { id: '09', src: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=500&q=90', alt: 'Nature' },
  { id: '10', src: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=500&q=90', alt: 'Artwork' },
  { id: '11', src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=90', alt: 'Artwork' },
  { id: '12', src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=90', alt: 'Creative artwork' },
  { id: '13', src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=90', alt: 'Abstract artwork' },
  { id: '14', src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=90', alt: 'Artwork' },
];

const TILE_RADIUS = 6;
const FRONT_SCALE = 1;
const BACK_SCALE = 0.42;
const FRONT_OPACITY = 1;
const BACK_OPACITY = 0.42;

/**
 * A circular gallery of tiles orbiting around a centered title.
 *
 * Animation runs entirely on a single `MotionValue` driven by
 * `useAnimationFrame` — no React state updates per frame. Each tile
 * derives its x/y, scale, opacity, blur, and z-index from the same
 * rotation value, so the depth field stays internally consistent.
 */
export const CircularOrbit: React.FC<CircularOrbitProps> = ({
  items = DEFAULT_ITEMS,
  title = 'Push',
  speed = 0.00022,
  radius = 270,
  pauseOnHover = true,
  className,
  containerClassName,
  titleClassName,
  ...props
}) => {
  const rotation = useMotionValue(0);
  const targetSpeed = useMotionValue(speed);
  // Smoothly interpolated speed so pause / resume never snaps.
  const currentSpeed = useMotionValue(speed);
  const reducedMotion = useReducedMotion();
  const isHovered = useRef(false);

  // Measure the orbit container so the radius always fits the available
  // space — prevents tiles from being clipped on narrow viewports.
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<number | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width } = entry.contentRect;
      setContainerSize(width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Effective radius: a fraction of the container width so the full
  // circle (radius + tile size) never overflows on any screen size.
  const TILE_SIZE = 92;
  const effectiveRadius = containerSize !== null
    ? Math.max(40, Math.min(radius, containerSize / 2 - TILE_SIZE / 2 - 8))
    : radius;

  useAnimationFrame((_time, delta) => {
    // No-op when reduced motion is preferred — the gallery simply
    // rests at its current position.
    if (reducedMotion) return;

    // Ease currentSpeed toward the target so hover-pause is smooth.
    const next = currentSpeed.get() + (targetSpeed.get() - currentSpeed.get()) * 0.08;
    currentSpeed.set(next);
    rotation.set(rotation.get() + delta * next);
  });

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    isHovered.current = true;
    targetSpeed.set(0);
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;
    isHovered.current = false;
    targetSpeed.set(speed);
  };

  return (
    <section
      role="region"
      aria-label={title || 'Circular floating gallery'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex min-h-[min(90vw,600px)] w-full items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      <div
        ref={containerRef}
        className={cn(
          // Square orbit area, capped on large screens.
          'relative flex items-center justify-center',
          'h-full w-full max-h-[760px] max-w-[760px] aspect-square',
          containerClassName
        )}
      >
        {items.map((item, index) => (
          <OrbitItemCard
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            rotation={rotation}
            radius={effectiveRadius}
          />
        ))}

        {/* Centered headline — paired with the section's aria-label. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2 select-none"
        >
          <h1
            className={cn(
              'whitespace-nowrap font-normal leading-none tracking-[-0.065em]',
              'text-5xl sm:text-7xl md:text-8xl',
              'text-[#050505] dark:text-[#FAFAFA]',
              titleClassName
            )}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

/**
 * One tile in the orbit. Every visual property is derived from the
 * shared rotation MotionValue so the depth field is internally
 * consistent across all tiles.
 */
const OrbitItemCard: React.FC<{
  item: OrbitItem;
  index: number;
  total: number;
  rotation: ReturnType<typeof useMotionValue<number>>;
  radius: number;
}> = ({ item, index, total, rotation, radius }) => {
  // Each tile starts at an evenly-distributed angle around the circle.
  const startingAngle = (Math.PI * 2 * index) / total;

  const angle = useTransform(rotation, (value) => value + startingAngle);

  // True circular motion — X and Y share the same radius.
  const x = useTransform(angle, (value) => Math.cos(value) * radius);
  const y = useTransform(angle, (value) => Math.sin(value) * radius);

  // Depth: 0 on the back of the circle, 1 on the front.
  const depth = useTransform(angle, (value) => (Math.cos(value) + 1) / 2);

  const scale = useTransform(depth, (value) => BACK_SCALE + value * (FRONT_SCALE - BACK_SCALE));
  const opacity = useTransform(depth, (value) => BACK_OPACITY + value * (FRONT_OPACITY - BACK_OPACITY));

  // Subtle tilt — keeps the orbit feeling alive without spinning aggressively.
  const rotate = useTransform(angle, (value) => Math.sin(value) * 4);

  // Closest tile paints on top.
  const zIndex = useTransform(depth, (value) => Math.round(10 + value * 100));

  // Slight blur for tiles further away.
  const blur = useTransform(depth, (value) => `${(1 - value) * 1.2}px`);

  const imageSize = item.size ?? 92;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex,
        filter: blur,
        marginLeft: -imageSize / 2,
        marginTop: -imageSize / 2,
      }}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-neutral-200 dark:bg-neutral-800',
          'shadow-[0_12px_40px_rgba(0,0,0,0.10)]',
          item.className
        )}
        style={{ width: imageSize, height: imageSize, borderRadius: TILE_RADIUS }}
      >
        <img
          src={item.src}
          alt="" // Tiles are decorative — the section's aria-label describes the gallery.
          draggable={false}
          loading="lazy"
          decoding="async"
          className="block h-full w-full select-none object-cover"
        />
        {/* Hairline edge so light tiles don't bleed into the background. */}
        <span className="pointer-events-none absolute inset-0 border border-black/[0.04] dark:border-white/[0.06]" />
      </div>
    </motion.div>
  );
};

export default CircularOrbit;
