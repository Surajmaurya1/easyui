'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Check, X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type VelocityToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type VelocityToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface VelocityToastProps {
  open: boolean;
  onDismiss?: () => void;
  title: string;
  description?: string;
  duration?: number;
  variant?: VelocityToastVariant;
  position?: VelocityToastPosition;
  showProgress?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const positionClasses: Record<VelocityToastPosition, string> = {
  'top-left': 'top-5 left-5 items-start',
  'top-center': 'top-5 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-5 right-5 items-end',
  'bottom-left': 'bottom-5 left-5 items-start',
  'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-5 right-5 items-end',
};

const variantIcon = (variant: VelocityToastVariant, custom?: React.ReactNode) => {
  if (custom) return custom;
  switch (variant) {
    case 'success':
      return <Check className="w-4 h-4 text-emerald-400" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-rose-400" />;
    case 'info':
      return <Info className="w-4 h-4 text-sky-400" />;
    default:
      return <Info className="w-4 h-4 text-[var(--text-secondary)]" />;
  }
};

/**
 * VelocityToast — Enters with velocity and settles; the progress bar
 * responds naturally (animates from 100 -> 0 with a slight ease-in so the
 * last 10% feels like the toast is "deciding" to close).
 *
 * On hover the progress pauses; on leave it resumes with no jump. The
 * container slides in with a slightly higher initial velocity (initial y
 * offset 18px) that settles through a snappy spring, giving the toast a
 * feeling of motion.
 */
export const VelocityToast: React.FC<VelocityToastProps> = ({
  open,
  onDismiss,
  title,
  description,
  duration = 4000,
  variant = 'default',
  position = 'bottom-center',
  showProgress = true,
  icon,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isPaused, setIsPaused] = useState(false);

  // Progress driven by a framer-motion motion value so we can drive it from
  // a single tween that is responsive to hover (paused) and dismissal.
  const progressMV = useMotionValue(100);
  const progressWidth = useTransform(progressMV, (v) => `${v}%`);

  const remainingRef = useRef<number>(duration);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    progressMV.set(100);
    remainingRef.current = duration;
    startRef.current = performance.now();
  }, [open, duration, progressMV]);

  // Animate progress from 100 -> 0 over `remaining` ms. When isPaused we
  // simply skip the tween (progressMV holds its current value).
  useEffect(() => {
    if (!isVisible || !showProgress) return;
    if (isPaused) {
      // freeze the time origin so resume picks up where we left off
      startRef.current = performance.now() - (duration - remainingRef.current);
      return;
    }

    startRef.current = performance.now() - (duration - remainingRef.current);

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const remaining = Math.max(0, duration - elapsed);
      remainingRef.current = remaining;
      // Map remaining (duration -> 0) to (100 -> 0) with a slight ease-in
      // (pow 1.05) so the last 10% feels like the toast is "deciding" to close.
      const linear = remaining / duration;
      const eased = Math.pow(linear, 1.05);
      progressMV.set(eased * 100);

      if (remaining <= 0) {
        setIsVisible(false);
        onDismiss?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, isPaused, duration, progressMV, showProgress, onDismiss]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  // Whether the toast enters from above or below depends on the position
  const isTop = position.startsWith('top');

  return (
    <div
      className={cn(
        'fixed z-50 pointer-events-none flex flex-col',
        positionClasses[position]
      )}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            // Entry: starts further out for a higher perceived velocity, then settles
            initial={{ opacity: 0, y: isTop ? -22 : 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, y: isTop ? -12 : 12 }}
            transition={motionTransitions.springSnappy}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={cn(
              'pointer-events-auto relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-elevated)] p-3.5 sm:p-4 min-w-[280px] sm:min-w-[340px] max-w-md font-sans select-none',
              className
            )}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center shrink-0">
                {variantIcon(variant, icon)}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{title}</p>
                {description && (
                  <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">{description}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 rounded-md text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors focus-ring cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {showProgress && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--border)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--text-primary)]"
                  style={{ width: progressWidth }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
