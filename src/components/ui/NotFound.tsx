import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { Button } from './Button';

export interface NotFoundProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Main error code or glyphs to render as physical objects (default: '404') */
  errorCode?: string;
  /** Eyebrow status badge text (default: '404 // ROUTE DISPLACED') */
  badgeLabel?: string;
  /** Primary heading title (default: 'This page took a wrong turn.') */
  title?: string;
  /** Secondary explanatory copy */
  description?: string;
  /** Label for primary action button (default: 'Go back home') */
  actionLabel?: string;
  /** Callback triggered when primary action is clicked */
  onAction?: () => void;
  /** Label for secondary action button (e.g. 'Previous page' or 'Try again') */
  secondaryActionLabel?: string;
  /** Callback triggered when secondary action is clicked */
  onSecondaryAction?: () => void;
  /** Whether to render subtle spatial coordinate markers (default: true) */
  showCoordinates?: boolean;
  /** Custom action slot to override default buttons if desired */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

interface PhysicalDigitProps {
  char: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean | null;
}

/**
 * Pure floating character entity with spring proximity displacement.
 */
function PhysicalDigit({ char, index, containerRef, reducedMotion }: PhysicalDigitProps) {
  const digitRef = useRef<HTMLDivElement>(null);

  // Individual physics personality for each digit
  const springConfigs = [
    { stiffness: 280, damping: 24, mass: 0.6 },
    { stiffness: 220, damping: 20, mass: 0.8 },
    { stiffness: 300, damping: 26, mass: 0.55 },
  ];
  const springConfig = springConfigs[index % springConfigs.length];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawRotateZ = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springRotateY = useSpring(rawRotateY, springConfig);
  const springRotateZ = useSpring(rawRotateZ, springConfig);
  const springScale = useSpring(rawScale, { stiffness: 400, damping: 25 });

  const resetPhysics = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawRotateZ.set(0);
    rawScale.set(1);
  }, [rawX, rawY, rawRotateX, rawRotateY, rawRotateZ, rawScale]);

  const updateProximity = useCallback(
    (pointerX: number, pointerY: number) => {
      if (reducedMotion || !digitRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const digitRect = digitRef.current.getBoundingClientRect();

      const digitCenterX = digitRect.left + digitRect.width / 2 - containerRect.left;
      const digitCenterY = digitRect.top + digitRect.height / 2 - containerRect.top;

      const dx = digitCenterX - pointerX;
      const dy = digitCenterY - pointerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const influenceRadius = 200;

      if (distance < influenceRadius) {
        const factor = Math.pow((influenceRadius - distance) / influenceRadius, 1.4);
        const maxDisplacement = 30;

        const safeDist = distance || 1;
        const pushX = (dx / safeDist) * factor * maxDisplacement;
        const pushY = (dy / safeDist) * factor * maxDisplacement;

        rawX.set(pushX);
        rawY.set(pushY);
        rawRotateX.set((-dy / influenceRadius) * factor * 14);
        rawRotateY.set((dx / influenceRadius) * factor * 14);
        rawRotateZ.set((dx / influenceRadius) * factor * 6);
        rawScale.set(1 + factor * 0.03);
      } else {
        resetPhysics();
      }
    },
    [reducedMotion, containerRef, rawX, rawY, rawRotateX, rawRotateY, rawRotateZ, rawScale, resetPhysics]
  );

  useEffect(() => {
    const el = digitRef.current;
    if (!el) return;

    const handleContainerMove = (e: CustomEvent<{ x: number; y: number }>) => {
      updateProximity(e.detail.x, e.detail.y);
    };

    const handleContainerLeave = () => {
      resetPhysics();
    };

    el.addEventListener('easyui:proximity' as any, handleContainerMove as EventListener);
    el.addEventListener('easyui:leave' as any, handleContainerLeave as EventListener);

    return () => {
      el.removeEventListener('easyui:proximity' as any, handleContainerMove as EventListener);
      el.removeEventListener('easyui:leave' as any, handleContainerLeave as EventListener);
    };
  }, [updateProximity, resetPhysics]);

  const handleTap = () => {
    if (reducedMotion) return;
    rawY.set(-16);
    rawRotateZ.set((index % 2 === 0 ? 1 : -1) * 6);
    rawScale.set(1.06);

    setTimeout(() => {
      resetPhysics();
    }, 180);
  };

  return (
    <motion.div
      ref={digitRef}
      onClick={handleTap}
      style={{
        x: reducedMotion ? 0 : springX,
        y: reducedMotion ? 0 : springY,
        rotateX: reducedMotion ? 0 : springRotateX,
        rotateY: reducedMotion ? 0 : springRotateY,
        rotateZ: reducedMotion ? 0 : springRotateZ,
        scale: reducedMotion ? 1 : springScale,
        transformStyle: 'preserve-3d',
      }}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ...motionTransitions.springGentle,
        delay: index * 0.05,
      }}
      className="inline-flex items-center justify-center cursor-pointer select-none px-1 sm:px-2"
      role="presentation"
      aria-hidden="true"
    >
      <span className="font-sans font-bold text-7xl sm:text-8xl md:text-9xl text-text-primary tracking-tighter select-none pointer-events-none drop-shadow-sm">
        {char}
      </span>
    </motion.div>
  );
}

