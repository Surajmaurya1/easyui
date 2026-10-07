'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the loader in pixels. Default is 32. */
  size?: number;
  /** Visual animation style variant. Default is 'arc'. */
  variant?: 'arc' | 'dots' | 'line' | 'rings';
  /** Optional accessible text label. */
  label?: string;
  /** Force reduced motion if true. */
  reduceMotion?: boolean;
  /** Custom stroke / fill color. Default inherits or neutral. */
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 32,
  variant = 'arc',
  label = 'Loading...',
  reduceMotion = false,
  color = 'currentColor',
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={cn('inline-flex flex-col items-center justify-center gap-2 text-[#FAFAFA]', className)}
      {...props}
    >
      {/* 1. Rotating Arc Variant */}
      {variant === 'arc' && (
        <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
          <svg
            className={cn('w-full h-full', !reduceMotion && 'animate-spin')}
            style={{ animationDuration: '2.5s' }}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#1F1F1F"
              strokeWidth="3"
              className="opacity-60"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="65"
            />
          </svg>
        </div>
      )}

      {/* 2. Breathing Dots Variant */}
      {variant === 'dots' && (
        <div
          style={{ width: size * 1.5, height: size * 0.4 }}
          className="flex items-center justify-center gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="rounded-full bg-current"
              style={{
                width: Math.max(4, size * 0.18),
                height: Math.max(4, size * 0.18),
                backgroundColor: color !== 'currentColor' ? color : undefined,
              }}
              animate={
                reduceMotion
                  ? { opacity: [0.3, 0.8, 0.3] }
                  : {
                      scale: [0.8, 1.25, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.22,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* 3. Sliding Line Variant */}
      {variant === 'line' && (
        <div
          style={{ width: size * 2, height: Math.max(3, size * 0.08) }}
          className="relative rounded-full bg-[#141414] overflow-hidden"
        >
          <motion.div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              width: '35%',
              backgroundColor: color !== 'currentColor' ? color : '#FAFAFA',
            }}
            animate={
              reduceMotion
                ? { opacity: [0.4, 1, 0.4] }
                : {
                    left: ['-35%', '100%'],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </div>
      )}

      {/* 4. Concentric Expanding Rings Variant */}
      {variant === 'rings' && (
        <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-current"
              style={{
                borderColor: color !== 'currentColor' ? color : undefined,
              }}
              animate={
                reduceMotion
                  ? { opacity: [0.2, 0.6, 0.2] }
                  : {
                      scale: [0.6, 1.15],
                      opacity: [0.8, 0],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.9,
                ease: 'easeOut',
              }}
            />
          ))}
          <span
            className="rounded-full bg-current"
            style={{
              width: Math.max(4, size * 0.2),
              height: Math.max(4, size * 0.2),
              backgroundColor: color !== 'currentColor' ? color : undefined,
            }}
          />
        </div>
      )}

      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};
