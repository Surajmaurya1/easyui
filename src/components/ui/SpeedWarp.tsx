'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

export interface SpeedWarpProps {
  /** Velocity multiplier of stars moving toward the camera. Default: 25 */
  speed?: number;
  /** Total number of 3D stars rendered. Default: 600 */
  starCount?: number;
  /** Optional custom class name */
  className?: string;
  /** Optional children rendered on top of the warp canvas */
  children?: React.ReactNode;
}

export function SpeedWarp({
  speed = 25,
  starCount = 600,
  className,
  children,
}: SpeedWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const parent = canvas.parentElement;

    let width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
    let height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

    // Track size of the parent viewport
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          width = canvas.width = w;
          height = canvas.height = h;
        }
      }
    });

    if (parent) {
      resizeObserver.observe(parent);
    }

    // Initialize 3D star coordinates relative to the viewport
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      prevZ: 0,
    }));

    const render = (): void => {
      // Completely wipe the canvas frame to ensure 100% transparent background
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.prevZ = star.z;
        star.z -= speed;

        // Reset star to the back if it passes the camera plane
        if (star.z <= 0) {
          star.z = width;
          star.prevZ = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Perspective 3D projection
        const k = 250; // Focal length
        const sx = (star.x / star.z) * k + cx;
        const sy = (star.y / star.z) * k + cy;

        const prevSx = (star.x / star.prevZ) * k + cx;
        const prevSy = (star.y / star.prevZ) * k + cy;

        // Render line streak only if inside viewport bounds
        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const depthAlpha = Math.min(1, Math.max(0.1, 1 - star.z / width));

          ctx.beginPath();
          ctx.moveTo(prevSx, prevSy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(255, 255, 255, ${depthAlpha})`;
          ctx.lineWidth = (1 - star.z / width) * 2.5 + 0.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, starCount]);

  if (children) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden', className)}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none bg-transparent"
        />
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none bg-transparent',
        className
      )}
    />
  );
}

export default SpeedWarp;