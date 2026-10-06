'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface LiquidRippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
}

interface WaterDropRipple {
  id: number;
  x: number;
  y: number;
}

export const LiquidRippleButton: React.FC<LiquidRippleButtonProps> = ({
  children = 'Water Ripple',
  variant = 'secondary',
  showIcon = true,
  className,
  onPointerDown,
  ...props
}) => {
  const [ripples, setRipples] = useState<WaterDropRipple[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isPrimary = variant === 'primary';

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-3), { id: newRippleId, x, y }]);

    onPointerDown?.(event);
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={motionTransitions.springSnappy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      className={cn(
        'focus-ring group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-xs sm:text-sm font-medium tracking-tight select-none cursor-pointer transition-all duration-300',
        isPrimary
          ? 'bg-[#FAFAFA] text-[#050505] hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
          : 'border border-[#3A3A3A] bg-[#161616] text-[#FAFAFA] hover:border-[#525252] hover:bg-[#0B0B0B] shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
        className
      )}
      {...(props as any)}
    >
      <style>{`
        @keyframes easyui-wave-flow-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes easyui-wave-flow-2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* ========================================================== */}
      {/* 1. VISIBLE UNDULATING WATER RESERVOIR & WAVES (NO SEAM)    */}
      {/* ========================================================== */}
      {!reducedMotion && (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden transition-all duration-500 ease-out',
            isHovered ? 'h-[65%]' : 'h-[50%]'
          )}
        >
          {/* Back Deeper Liquid Wave Layer (Continuous Single Path) */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 h-full w-[200%]',
              isPrimary ? 'opacity-20' : 'opacity-35'
            )}
            style={{
              animation: 'easyui-wave-flow-2 6s linear infinite',
            }}
          >
            <svg
              className="h-full w-full fill-current text-sky-400"
              viewBox="0 0 2000 100"
              preserveAspectRatio="none"
            >
              <path d="M0,30 Q250,70 500,30 T1000,30 T1500,70 T2000,30 L2000,100 L0,100 Z" />
            </svg>
          </div>

          {/* Front Dynamic Water Surface Wave (Continuous Single Path) */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 h-full w-[200%]',
              isPrimary ? 'opacity-30' : 'opacity-55'
            )}
            style={{
              animation: 'easyui-wave-flow-1 4s linear infinite',
            }}
          >
            <svg
              className="h-full w-full fill-current text-cyan-300"
              viewBox="0 0 2000 100"
              preserveAspectRatio="none"
            >
              <path d="M0,45 Q250,10 500,45 T1000,45 T1500,10 T2000,45 L2000,100 L0,100 Z" />
            </svg>
          </div>

          {/* Water Surface Glow Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
        </div>
      )}

      {/* Top Subtle Specular Sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent" />

      {/* ========================================================== */}
      {/* 2. CLEARLY VISIBLE WATER DROPLET RIPPLES ON CLICK          */}
      {/* ========================================================== */}
      <AnimatePresence>
        {!reducedMotion &&
          ripples.map((ripple) => (
            <React.Fragment key={ripple.id}>
              {/* Outer Glowing Water Shockwave Ring */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0, opacity: isPrimary ? 0.6 : 0.95 }}
                animate={{ scale: 4.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() =>
                  setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
                }
                className={cn(
                  'pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2',
                  isPrimary
                    ? 'border-black/50 bg-black/20'
                    : 'border-cyan-300 bg-sky-400/30 shadow-[0_0_20px_rgba(103,232,249,0.8)]'
                )}
                style={{ left: ripple.x, top: ripple.y }}
              />

              {/* Inner Concentric Meniscus Ring */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0, opacity: isPrimary ? 0.5 : 0.85 }}
                animate={{ scale: 2.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border',
                  isPrimary ? 'border-black/40' : 'border-white/80'
                )}
                style={{ left: ripple.x, top: ripple.y }}
              />
            </React.Fragment>
          ))}
      </AnimatePresence>

      {/* ========================================================== */}
      {/* 3. BUTTON CONTENT & WATER DROPLET ICON                      */}
      {/* ========================================================== */}
      <span className="relative z-10 inline-flex items-center gap-2 drop-shadow-sm font-medium">
        {showIcon && (
          <Droplets
            className={cn(
              'h-4 w-4 transition-all duration-300',
              isHovered ? 'scale-115 text-cyan-300 rotate-12' : 'opacity-90 text-current'
            )}
          />
        )}
        <span>{children}</span>
      </span>
    </motion.button>
  );
};

export default LiquidRippleButton;
