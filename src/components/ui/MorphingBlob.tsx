import React, { useEffect, useMemo, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface MorphingBlobProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'color' | 'points'> {
  width?: number;
  height?: number;
  points?: number;
  baseRadius?: number;
  variance?: number;
  speed?: number;
  stiffness?: number;
  damping?: number;
  cursorFollow?: boolean;
  cursorStrength?: number;
  cursorSmoothness?: number;
  colors?: [string, string];
  className?: string;
}

const TAU = Math.PI * 2;

function catmullRomPath(coords: { x: number; y: number }[]) {
  const n = coords.length;
  if (n < 3) return '';

  let d = `M ${coords[0].x.toFixed(2)},${coords[0].y.toFixed(2)} `;

  for (let i = 0; i < n; i++) {
    const p0 = coords[(i - 1 + n) % n];
    const p1 = coords[i];
    const p2 = coords[(i + 1) % n];
    const p3 = coords[(i + 2) % n];

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;

    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${c1x.toFixed(2)},${c1y.toFixed(2)}
      ${c2x.toFixed(2)},${c2y.toFixed(2)}
      ${p2.x.toFixed(2)},${p2.y.toFixed(2)} `;
  }

  return d + 'Z';
}

export const MorphingBlob: React.FC<MorphingBlobProps> = ({
  width = 400,
  height = 400,
  points = 8,
  baseRadius = 120,
  variance = 28,
  speed = 0.7,
  stiffness = 45,
  damping = 9,
  cursorFollow = true,
  cursorStrength = 0.35,
  cursorSmoothness = 0.08,
  colors = ['#7C3AED', '#06B6D4'],
  className,
  ...props
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const cursor = useRef({
    x: width / 2,
    y: height / 2,
  });

  const currentPosition = useRef({
    x: width / 2,
    y: height / 2,
  });

  const gradientId = useMemo(
    () => `blob-gradient-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  const state = useRef(
    Array.from({ length: points }, () => ({
      radius: baseRadius,
      velocity: 0,
      target: baseRadius,
    }))
  );

  // Track cursor position
  useEffect(() => {
    if (!cursorFollow || prefersReducedMotion.current) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();

      if (!rect) return;

      const scaleX = width / rect.width;
      const scaleY = height / rect.height;

      cursor.current.x =
        (event.clientX - rect.left) * scaleX;

      cursor.current.y =
        (event.clientY - rect.top) * scaleY;
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );
    };
  }, [cursorFollow, width, height]);

  // Morph targets
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const retarget = () => {
      state.current.forEach((p) => {
        p.target =
          baseRadius +
          (Math.random() * 2 - 1) * variance;
      });
    };

    retarget();

    const id = setInterval(
      retarget,
      1800 / Math.max(speed, 0.01)
    );

    return () => clearInterval(id);
  }, [baseRadius, variance, speed]);

  useAnimationFrame((_, delta) => {
    if (
      prefersReducedMotion.current ||
      !pathRef.current
    ) {
      return;
    }

    const dt = Math.min(delta / 1000, 0.05);

    // Smooth cursor movement
    if (cursorFollow) {
      currentPosition.current.x +=
        (cursor.current.x -
          currentPosition.current.x) *
        cursorSmoothness;

      currentPosition.current.y +=
        (cursor.current.y -
          currentPosition.current.y) *
        cursorSmoothness;
    }

    const centerX = width / 2;
    const centerY = height / 2;

    const cursorOffsetX =
      (currentPosition.current.x - centerX) *
      cursorStrength;

    const cursorOffsetY =
      (currentPosition.current.y - centerY) *
      cursorStrength;

    const coords = state.current.map((p, i) => {
      const springForce =
        (p.target - p.radius) * stiffness;

      const dampingForce =
        p.velocity * damping;

      p.velocity +=
        (springForce - dampingForce) * dt;

      p.radius += p.velocity * dt;

      const angle = (i / points) * TAU;

      return {
        x:
          centerX +
          Math.cos(angle) * p.radius +
          cursorOffsetX,

        y:
          centerY +
          Math.sin(angle) * p.radius +
          cursorOffsetY,
      };
    });

    pathRef.current.setAttribute(
      'd',
      catmullRomPath(coords)
    );
  });

  const staticPath = useMemo(() => {
    const centerX = width / 2;
    const centerY = height / 2;

    const coords = Array.from(
      { length: points },
      (_, i) => {
        const angle = (i / points) * TAU;

        return {
          x:
            centerX +
            Math.cos(angle) * baseRadius,

          y:
            centerY +
            Math.sin(angle) * baseRadius,
        };
      }
    );

    return catmullRomPath(coords);
  }, [width, height, points, baseRadius]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn(
        'pointer-events-none select-none overflow-visible',
        className
      )}
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={colors[0]}
          />
          <stop
            offset="100%"
            stopColor={colors[1]}
          />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d={staticPath}
        fill={`url(#${gradientId})`}
        fillOpacity={1}
        stroke="none"
        strokeWidth={0}
        style={{
          filter: 'blur(10px)',
          transformOrigin: 'center',
        }}
      />
    </svg>
  );
};