'use client';

import React, { forwardRef, useState, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface LockInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the input */
  label?: string;
  /** Helper text below the input */
  description?: string;
  /** Error message; presence triggers danger styling */
  error?: string;
  /** Optional icon at the start of the input */
  leftIcon?: React.ReactNode;
  /** Optional icon at the end of the input */
  rightIcon?: React.ReactNode;
}

/**
 * LockInput — Focus state subtly "locks" into place.
 * The focus ring scales out from the center and the border tweens from
 * inactive to active, giving the impression that the input snaps closed
 * on itself when focused.
 */
export const LockInput = forwardRef<HTMLInputElement, LockInputProps>(
  (
    {
      label,
      description,
      error,
      leftIcon,
      rightIcon,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-primary)] tracking-tight select-none"
          >
            {label}
          </label>
        )}

        <div className="relative w-full flex items-center">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 flex items-center justify-center transition-colors duration-200 pointer-events-none',
                isFocused ? 'text-[var(--text-primary)]' : 'text-[var(--text-subtle)]'
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'peer w-full h-11 px-3.5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-[var(--surface-raised)] rounded-lg outline-none',
              'border',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error
                ? 'border-rose-500/50 focus:border-rose-500'
                : 'border-[var(--border)]',
              disabled && 'opacity-30 cursor-not-allowed',
              'transition-colors duration-200',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              description ? `${inputId}-desc` : undefined
            }
            {...props}
          />

          {/* Focus ring: scales in from 0.92 to 1.0 to give the "lock into place" feel. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg"
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.94,
            }}
            transition={motionTransitions.springSnappy}
            style={{
              boxShadow: error
                ? '0 0 0 2px rgba(244, 63, 94, 0.45)'
                : '0 0 0 2px var(--accent-ring)',
            }}
          />

          {/* Subtle border-color lock: animates from inactive to active via shared layout. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg"
            initial={false}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={motionTransitions.springSnappy}
            style={{
              boxShadow: error
                ? 'inset 0 0 0 1px rgba(244, 63, 94, 0.6)'
                : 'inset 0 0 0 1px var(--border-hover)',
            }}
          />

          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 flex items-center justify-center transition-colors duration-200 pointer-events-none',
                isFocused ? 'text-[var(--text-primary)]' : 'text-[var(--text-subtle)]'
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {description && !error && (
          <p
            id={`${inputId}-desc`}
            className="text-xs text-[var(--text-muted)] leading-relaxed"
          >
            {description}
          </p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransitions.springSnappy}
            className="text-xs text-rose-400 font-medium"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

LockInput.displayName = 'LockInput';
