import React from 'react';
import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

const StackedCardsPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  return (
    <div className="h-52 w-full flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="relative w-full max-w-[220px] h-[130px] flex items-center justify-center">
        {/* Card 3 (back) */}
        <motion.div
          animate={{
            y: isHovered ? -16 : -10,
            scale: isHovered ? 0.92 : 0.88,
            opacity: 0.5,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute inset-x-3 top-0 h-24 rounded-xl bg-zinc-800/90 border border-zinc-700/60 shadow-md"
        />
        {/* Card 2 (middle) */}
        <motion.div
          animate={{
            y: isHovered ? -4 : -2,
            scale: isHovered ? 0.96 : 0.94,
            opacity: 0.8,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute inset-x-1.5 top-2 h-24 rounded-xl bg-zinc-900 border border-zinc-700/80 p-2.5 flex items-center gap-2 shadow-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=200&q=70"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="h-2 w-16 bg-zinc-600 rounded mb-1" />
            <div className="h-1.5 w-10 bg-zinc-700 rounded" />
          </div>
        </motion.div>
        {/* Card 1 (front) */}
        <motion.div
          animate={{
            y: isHovered ? 8 : 12,
            scale: 1,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute inset-x-0 top-4 h-24 rounded-xl bg-zinc-950 border border-zinc-700/90 p-2.5 flex items-center gap-2.5 shadow-xl"
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-800 shrink-0 overflow-hidden border border-zinc-700">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=200&q=70"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-semibold text-white truncate block">Annual letter 2025</span>
            <span className="text-[9px] text-zinc-400 truncate block">Scroll-driven sticky stack</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <StackedCardsPreview isHovered={hovered} />;
}
