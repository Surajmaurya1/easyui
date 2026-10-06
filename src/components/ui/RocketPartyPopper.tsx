'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Rocket, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface RocketPartyPopperProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  metric?: string;
  triggerLabel?: string;
  confettiCount?: number;
  defaultLaunched?: boolean;
  onLaunch?: () => void;
  onReset?: () => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  vRot: number;
  wobble: number;
  vWobble: number;
  life: number;
  age: number;
  shape: 'rect' | 'circle' | 'strip';
}

const CONFETTI_COLORS = [
  '#FAFAFA', // Pure White / Platinum
  '#38BDF8', // Sky Blue
  '#34D399', // Emerald Mint
  '#FBBF24', // Warm Gold
  '#F472B6', // Rose Pink
  '#A78BFA', // Soft Violet
  '#E4E4E7', // Zinc Light
];

export const RocketPartyPopper: React.FC<RocketPartyPopperProps> = ({
  triggerLabel = 'Launch celebration',
  confettiCount = 50,
  defaultLaunched = false,
  onLaunch,
  onReset,
  className,
  ...props
}) => {
  const [status, setStatus] = useState<'idle' | 'launching' | 'celebrating'>(
    defaultLaunched ? 'celebrating' : 'idle'
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Confetti Canvas Animation Loop
  const drawConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vx: p.vx * 0.985,
        vy: p.vy * 0.985 + 0.2, // gravity
        rotation: p.rotation + p.vRot,
        wobble: p.wobble + p.vWobble,
        age: p.age + 1,
      }))
      .filter((p) => p.age < p.life && p.y < canvas.height + 40);

    particlesRef.current.forEach((p) => {
      const progress = p.age / p.life;
      const alpha = progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      const wobbleScale = Math.sin(p.wobble);

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.width / 2, (-p.height * wobbleScale) / 2, p.width, p.height * wobbleScale);
      }

      ctx.restore();
    });

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(drawConfetti);
    } else {
      rafRef.current = null;
    }
  };

  const spawnConfettiBurst = (originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    if (canvas.width !== rect.width * scale || canvas.height !== rect.height * scale) {
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
    }

    const startX = originX * scale;
    const startY = originY * scale;
    const shapes: Array<'rect' | 'circle' | 'strip'> = ['rect', 'circle', 'strip'];

    particlesRef.current = Array.from({ length: confettiCount }).map(() => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 1.3);
      const speed = (4.8 + Math.random() * 7.5) * scale;
      return {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.2 * scale,
        width: (4 + Math.random() * 4.5) * scale,
        height: (6 + Math.random() * 8) * scale,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        wobble: Math.random() * Math.PI,
        vWobble: 0.08 + Math.random() * 0.1,
        life: 70 + Math.random() * 40,
        age: 0,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    });

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(drawConfetti);
    }
  };

  const handleLaunch = () => {
    if (status !== 'idle') return;
    onLaunch?.();

    if (reducedMotion) {
      setStatus('celebrating');
      return;
    }

    setStatus('launching');

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        spawnConfettiBurst(rect.width / 2, 60);
      }
      setStatus('celebrating');
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    particlesRef.current = [];
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    onReset?.();
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={cn('relative w-full max-w-lg mx-auto select-none', className)} {...props}>
      {/* Confetti Overflow Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -inset-x-20 -top-32 -bottom-20 z-30 h-[calc(100%+208px)] w-[calc(100%+160px)]"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'launching' ? (
          /* ========================================================== */
          /* 1. MINIMAL MATTE BLACK ROCKET LAUNCHPAD                     */
          /* ========================================================== */
          <motion.div
            key="launchpad"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
            className="flex flex-col items-center justify-center p-4 sm:p-6 text-center"
          >
            {/* Rocket Flight Track Container */}
            <div className="relative h-24 w-20 flex items-end justify-center mb-4">
              {/* Launchpad Ground Ring */}
              <div className="absolute bottom-0 w-14 h-1.5 rounded-full bg-[#050505] border border-[#1F1F1F]" />

              {/* The Matte Black Rocket */}
              <motion.div
                animate={
                  status === 'launching'
                    ? {
                        y: [-2, -170],
                        scale: [1, 1.1],
                        opacity: [1, 1, 0.8, 0],
                        transition: { duration: 0.58, ease: [0.4, 0, 0.2, 1] },
                      }
                    : {
                        y: [0, -2.5, 0],
                        transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
                      }
                }
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={handleLaunch}
              >
                {/* Sleek Dark Rocket Body */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#050505] border border-[#1F1F1F] hover:border-[#4A4A4A] transition-colors shadow-inner">
                  <Rocket className="w-6 h-6 text-[#FAFAFA] stroke-[1.75] -rotate-45" />
                </div>

                {/* Thruster Flame during Idle / Launch */}
                {status === 'launching' ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1.1], opacity: [0.9, 1, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-3.5 h-8 -mt-1 rounded-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[0.5px]"
                  />
                ) : (
                  <motion.div
                    animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-2 h-3 -mt-0.5 rounded-full bg-gradient-to-b from-amber-400/70 to-transparent blur-[0.5px]"
                  />
                )}
              </motion.div>
            </div>

            {/* Launch Trigger Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleLaunch}
                disabled={status === 'launching'}
                className="focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAFAFA] text-[#050505] text-xs font-semibold hover:bg-white transition-all active:scale-[0.97] cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#050505]" />
                <span>{status === 'launching' ? 'Launching...' : triggerLabel}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* ========================================================== */
          /* 2. MINIMAL CELEBRATORY SUCCESS CARD                        */
          /* ========================================================== */
          <motion.div
            key="celebration-relaunch"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={motionTransitions.springGentle}
            className="flex items-center justify-center py-4"
          >
            <button
              type="button"
              onClick={handleReset}
              className="focus-ring inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E0E0E] hover:bg-[#262626] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#FAFAFA] hover:text-white transition-all active:scale-[0.97] cursor-pointer shadow-sm"
              aria-label="Launch again"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
              <span>Launch again</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RocketPartyPopper;