export function NotFound({
  errorCode = '404',
  badgeLabel,
  title = 'This page took a wrong turn.',
  description = "The requested page doesn't exist or may have moved.",
  actionLabel = 'Go back home',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  className,
  ...props
}: NotFoundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const digits = containerRef.current.querySelectorAll('[role="presentation"]');
    digits.forEach((digit) => {
      digit.dispatchEvent(new CustomEvent('easyui:proximity', { detail: { x, y } }));
    });
  };

  const handlePointerLeave = () => {
    if (reducedMotion || !containerRef.current) return;
    const digits = containerRef.current.querySelectorAll('[role="presentation"]');
    digits.forEach((digit) => {
      digit.dispatchEvent(new CustomEvent('easyui:leave'));
    });
  };

  const characters = errorCode.split('');

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative flex flex-col items-center justify-center text-center select-none w-full max-w-xl mx-auto py-6 sm:py-10',
        className
      )}
      aria-labelledby="not-found-heading"
      {...(props as any)}
    >
      {/* Optional eyebrow status badge */}
      {badgeLabel && (
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransitions.springGentle}
          className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-raised text-[11px] font-mono uppercase tracking-widest text-text-muted mb-6"
        >
          <span className="size-1.5 rounded-full bg-amber-400/80 animate-pulse" aria-hidden="true" />
          <span>{badgeLabel}</span>
        </motion.div>
      )}

      {/* Screen-reader accessible announcement */}
      <span className="sr-only">Error {errorCode}: {title}</span>

      {/* Pure Floating Physical Digits */}
      <div
        className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 my-2 sm:my-4 perspective-[1000px]"
        aria-hidden="true"
      >
        {characters.map((char, index) => (
          <PhysicalDigit
            key={`${char}-${index}`}
            char={char}
            index={index}
            containerRef={containerRef}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Narrative Text */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionTransitions.springGentle, delay: 0.12 }}
        className="relative z-10 max-w-sm mx-auto mt-4 sm:mt-6 space-y-2"
      >
        <h1
          id="not-found-heading"
          className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight font-sans"
        >
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
            {description}
          </p>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionTransitions.springGentle, delay: 0.18 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8"
      >
        {children ? (
          children
        ) : (
          <>
            {onAction && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<Home className="size-4" />}
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            )}
            {!onAction && actionLabel && (
              <Button
                variant="primary"
                size="md"
                leftIcon={<Home className="size-4" />}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/';
                  }
                }}
              >
                {actionLabel}
              </Button>
            )}

            {onSecondaryAction && secondaryActionLabel && (
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="size-4" />}
                onClick={onSecondaryAction}
              >
                {secondaryActionLabel}
              </Button>
            )}
            {!onSecondaryAction && secondaryActionLabel && (
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="size-4" />}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.history.length > 1) {
                    window.history.back();
                  } else if (typeof window !== 'undefined') {
                    window.location.href = '/';
                  }
                }}
              >
                {secondaryActionLabel}
              </Button>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}

NotFound.displayName = 'NotFound';

