'use client';

import React, { forwardRef, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface DrawCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  /** Indeterminate visual state */
  indeterminate?: boolean;
}

/**
 * DrawCheckbox — The checkmark draws itself (path length animation) and
 * settles with a tiny overshoot. The box also springs from 0.9 -> 1.02 -> 1.0
 * for a tactile "snap" feel.
 */
export const DrawCheckbox = forwardRef<HTMLInputElement, DrawCheckboxProps>(
  (
    {
      className,
      label,
      description,
      checked,
      defaultChecked,
      disabled,
      indeterminate = false,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isChecked, setIsChecked] = useState(defaultChecked || false);

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : isChecked;
    const showCheck = currentChecked || indeterminate;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setIsChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <div
        className={cn(
          'flex items-start gap-2.5 select-none',
          disabled && 'opacity-30 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={currentChecked}
            disabled={disabled}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />

          {/* Box: a tiny "pop" via scale 0.9 -> 1.04 -> 1.0 when checked */}
          <motion.div
            onClick={() => {
              if (disabled) return;
              const input = document.getElementById(inputId) as HTMLInputElement | null;
              input?.click();
            }}
            initial={false}
            animate={{
              scale: showCheck ? [0.9, 1.04, 1] : 1,
              backgroundColor: showCheck ? 'var(--accent)' : 'var(--surface-raised)',
              borderColor: showCheck ? 'var(--accent)' : 'var(--border)',
            }}
            transition={{
              // Use a keyframed spring-like array for the "settle" overshoot.
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer focus-ring"
            style={{ borderColor: showCheck ? 'var(--accent)' : 'var(--border)' }}
          >
            {/* Path-draw checkmark with overshoot on stroke-dashoffset */}
            {currentChecked && !indeterminate && (
              <motion.svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                fill="none"
                stroke="var(--bg)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, scale: 0.6, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  scale: [0.6, 1.18, 1], // tiny overshoot
                  opacity: 1,
                }}
                transition={{
                  pathLength: { duration: 0.28, ease: [0.65, 0, 0.35, 1] },
                  scale: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.12 },
                }}
              >
                <motion.path
                  d="M3.5 8.5 L6.5 11.5 L12.5 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </motion.svg>
            )}

            {/* Indeterminate: a centered bar that draws from left to right */}
            {indeterminate && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={motionTransitions.springSnappy}
                style={{ transformOrigin: 'left center' }}
                className="w-2.5 h-[2px] rounded-full bg-[var(--bg)]"
              />
            )}
          </motion.div>
        </div>

        {(label || description) && (
          <label
            htmlFor={inputId}
            className={cn('cursor-pointer text-left', disabled && 'cursor-not-allowed')}
          >
            {label && (
              <div className="text-xs font-medium text-[var(--text-primary)] leading-tight">
                {label}
              </div>
            )}
            {description && (
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                {description}
              </div>
            )}
          </label>
        )}
      </div>
    );
  }
);

DrawCheckbox.displayName = 'DrawCheckbox';
