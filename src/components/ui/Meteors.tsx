"use client";

import React, { useEffect, useState, useMemo } from "react";
import { cn } from "../../lib/utils";

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of meteor streaks. Default: 20 */
  number?: number;
  /** Primary meteor head color. Default: "#94A3B8" */
  color?: string;
  /** Tail gradient accent color. Default: "#64748B" */
  trailColor?: string;
  /** Length of the meteor tail in pixels. Default: 60 */
  tailLength?: number;
  /** Trajectory angle in degrees. Default: 215 (down-left) */
  angle?: number;
  /** Minimum animation delay in seconds. Default: 0.2 */
  minDelay?: number;
  /** Maximum animation delay in seconds. Default: 1.2 */
  maxDelay?: number;
  /** Minimum animation duration in seconds. Default: 2 */
  minDuration?: number;
  /** Maximum animation duration in seconds. Default: 8 */
  maxDuration?: number;
  /** Additional container classes */
  className?: string;
  /** Optional child elements to wrap */
  children?: React.ReactNode;
}

interface MeteorStyle {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export const Meteors: React.FC<MeteorsProps> = ({
  number = 20,
  color = "#94A3B8",
  trailColor = "#64748B",
  tailLength = 60,
  angle = 215,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 8,
  className,
  children,
  style,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Precompute random distribution of meteors across container width
  const meteorStyles = useMemo<MeteorStyle[]>(() => {
    return Array.from({ length: number }).map(() => ({
      top: "0px",
      left: `${Math.floor(Math.random() * 800) - 200}px`,
      animationDelay: `${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s`,
      animationDuration: `${Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)}s`,
    }));
  }, [maxDelay, maxDuration, minDelay, minDuration, number]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <style>{`
        @keyframes easyui-meteor-streak {
          0% {
            transform: rotate(${angle}deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(${angle}deg) translateX(-600px);
            opacity: 0;
          }
        }
        .easyui-meteor-item {
          animation-name: easyui-meteor-streak;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .easyui-meteor-item {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>

      {mounted &&
        meteorStyles.map((itemStyle, idx) => (
          <span
            key={`meteor-${idx}`}
            className="easyui-meteor-item absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 8px 1px ${color}`,
              top: itemStyle.top,
              left: itemStyle.left,
              animationDelay: itemStyle.animationDelay,
              animationDuration: itemStyle.animationDuration,
            }}
          >
            {/* Luminous tail pseudo-element replacement */}
            <span
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 block"
              style={{
                width: `${tailLength}px`,
                height: "1px",
                background: `linear-gradient(to right, ${trailColor}, transparent)`,
              }}
            />
          </span>
        ))}

      {children && (
        <div className="pointer-events-auto relative z-10 h-full w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default Meteors;
