'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GravityParticleBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  particleCount?: number;
  children?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
  size: number;
  color: string;
}

const PARTICLE_PALETTE = ['#FFFFFF', '#F4F4F5', '#E4E4E7', '#FDE047', '#93C5FD'];

export const GravityParticleBurst: React.FC<GravityParticleBurstProps> = ({
  label = 'Create particle burst',
  particleCount = 36,
  children,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedRef.current = query.matches;
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = particlesRef.current
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.vx * 0.98,
        vy: particle.vy * 0.98 + 0.16,
        age: particle.age + 1,
      }))
      .filter((particle) => particle.age < particle.life);

    particlesRef.current.forEach((particle) => {
      const progress = particle.age / particle.life;
      context.globalAlpha = Math.max(1 - progress, 0);
      context.fillStyle = particle.color;
      context.beginPath();
      context.ellipse(
        particle.x,
        particle.y,
        particle.size * (1 - progress * 0.3),
        particle.size * (1 - progress * 0.3),
        0,
        0,
        Math.PI * 2
      );
      context.fill();
    });
    context.globalAlpha = 1;

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      rafRef.current = null;
    }
  };

  const burst = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || reducedRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    
    if (canvas.width !== rect.width * scale || canvas.height !== rect.height * scale) {
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
    }
    
    const originX = (clientX - rect.left) * scale;
    const originY = (clientY - rect.top) * scale;

    particlesRef.current.push(
      ...Array.from({ length: particleCount }).map((_, index) => {
        const angle = -Math.PI + (Math.PI * 2 * index) / particleCount + (Math.random() - 0.5) * 0.4;
        const force = (2.4 + Math.random() * 4.2) * scale;
        return {
          x: originX,
          y: originY,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 1.8 * scale,
          life: 42 + Math.random() * 32,
          age: 0,
          size: (1.5 + Math.random() * 2.2) * scale,
          color: PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)],
        };
      })
    );

    if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={cn('relative inline-flex rounded-xl', className)}
      onPointerDown={(event) => burst(event.clientX, event.clientY)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -inset-20 z-20 h-[calc(100%+160px)] w-[calc(100%+160px)]"
        aria-hidden="true"
      />
      <button
        type="button"
        className="focus-ring relative inline-flex items-center gap-2 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] px-5 py-3 text-sm font-medium text-[#FAFAFA] transition duration-150 hover:border-[#4A4A4A] hover:bg-[#141414] active:scale-[0.97] cursor-pointer"
      >
        <Sparkles className="h-4 w-4 text-amber-300" />
        <span className="select-none">{children || label}</span>
      </button>
    </div>
  );
};

