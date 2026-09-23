"use client";

import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

export type SparkleShape = "circle" | "star" | "cross" | "mixed";
export type SparkleDirection = "none" | "top" | "bottom" | "left" | "right";
export type SparkleCursorMode = "repulse" | "attract" | "sparkle" | "none";

export interface SparklesCoreProps
  extends Omit<HTMLMotionProps<"div">, "children" | "ref"> {
  /** Unique canvas identifier */
  id?: string;
  /** Background canvas fill color or CSS background. Default: "transparent" */
  background?: string;
  /** Optional container class names */
  className?: string;
  /** Uniform base particle size override */
  particleSize?: number;
  /** Minimum particle radius/size in pixels. Default: 0.6 */
  minSize?: number;
  /** Maximum particle radius/size in pixels. Default: 2.4 */
  maxSize?: number;
  /** Movement velocity multiplier. Default: 1 */
  speed?: number;
  /** Primary sparkle color (hex or rgba). Default: "#FFFFFF" */
  particleColor?: string;
  /** Array of colors to distribute among particles for chromatic starry fields */
  particleColors?: string[];
  /** Relative particle density count per 400x400 area. Default: 120 */
  particleDensity?: number;
  /** Exact particle count override */
  particleCount?: number;
  /** Particle geometry shape. Default: "circle" */
  particleShape?: SparkleShape;
  /** Directional drift flow. Default: "none" (organic float) */
  direction?: SparkleDirection;
  /** Enables organic brightness twinkling. Default: true */
  twinkle?: boolean;
  /** Twinkle pulsation frequency multiplier. Default: 1 */
  twinkleSpeed?: number;
  /** Enables cursor interaction. Default: true */
  interactive?: boolean;
  /** Cursor reaction mode. Default: "repulse" */
  cursorMode?: SparkleCursorMode;
  /** Radius around cursor for repulsion/attraction in pixels. Default: 140 */
  cursorRadius?: number;
  /** Number of particles to burst on click or tap. Default: 6 */
  clickPush?: number;
  /** Global opacity of the sparkle field (0 to 1). Default: 1 */
  opacity?: number;
  /** Blur filter radius in pixels for soft bloom. Default: 0 */
  blur?: number;
  /** Optional wrapped children placed above the sparkles */
  children?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  currentSize: number;
  color: string;
  opacity: number;
  minOpacity: number;
  maxOpacity: number;
  twinklePhase: number;
  twinkleFreq: number;
  shape: "circle" | "star" | "cross";
  isBurst?: boolean;
  life?: number;
  maxLife?: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background = "transparent",
  className,
  particleSize,
  minSize = 0.6,
  maxSize = 2.4,
  speed = 1,
  particleColor = "#FFFFFF",
  particleColors,
  particleDensity = 120,
  particleCount,
  particleShape = "circle",
  direction = "none",
  twinkle = true,
  twinkleSpeed = 1,
  interactive = true,
  cursorMode = "repulse",
  cursorRadius = 140,
  clickPush = 6,
  opacity = 1,
  blur = 0,
  children,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafId = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const autoId = useId().replace(/[^a-zA-Z0-9-_]/g, "");
  const canvasId = id || `sparkles-${autoId}`;

  const resolvedMin = particleSize ?? minSize;
  const resolvedMax = particleSize ?? maxSize;
  const palette = particleColors && particleColors.length > 0 ? particleColors : [particleColor];

  // Watch for reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const createParticle = useCallback(
    (w: number, h: number, isBurst = false, originX?: number, originY?: number): Particle => {
      const size = resolvedMin + Math.random() * (resolvedMax - resolvedMin);
      const color = palette[Math.floor(Math.random() * palette.length)];

      let vx = 0;
      let vy = 0;
      const baseVel = 0.4 * Math.max(0.1, speed);

      if (isBurst && originX !== undefined && originY !== undefined) {
        const angle = Math.random() * Math.PI * 2;
        const pushSpeed = (1 + Math.random() * 3) * baseVel;
        vx = Math.cos(angle) * pushSpeed;
        vy = Math.sin(angle) * pushSpeed;
      } else {
        switch (direction) {
          case "top":
            vx = (Math.random() - 0.5) * 0.2 * baseVel;
            vy = -(0.5 + Math.random() * 0.8) * baseVel;
            break;
          case "bottom":
            vx = (Math.random() - 0.5) * 0.2 * baseVel;
            vy = (0.5 + Math.random() * 0.8) * baseVel;
            break;
          case "left":
            vx = -(0.5 + Math.random() * 0.8) * baseVel;
            vy = (Math.random() - 0.5) * 0.2 * baseVel;
            break;
          case "right":
            vx = (0.5 + Math.random() * 0.8) * baseVel;
            vy = (Math.random() - 0.5) * 0.2 * baseVel;
            break;
          case "none":
          default:
            vx = (Math.random() - 0.5) * 0.5 * baseVel;
            vy = (Math.random() - 0.5) * 0.5 * baseVel;
            break;
        }
      }

      let shape: "circle" | "star" | "cross" = "circle";
      if (particleShape === "mixed") {
        const r = Math.random();
        shape = r < 0.6 ? "circle" : r < 0.85 ? "star" : "cross";
      } else {
        shape = particleShape;
      }

      const minOp = 0.1 + Math.random() * 0.3;
      const maxOp = 0.7 + Math.random() * 0.3;

      return {
        x: isBurst && originX !== undefined ? originX : Math.random() * w,
        y: isBurst && originY !== undefined ? originY : Math.random() * h,
        vx,
        vy,
        baseSize: size,
        currentSize: size,
        color,
        opacity: minOp + Math.random() * (maxOp - minOp),
        minOpacity: minOp,
        maxOpacity: maxOp,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleFreq: (0.02 + Math.random() * 0.05) * Math.max(0.2, twinkleSpeed),
        shape,
        isBurst,
        life: isBurst ? 0 : undefined,
        maxLife: isBurst ? 45 + Math.random() * 35 : undefined,
      };
    },
    [direction, palette, particleShape, resolvedMax, resolvedMin, speed, twinkleSpeed]
  );

  // Draw 4-pointed radiant star sparkle
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - r * 2);
    ctx.quadraticCurveTo(x, y, x + r * 2, y);
    ctx.quadraticCurveTo(x, y, x, y + r * 2);
    ctx.quadraticCurveTo(x, y, x - r * 2, y);
    ctx.quadraticCurveTo(x, y, x, y - r * 2);
    ctx.closePath();
    ctx.fill();
  };

  // Draw 4-pointed cross starlet
  const drawCross = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.beginPath();
    ctx.rect(x - r * 0.3, y - r * 1.6, r * 0.6, r * 3.2);
    ctx.rect(x - r * 1.6, y - r * 0.3, r * 3.2, r * 0.6);
    ctx.fill();
  };

  // Canvas animation and resize loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const initParticles = (w: number, h: number) => {
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const computedCount =
        particleCount !== undefined
          ? particleCount
          : Math.max(12, Math.floor((w * h) / (400 * 400) * particleDensity));

      particlesRef.current = Array.from({ length: computedCount }, () =>
        createParticle(w, h)
      );

      setIsReady(true);
    };

    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      initParticles(rect.width, rect.height);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          initParticles(nw, nh);
        }
      }
    });
    observer.observe(container);

    // Animation Tick
    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active && interactive && !reducedMotion;

      particlesRef.current = particlesRef.current.filter((p) => {
        if (p.isBurst && p.life !== undefined && p.maxLife !== undefined) {
          p.life++;
          if (p.life >= p.maxLife) return false;
        }
        return true;
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Twinkle pulsation
          if (twinkle) {
            p.twinklePhase += p.twinkleFreq;
            const sine = (Math.sin(p.twinklePhase) + 1) / 2;
            p.opacity = p.minOpacity + sine * (p.maxOpacity - p.minOpacity);
          }

          // Cursor Interaction
          if (mActive) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.hypot(dx, dy);

            if (dist < cursorRadius && dist > 0.001) {
              const force = (1 - dist / cursorRadius) * 2;
              const angle = Math.atan2(dy, dx);

              if (cursorMode === "repulse") {
                p.x += Math.cos(angle) * force * 1.8;
                p.y += Math.sin(angle) * force * 1.8;
              } else if (cursorMode === "attract") {
                p.x -= Math.cos(angle) * force * 1.2;
                p.y -= Math.sin(angle) * force * 1.2;
              } else if (cursorMode === "sparkle") {
                p.opacity = Math.min(1, p.opacity + 0.3);
                p.currentSize = p.baseSize * 1.6;
              }
            } else {
              p.currentSize = p.baseSize;
            }
          }

          // Wrap around boundary bounds
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;

          if (p.y < -10) p.y = height + 10;
          else if (p.y > height + 10) p.y = -10;
        }

        // Draw particle
        let alpha = p.opacity;
        if (p.isBurst && p.life !== undefined && p.maxLife !== undefined) {
          alpha *= 1 - p.life / p.maxLife;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha * opacity));

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          drawStar(ctx, p.x, p.y, p.currentSize * 1.2);
        } else if (p.shape === "cross") {
          drawCross(ctx, p.x, p.y, p.currentSize * 1.2);
        }
      }

      ctx.globalAlpha = 1;
      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [
    clickPush,
    createParticle,
    cursorMode,
    cursorRadius,
    interactive,
    opacity,
    particleCount,
    particleDensity,
    reducedMotion,
    twinkle,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || clickPush <= 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;

    const burstParticles = Array.from({ length: clickPush }, () =>
      createParticle(rect.width, rect.height, true, ox, oy)
    );

    particlesRef.current.push(...burstParticles);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("relative h-full w-full overflow-hidden isolate", className)}
      style={{
        background,
        ...style,
      }}
      {...props}
      onPointerMove={(e) => {
        handlePointerMove(e);
        props.onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        handlePointerLeave();
        props.onPointerLeave?.(e);
      }}
      onClick={(e) => {
        handleClick(e);
        props.onClick?.(e);
      }}
    >
      <canvas
        id={canvasId}
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full select-none"
        style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined}
      />

      {children && (
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
};

// Also export as Sparkles alias for intuitive naming
export const Sparkles = SparklesCore;

export default SparklesCore;
