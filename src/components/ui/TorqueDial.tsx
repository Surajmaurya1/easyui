'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TorqueDialProps {
  /** Current numerical value. */
  value: number;
  /** Minimum selectable value. Default is 0. */
  min?: number;
  /** Maximum selectable value. Default is 100. */
  max?: number;
  /** Step increment. Default is 1. */
  step?: number;
  /** Change callback. */
  onChange: (value: number) => void;
  /** End of interaction / release callback. */
  onChangeEnd?: () => void;
  /** Accessible label. Default is 'Dial control'. */
  label?: string;
  /** Render numeric value at center or below. Default is true. */
  showValue?: boolean;
  /** Sizing diameter in pixels. Default is 120. */
  size?: number;
  /** Disables interaction. */
  disabled?: boolean;
  /** Apply realistic angular release momentum. Default is true. */
  momentum?: boolean;
  /** Custom unit or suffix (e.g., '°', '%', 'dB'). */
  unit?: string;
  /** Custom CSS class names. */
  className?: string;
}

export const TorqueDial: React.FC<TorqueDialProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeEnd,
  label = 'Dial control',
  showValue = true,
  size = 120,
  disabled = false,
  momentum = true,
  unit = '',
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const valueRef = useRef<number>(value);

  // Keep latest value in ref to avoid stale closures during gesture/RAF
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Map value to angle (-135deg to +135deg, total 270deg sweep)
  const angleRange = 270;
  const startAngle = -135;
  const normalizedProgress = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  const currentAngle = startAngle + normalizedProgress * angleRange;

  const clampValue = useCallback(
    (val: number) => {
      const stepped = Math.round((val - min) / step) * step + min;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(2))));
    },
    [min, max, step]
  );

  const calculateAngleFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!dialRef.current) return 0;
      const rect = dialRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rad = Math.atan2(clientY - centerY, clientX - centerX);
      let deg = (rad * 180) / Math.PI + 90; // Align 0deg to 12 o'clock
      if (deg > 180) deg -= 360;
      return deg;
    },
    []
  );

  // Attach non-passive wheel listener directly to DOM to prevent console errors & enable smooth scroll
  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (disabled) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? step : -step;
      const updated = clampValue(valueRef.current + delta);
      if (updated !== valueRef.current) {
        valueRef.current = updated;
        onChange(updated);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [disabled, step, clampValue, onChange]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsDragging(true);

    const deg = calculateAngleFromEvent(e.clientX, e.clientY);
    lastAngleRef.current = deg;
    velocityRef.current = 0;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const newAngle = calculateAngleFromEvent(moveEvent.clientX, moveEvent.clientY);
      let deltaAngle = newAngle - lastAngleRef.current;

      // Prevent 360-degree boundary wrap spikes
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      lastAngleRef.current = newAngle;
      velocityRef.current = deltaAngle;

      // Value delta proportional to angular movement
      const valueDelta = (deltaAngle / angleRange) * (max - min);
      const updated = clampValue(valueRef.current + valueDelta);
      if (updated !== valueRef.current) {
        valueRef.current = updated;
        onChange(updated);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (momentum && Math.abs(velocityRef.current) > 0.4) {
        let currentVel = velocityRef.current;

        const applyDecay = () => {
          currentVel *= 0.92; // Friction damping factor
          if (Math.abs(currentVel) > 0.05) {
            const delta = (currentVel / angleRange) * (max - min);
            const updated = clampValue(valueRef.current + delta);
            if (updated !== valueRef.current) {
              valueRef.current = updated;
              onChange(updated);
            }
            animFrameRef.current = requestAnimationFrame(applyDecay);
          } else {
            animFrameRef.current = null;
            onChangeEnd?.();
          }
        };

        animFrameRef.current = requestAnimationFrame(applyDecay);
      } else {
        onChangeEnd?.();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(clampValue(valueRef.current + step));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(clampValue(valueRef.current - step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(min);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(max);
    }
  };

  const handleDoubleClick = () => {
    if (disabled) return;
    onChange(clampValue((max + min) / 2));
  };

  // SVG circular arc geometric constants
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.32
  const arcLength = circumference * (angleRange / 360); // 270 deg = ~188.49
  const strokeOffset = arcLength * (1 - normalizedProgress);

  return (
    <div className={cn('inline-flex flex-col items-center select-none', className)}>
      <div
        ref={dialRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        style={{ width: size, height: size, touchAction: 'none' }}
        className={cn(
          'relative rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-white transition-shadow',
          disabled && 'opacity-40 cursor-not-allowed'
        )}
      >
        {/* Outer Circular Gauge Track */}
        <svg
          style={{ width: size, height: size }}
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 100 100"
        >
          {/* Background Track (270 deg arc starting at 135 deg / bottom-left) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#1F1F1F"
            strokeWidth="5"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(135 50 50)"
          />
          {/* Active Progress Track */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="5"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            transform="rotate(135 50 50)"
            transition={isDragging ? { duration: 0 } : motionTransitions.springSnappy}
          />
        </svg>

        {/* Center Rotating Knob */}
        <motion.div
          style={{
            width: size * 0.65,
            height: size * 0.65,
            rotate: currentAngle,
          }}
          transition={isDragging ? { duration: 0 } : motionTransitions.springSnappy}
          className={cn(
            'relative rounded-full bg-[#141414] border border-[#1F1F1F] shadow-xs flex items-center justify-center',
            isDragging && 'border-[#3B82F6]/60 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
          )}
        >
          {/* Top Indicator Pip / Notch */}
          <span className="absolute top-2 w-1.5 h-3 rounded-full bg-[#3B82F6] shadow-xs" />
          {/* Center tactile metallic ring */}
          <div className="w-4 h-4 rounded-full bg-[#0E0E0E] border border-[#1F1F1F]" />
        </motion.div>
      </div>

      {/* Numeric Value Display */}
      {showValue && (
        <div className="mt-3 text-center">
          <div className="text-sm font-mono font-semibold text-[#FAFAFA] tracking-tight">
            {value}
            {unit}
          </div>
          <span className="text-[10px] font-mono text-[#6B6B6B]">{label}</span>
        </div>
      )}
    </div>
  );
};
