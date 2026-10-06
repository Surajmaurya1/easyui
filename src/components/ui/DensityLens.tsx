'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface DensityLensProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Underlying background content being examined. */
  children: React.ReactNode;
  /** Optional custom renderer for content inside the lens. If omitted, magnifies children. */
  renderLensContent?: (position: { x: number; y: number; scale: number }) => React.ReactNode;
  /** Diameter of the circular lens in pixels. Default is 150. */
  lensSize?: number;
  /** Lens shape. Default is 'circle'. */
  lensShape?: 'circle' | 'oval' | 'square';
  /** Display border around lens edge. Default is true. */
  showBorder?: boolean;
  /** Magnification zoom level inside lens. Default is 2. */
  zoomScale?: number;
}

export const DensityLens: React.FC<DensityLensProps> = ({
  children,
  renderLensContent,
  lensSize = 150,
  lensShape = 'circle',
  showBorder = true,
  zoomScale = 2,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const shapeClasses = {
    circle: 'rounded-full',
    oval: 'rounded-[40px]',
    square: 'rounded-2xl',
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden cursor-crosshair select-none', className)}
      {...props}
    >
      {/* Base Canvas / Content */}
      <div className="w-full h-full">{children}</div>

      {/* Floating Density Lens */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: coords.x - lensSize / 2,
              y: coords.y - lensSize / 2,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 28,
              mass: 0.2,
            }}
            style={{
              width: lensSize,
              height: lensSize,
            }}
            className={cn(
              'absolute top-0 left-0 pointer-events-none overflow-hidden z-30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] bg-[#141414]/90 backdrop-blur-sm',
              shapeClasses[lensShape],
              showBorder && 'border border-[#1F1F1F] ring-1 ring-[#4A4A4A]'
            )}
          >
            {/* Render magnified clone or custom higher-density overlay */}
            {renderLensContent ? (
              renderLensContent({ x: coords.x, y: coords.y, scale: zoomScale })
            ) : (
              <div
                style={{
                  position: 'absolute',
                  left: -coords.x * zoomScale + lensSize / 2,
                  top: -coords.y * zoomScale + lensSize / 2,
                  transform: `scale(${zoomScale})`,
                  transformOrigin: '0 0',
                  pointerEvents: 'none',
                }}
              >
                {children}
              </div>
            )}

            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
