import {
  type CSSProperties,
  useEffect,
  useRef,
} from "react";

/* =========================================================
   TYPES & STATES
========================================================= */

export type ThinkingOrbState =
  | "working"
  | "searching"
  | "solving"
  | "listening"
  | "connecting"
  | "weaving"
  | "composing"
  | "breathing"
  | "shaping";

export interface ThinkingOrbProps {
  /**
   * Animation cognitive state preset
   */
  state?: ThinkingOrbState;

  /**
   * Diameter in pixels (default: 64)
   * e.g., 24 for inline AI badges, 64-96 for assistants/avatars, 128+ for hero surfaces
   */
  size?: number;

  /**
   * Animation speed multiplier (default: 1)
   */
  speed?: number;

  /**
   * Monochrome mode: true = luminous white on dark, false = obsidian/graphite on light
   */
  dark?: boolean;

  /**
   * Freeze animation loop
   */
  paused?: boolean;

  /**
   * Optional container CSS class name
   */
  className?: string;

  /**
   * Optional inline styles
   */
  style?: CSSProperties;

  /**
   * Accessible screen reader label
   */
  "aria-label"?: string;
}

/* =========================================================
   STATE TUNING PRESETS
========================================================= */

interface StateParam {
  energy: number;
  turbulence: number;
  rotation: number;
  pulse: number;
  compression: number;
  wave: number;
  drift: number;
  coreGlow: number;
}

const STATE_CONFIG: Record<ThinkingOrbState, StateParam> = {
  working: {
    energy: 0.8,
    turbulence: 0.2,
    rotation: 0.35,
    pulse: 0.7,
    compression: 1.0,
    wave: 0.2,
    drift: 0.12,
    coreGlow: 0.9,
  },
  searching: {
    energy: 1.15,
    turbulence: 0.5,
    rotation: 0.8,
    pulse: 0.55,
    compression: 1.02,
    wave: 0.45,
    drift: 0.28,
    coreGlow: 0.75,
  },
  solving: {
    energy: 1.35,
    turbulence: 0.7,
    rotation: 0.95,
    pulse: 0.85,
    compression: 0.92,
    wave: 0.65,
    drift: 0.38,
    coreGlow: 1.0,
  },
  listening: {
    energy: 0.4,
    turbulence: 0.08,
    rotation: 0.12,
    pulse: 1.2,
    compression: 1.04,
    wave: 0.06,
    drift: 0.03,
    coreGlow: 0.65,
  },
  connecting: {
    energy: 0.95,
    turbulence: 0.28,
    rotation: 1.3,
    pulse: 0.5,
    compression: 1.0,
    wave: 0.3,
    drift: 0.4,
    coreGlow: 0.85,
  },
  weaving: {
    energy: 1.1,
    turbulence: 0.6,
    rotation: 0.45,
    pulse: 0.65,
    compression: 0.88,
    wave: 0.9,
    drift: 0.25,
    coreGlow: 0.8,
  },
  composing: {
    energy: 0.75,
    turbulence: 0.18,
    rotation: 0.2,
    pulse: 0.9,
    compression: 0.75,
    wave: 0.35,
    drift: 0.1,
    coreGlow: 0.7,
  },
  breathing: {
    energy: 0.25,
    turbulence: 0.04,
    rotation: 0.06,
    pulse: 1.5,
    compression: 1.1,
    wave: 0.03,
    drift: 0.02,
    coreGlow: 0.5,
  },
  shaping: {
    energy: 0.95,
    turbulence: 0.42,
    rotation: 0.5,
    pulse: 0.7,
    compression: 0.92,
    wave: 0.75,
    drift: 0.25,
    coreGlow: 0.85,
  },
};

/* =========================================================
   PARTICLE DEFINITION & GENERATION
========================================================= */

interface Particle {
  theta: number;
  phi: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
  depth: number;
  ring: number;
}

function createMinimalParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    // Golden spiral distribution across spherical shell
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    return {
      theta,
      phi,
      radius: 0.75 + Math.random() * 0.25,
      speed: 0.15 + Math.random() * 0.85,
      size: 0.4 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random(),
      ring: i % 3,
    };
  });
}

/* =========================================================
   THINKING ORB COMPONENT
========================================================= */

