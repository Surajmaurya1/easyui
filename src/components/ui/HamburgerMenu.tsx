'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface HamburgerMenuProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Current opened/closed state. */
  isOpen: boolean;
  /** State change callback handler. */
  onChange: (isOpen: boolean) => void;
  /** Icon bounding box dimensions in pixels. Default is 24. */
  size?: number;
  /** Color of the menu stroke lines. Default is 'currentColor'. */
  color?: string;
  /** Accessible label. Default is 'Menu'. */
  label?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onChange,
  size = 24,
  color = 'currentColor',
  label = 'Menu',
  disabled = false,
  className,
  ...props
}) => {
  const lineSpacing = size * 0.28;
  const strokeWidth = Math.max(2, size * 0.08);

  const handleClick = () => {
    if (disabled) return;
    onChange(!isOpen);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-label={isOpen ? `Close ${label}` : `Open ${label}`}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2 text-[#FAFAFA] hover:text-white bg-transparent hover:bg-[#0E0E0E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
        className
      )}
      {...props}
    >
      <div
        style={{ width: size, height: size }}
        className="relative flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Top Line */}
        <motion.span
          style={{
            width: size,
            height: strokeWidth,
            backgroundColor: color !== 'currentColor' ? color : 'currentColor',
          }}
          className="absolute rounded-full"
          animate={{
            y: isOpen ? 0 : -lineSpacing,
            rotate: isOpen ? 45 : 0,
          }}
          transition={motionTransitions.springSnappy}
        />

        {/* Middle Line */}
        <motion.span
          style={{
            width: size,
            height: strokeWidth,
            backgroundColor: color !== 'currentColor' ? color : 'currentColor',
          }}
          className="absolute rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0.3 : 1,
          }}
          transition={motionTransitions.springSnappy}
        />

        {/* Bottom Line */}
        <motion.span
          style={{
            width: size,
            height: strokeWidth,
            backgroundColor: color !== 'currentColor' ? color : 'currentColor',
          }}
          className="absolute rounded-full"
          animate={{
            y: isOpen ? 0 : lineSpacing,
            rotate: isOpen ? -45 : 0,
          }}
          transition={motionTransitions.springSnappy}
        />
      </div>
    </button>
  );
};
