'use client';

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface AnimatedNumberProps {
  /** Numeric value to animate to */
  value: number;
  /** Number of decimal places (default: 0) */
  decimals?: number;
  /** Prepend text or currency symbol (e.g. "$", "+") */
  prefix?: string;
  /** Append text (e.g. "%", " users", "ms") */
  suffix?: string;
  /** Spring physics stiffness */
  stiffness?: number;
  /** Spring physics damping */
  damping?: number;
  /** Mass of spring */
  mass?: number;
  /** Format as locale string (e.g. "1,250") */
  useGrouping?: boolean;
  /** Compact notation (e.g. 1.2M, 45K) */
  compact?: boolean;
  /** Custom class name */
  className?: string;
}

// Single Digit Rolling Column
const DigitColumn: React.FC<{
  digit: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
}> = ({ digit, stiffness = 160, damping = 18, mass = 0.8 }) => {
  const isNumber = !isNaN(parseInt(digit, 10));
  const numValue = isNumber ? parseInt(digit, 10) : 0;

  const spring = useSpring(numValue, {
    stiffness,
    damping,
    mass,
  });

  const y = useTransform(spring, (current) => `-${current * 10}%`);

  useEffect(() => {
    spring.set(numValue);
  }, [spring, numValue]);

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <div className="inline-block relative overflow-hidden h-[1.15em] leading-[1.15em] w-[0.58em] text-center">
      <motion.div
        style={{ y }}
        className="flex flex-col select-none"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className="h-[1.15em] flex items-center justify-center">
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  stiffness = 170,
  damping = 22,
  mass = 0.6,
  useGrouping = true,
  compact = false,
  className,
}) => {
  const formatNumber = (val: number): string => {
    if (compact) {
      const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      });
      return formatter.format(val);
    }

    const fixed = Math.abs(val).toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');

    let formattedInt = intPart;
    if (useGrouping) {
      formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const sign = val < 0 ? '-' : '';
    return decPart !== undefined ? `${sign}${formattedInt}.${decPart}` : `${sign}${formattedInt}`;
  };

  const formattedStr = formatNumber(value);
  const chars = formattedStr.split('');

  return (
    <span
      className={cn(
        'inline-flex items-baseline font-mono tracking-tight text-[#FAFAFA] select-none',
        className
      )}
      aria-label={`${prefix}${formattedStr}${suffix}`}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <span className="inline-flex items-baseline overflow-hidden">
        {chars.map((char, index) => (
          <DigitColumn
            key={`${index}-${char === ',' || char === '.' || char === '-' ? char : 'num'}`}
            digit={char}
            stiffness={stiffness}
            damping={damping}
            mass={mass}
          />
        ))}
      </span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
};
