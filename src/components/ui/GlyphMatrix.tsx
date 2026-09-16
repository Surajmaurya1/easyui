'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { cn } from '../../lib/utils';

// ---------------------------------------------------------------------------
// Matrix Character Set: Authentic Katakana + Hex + Latin + Matrix Operators
// ---------------------------------------------------------------------------
const DEFAULT_CHARSET =
  'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF:・."=*+-<>¦｜XYZ';

export interface GlyphMatrixHandle {
  /** Resets all falling streams to the top. */
  reset: () => void;
  /** Pauses or resumes the animation. */
  togglePause: () => void;
}

export interface GlyphMatrixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Font size in pixels for the glyph grid. Default: 16 */
  fontSize?: number;
  /** Primary rain/trail stream color. Default: '#00FF66' (Matrix Green) */
  color?: string;
  /** Color of the leading head glyph in each column. Default: '#FFFFFF' */
  headColor?: string;
  /** Background color for canvas trail fading. Default: '#050505' */
  backgroundColor?: string;
  /** Character pool string for glyph generation. */
  charset?: string;
  /** Fall speed multiplier. Default: 1 */
  speed?: number;
  /** Fade decay rate per frame (lower = longer glowing trails). Default: 0.06 */
  fadeRate?: number;
  /** Interactive mouse disturbance effect. Default: true */
  interactive?: boolean;
  /** Whether the animation is paused. Default: false */
  paused?: boolean;
  /** If true, fixes the component over the entire viewport as a full-page backdrop. */
  fullPage?: boolean;
  /** Overall opacity of the matrix background. Default: 1 */
  opacity?: number;
  /** Optional content layered over the matrix background. */
  children?: React.ReactNode;
}

