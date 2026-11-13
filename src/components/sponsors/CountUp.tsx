import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { cn } from '../../lib/utils';

export interface CountUpProps {
  /** A display value such as "85K+" or "330K+". */
  value: string;
  className?: string;
}

function parseDisplayValue(value: string): { target: number; suffix: string; decimals: number; useGrouping: boolean } | null {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return null;
  const numericPart = match[1].replace(/,/g, '');
  const target = Number(numericPart);
  if (!Number.isFinite(target)) return null;
  return {
    target,
    suffix: match[2],
    decimals: numericPart.split('.')[1]?.length ?? 0,
    useGrouping: match[1].includes(','),
  };
}

/** Uses EasyUI's rolling digit animation when the stat first enters view. */
export const CountUp: React.FC<CountUpProps> = ({ value, className }) => {
  const parsed = useMemo(() => parseDisplayValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(parsed?.target ?? 0);

  useEffect(() => {
    if (!parsed || !inView) return;
    if (reduceMotion) {
      setDisplay(parsed.target);
      return;
    }

    setDisplay(0);
    const frame = requestAnimationFrame(() => setDisplay(parsed.target));
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed, reduceMotion]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className="inline-flex" aria-label={value}>
      <AnimatedNumber
        value={display}
        suffix={parsed.suffix}
        decimals={parsed.decimals}
        useGrouping={parsed.useGrouping}
        stiffness={95}
        damping={24}
        mass={0.9}
        className={cn('font-sans text-text-primary', className)}
      />
    </span>
  );
};
