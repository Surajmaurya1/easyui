'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface DepthLayer {
  id: string;
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
  blurAmount?: number;
}

export interface DepthCorridorProps {
  /** Array of layers arranged from foreground to deep background. */
  layers: DepthLayer[];
  /** Controlled active index of focused layer. */
  activeLayerIndex?: number;
  /** Layer selection callback. */
  onLayerChange?: (index: number) => void;
  /** Perspective depth in pixels. Default is 1000. */
  perspectiveDepth?: number;
  /** Enable subtle mouse movement 3D parallax. Default is true. */
  enableParallax?: boolean;
  /** Custom CSS class names. */
  className?: string;
}

export const DepthCorridor: React.FC<DepthCorridorProps> = ({
  layers,
  activeLayerIndex: controlledIndex,
  onLayerChange,
  perspectiveDepth = 1000,
  enableParallax = true,
  className,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const setActiveIndex = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(layers.length - 1, newIndex));
    if (onLayerChange) onLayerChange(clamped);
    else setInternalIndex(clamped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableParallax || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Depth Corridor Carousel"
      className={cn(
        'relative w-full h-80 sm:h-96 rounded-2xl bg-[#050505] border border-[#1F1F1F] overflow-hidden flex flex-col items-center justify-center select-none focus:outline-none focus:ring-2 focus:ring-white/20',
        className
      )}
      style={{ perspective: `${perspectiveDepth}px` }}
    >
      {/* 3D Scene */}
      <div className="relative w-full max-w-lg h-56 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {layers.map((layer, idx) => {
          const offset = idx - activeIndex;
          const isCurrent = offset === 0;
          const isVisible = Math.abs(offset) <= 3;

          if (!isVisible) return null;

          // Compute 3D translations & perspective hierarchy
          const zDistance = -Math.abs(offset) * 120;
          const yDistance = offset * 20;
          const xDistance = offset * 45;
          const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.12);
          const opacity = isCurrent ? 1 : Math.max(0.2, 0.75 - Math.abs(offset) * 0.25);
          const blur = isCurrent ? 0 : Math.min(8, Math.abs(offset) * 2.5);

          return (
            <motion.div
              key={layer.id}
              onClick={() => setActiveIndex(idx)}
              animate={{
                x: xDistance + (enableParallax ? mouseOffset.x * (1 - Math.abs(offset) * 0.2) : 0),
                y: yDistance + (enableParallax ? mouseOffset.y * (1 - Math.abs(offset) * 0.2) : 0),
                z: zDistance,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                rotateY: offset * -6 + (enableParallax ? mouseOffset.x * 0.5 : 0),
              }}
              transition={motionTransitions.springSmooth}
              className={cn(
                'absolute w-72 sm:w-80 p-5 rounded-2xl border transition-colors cursor-pointer',
                isCurrent
                  ? 'bg-[#141414] border-[#1F1F1F] shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-30'
                  : 'bg-[#0E0E0E]/90 border-[#1F1F1F]/60 shadow-md hover:border-[#4A4A4A]'
              )}
            >
              {layer.title && (
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-[#FAFAFA] tracking-tight">{layer.title}</h4>
                  <span className="text-[9px] font-mono text-[#6B6B6B]">0{idx + 1}</span>
                </div>
              )}
              {layer.subtitle && (
                <p className="text-[11px] text-[#A1A1A1] mb-3">{layer.subtitle}</p>
              )}
              <div className="text-xs text-[#FAFAFA]">{layer.content}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 flex items-center gap-3 z-40 bg-[#0E0E0E]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1F1F1F]">
        <button
          type="button"
          onClick={() => setActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous layer"
          className="p-1 rounded-full text-[#525252] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {layers.map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all cursor-pointer',
                i === activeIndex ? 'w-4 bg-[#FAFAFA]' : 'bg-[#1F1F1F] hover:bg-[#4A4A4A]'
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex(activeIndex + 1)}
          disabled={activeIndex === layers.length - 1}
          aria-label="Next layer"
          className="p-1 rounded-full text-[#525252] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