export function ThinkingOrb({
  state = "working",
  size = 64,
  speed = 1,
  dark = true,
  paused = false,
  className,
  style,
  "aria-label": ariaLabel,
}: ThinkingOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);

  // Scaled particle density for crisp high-DPI balance
  const particleCount =
    size <= 24
      ? 45
      : size <= 48
      ? 90
      : size <= 80
      ? 160
      : 220;

  useEffect(() => {
    particlesRef.current = createMinimalParticles(particleCount);
  }, [particleCount]);

  // Reduced motion support
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const center = size / 2;
    const config = STATE_CONFIG[state] || STATE_CONFIG.working;
    const baseRadius = size * 0.36;

    const render = (timestamp: number) => {
      const previous = lastTimeRef.current;
      const delta = previous === 0 ? 16 : Math.min(timestamp - previous, 40);
      lastTimeRef.current = timestamp;
      const dt = delta / 1000;

      if (!paused && !reducedMotionRef.current) {
        timeRef.current += dt * speed;
      }

      const time = timeRef.current;

      // Clear frame
      ctx.clearRect(0, 0, size, size);

      /* =================================================
         1. ATMOSPHERIC MINIMAL HALO
      ================================================= */
      const halo = ctx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        baseRadius * 1.55
      );

      if (dark) {
        halo.addColorStop(0, "rgba(255, 255, 255, 0.06)");
        halo.addColorStop(0.35, "rgba(255, 255, 255, 0.02)");
        halo.addColorStop(0.7, "rgba(255, 255, 255, 0.005)");
        halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        halo.addColorStop(0, "rgba(0, 0, 0, 0.04)");
        halo.addColorStop(0.4, "rgba(0, 0, 0, 0.01)");
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);

      /* =================================================
         2. BREATHING DYNAMICS & GLOBAL PRECESSION
      ================================================= */
      const breathing =
        1 + Math.sin(time * config.pulse * 1.35) * 0.045 * config.energy;

      const rotation = time * config.rotation * 0.65;

      /* =================================================
         3. PARTICLES SPHERICAL ENGINE
      ================================================= */
      for (const particle of particlesRef.current) {
        let theta =
          particle.theta +
          rotation * (0.65 + particle.depth * 0.45);
        let phi = particle.phi;

        // Harmonic organic displacement
        const waveA = Math.sin(
          theta * 3 + time * (1.05 + config.energy * 0.8)
        );
        const waveB = Math.cos(phi * 3 - time * 0.5);
        const wave = waveA * waveB;
        const turbulence = wave * config.turbulence * 0.06;

        let r =
          particle.radius *
          breathing *
          config.compression *
          (1 + turbulence);

        // State-specific minimal deformations
        if (state === "searching") {
          r += Math.sin(time * 1.6 + particle.phase) * 0.03;
          theta += Math.sin(time * 1.2 + particle.phase) * 0.02;
        } else if (state === "solving") {
          const converge = Math.sin(time * 2.8 + particle.phase);
          r += converge * 0.045;
          phi += converge * 0.02;
        } else if (state === "listening") {
          r += Math.sin(time * 0.75 + particle.phase) * 0.012;
        } else if (state === "connecting") {
          theta += particle.radius * time * 0.5;
          phi += Math.sin(time * 1.1 + particle.phase) * 0.03;
        } else if (state === "weaving") {
          theta += Math.sin(phi * 6 + time * 1.4) * 0.05;
          phi += Math.cos(theta * 4 + time * 1.1) * 0.045;
        } else if (state === "composing") {
          r *= 0.96;
          phi += Math.sin(time * 1.4 + particle.phase) * 0.015;
        } else if (state === "shaping") {
          const shape = Math.sin(theta * 2 + time * 0.9) * 0.08;
          r *= 1 + shape;
        }

        // Spherical to 3D Cartesian coordinates
        let x = Math.sin(phi) * Math.cos(theta) * r;
        let y = Math.cos(phi) * r;
        let z = Math.sin(phi) * Math.sin(theta);

        // Subtle laminar stream modulation
        const flow =
          Math.sin(theta * 3 + time) * Math.sin(phi * 2 - time * 0.4);
        x += flow * config.wave * 0.025;
        y += Math.cos(theta * 2 - time * 0.8) * config.wave * 0.02;

        // 3D perspective projection
        const perspective = 1 / (1.22 - z * 0.22);
        const screenX = center + x * baseRadius * perspective;
        const screenY = center + y * baseRadius * perspective;

        // True depth-based luminosity
        const depth = (z + 1) / 2; // 0 (far/dim) to 1 (near/bright)
        const depthBrightness = 0.2 + depth * 0.8;

        const pSize =
          particle.size *
          (0.5 + depth * 0.85) *
          (size / 64);

        let alpha =
          depthBrightness *
          (0.25 + particle.depth * 0.55) *
          config.energy;

        if (depth < 0.25) {
          alpha *= 0.5;
        }
        alpha = Math.min(Math.max(alpha, 0.05), 0.95);

        // Particle subtle motion trail for active states
        if (config.energy > 0.8 && pSize > 0.85 && size >= 48) {
          const trailLen = particle.speed * config.rotation * 2.2;
          const trailX = screenX - Math.cos(theta) * trailLen;
          const trailY = screenY - Math.sin(theta) * trailLen;

          const trail = ctx.createLinearGradient(
            trailX,
            trailY,
            screenX,
            screenY
          );

          if (dark) {
            trail.addColorStop(0, "rgba(255, 255, 255, 0)");
            trail.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.18})`);
          } else {
            trail.addColorStop(0, "rgba(15, 15, 20, 0)");
            trail.addColorStop(1, `rgba(15, 15, 20, ${alpha * 0.18})`);
          }

          ctx.strokeStyle = trail;
          ctx.lineWidth = Math.max(pSize * 0.5, 0.35);
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();
        }

        // Particle Soft Ambient Glow
        if (size >= 40 && depth > 0.4) {
          ctx.shadowBlur = pSize * 4.5;
          ctx.shadowColor = dark
            ? `rgba(255, 255, 255, ${alpha * 0.35})`
            : `rgba(0, 0, 0, ${alpha * 0.15})`;
        } else {
          ctx.shadowBlur = 0;
        }

        // Render Particle Point
        ctx.beginPath();
        ctx.arc(
          screenX,
          screenY,
          Math.max(pSize, 0.35),
          0,
          Math.PI * 2
        );

        ctx.fillStyle = dark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(15, 15, 20, ${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Occasional refined micro-sparkle
        const sparkle = Math.sin(
          time * (1.5 + particle.speed) + particle.phase * 5
        );
        if (sparkle > 0.99 && depth > 0.7 && size >= 48) {
          const sSize = pSize * 2.0;
          ctx.strokeStyle = dark
            ? `rgba(255, 255, 255, ${alpha * 0.7})`
            : `rgba(15, 15, 20, ${alpha * 0.7})`;
          ctx.lineWidth = 0.4;

          ctx.beginPath();
          ctx.moveTo(screenX - sSize, screenY);
          ctx.lineTo(screenX + sSize, screenY);
          ctx.moveTo(screenX, screenY - sSize);
          ctx.lineTo(screenX, screenY + sSize);
          ctx.stroke();
        }
      }

      /* =================================================
         4. RADIANT OPTICAL NUCLEUS (BREATHING CORE)
      ================================================= */
      const corePulse =
        1 + Math.sin(time * config.pulse * 1.7) * 0.1 * config.coreGlow;
      const coreRadius = size * 0.046 * corePulse;

      const coreBloom = ctx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        coreRadius * 4.2
      );

      if (dark) {
        coreBloom.addColorStop(0, "rgba(255, 255, 255, 0.92)");
        coreBloom.addColorStop(0.18, "rgba(255, 255, 255, 0.55)");
        coreBloom.addColorStop(0.4, "rgba(240, 240, 248, 0.18)");
        coreBloom.addColorStop(0.7, "rgba(220, 220, 235, 0.04)");
        coreBloom.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        coreBloom.addColorStop(0, "rgba(15, 15, 20, 0.92)");
        coreBloom.addColorStop(0.2, "rgba(30, 30, 40, 0.45)");
        coreBloom.addColorStop(0.45, "rgba(60, 60, 75, 0.12)");
        coreBloom.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.shadowBlur = size * 0.14;
      ctx.shadowColor = dark
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(0, 0, 0, 0.12)";

      ctx.beginPath();
      ctx.arc(center, center, coreRadius * 4.2, 0, Math.PI * 2);
      ctx.fillStyle = coreBloom;
      ctx.fill();
      ctx.shadowBlur = 0;

      /* =================================================
         5. PINPOINT HOT CENTER
      ================================================= */
      const hotCenter = ctx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        coreRadius * 0.95
      );

      if (dark) {
        hotCenter.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        hotCenter.addColorStop(0.45, "rgba(255, 255, 255, 0.45)");
        hotCenter.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        hotCenter.addColorStop(0, "rgba(10, 10, 15, 0.98)");
        hotCenter.addColorStop(0.45, "rgba(30, 30, 40, 0.45)");
        hotCenter.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.beginPath();
      ctx.arc(center, center, coreRadius * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = hotCenter;
      ctx.fill();

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = null;
      lastTimeRef.current = 0;
    };
  }, [size, speed, dark, paused, state, particleCount]);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        overflow: "visible",
        ...style,
      }}
      role="img"
      aria-label={ariaLabel ?? `${state} orb`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: "block",
          width: size,
          height: size,
        }}
      />
    </span>
  );
}

export default ThinkingOrb;
