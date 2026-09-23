"use client";

import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ShootingStarsProps
  extends Omit<HTMLMotionProps<"div">, "children" | "ref"> {
  /** Optional container class names */
  className?: string;
  /** Foreground content rendered above the starry sky */
  children?: React.ReactNode;
  /** Deep space background color or CSS gradient. Default: "#020617" */
  background?: string;
  /** Number of ambient background stars. Default: 120 */
  starCount?: number;
  /** Array of celestial colors for twinkling stars */
  starColors?: string[];
  /** Minimum star radius in pixels. Default: 0.6 */
  minStarSize?: number;
  /** Maximum star radius in pixels. Default: 2.2 */
  maxStarSize?: number;
  /** Twinkle pulsation frequency multiplier. Default: 1 */
  twinkleSpeed?: number;
  /** Primary trail color of shooting stars. Default: "#38BDF8" */
  trailColor?: string;
  /** Glowing meteor head burst color. Default: "#FFFFFF" */
  headColor?: string;
  /** Average spawn interval for shooting stars in milliseconds. Default: 2000 */
  interval?: number;
  /** Velocity range [min, max] or uniform speed for meteors in pixels/frame. Default: [12, 22] */
  speed?: [number, number] | number;
  /** Length range [min, max] or uniform trail length in pixels. Default: [90, 180] */
  trailLength?: [number, number] | number;
  /** Trajectory angle in degrees (clockwise from horizontal; 45 is down-right). Default: 42 */
  angle?: number;
  /** Maximum concurrent active shooting stars. Default: 2 */
  maxActiveShootingStars?: number;
  /** Enable glowing stardust ember particles shed by passing meteors. Default: true */
  showEmbers?: boolean;
  /** Render ethereal cosmic nebula haze clouds in the background. Default: true */
  nebula?: boolean;
  /** Interactive: click or tap creates a shooting star from cursor. Default: true */
  clickToSpawn?: boolean;
  /** Interactive mouse parallax tilt of stars. Default: true */
  parallax?: boolean;
}

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  opacity: number;
  minOpacity: number;
  maxOpacity: number;
  phase1: number;
  phase2: number;
  freq1: number;
  freq2: number;
  isRadiant: boolean;
  depth: number;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dirX: number;
  dirY: number;
  length: number;
  width: number;
  speed: number;
  headColor: string;
  trailColor: string;
  isFireball: boolean;
  flarePhase: number;
  active: boolean;
  life: number;
  maxLife: number;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  className,
  children,
  background = "#020617",
  starCount = 120,
  starColors = ["#FFFFFF", "#E0F2FE", "#C7D2FE", "#FEF08A"],
  minStarSize = 0.6,
  maxStarSize = 2.2,
  twinkleSpeed = 1,
  trailColor = "#38BDF8",
  headColor = "#FFFFFF",
  interval = 2200,
  speed = [12, 22],
  trailLength = [90, 180],
  angle = 42,
  maxActiveShootingStars = 2,
  showEmbers = true,
  nebula = true,
  clickToSpawn = true,
  parallax = true,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const embersRef = useRef<Ember[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafId = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoId = useId().replace(/[^a-zA-Z0-9-_]/g, "");

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Trajectory angle variance
  const baseAngle = angle;

  const spawnMeteor = useCallback(
    (w: number, h: number, customX?: number, customY?: number) => {
      const [minSpd, maxSpd] = Array.isArray(speed) ? speed : [speed, speed];
      const [minLen, maxLen] = Array.isArray(trailLength) ? trailLength : [trailLength, trailLength];

      // Natural angle variation (e.g. ±12 degrees from base trajectory)
      const meteorAngle = baseAngle + (Math.random() - 0.5) * 24;
      const meteorRad = (meteorAngle * Math.PI) / 180;
      const mDirX = Math.cos(meteorRad);
      const mDirY = Math.sin(meteorRad);

      const meteorSpeed = minSpd + Math.random() * (maxSpd - minSpd);
      const meteorLength = minLen + Math.random() * (maxLen - minLen);
      
      // 10% chance of a brilliant fireball (bolide)
      const isFireball = Math.random() < 0.12;
      const meteorWidth = isFireball ? 2.2 + Math.random() * 1.5 : 0.9 + Math.random() * 1.2;

      // Real meteors ignite ANYWHERE across the night sky
      let startX: number;
      let startY: number;

      if (customX !== undefined && customY !== undefined) {
        startX = customX;
        startY = customY;
      } else {
        // Random position across the entire sky (top 85% of height, full width)
        // Some also ignite slightly off the top/left edges for continuous flow
        const roll = Math.random();
        if (roll < 0.7) {
          // Anywhere inside the sky
          startX = Math.random() * w;
          startY = Math.random() * (h * 0.8);
        } else if (roll < 0.85) {
          // Just above the top edge
          startX = Math.random() * (w + 100) - 50;
          startY = -10 - Math.random() * 40;
        } else {
          // Just outside left edge
          startX = -20 - Math.random() * 40;
          startY = Math.random() * (h * 0.6);
        }
      }

      // Real meteors burn for a realistic distance (160px - 360px), not infinite screen traversal
      const burnDistance = isFireball
        ? 280 + Math.random() * 220
        : 150 + Math.random() * 200;

      const maxLife = Math.max(12, Math.ceil(burnDistance / Math.max(1, meteorSpeed)));

      // Subtle color variation in meteors (white-hot core with cyan, electric blue, or gold sheath)
      const sheathColors = [trailColor, "#67E8F9", "#93C5FD", "#A5F3FC", "#FDE047"];
      const chosenSheath = isFireball ? "#FDE047" : sheathColors[Math.floor(Math.random() * sheathColors.length)];

      meteorsRef.current.push({
        x: startX,
        y: startY,
        vx: mDirX * meteorSpeed,
        vy: mDirY * meteorSpeed,
        dirX: mDirX,
        dirY: mDirY,
        length: meteorLength,
        width: meteorWidth,
        speed: meteorSpeed,
        headColor,
        trailColor: chosenSheath,
        isFireball,
        flarePhase: 0.45 + Math.random() * 0.25, // point where meteor flares up
        active: true,
        life: 0,
        maxLife,
      });
    },
    [baseAngle, headColor, speed, trailColor, trailLength]
  );

  // Initialize and run Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const initCanvas = (w: number, h: number) => {
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Generate ambient background stars with realistic astronomical distribution
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        // Non-linear power distribution: majority are tiny distant stars
        const sizeCurve = Math.pow(Math.random(), 2.4);
        const size = minStarSize + sizeCurve * (maxStarSize - minStarSize);
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const minOpacity = 0.12 + Math.random() * 0.2;
        const maxOpacity = 0.65 + Math.random() * 0.35;
        const depth = 0.15 + Math.random() * 0.85; // for parallax
        const isRadiant = Math.random() < 0.1 && size > 1.6; // 4-pointed radiant sparkle on brightest stars

        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          color,
          opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
          minOpacity,
          maxOpacity,
          phase1: Math.random() * Math.PI * 2,
          phase2: Math.random() * Math.PI * 2,
          freq1: (0.012 + Math.random() * 0.035) * Math.max(0.1, twinkleSpeed),
          freq2: (0.008 + Math.random() * 0.02) * Math.max(0.1, twinkleSpeed),
          isRadiant,
          depth,
        });
      }

      starsRef.current = stars;
      meteorsRef.current = [];
      embersRef.current = [];
      lastSpawnRef.current = performance.now();
      setIsReady(true);
    };

    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      initCanvas(rect.width, rect.height);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          initCanvas(nw, nh);
        }
      }
    });
    observer.observe(container);

    // Draw 4-point radiant celestial cross
    const drawRadiantStar = (cx: number, cy: number, r: number, fill: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(cx, cy - r * 2.4);
      ctx.quadraticCurveTo(cx, cy, cx + r * 2.4, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + r * 2.4);
      ctx.quadraticCurveTo(cx, cy, cx - r * 2.4, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - r * 2.4);
      ctx.closePath();
      ctx.fill();

      // Soft center core
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      if (parallax && !reducedMotion) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      }

      // Optional Cosmic Nebula Glow
      if (nebula) {
        const radG1 = ctx.createRadialGradient(
          width * 0.25,
          height * 0.35,
          10,
          width * 0.25,
          height * 0.35,
          width * 0.55
        );
        radG1.addColorStop(0, "rgba(99, 102, 241, 0.12)");
        radG1.addColorStop(0.6, "rgba(79, 70, 229, 0.04)");
        radG1.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = radG1;
        ctx.fillRect(0, 0, width, height);

        const radG2 = ctx.createRadialGradient(
          width * 0.8,
          height * 0.65,
          10,
          width * 0.8,
          height * 0.65,
          width * 0.45
        );
        radG2.addColorStop(0, "rgba(168, 85, 247, 0.09)");
        radG2.addColorStop(0.5, "rgba(126, 34, 206, 0.03)");
        radG2.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = radG2;
        ctx.fillRect(0, 0, width, height);

        const radG3 = ctx.createRadialGradient(
          width * 0.5,
          height * 0.15,
          10,
          width * 0.5,
          height * 0.15,
          width * 0.4
        );
        radG3.addColorStop(0, "rgba(6, 182, 212, 0.08)");
        radG3.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = radG3;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw background twinkling stars
      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        if (!reducedMotion) {
          star.phase1 += star.freq1;
          star.phase2 += star.freq2;
          const sine = (Math.sin(star.phase1) * Math.cos(star.phase2) + 1) / 2;
          star.opacity = star.minOpacity + sine * (star.maxOpacity - star.minOpacity);

          if (parallax) {
            star.x = star.baseX + mouseRef.current.x * star.depth * 18;
            star.y = star.baseY + mouseRef.current.y * star.depth * 18;
          }
        }

        if (star.isRadiant) {
          drawRadiantStar(star.x, star.y, star.size, star.color, star.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.opacity;
          ctx.fill();

          // Delicate ambient star halo for larger stars
          if (star.size > 1.2) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity * 0.18;
            ctx.fill();
          }
        }
      }

      // Spawn meteors periodically
      if (!reducedMotion) {
        if (
          now - lastSpawnRef.current > interval &&
          meteorsRef.current.length < maxActiveShootingStars
        ) {
          spawnMeteor(width, height);
          lastSpawnRef.current = now + (Math.random() - 0.5) * 600;
        }

        // Update & draw passing shooting stars
        meteorsRef.current = meteorsRef.current.filter((meteor) => {
          meteor.life++;
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;

          if (
            meteor.life >= meteor.maxLife ||
            meteor.x > width + 300 ||
            meteor.x < -300 ||
            meteor.y > height + 300 ||
            meteor.y < -300
          ) {
            return false;
          }

          const progress = meteor.life / meteor.maxLife;

          // Natural dynamic tail stretching:
          const currentTrailLen = Math.min(
            meteor.length,
            (meteor.life + 1) * meteor.speed * 1.5
          );
          const tailX = meteor.x - meteor.dirX * currentTrailLen;
          const tailY = meteor.y - meteor.dirY * currentTrailLen;

          // Real astronomical bell-curve incandescence
          let alpha = Math.sin(progress * Math.PI);

          // Atmospheric compression flare peak
          const flareDist = Math.abs(progress - meteor.flarePhase);
          let flareBoost = 0;
          if (flareDist < 0.09) {
            flareBoost = (1 - flareDist / 0.09) * (meteor.isFireball ? 0.6 : 0.35);
          }
          alpha = Math.min(1, alpha + flareBoost);

          // Fireball momentary ambient sky flash
          if (meteor.isFireball && flareBoost > 0.18) {
            const flashGrad = ctx.createRadialGradient(
              meteor.x, meteor.y, 2,
              meteor.x, meteor.y, Math.min(width, height) * 0.45
            );
            flashGrad.addColorStop(0, "rgba(253, 224, 71, 0.07)");
            flashGrad.addColorStop(0.6, "rgba(254, 240, 138, 0.02)");
            flashGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.save();
            ctx.fillStyle = flashGrad;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
          }

          // Layer 1: Outer ionized atmospheric sheath
          const sheathGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          sheathGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
          sheathGrad.addColorStop(0.5, meteor.trailColor);
          sheathGrad.addColorStop(1, meteor.headColor);

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 0.75));
          ctx.strokeStyle = sheathGrad;
          ctx.lineWidth = meteor.width * 2.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();
          ctx.restore();

          // Layer 2: Core razor-sharp white incandescence
          const coreGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          coreGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          coreGrad.addColorStop(0.65, "rgba(255, 255, 255, 0.8)");
          coreGrad.addColorStop(1, "#FFFFFF");

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.strokeStyle = coreGrad;
          ctx.lineWidth = Math.max(0.7, meteor.width * 0.9);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(
            tailX + (meteor.x - tailX) * 0.2,
            tailY + (meteor.y - tailY) * 0.2
          );
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();
          ctx.restore();

          // Radiant meteor head flare
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha * 1.1));
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, meteor.width * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();

          // Atmospheric shockwave bloom around head
          const bloomRadius = meteor.width * (meteor.isFireball ? 6.5 : 4.2);
          const headGlow = ctx.createRadialGradient(
            meteor.x,
            meteor.y,
            0.5,
            meteor.x,
            meteor.y,
            bloomRadius
          );
          headGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          headGlow.addColorStop(0.35, meteor.trailColor);
          headGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, bloomRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Emit spark stardust embers
          if (showEmbers && (Math.random() < 0.35 || flareBoost > 0.08)) {
            const spread = (Math.random() - 0.5) * 3;
            embersRef.current.push({
              x: meteor.x - meteor.dirX * 6 + (-meteor.dirY) * spread,
              y: meteor.y - meteor.dirY * 6 + meteor.dirX * spread,
              vx: -meteor.dirX * (0.8 + Math.random() * 1.5) + (Math.random() - 0.5) * 0.5,
              vy: -meteor.dirY * (0.8 + Math.random() * 1.5) + (Math.random() - 0.5) * 0.5,
              size: 0.6 + Math.random() * 1.2,
              color: Math.random() < 0.4 ? "#FFFFFF" : meteor.trailColor,
              alpha: 0.85,
              life: 0,
              maxLife: 15 + Math.random() * 20,
            });
          }

          return true;
        });

        // Update and draw glowing embers
        embersRef.current = embersRef.current.filter((ember) => {
          ember.life++;
          ember.x += ember.vx;
          ember.y += ember.vy;

          if (ember.life >= ember.maxLife) return false;

          const emberAlpha = (1 - ember.life / ember.maxLife) * ember.alpha;
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, emberAlpha));
          ctx.fillStyle = ember.color;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          return true;
        });
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
    interval,
    maxActiveShootingStars,
    maxStarSize,
    minStarSize,
    nebula,
    parallax,
    reducedMotion,
    showEmbers,
    spawnMeteor,
    starColors,
    starCount,
    twinkleSpeed,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!parallax) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = relX;
    mouseRef.current.targetY = relY;
  };

  const handlePointerLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clickToSpawn || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Spawn meteor sweeping through clicked coordinates
    spawnMeteor(rect.width, rect.height, clickX, clickY);
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
        id={`space-${autoId}`}
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full select-none"
      />

      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </motion.div>
  );
};

// Aliases for intuitive discovery
export const SpaceBackground = ShootingStars;
export const MeteorShower = ShootingStars;

export default ShootingStars;
