import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
    <div className="h-52 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[240px] h-11 rounded-full bg-neutral-100/90 dark:bg-[#121214] border border-neutral-200/90 dark:border-[#232327] p-1 flex items-center overflow-hidden pointer-events-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] transition-colors duration-200">
        {/* Dynamic progressive fill track */}
        <motion.div
          animate={{
            width: hovered ? '100%' : '36px',
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="absolute left-0 top-0 bottom-0 rounded-full bg-neutral-200/60 dark:bg-white/[0.07] border-r border-neutral-300/40 dark:border-white/10"
        />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium tracking-tight z-10 transition-colors">
          <motion.span
            animate={{
              opacity: hovered ? 0 : 1,
              x: hovered ? 10 : 0,
            }}
            transition={{ duration: 0.18 }}
            className="text-neutral-500 dark:text-neutral-400"
          >
            Slide to confirm
          </motion.span>
          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.94,
            }}
            transition={{ duration: 0.2 }}
            className="absolute text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            Confirmed ✓
          </motion.span>
        </div>

        {/* Draggable thumb */}
        <motion.div
          animate={{ x: hovered ? 148 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className={`w-9 h-9 rounded-full flex items-center justify-center z-20 relative text-xs font-medium transition-[background-color,border-color,box-shadow] duration-200 ${
            hovered
              ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-neutral-950 border border-emerald-600 dark:border-emerald-500 shadow-xs'
              : 'bg-white dark:bg-[#1C1C20] border border-neutral-200/90 dark:border-[#2C2C32] text-neutral-800 dark:text-neutral-200 shadow-xs'
          }`}
        >
          {hovered ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
