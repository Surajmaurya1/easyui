'use client';

import React, { forwardRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type PressButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type PressButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface PressButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Visual presentation style */
  variant?: PressButtonVariant;
  /** Dimension scale */
  size?: PressButtonSize;
  /** Press compression strength (0-1). Higher = more compression */
  pressStrength?: number;
  /** Expand button to fill 100% of container width */
  fullWidth?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

const variantStyles: Record<PressButtonVariant, string> = {
  primary:
    'bg-[var(--text-primary)] text-[var(--bg)] hover:opacity-90 border border-transparent',
  secondary:
    'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]',
  outline:
    'bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] border border-transparent',
};

const sizeStyles: Record<PressButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs rounded-md gap-1.5',
  md: 'h-10 px-4.5 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-base rounded-lg gap-2.5',
  icon: 'h-10 w-10 p-0 rounded-lg justify-center shrink-0',
};

/**
 * PressButton — Compresses slightly on press, then settles with a tiny natural overshoot.
 * Uses a layered scaleX + scaleY motion for a tactile, physical feel.
 */
export const PressButton = forwardRef<HTMLButtonElement, PressButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      pressStrength = 0.04,
      fullWidth = false,
      disabled,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const compression = Math.min(0.06, Math.max(0.01, pressStrength));

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onTapStart={() => setIsPressed(true)}
        onTap={() => setIsPressed(false)}
        onTapCancel={() => setIsPressed(false)}
        animate={{
          // Tiny Y squash on press, then settle; a near-critical spring gives the
          // subtle overshoot without bouncing.
          scaleX: isPressed ? 1 - compression : 1,
          scaleY: isPressed ? 1 - compression * 1.6 : 1,
        }}
        transition={motionTransitions.springSnappy}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'relative inline-flex items-center justify-center font-medium select-none focus-ring transition-colors duration-150 cursor-pointer',
          variantStyles[variant],
          variant !== 'ghost' && sizeStyles[size],
          fullWidth && 'w-full',
          disabled && 'opacity-30 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

PressButton.displayName = 'PressButton';
