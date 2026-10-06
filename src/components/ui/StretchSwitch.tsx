'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface StretchSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  className?: string;
}

const TRACK_WIDTH = 36; // px (w-9)
const THUMB_SIZE = 14; // px (h-3.5 w-3.5)
const TRACK_PADDING = 2; // px-0.5
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2;

/**
 * StretchSwitch — Thumb stretches slightly while dragging/pressing,
 * then snaps naturally to its destination.
 *
 * Implementation: while pressing, the thumb is allowed to grow horizontally
 * (scaleX > 1) and slightly vertically (scaleY < 1) so it looks "stretched".
 * On release, the spring (springSnappy) handles the snap to the new x.
 */
export const StretchSwitch: React.FC<StretchSwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  description,
  className,
}) => {
  const [isOn, setIsOn] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const current = isControlled ? checked : isOn;

  const x = useMotionValue(current ? TRAVEL : 0);
  const [isPressed, setIsPressed] = useState(false);

  // Animate to the new x whenever current changes
  React.useEffect(() => {
    animate(x, current ? TRAVEL : 0, motionTransitions.springSnappy);
  }, [current, x]);

  // Stretch the thumb: while pressed, scaleX -> 1.18, scaleY -> 0.86 — looks stretched.
  const scaleX = useTransform(x, () => (isPressed ? 1.18 : 1));
  const scaleY = useTransform(x, () => (isPressed ? 0.86 : 1));

  const handleToggle = () => {
    if (disabled) return;
    const next = !current;
    if (!isControlled) setIsOn(next);
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 select-none',
        disabled && 'opacity-30 cursor-not-allowed',
        className
      )}
    >
      {(label || description) && (
        <div
          className={cn('text-left cursor-pointer', disabled && 'cursor-not-allowed')}
          onClick={handleToggle}
        >
          {label && (
            <div className="text-xs font-medium text-[var(--text-primary)] leading-tight">{label}</div>
          )}
          {description && (
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
              {description}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={current}
        disabled={disabled}
        onPointerDown={() => !disabled && setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus-ring',
          current
            ? 'bg-[var(--text-primary)] border-[var(--text-primary)]'
            : 'bg-[var(--surface-raised)] border-[var(--border)]',
          disabled && 'cursor-not-allowed'
        )}
        style={{ paddingInline: TRACK_PADDING }}
      >
        <motion.span
          style={{ x, scaleX, scaleY, width: THUMB_SIZE, height: THUMB_SIZE }}
          className={cn(
            'pointer-events-none block my-auto rounded-full shadow-xs origin-center',
            current ? 'bg-[var(--bg)]' : 'bg-[var(--text-secondary)]'
          )}
        />
      </button>
    </div>
  );
};
