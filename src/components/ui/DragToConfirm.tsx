'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { ChevronRight, Check, Trash2, Lock, Unlock, Archive, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type DragConfirmActionType =
  | 'delete'
  | 'archive'
  | 'confirm'
  | 'submit'
  | 'unlock'
  | 'continue';

export type DragConfirmVariant =
  | 'default'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success';

export type DragConfirmSize = 'sm' | 'md' | 'lg';

export interface DragToConfirmProps {
  /** Label shown along track */
  label?: string;
  /** Label shown upon completion */
  confirmedLabel?: string;
  /** Action archetype */
  actionType?: DragConfirmActionType;
  /** Visual variant tone override */
  variant?: DragConfirmVariant;
  /** Size variant */
  size?: DragConfirmSize;
  /** Custom idle icon */
  icon?: React.ReactNode;
  /** Custom confirmed icon */
  confirmedIcon?: React.ReactNode;
  /** Controlled confirmed state */
  isConfirmed?: boolean;
  /** Callback fired on confirmation reach */
  onConfirm?: () => void;
  /** Callback fired when reset back to start */
  onReset?: () => void;
  /** Reset to start automatically after completion delay (ms). Pass 0 to disable. */
  autoResetDelay?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Enable haptic vibration feedback on confirmation */
  haptic?: boolean;
  /** Custom track class name */
  className?: string;
}

const SIZE_CONFIG = {
  sm: {
    trackHeight: 'h-10',
    padding: 'p-1',
    thumbSize: 32,
    thumbClass: 'w-8 h-8',
    offset: 40,
    text: 'text-[11px]',
    iconSize: 'w-3.5 h-3.5',
  },
  md: {
    trackHeight: 'h-12',
    padding: 'p-1',
    thumbSize: 40,
    thumbClass: 'w-10 h-10',
    offset: 48,
    text: 'text-xs',
    iconSize: 'w-4 h-4',
  },
  lg: {
    trackHeight: 'h-14',
    padding: 'p-1.5',
    thumbSize: 44,
    thumbClass: 'w-11 h-11',
    offset: 56,
    text: 'text-sm',
    iconSize: 'w-4.5 h-4.5',
  },
};

