'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme/useTheme';

/**
 * Cinematic Drift & Transition Constants
 */
const DEFAULT_CAR_DURATION = 1350; // ms (relaxed, smooth, allowing full drift visibility)
const DEFAULT_CAR_DELAY = 0; // ms
const DEFAULT_SMOKE_LIFETIME = 1400; // ms
const DEFAULT_PAGE_TRANSITION_DELAY = 900; // ms (smoothly fades as car exits drift)
const DEFAULT_PAGE_TRANSITION_DURATION = 400; // ms
const DEFAULT_RESET_DELAY = 350; // ms
const DEFAULT_SMOKE_DENSITY = 'medium'; // 'off' | 'low' | 'medium' | 'high'
const DEFAULT_CAR_SIZE = 'md'; // 'sm' | 'md' | 'lg'
const MAX_SMOKE_PARTICLES = 160;

// Dynamic Drift ease curve: smooth entry, controlled mid-track drift slide, turbo explosive launch
const DRIFT_TRANSIT_EASE = [0.22, 1, 0.36, 1] as const;

// Smoke particle interface
interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  opacity: number;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
  isDriftTireSmoke?: boolean;
}

// Asphalt tire skid mark
interface SkidMark {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  width: number;
}

// Speed line interface
interface SpeedLine {
  x: number;
  y: number;
  length: number;
  vx: number;
  opacity: number;
  width: number;
}

export interface CarSmokePageTransitionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of car travel */
  direction?: 'left-to-right' | 'right-to-left';
  /** Duration of car crossing animation (ms) */
  carDuration?: number;
  /** Delay before car starts moving (ms) */
  carDelay?: number;
  /** Size of the car (affects scale) */
  carSize?: 'sm' | 'md' | 'lg';
  /** Density of smoke particles */
  smokeDensity?: 'off' | 'low' | 'medium' | 'high';
  /** Lifetime of smoke particles (ms) */
  smokeLifetime?: number;
  /** Whether to show speed lines effect */
  showSpeedLines?: boolean;
  /** Delay before page transition overlay starts (ms) */
  pageTransitionDelay?: number;
  /** Duration of page transition overlay fade (ms) */
  pageTransitionDuration?: number;
  /** Delay before resetting to idle after transition (ms) */
  resetDelay?: number;
  /** Callback fired when transition completes (navigation should happen here) */
  onTransitionComplete?: () => void;
  /** Custom vertical position */
  verticalPosition?: 'center' | 'bottom' | 'top' | number;
  /** The trigger element (typically a button or link) */
  children?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

