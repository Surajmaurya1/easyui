import { motion } from 'framer-motion';
import { ArrowDown, RefreshCw } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;

  // Static/smooth mini chart path matching the reference
  const pathD = 'M 10 68 C 30 65, 45 52, 65 54 C 85 56, 100 42, 120 38 C 140 34, 155 46, 175 32 C 195 18, 220 28, 240 22 C 260 16, 280 14, 290 8';

  return (
    <div className="h-52 w-full flex items-center justify-center p-3 pointer-events-none select-none overflow-hidden relative">
      {/* Outer scale wrapper to fit component card cleanly */}
      <div className="w-[280px] h-[200px] overflow-hidden flex flex-col items-center justify-center relative">
        {/* Pull-to-refresh indicator badge */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : -14,
            scale: hovered ? 1 : 0.8,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="absolute top-0 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-[#202020] border border-neutral-200/90 dark:border-[#333333] shadow-md transition-colors"
        >
          {hovered ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              className="text-emerald-600 dark:text-emerald-400"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </motion.div>
          ) : (
            <ArrowDown className="w-2.5 h-2.5 text-neutral-400 dark:text-[#A3A3A3]" />
          )}
          <span className="text-[9px] font-sans font-medium text-neutral-700 dark:text-[#E5E5E5]">
            {hovered ? 'Refreshing...' : 'Pull down'}
          </span>
        </motion.div>

        {/* Financial Statistics Card */}
        <motion.div
          animate={{ y: hovered ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 25 }}
          className="w-full rounded-2xl bg-white dark:bg-[#181818] border border-neutral-200/80 dark:border-[#262626] p-3.5 text-neutral-900 dark:text-[#F5F5F5] shadow-sm dark:shadow-md transition-colors"
        >
          {/* Header */}
          <div className="flex flex-col items-start gap-0.5 mb-1">
            <div className="flex items-baseline font-sans tracking-tight">
              <span className="text-[20px] font-bold text-neutral-950 dark:text-white tracking-[-0.02em]">
                {hovered ? '$59,142' : '$58,834'}
              </span>
              <span className="text-[13px] font-semibold text-neutral-400 dark:text-[#8A8A8A] ml-0.5">
                {hovered ? '.80' : '.75'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-medium leading-none">
              <span className="text-emerald-600 dark:text-[#22c55e]">
                {hovered ? '+1,512.65 · 2.6%' : '+1,204.60 · 2.1%'}
              </span>
              <span className="text-neutral-400 dark:text-[#6F6F6F]">today</span>
            </div>
          </div>

          {/* Mini Chart SVG */}
          <div className="relative w-full h-[46px] my-1 overflow-visible">
            <svg
              viewBox="0 0 300 75"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <path
                d={pathD}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Endpoint ring */}
              <circle
                cx="290"
                cy="8"
                r="3.5"
                className="fill-white dark:fill-[#181818]"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Time range tabs */}
          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <div className="flex-1 py-0.5 text-center rounded-full text-[9px] font-medium text-neutral-400 dark:text-[#737373]">
              1H
            </div>
            <div className="flex-1 py-0.5 text-center rounded-full text-[9px] font-medium text-neutral-400 dark:text-[#737373]">
              4H
            </div>
            <div className="flex-1 py-0.5 text-center rounded-full text-[9px] font-medium text-neutral-900 dark:text-white bg-neutral-100 dark:bg-[#282828] border border-neutral-200 dark:border-[#383838]">
              1D
            </div>
          </div>

          {/* Micro metrics summary */}
          <div className="grid grid-cols-3 gap-1 mt-2 pt-1.5 border-t border-neutral-100 dark:border-[#262626] text-center text-[8px]">
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">HIGH</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$59.1k</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">LOW</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$57.4k</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">VOL</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$1.4B</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