export const DragToConfirm: React.FC<DragToConfirmProps> = ({
  label = 'Slide to confirm',
  confirmedLabel = 'Confirmed ✓',
  actionType = 'confirm',
  variant,
  size = 'md',
  icon,
  confirmedIcon,
  isConfirmed: controlledConfirmed,
  onConfirm,
  onReset,
  autoResetDelay = 2500,
  disabled = false,
  haptic = true,
  className,
}) => {
  const [internalConfirmed, setInternalConfirmed] = useState(false);
  const isConfirmed = controlledConfirmed !== undefined ? controlledConfirmed : internalConfirmed;

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragMax, setDragMax] = useState(200);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  const currentSize = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  // Resolve active theme tone archetype
  const resolvedTone = variant || (
    actionType === 'delete' ? 'danger' :
    actionType === 'unlock' ? 'warning' :
    actionType === 'submit' ? 'info' :
    'default'
  );

  const calculateMaxDrag = useCallback(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      setDragMax(Math.max(40, trackWidth - currentSize.offset));
    }
  }, [currentSize.offset]);

  useEffect(() => {
    calculateMaxDrag();
    window.addEventListener('resize', calculateMaxDrag);
    return () => window.removeEventListener('resize', calculateMaxDrag);
  }, [calculateMaxDrag]);

  // Sync position with controlled isConfirmed changes
  useEffect(() => {
    if (controlledConfirmed !== undefined) {
      if (controlledConfirmed) {
        animate(x, dragMax, shouldReduceMotion ? { duration: 0 } : motionTransitions.springSnappy);
      } else {
        animate(x, 0, shouldReduceMotion ? { duration: 0 } : motionTransitions.springResponsive);
      }
    }
  }, [controlledConfirmed, dragMax, shouldReduceMotion, x]);

  // Cleanup autoReset timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Text smoothly fades and nudges forward as user drags handle
  const textOpacity = useTransform(x, [0, dragMax * 0.55], [1, 0]);
  const textTranslateX = useTransform(x, [0, dragMax * 0.55], [0, 8]);

  // Progressive fill width right behind the draggable handle
  const progressFillWidth = useTransform(
    x,
    (val) => `${Math.min(dragMax + currentSize.thumbSize + 4, val + currentSize.thumbSize + 4)}px`
  );

  const triggerHaptic = useCallback(() => {
    if (haptic && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(22);
      } catch {
        // Ignored if device policy denies vibration
      }
    }
  }, [haptic]);

  const confirmAction = useCallback(() => {
    triggerHaptic();
    animate(x, dragMax, shouldReduceMotion ? { duration: 0 } : motionTransitions.springSnappy);
    if (controlledConfirmed === undefined) {
      setInternalConfirmed(true);
    }
    onConfirm?.();

    if (autoResetDelay > 0) {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        if (controlledConfirmed === undefined) {
          setInternalConfirmed(false);
        }
        animate(x, 0, shouldReduceMotion ? { duration: 0 } : motionTransitions.springResponsive);
        onReset?.();
      }, autoResetDelay);
    }
  }, [
    autoResetDelay,
    controlledConfirmed,
    dragMax,
    onConfirm,
    onReset,
    shouldReduceMotion,
    triggerHaptic,
    x,
  ]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX >= dragMax * 0.85 && !isConfirmed) {
      confirmAction();
    } else {
      // Revert handle back to start with elastic return
      animate(x, 0, shouldReduceMotion ? { duration: 0 } : motionTransitions.springResponsive);
    }
  };

  const handleKeyboardConfirm = () => {
    if (disabled || isConfirmed) return;
    confirmAction();
  };

  // Archetype color profiles tailored for balanced light & dark appearance
  const getToneClasses = () => {
    switch (resolvedTone) {
      case 'danger':
        return {
          fill: 'bg-rose-500/10 dark:bg-rose-500/15 border-r border-rose-500/25',
          confirmedTrack: 'bg-rose-500/[0.08] border-rose-500/35 dark:bg-rose-500/15 dark:border-rose-500/30',
          confirmedHandle: 'bg-rose-600 text-white dark:bg-rose-500 dark:text-white border-rose-600 dark:border-rose-500 shadow-xs',
          confirmedText: 'text-rose-600 dark:text-rose-400 font-semibold',
          iconColor: 'text-rose-500 dark:text-rose-400',
        };
      case 'warning':
        return {
          fill: 'bg-amber-500/10 dark:bg-amber-500/15 border-r border-amber-500/25',
          confirmedTrack: 'bg-amber-500/[0.08] border-amber-500/35 dark:bg-amber-500/15 dark:border-amber-500/30',
          confirmedHandle: 'bg-amber-500 text-neutral-950 dark:bg-amber-400 dark:text-neutral-950 border-amber-500 dark:border-amber-400 shadow-xs',
          confirmedText: 'text-amber-600 dark:text-amber-400 font-semibold',
          iconColor: 'text-amber-500 dark:text-amber-400',
        };
      case 'info':
        return {
          fill: 'bg-blue-500/10 dark:bg-blue-500/15 border-r border-blue-500/25',
          confirmedTrack: 'bg-blue-500/[0.08] border-blue-500/35 dark:bg-blue-500/15 dark:border-blue-500/30',
          confirmedHandle: 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white border-blue-600 dark:border-blue-500 shadow-xs',
          confirmedText: 'text-blue-600 dark:text-blue-400 font-semibold',
          iconColor: 'text-blue-500 dark:text-blue-400',
        };
      default:
        return {
          fill: 'bg-neutral-200/70 dark:bg-white/[0.07] border-r border-neutral-300/50 dark:border-white/10',
          confirmedTrack: 'bg-emerald-500/[0.08] border-emerald-500/35 dark:bg-emerald-500/15 dark:border-emerald-500/30',
          confirmedHandle: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-neutral-950 border-emerald-600 dark:border-emerald-500 shadow-xs',
          confirmedText: 'text-emerald-600 dark:text-emerald-400 font-semibold',
          iconColor: 'text-neutral-700 dark:text-neutral-200',
        };
    }
  };

  const tone = getToneClasses();

  const getActionIcon = () => {
    switch (actionType) {
      case 'delete':
        return <Trash2 className={cn(currentSize.iconSize, tone.iconColor)} />;
      case 'unlock':
        return isConfirmed ? (
          <Unlock className={cn(currentSize.iconSize)} />
        ) : (
          <Lock className={cn(currentSize.iconSize, tone.iconColor)} />
        );
      case 'archive':
        return <Archive className={cn(currentSize.iconSize, tone.iconColor)} />;
      case 'submit':
        return <ArrowRight className={cn(currentSize.iconSize, tone.iconColor)} />;
      default:
        return <ChevronRight className={cn(currentSize.iconSize, tone.iconColor)} />;
    }
  };

  return (
    <div className={cn('w-full max-w-sm select-none font-sans', className)}>
      <div
        ref={trackRef}
        className={cn(
          'relative rounded-full border flex items-center overflow-hidden transition-all duration-200',
          currentSize.trackHeight,
          currentSize.padding,
          isConfirmed
            ? tone.confirmedTrack
            : 'bg-neutral-100/90 dark:bg-[#121214] border-neutral-200/90 dark:border-[#232327] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        {/* Progressive Dynamic Fill behind the Thumb */}
        <motion.div
          style={{
            width: isConfirmed ? '100%' : progressFillWidth,
          }}
          className={cn(
            'absolute left-0 top-0 bottom-0 rounded-full pointer-events-none z-0 transition-colors duration-200',
            tone.fill
          )}
        />

        {/* Track Label Text */}
        <motion.div
          style={{ opacity: isConfirmed ? 0 : textOpacity, x: textTranslateX }}
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none font-medium tracking-tight z-10 text-neutral-500 dark:text-neutral-400 select-none',
            currentSize.text
          )}
        >
          {label}
        </motion.div>

        {/* Confirmed State Label */}
        {isConfirmed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={motionTransitions.springSnappy}
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none tracking-tight z-10 select-none',
              currentSize.text,
              tone.confirmedText
            )}
          >
            {confirmedLabel}
          </motion.div>
        )}

        {/* Draggable Handle Button */}
        <motion.div
          drag={disabled || isConfirmed ? false : 'x'}
          dragConstraints={{ left: 0, right: dragMax }}
          dragElastic={0.06}
          dragMomentum={false}
          style={{ x }}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.04 }}
          whileTap={disabled || isConfirmed ? undefined : { scale: 0.96 }}
          transition={motionTransitions.springSnappy}
          className={cn(
            currentSize.thumbClass,
            'rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-20 relative select-none touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 transition-[background-color,border-color,box-shadow]',
            isConfirmed
              ? tone.confirmedHandle
              : 'bg-white dark:bg-[#1C1C20] border border-neutral-200/90 dark:border-[#2C2C32] text-neutral-800 dark:text-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:border-neutral-300 dark:hover:border-[#3A3A42]',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isConfirmed ? 100 : Math.round((x.get() / (dragMax || 1)) * 100)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
              e.preventDefault();
              handleKeyboardConfirm();
            }
          }}
        >
          {isConfirmed ? (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={motionTransitions.springSnappy}
            >
              {confirmedIcon ?? <Check className={cn(currentSize.iconSize, 'stroke-[2.5]')} />}
            </motion.div>
          ) : (
            icon ?? getActionIcon()
          )}
        </motion.div>
      </div>

      {/* Screen Reader and Accessibility Fallback Button */}
      <div className="sr-only">
        <button
          type="button"
          onClick={handleKeyboardConfirm}
          disabled={disabled || isConfirmed}
        >
          {label}
        </button>
      </div>
    </div>
  );
};