export const CarSmokePageTransition: React.FC<CarSmokePageTransitionProps> = ({
  direction = 'left-to-right',
  carDuration = DEFAULT_CAR_DURATION,
  carDelay = DEFAULT_CAR_DELAY,
  carSize = DEFAULT_CAR_SIZE,
  smokeDensity = DEFAULT_SMOKE_DENSITY,
  smokeLifetime = DEFAULT_SMOKE_LIFETIME,
  showSpeedLines = true,
  pageTransitionDelay = DEFAULT_PAGE_TRANSITION_DELAY,
  pageTransitionDuration = DEFAULT_PAGE_TRANSITION_DURATION,
  resetDelay = DEFAULT_RESET_DELAY,
  onTransitionComplete,
  verticalPosition = 'center',
  children,
  className,
}) => {
  const { theme } = useTheme();

  // Motion values for physical multi-axis drift choreography
  const carX = useMotionValue(-1200);
  const carYOffset = useMotionValue(0);
  const carDriftAngle = useMotionValue(0);
  const frontSteerAngle = useMotionValue(0);
  const wheelRotation = useMotionValue(0);
  const transitionOpacity = useMotionValue(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const smokeRef = useRef<SmokeParticle[]>([]);
  const skidMarksRef = useRef<SkidMark[]>([]);
  const linesRef = useRef<SpeedLine[]>([]);
  const lastWheelPosRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  type TransitionState = 'idle' | 'carRunning' | 'transitioning' | 'complete';
  const [state, setState] = useState<TransitionState>('idle');

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = query.matches;
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Responsive Ferrari dimensions
  const getCarDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { width: 300, height: 100, scale: 1 };
    const vw = window.innerWidth;
    let baseWidth = 310;
    if (carSize === 'sm') baseWidth = 180;
    else if (carSize === 'lg') baseWidth = 420;

    let scale = 1;
    if (vw < 640) scale = 0.55;
    else if (vw < 1024) scale = 0.8;

    return { width: baseWidth * scale, height: (baseWidth * scale) * (100 / 300), scale };
  }, [carSize]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const stopAnimationLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    smokeRef.current = [];
    skidMarksRef.current = [];
    linesRef.current = [];
    lastWheelPosRef.current = null;
  }, []);

  const densityMultiplier = useMemo(() => {
    switch (smokeDensity) {
      case 'off':
        return 0;
      case 'low':
        return 2;
      case 'high':
        return 6;
      case 'medium':
      default:
        return 4;
    }
  }, [smokeDensity]);

  // Canvas render loop for physics-based drift smoke, skid marks, and speed lines
  const renderCanvasFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isDark = theme === 'dark';
    const isLtr = direction === 'left-to-right';
    const dirFactor = isLtr ? 1 : -1;
    const { scale } = getCarDimensions();

    let carY = height / 2;
    if (verticalPosition === 'top') carY = height * 0.3;
    else if (verticalPosition === 'bottom') carY = height * 0.72;
    else if (typeof verticalPosition === 'number') carY = (height * verticalPosition) / 100;

    const currentCarX = carX.get();
    const currentYOffset = carYOffset.get();
    const currentCarAngle = carDriftAngle.get();

    // 1. Calculate realistic tire contact positions with ground
    const rearWheelLocalX = isLtr ? 81 : 279;
    const rearWheelLocalY = 82;
    const effectiveCarY = carY + currentYOffset;

    // Apply rotation transformation to calculate exact global position of rear drift tire
    const carCenterX = currentCarX + (180 * scale);
    const carCenterY = effectiveCarY + (60 * scale);
    const rad = (currentCarAngle * Math.PI) / 180;
    const cosAngle = Math.cos(rad);
    const sinAngle = Math.sin(rad);

    const relX = (rearWheelLocalX - 150) * scale;
    const relY = (rearWheelLocalY - 50) * scale;
    const rearWheelWorldX = carCenterX + (relX * cosAngle - relY * sinAngle);
    const rearWheelWorldY = carCenterY + (relX * sinAngle + relY * cosAngle);

    // 2. Asphalt Rubber Skid Marks while drifting (when drift angle is prominent)
    const isDrifting = Math.abs(currentCarAngle) > 1.2;
    if (isRunningRef.current && isDrifting) {
      if (lastWheelPosRef.current) {
        skidMarksRef.current.push({
          x1: lastWheelPosRef.current.x,
          y1: lastWheelPosRef.current.y,
          x2: rearWheelWorldX,
          y2: rearWheelWorldY,
          opacity: 0.55,
          width: 5 * scale,
        });
      }
      lastWheelPosRef.current = { x: rearWheelWorldX, y: rearWheelWorldY };
    } else {
      lastWheelPosRef.current = null;
    }

    // 3. Draw Rubber Skid Marks
    for (let i = skidMarksRef.current.length - 1; i >= 0; i--) {
      const s = skidMarksRef.current[i];
      s.opacity -= 0.006;
      if (s.opacity <= 0) {
        skidMarksRef.current.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = isDark
        ? `rgba(10, 10, 15, ${s.opacity * 0.9})`
        : `rgba(20, 20, 25, ${s.opacity * 0.7})`;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Spawn Heavy Drift Smoke Plumes & Exhaust Sparks
    if (isRunningRef.current && densityMultiplier > 0) {
      const driftMultiplier = isDrifting ? 1.8 : 1;
      const countToSpawn = Math.min(
        Math.round(densityMultiplier * driftMultiplier),
        MAX_SMOKE_PARTICLES - smokeRef.current.length
      );

      for (let i = 0; i < countToSpawn; i++) {
        const pSize = (10 + Math.random() * 18) * scale;
        const pLife = smokeLifetime * (0.8 + Math.random() * 0.5);
        const smokeVelX = -dirFactor * (3.5 + Math.random() * 5.5) * scale;
        const smokeVelY = (-1.2 + (Math.random() * 2.4 - 1.2)) * scale;

        smokeRef.current.push({
          x: rearWheelWorldX + (Math.random() * 14 - 7) * scale,
          y: rearWheelWorldY + (Math.random() * 10 - 5) * scale,
          vx: smokeVelX,
          vy: smokeVelY,
          size: pSize,
          maxSize: pSize * (3.2 + Math.random() * 2.0),
          opacity: 0.75 + Math.random() * 0.25,
          rotation: Math.random() * Math.PI * 2,
          vRot: Math.random() * 0.05 - 0.025,
          life: pLife,
          maxLife: pLife,
          isDriftTireSmoke: isDrifting,
        });
      }
    }

    // 5. Spawn High-Velocity Speed Streaks
    if (isRunningRef.current && showSpeedLines && densityMultiplier > 0 && linesRef.current.length < 14) {
      const lineSpawnX = currentCarX - (isLtr ? 50 : -50) * scale;
      for (let i = 0; i < 2; i++) {
        const offsetMultiplier = Math.random() * 70 - 35;
        linesRef.current.push({
          x: lineSpawnX,
          y: effectiveCarY + offsetMultiplier * scale,
          length: (40 + Math.random() * 80) * scale,
          vx: -dirFactor * (14 + Math.random() * 10) * scale,
          opacity: 0.65 + Math.random() * 0.35,
          width: (1.2 + Math.random() * 1.8) * scale,
        });
      }
    }

    // 6. Draw Speed Lines
    for (let i = linesRef.current.length - 1; i >= 0; i--) {
      const l = linesRef.current[i];
      l.x += l.vx;
      l.opacity -= 0.022;

      if (l.opacity <= 0) {
        linesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      const strokeGradient = ctx.createLinearGradient(
        l.x,
        l.y,
        l.x + (isLtr ? -l.length : l.length),
        l.y
      );
      const strokeColor = isDark
        ? `rgba(255, 255, 255, ${l.opacity})`
        : `rgba(225, 29, 72, ${l.opacity * 0.7})`;
      strokeGradient.addColorStop(0, strokeColor);
      strokeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = strokeGradient;
      ctx.lineWidth = l.width;
      ctx.lineCap = 'round';
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x + (isLtr ? -l.length : l.length), l.y);
      ctx.stroke();
      ctx.restore();
    }

    // 7. Draw Soft Billowing Smoke Plumes
    for (let i = smokeRef.current.length - 1; i >= 0; i--) {
      const p = smokeRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.life -= 16.67;

      const progress = 1 - Math.max(0, p.life / p.maxLife);
      const currentSize = p.size + (p.maxSize - p.size) * progress;
      const currentOpacity = p.opacity * (1 - Math.pow(progress, 1.8));

      if (p.life <= 0 || currentOpacity <= 0.01) {
        smokeRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Multi-layer radial smoke gradient with authentic tire friction texture
      const grad = ctx.createRadialGradient(0, 0, currentSize * 0.08, 0, 0, currentSize);
      if (isDark) {
        grad.addColorStop(0, `rgba(245, 245, 255, ${currentOpacity * 0.85})`);
        grad.addColorStop(0.35, `rgba(200, 205, 220, ${currentOpacity * 0.5})`);
        grad.addColorStop(0.7, `rgba(140, 145, 165, ${currentOpacity * 0.2})`);
        grad.addColorStop(1, 'rgba(100, 105, 125, 0)');
      } else {
        grad.addColorStop(0, `rgba(50, 50, 65, ${currentOpacity * 0.75})`);
        grad.addColorStop(0.4, `rgba(90, 95, 110, ${currentOpacity * 0.4})`);
        grad.addColorStop(1, 'rgba(160, 165, 180, 0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [
    theme,
    direction,
    getCarDimensions,
    verticalPosition,
    carX,
    carYOffset,
    carDriftAngle,
    densityMultiplier,
    smokeLifetime,
    showSpeedLines,
  ]);

  const startAnimationLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const loop = () => {
      renderCanvasFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [renderCanvasFrame]);

  // Execute Ferrari Power Drift & Transition Sequence
  const startTransition = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    clearAllTimeouts();

    if (reducedMotionRef.current) {
      setState('transitioning');
      transitionOpacity.set(1);
      const t1 = setTimeout(() => {
        onTransitionComplete?.();
        setState('complete');
        const t2 = setTimeout(() => {
          transitionOpacity.set(0);
          setState('idle');
          isRunningRef.current = false;
        }, resetDelay);
        timeoutsRef.current.push(t2);
      }, pageTransitionDuration);
      timeoutsRef.current.push(t1);
      return;
    }

    const { width: carWidth, scale } = getCarDimensions();
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isLtr = direction === 'left-to-right';

    // Trajectory bounds
    const startX = isLtr ? -carWidth - 100 : vw + 100;
    const endX = isLtr ? vw + 160 : -carWidth - 160;
    const travel = Math.abs(endX - startX);

    // Compute continuous wheel rotation
    const wheelCircumference = 2 * Math.PI * (14 * scale);
    const totalWheelRotation = (travel / wheelCircumference) * 360 * (isLtr ? 1 : -1) * 1.35;

    // Reset initial values
    carX.set(startX);
    carYOffset.set(0);
    carDriftAngle.set(0);
    frontSteerAngle.set(0);
    wheelRotation.set(0);
    transitionOpacity.set(0);
    smokeRef.current = [];
    skidMarksRef.current = [];
    linesRef.current = [];

    setState('carRunning');
    startAnimationLoop();

    const durationSec = carDuration / 1000;
    const delaySec = carDelay / 1000;

    // 1. Car Horizontal Displacement across viewport
    const carAnim = animate(carX, endX, {
      duration: durationSec,
      ease: DRIFT_TRANSIT_EASE,
      delay: delaySec,
    });

    // 2. Realistic Ferrari Body Drift Angle (Rear kicks out, slides, then locks straight and launches)
    // For LTR: tilt nose slightly down/up, rear rotates out (-6.5deg), counter-steers, then straightens
    const maxDriftAngle = isLtr ? -6.5 : 6.5;
    const driftAnim = animate(
      carDriftAngle,
      [0, 0, maxDriftAngle, maxDriftAngle * 0.7, 1.5 * (isLtr ? 1 : -1), 0],
      {
        duration: durationSec,
        times: [0, 0.22, 0.48, 0.70, 0.88, 1],
        ease: 'easeInOut',
        delay: delaySec,
      }
    );

    // 3. Front Wheel Counter-Steer Angle (Visibly turns wheels opposite to drift slide)
    const steerAnim = animate(
      frontSteerAngle,
      [0, isLtr ? 14 : -14, isLtr ? 18 : -18, isLtr ? 6 : -6, 0],
      {
        duration: durationSec,
        times: [0, 0.26, 0.52, 0.74, 1],
        ease: 'easeInOut',
        delay: delaySec,
      }
    );

    // 4. Suspension Physics (Weight transfer compression during braking into drift & squat during launch)
    const suspensionAnim = animate(
      carYOffset,
      [0, -4 * scale, 3 * scale, 5 * scale, -2 * scale, 0],
      {
        duration: durationSec,
        times: [0, 0.2, 0.45, 0.68, 0.85, 1],
        ease: 'easeInOut',
        delay: delaySec,
      }
    );

    // 5. High-RPM Wheel Spin
    const wheelAnim = animate(wheelRotation, totalWheelRotation, {
      duration: durationSec,
      ease: DRIFT_TRANSIT_EASE,
      delay: delaySec,
    });

    // 6. Smooth Cinematic Page Transition Overlay Wipe
    const overlayFadeStartTime = carDelay + carDuration * 0.65;
    const tOverlay = setTimeout(() => {
      setState('transitioning');
      animate(transitionOpacity, 1, {
        duration: pageTransitionDuration / 1000,
        ease: [0.16, 1, 0.3, 1],
      });
    }, overlayFadeStartTime);
    timeoutsRef.current.push(tOverlay);

    // 7. Transition Complete Callback (Navigate to next screen)
    const completeTime = carDelay + pageTransitionDelay + 100;
    const tComplete = setTimeout(() => {
      onTransitionComplete?.();
      setState('complete');
    }, completeTime);
    timeoutsRef.current.push(tComplete);

    // 8. Settle and Reset to Idle
    const resetTime = completeTime + resetDelay + pageTransitionDuration;
    const tReset = setTimeout(() => {
      animate(transitionOpacity, 0, {
        duration: 0.35,
        ease: 'easeIn',
      });
      const tFinal = setTimeout(() => {
        setState('idle');
        isRunningRef.current = false;
        stopAnimationLoop();
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 350);
      timeoutsRef.current.push(tFinal);
    }, resetTime);
    timeoutsRef.current.push(tReset);

    return () => {
      carAnim.stop();
      driftAnim.stop();
      steerAnim.stop();
      suspensionAnim.stop();
      wheelAnim.stop();
      stopAnimationLoop();
      clearAllTimeouts();
      isRunningRef.current = false;
    };
  }, [
    direction,
    carDuration,
    carDelay,
    pageTransitionDelay,
    pageTransitionDuration,
    resetDelay,
    getCarDimensions,
    onTransitionComplete,
    startAnimationLoop,
    stopAnimationLoop,
    clearAllTimeouts,
    carX,
    carYOffset,
    carDriftAngle,
    frontSteerAngle,
    wheelRotation,
    transitionOpacity,
  ]);

  const handleTrigger = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startTransition();
    },
    [startTransition]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isRunningRef.current) {
        e.preventDefault();
        startTransition();
      }
    },
    [startTransition]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      stopAnimationLoop();
      clearAllTimeouts();
    };
  }, [stopAnimationLoop, clearAllTimeouts]);

  const { width: carWidth, height: carHeight } = getCarDimensions();

  const carVerticalStyle = useMemo(() => {
    if (verticalPosition === 'top') {
      return { top: '30%', transform: 'translateY(-50%)' };
    }
    if (verticalPosition === 'bottom') {
      return { top: '72%', transform: 'translateY(-50%)' };
    }
    if (typeof verticalPosition === 'number') {
      return { top: `${verticalPosition}%`, transform: 'translateY(-50%)' };
    }
    return { top: '50%', transform: 'translateY(-50%)' };
  }, [verticalPosition]);

  const isDark = theme === 'dark';
  const isLtr = direction === 'left-to-right';

  // --------------------------------------------------------------------------
  // PREMIUM REALISTIC SUPERCAR VECTOR ASSET
  // --------------------------------------------------------------------------
  const carSvg = (
    <svg
      viewBox="0 0 360 120"
      width={carWidth}
      height={carHeight * 1.12}
      className={cn('overflow-visible', !isLtr && 'scale-x-[-1]')}
      style={{
        filter: isDark
          ? 'drop-shadow(0 24px 22px rgba(0,0,0,0.68))'
          : 'drop-shadow(0 18px 20px rgba(0,0,0,0.28))',
      }}
    >
      <defs>
        {/* Deep multi-stage paint — gives the body more depth than a flat SVG fill. */}
        <linearGradient id="carPaint" x1="0%" y1="8%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4b5f" />
          <stop offset="16%" stopColor="#ed1c32" />
          <stop offset="42%" stopColor="#c80f28" />
          <stop offset="68%" stopColor="#a9071d" />
          <stop offset="88%" stopColor="#760414" />
          <stop offset="100%" stopColor="#41020a" />
        </linearGradient>

        <linearGradient id="carPaintShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="38%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.42)" />
        </linearGradient>

        {/* Thin studio-style reflection. */}
        <linearGradient id="carReflection" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="28%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="46%" stopColor="rgba(255,255,255,0.72)" />
          <stop offset="54%" stopColor="rgba(255,255,255,0.20)" />
          <stop offset="78%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6f8ea5" />
          <stop offset="22%" stopColor="#182632" />
          <stop offset="54%" stopColor="#071018" />
          <stop offset="100%" stopColor="#020507" />
        </linearGradient>

        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.48)" />
          <stop offset="22%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="52%" stopColor="rgba(255,255,255,0)" />
          <stop offset="84%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <linearGradient id="carbon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34383d" />
          <stop offset="45%" stopColor="#14171a" />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>

        <radialGradient id="tire" cx="42%" cy="34%" r="68%">
          <stop offset="0%" stopColor="#272b30" />
          <stop offset="62%" stopColor="#090a0c" />
          <stop offset="100%" stopColor="#020203" />
        </radialGradient>

        <radialGradient id="rim" cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#e9edf0" />
          <stop offset="38%" stopColor="#9da4aa" />
          <stop offset="70%" stopColor="#5b6268" />
          <stop offset="100%" stopColor="#262a2e" />
        </radialGradient>

        <radialGradient id="hubGlow" cx="45%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#fff4c4" />
          <stop offset="18%" stopColor="#ffc82e" />
          <stop offset="100%" stopColor="#9a3e00" />
        </radialGradient>

        <linearGradient id="headlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="35%" stopColor="#dff5ff" stopOpacity="0.9" />
          <stop offset="78%" stopColor="#7ec8ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7ec8ff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="tailLight">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="18%" stopColor="#ff425a" />
          <stop offset="62%" stopColor="#d10c2c" />
          <stop offset="100%" stopColor="#6a0011" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="roadReflection" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <filter id="softBlur">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        <filter id="lightGlow">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Grounded shadow + subtle reflected light under the chassis. */}
      <ellipse
        cx="180"
        cy="103"
        rx="158"
        ry="9"
        fill={isDark ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.30)'}
        filter="url(#softBlur)"
      />
      <ellipse
        cx="183"
        cy="96"
        rx="122"
        ry="5"
        fill="url(#roadReflection)"
        opacity="0.45"
      />

      {/* Low, wide performance-car silhouette. */}
      <path
        d="M 20 80
           C 16 75, 16 67, 20 60
           L 31 51
           C 43 48, 60 47, 82 45
           C 100 41, 121 29, 145 23
           C 166 18, 206 17, 228 23
           C 248 28, 264 37, 281 45
           L 314 51
           C 330 54, 340 62, 338 70
           L 330 81
           L 298 81
           C 294 70, 283 63, 269 63
           C 254 63, 241 70, 237 81
           L 111 81
           C 107 69, 95 63, 81 63
           C 66 63, 54 70, 49 81
           L 22 81 Z"
        fill="url(#carPaint)"
        stroke="#5b0612"
        strokeWidth="1.4"
      />

      {/* Secondary paint shading gives the body a sculpted volume. */}
      <path
        d="M 22 68
           C 65 58, 92 57, 125 51
           C 163 44, 212 40, 280 48
           C 301 51, 319 59, 337 67
           L 330 79
           L 299 79
           C 293 69, 283 64, 269 64
           C 253 64, 243 70, 238 80
           L 111 80
           C 105 69, 95 64, 81 64
           C 66 64, 56 70, 50 80
           L 22 80 Z"
        fill="url(#carPaintShadow)"
        opacity="0.78"
      />

      {/* Long specular highlight across hood + shoulder. */}
      <path
        d="M 36 50
           C 84 46, 118 39, 145 31
           C 185 20, 226 25, 256 38
           C 278 47, 301 50, 322 56"
        fill="none"
        stroke="url(#carReflection)"
        strokeWidth="4.2"
        strokeLinecap="round"
        opacity="0.86"
      />

      {/* Lower body crease — makes the silhouette read like stamped metal. */}
      <path
        d="M 44 66 C 98 60, 142 61, 194 57 C 234 54, 280 56, 316 66"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Roof / canopy. */}
      <path
        d="M 91 45
           C 108 37, 128 28, 146 24
           C 170 19, 205 19, 227 25
           C 244 30, 259 38, 271 46
           L 253 50
           L 105 50 Z"
        fill="url(#glass)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />

      {/* Windshield division + panoramic glass reflections. */}
      <path
        d="M 170 23 L 164 49"
        stroke="rgba(0,0,0,0.58)"
        strokeWidth="2.2"
      />
      <path
        d="M 95 45 C 122 35, 142 27, 159 24 L 151 48 Z"
        fill="url(#glassReflection)"
        opacity="0.7"
      />
      <path
        d="M 179 24 C 196 23, 219 27, 238 36 L 248 46 L 178 46 Z"
        fill="rgba(255,255,255,0.05)"
      />

      {/* Mirror + subtle carbon mirror cap. */}
      <path
        d="M 206 42 C 215 39, 224 40, 230 44 L 224 48 L 208 47 Z"
        fill="url(#carPaint)"
        stroke="#45030b"
        strokeWidth="0.8"
      />
      <path
        d="M 211 43 L 222 43.5"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Side intake — deep cavity with inner rim. */}
      <path
        d="M 130 52
           C 117 56, 108 64, 102 75
           L 111 75
           C 116 65, 124 59, 137 55 Z"
        fill="#030405"
        stroke="#1e2226"
        strokeWidth="1"
      />
      <path
        d="M 116 63 C 128 58, 139 56, 153 55"
        fill="none"
        stroke="#4d0a12"
        strokeWidth="1.4"
      />

      {/* Flush door cut + subtle handle. */}
      <path
        d="M 167 48 L 160 75"
        stroke="rgba(0,0,0,0.34)"
        strokeWidth="1.05"
      />
      <path
        d="M 171 48 C 186 47, 198 47, 208 48"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.8"
      />

      {/* Front light cluster + thin DRL signature. */}
      <path
        d="M 292 49
           C 310 51, 323 56, 329 62
           C 323 64, 309 63, 298 59
           Z"
        fill="#11161b"
        stroke="#2e3941"
        strokeWidth="0.7"
      />
      <path
        d="M 296 52 C 307 53, 317 56, 324 60"
        fill="none"
        stroke="url(#headlight)"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <ellipse
        cx="319"
        cy="58"
        rx="16"
        ry="8"
        fill="url(#tailLight)"
        opacity="0.12"
        filter="url(#lightGlow)"
      />

      {/* Rear lamp signature. */}
      <path
        d="M 25 56 C 34 54, 42 57, 47 63"
        fill="none"
        stroke="#ff314d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="31" cy="60" r="7" fill="url(#tailLight)" opacity="0.48" />
      <circle cx="31" cy="60" r="2.2" fill="#fff2f3" opacity="0.9" />

      {/* Carbon front splitter / diffuser. */}
      <path
        d="M 18 81 L 51 81 M 111 81 L 238 81 M 298 81 L 333 81"
        stroke="url(#carbon)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 20 84 L 58 84 M 305 84 L 331 84"
        stroke="#07090b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Aero fins under the nose. */}
      <path
        d="M 280 78 L 289 84 L 298 78 M 303 79 L 311 84 L 319 79"
        fill="none"
        stroke="#25292e"
        strokeWidth="1.1"
      />

      {/* High-detail rear wheel assembly. */}
      <motion.g
        style={{
          originX: '81px',
          originY: '82px',
          rotate: wheelRotation,
        }}
      >
        <circle cx="81" cy="82" r="19" fill="#020203" opacity="0.55" />
        <circle cx="81" cy="82" r="17" fill="url(#tire)" />
        <circle cx="81" cy="82" r="15.7" fill="none" stroke="#353a40" strokeWidth="1" />
        <circle cx="81" cy="82" r="11.3" fill="url(#rim)" />
        <circle cx="81" cy="82" r="8.7" fill="#242a2f" />
        <circle cx="81" cy="82" r="8" fill="none" stroke="#cbd0d5" strokeWidth="0.6" opacity="0.7" />

        {/* Carbon-ceramic disc + performance caliper. */}
        <circle cx="81" cy="82" r="8.1" fill="none" stroke="#777f86" strokeWidth="1" strokeDasharray="1.8 1.8" />
        <path
          d="M 74 76 A 8 8 0 0 1 80 74 L 81 78 A 4 4 0 0 0 77 79 Z"
          fill="#ffc62c"
          stroke="#8d4b00"
          strokeWidth="0.5"
        />

        {/* Concave 10-spoke wheel. */}
        <g stroke="#e3e7ea" strokeWidth="1.15" strokeLinecap="round">
          <path d="M 81 82 L 81 73" />
          <path d="M 81 82 L 86.5 74.8" />
          <path d="M 81 82 L 90 78" />
          <path d="M 81 82 L 90 86" />
          <path d="M 81 82 L 86.5 89.2" />
          <path d="M 81 82 L 81 91" />
          <path d="M 81 82 L 75.5 89.2" />
          <path d="M 81 82 L 72 86" />
          <path d="M 81 82 L 72 78" />
          <path d="M 81 82 L 75.5 74.8" />
        </g>
        <circle cx="81" cy="82" r="2.8" fill="url(#hubGlow)" stroke="#5a4a16" strokeWidth="0.6" />
      </motion.g>

      {/* High-detail front steerable wheel assembly. */}
      <motion.g
        style={{
          originX: '269px',
          originY: '82px',
          rotate: frontSteerAngle,
        }}
      >
        <motion.g
          style={{
            originX: '269px',
            originY: '82px',
            rotate: wheelRotation,
          }}
        >
          <circle cx="269" cy="82" r="19" fill="#020203" opacity="0.55" />
          <circle cx="269" cy="82" r="17" fill="url(#tire)" />
          <circle cx="269" cy="82" r="15.7" fill="none" stroke="#353a40" strokeWidth="1" />
          <circle cx="269" cy="82" r="11.3" fill="url(#rim)" />
          <circle cx="269" cy="82" r="8.7" fill="#242a2f" />
          <circle cx="269" cy="82" r="8" fill="none" stroke="#cbd0d5" strokeWidth="0.6" opacity="0.7" />
          <circle cx="269" cy="82" r="8.1" fill="none" stroke="#777f86" strokeWidth="1" strokeDasharray="1.8 1.8" />
          <path
            d="M 262 76 A 8 8 0 0 1 268 74 L 269 78 A 4 4 0 0 0 265 79 Z"
            fill="#ffc62c"
            stroke="#8d4b00"
            strokeWidth="0.5"
          />

          <g stroke="#e3e7ea" strokeWidth="1.15" strokeLinecap="round">
            <path d="M 269 82 L 269 73" />
            <path d="M 269 82 L 274.5 74.8" />
            <path d="M 269 82 L 278 78" />
            <path d="M 269 82 L 278 86" />
            <path d="M 269 82 L 274.5 89.2" />
            <path d="M 269 82 L 269 91" />
            <path d="M 269 82 L 263.5 89.2" />
            <path d="M 269 82 L 260 86" />
            <path d="M 269 82 L 260 78" />
            <path d="M 269 82 L 263.5 74.8" />
          </g>
          <circle cx="269" cy="82" r="2.8" fill="url(#hubGlow)" stroke="#5a4a16" strokeWidth="0.6" />
        </motion.g>
      </motion.g>

      {/* Fine wheel-arch highlights to visually integrate wheels into the body. */}
      <path
        d="M 58 77 C 63 65, 71 61, 81 61 C 92 61, 101 66, 106 77"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.2"
      />
      <path
        d="M 246 77 C 251 65, 259 61, 269 61 C 280 61, 289 66, 294 77"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.2"
      />

      {/* Tiny rear exhaust heat flare for launch moments. */}
      <g opacity="0.82">
        <ellipse cx="16" cy="79" rx="8" ry="2.8" fill="#ff7a18" opacity="0.25" filter="url(#lightGlow)" />
        <circle cx="16" cy="79" r="1.6" fill="#ffd166" />
        <circle cx="13" cy="79" r="0.8" fill="#fff4c4" />
      </g>
    </svg>
  );

  return (
    <div className={cn('relative inline-flex', className)} dir="ltr">
      {/* Trigger element */}
      <span
        className="inline-flex cursor-pointer select-none"
        onClick={handleTrigger}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Trigger Ferrari drift page transition"
      >
        {children || (
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-text-primary text-background font-medium text-xs sm:text-sm tracking-tight hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Launch Transition</span>
            <span className="font-mono text-xs opacity-60">→</span>
          </button>
        )}
      </span>

      {/* Global Fixed Cinematic Animation Overlay */}
      {typeof document !== 'undefined' && state !== 'idle' && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* 1. Smoke Plumes, Skid Marks & Speed Lines Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          />

          {/* 2. Drifting Ferrari Rosso Corsa Supercar with Body Pitch & Roll */}
          <motion.div
            className="absolute left-0 pointer-events-none"
            style={{
              x: carX,
              y: carYOffset,
              rotate: carDriftAngle,
              ...carVerticalStyle,
            }}
          >
            {carSvg}
          </motion.div>

          {/* 3. Smooth Page Transition Screen Wipe / Backdrop Fade */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: isDark ? '#050505' : '#FAFAFA',
              opacity: transitionOpacity,
            }}
          />
        </div>
      )}
    </div>
  );
};

CarSmokePageTransition.displayName = 'CarSmokePageTransition';