interface ColumnStream {
  y: number;
  speed: number;
  length: number;
  chars: string[];
  headHighlight: boolean;
  nextMutationTime: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (cleanHex.length >= 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
}

/**
 * GlyphMatrix
 *
 * A high-performance, canvas-driven Matrix digital rain background effect.
 * Streams glowing glyphs with decaying phosphor trails, head highlights,
 * random glyph mutations, and responsive pointer interactivity.
 */
export const GlyphMatrix = forwardRef<GlyphMatrixHandle, GlyphMatrixProps>(
  function GlyphMatrix(
    {
      fontSize = 16,
      color = '#00FF66',
      headColor = '#FFFFFF',
      backgroundColor = '#050505',
      charset = DEFAULT_CHARSET,
      speed = 1,
      fadeRate = 0.06,
      interactive = true,
      paused = false,
      opacity = 1,
      children,
      className,
      style,
      ...props
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const streamsRef = useRef<ColumnStream[]>([]);
    const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
      x: -1000,
      y: -1000,
      active: false,
    });
    const isPausedRef = useRef(paused);
    const isVisibleRef = useRef(true);

    useEffect(() => {
      isPausedRef.current = paused;
    }, [paused]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          streamsRef.current.forEach((stream) => {
            stream.y = Math.random() * -50;
          });
        },
        togglePause: () => {
          isPausedRef.current = !isPausedRef.current;
        },
      }),
      []
    );

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      let width = 0;
      let height = 0;
      let columns = 0;
      let dpr = 1;

      const randomChar = () =>
        charset[Math.floor(Math.random() * charset.length)];

      const initStreams = () => {
        columns = Math.floor(width / fontSize);
        streamsRef.current = Array.from({ length: columns }, () => {
          const length = Math.floor(Math.random() * 18 + 8);
          return {
            y: Math.random() * -100,
            speed: (Math.random() * 0.7 + 0.6) * speed,
            length,
            chars: Array.from({ length }, () => randomChar()),
            headHighlight: Math.random() > 0.15,
            nextMutationTime: 0,
          };
        });
      };

      const resize = () => {
        const rect = container.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;
        ctx.textBaseline = 'top';

        // Clear canvas with base background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        initStreams();
      };

      resize();

      let resizeObserver: ResizeObserver | undefined;
      if (typeof ResizeObserver === 'function') {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
      } else {
        window.addEventListener('resize', resize);
      }

      let intersectionObserver: IntersectionObserver | undefined;
      if (typeof IntersectionObserver === 'function') {
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
          },
          { rootMargin: '100px' }
        );
        intersectionObserver.observe(container);
      }

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      };

      const handlePointerLeave = () => {
        pointerRef.current.active = false;
      };

      if (interactive) {
        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);
      }

      // Reduced motion: draw static elegant glyph matrix
      if (reduceMotion) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        const numRows = Math.floor(height / fontSize);
        for (let c = 0; c < columns; c++) {
          for (let r = 0; r < numRows; r++) {
            if (Math.random() > 0.4) continue;
            const alpha = Math.random() * 0.4 + 0.05;
            ctx.fillStyle = hexToRgba(color, alpha);
            ctx.fillText(randomChar(), c * fontSize, r * fontSize);
          }
        }
        return () => {
          resizeObserver?.disconnect();
          intersectionObserver?.disconnect();
          window.removeEventListener('resize', resize);
          if (interactive) {
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerleave', handlePointerLeave);
          }
        };
      }

      // Animation Loop
      let lastTime = performance.now();
      const fadeColor = hexToRgba(backgroundColor, fadeRate);

      const render = (now: number) => {
        rafRef.current = requestAnimationFrame(render);
        if (isPausedRef.current || !isVisibleRef.current) return;

        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Fading overlay creates glowing phosphor trails
        ctx.fillStyle = fadeColor;
        ctx.fillRect(0, 0, width, height);

        const pointer = pointerRef.current;
        const pointerCol = Math.floor(pointer.x / fontSize);
        const pointerRow = Math.floor(pointer.y / fontSize);

        for (let i = 0; i < streamsRef.current.length; i++) {
          const stream = streamsRef.current[i];
          const x = i * fontSize;

          // Pointer proximity disturbance: accelerates or excites column
          let effectiveSpeed = stream.speed;
          const isNearPointer =
            pointer.active && Math.abs(pointerCol - i) <= 2;

          if (isNearPointer) {
            effectiveSpeed = stream.speed * 2.2;
          }

          stream.y += effectiveSpeed * 22 * delta;

          // Mutate characters occasionally
          if (now > stream.nextMutationTime) {
            const mutIdx = Math.floor(Math.random() * stream.chars.length);
            stream.chars[mutIdx] = randomChar();
            stream.nextMutationTime = now + Math.random() * 120 + 40;
          }

          const headY = Math.floor(stream.y);

          // Draw the characters along this column's trail
          for (let j = 0; j < stream.length; j++) {
            const charY = headY - j;
            if (charY < 0 || charY * fontSize > height) continue;

            const char = stream.chars[j] || randomChar();
            const yPos = charY * fontSize;

            if (j === 0 && stream.headHighlight) {
              // Leading head character: bright white/accent with glow
              ctx.fillStyle = isNearPointer ? '#FFFFFF' : headColor;
              ctx.shadowColor = headColor;
              ctx.shadowBlur = 8;
              ctx.fillText(char, x, yPos);
              ctx.shadowBlur = 0;
            } else {
              // Trail characters: decaying opacity
              const progress = j / stream.length;
              let alpha = Math.max(0.08, 1 - progress);

              // Proximity brightness boost
              if (isNearPointer && Math.abs(pointerRow - charY) <= 3) {
                alpha = Math.min(1, alpha + 0.5);
              }

              ctx.fillStyle = hexToRgba(color, alpha);
              ctx.fillText(char, x, yPos);
            }
          }

          // When trail completely leaves bottom, reset column above view
          if ((headY - stream.length) * fontSize > height) {
            stream.y = Math.random() * -30;
            stream.speed = (Math.random() * 0.7 + 0.6) * speed;
            stream.length = Math.floor(Math.random() * 18 + 8);
            stream.chars = Array.from({ length: stream.length }, () =>
              randomChar()
            );
            stream.headHighlight = Math.random() > 0.15;
          }
        }
      };

      rafRef.current = requestAnimationFrame(render);

      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();
        window.removeEventListener('resize', resize);
        if (interactive) {
          container.removeEventListener('pointermove', handlePointerMove);
          container.removeEventListener('pointerleave', handlePointerLeave);
        }
      };
    }, [
      fontSize,
      color,
      headColor,
      backgroundColor,
      charset,
      speed,
      fadeRate,
      interactive,
    ]);

    return (
      <div
        ref={containerRef}
        className={cn(
           'relative overflow-hidden w-full h-full min-h-[200px]',
          className
        )}
        style={{ opacity, ...style }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full pointer-events-none"
          aria-hidden="true"
        />
        {children && (
          <div className="relative z-10 flex h-full w-full items-center justify-center pointer-events-auto">
            {children}
          </div>
        )}
      </div>
    );
  }
);

// Backward-compatible alias
export const GlyphText = GlyphMatrix;
export default GlyphMatrix;