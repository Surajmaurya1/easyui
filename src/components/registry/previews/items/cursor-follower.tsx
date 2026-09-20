import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

const CursorFollowerCardPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
    setActive(true);
  };

  const handlePointerLeave = () => {
    setActive(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="h-52 w-full flex flex-col items-center justify-center p-4 relative overflow-hidden select-none cursor-crosshair"
    >
      {/* Target Tracker Point */}
      <motion.div
        animate={{
          x: active ? pos.x : 0,
          y: active ? pos.y : 0,
          scale: isHovered || active ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 30,
          mass: 0.5,
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {/* Outer Spring Ring */}
        <div className="w-10 h-10 rounded-full border border-text-primary/30 bg-text-primary/5 backdrop-blur-xs flex items-center justify-center shadow-xs" />
        {/* Inner Solid Dot */}
        <div className="absolute w-2 h-2 rounded-full bg-text-primary shadow-xs" />
      </motion.div>

      {/* Dynamic Telemetry Badge */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border bg-surface-raised border-border text-text-secondary shadow-xs transition-colors">
          {active
            ? `x: ${Math.round(pos.x)} • y: ${Math.round(pos.y)}`
            : isHovered
            ? 'spring tracking active'
            : 'hover to track pointer'}
        </span>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <CursorFollowerCardPreview isHovered={hovered} />;
}
