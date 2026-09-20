import React from 'react';
import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

const StoryCardsPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  return (
    <div className="h-52 w-full flex items-center justify-center p-3 relative overflow-hidden select-none">
      <div className="relative w-full max-w-[260px] h-[140px] flex items-center gap-2">
        {/* Main active story card */}
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative flex-1 h-full rounded-xl overflow-hidden border border-border shadow-md bg-zinc-900"
        >
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=75"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2.5 flex flex-col justify-end">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">Story</span>
            <span className="text-[11px] font-bold text-white leading-tight truncate">Annual Letter</span>
            <span className="text-[9px] text-zinc-300 line-clamp-1">Explore latest trends & insights</span>
          </div>
        </motion.div>

        {/* Compact preview side cards */}
        <div className="w-[60px] h-full flex flex-col gap-1.5 shrink-0">
          <motion.div
            animate={{
              x: isHovered ? 2 : 0,
              opacity: isHovered ? 0.9 : 0.75,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex-1 rounded-lg overflow-hidden border border-border/70 bg-zinc-900 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=200&q=70"
              alt=""
              className="w-full h-full object-cover opacity-70"
            />
          </motion.div>
          <motion.div
            animate={{
              x: isHovered ? 4 : 0,
              opacity: isHovered ? 0.7 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.05 }}
            className="flex-1 rounded-lg overflow-hidden border border-border/70 bg-zinc-900 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=70"
              alt=""
              className="w-full h-full object-cover opacity-70"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <StoryCardsPreview isHovered={hovered} />;
}
