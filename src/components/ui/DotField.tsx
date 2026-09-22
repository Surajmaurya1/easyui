import React, { useEffect, useRef, memo, useCallback } from 'react';

const TWO_PI = Math.PI * 2;

export interface DotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of each individual dot (in px). Default: 1.5 */
  dotRadius?: number;
  /** Spacing between adjacent dots (in px). Default: 14 */
  dotSpacing?: number;
  /** Linear gradient start color. Default: 'rgba(56, 189, 248, 0.35)' */
  gradientFrom?: string;
  /** Linear gradient end color. Default: 'rgba(168, 85, 247, 0.25)' */
  gradientTo?: string;
  /** Optional container CSS class name */
  className?: string;
}

export const DotField: React.FC<DotFieldProps> = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  gradientFrom = 'rgba(255, 255, 255, 0.12)',
  gradientTo = 'rgba(255, 255, 255, 0.04)',
  className = '',
  style,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawDots = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || height <= 0) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, gradientFrom);
    grad.addColorStop(1, gradientTo);
    ctx.fillStyle = grad;

    const step = dotRadius + dotSpacing;
    if (step <= 0) return;

    const cols = Math.floor(width / step);
    const rows = Math.floor(height / step);
    const padX = (width % step) / 2;
    const padY = (height % step) / 2;
    const rad = dotRadius / 2;

    ctx.beginPath();
    for (let row = 0; row < rows; row++) {
      const ay = padY + row * step + step / 2;
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        ctx.moveTo(ax + rad, ay);
        ctx.arc(ax, ay, rad, 0, TWO_PI);
      }
    }
    ctx.fill();
  }, [dotRadius, dotSpacing, gradientFrom, gradientTo]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Draw initial render
    const rect = container.getBoundingClientRect();
    drawDots(rect.width, rect.height);

    // Watch container resize
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          drawDots(width, height);
        }
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [drawDots]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
