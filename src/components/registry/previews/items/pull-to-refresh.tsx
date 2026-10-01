import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;

  // Default state: smooth rising curve (monochrome calm)
  const calmPathD =
    'M 10 68 C 30 65, 45 52, 65 54 C 85 56, 100 42, 120 38 C 140 34, 155 46, 175 32 C 195 18, 220 28, 240 22 C 260 16, 280 14, 290 8';

  // Hovered state: smooth falling curve, used to demo the red downtick UI.
  // No card movement / no "Refreshing..." pill — just a color + curve swap.
  const dropPathD =
    'M 10 8 C 30 12, 45 22, 65 24 C 85 26, 100 38, 120 42 C 140 46, 155 36, 175 50 C 195 64, 220 56, 240 62 C 260 66, 280 68, 290 72';

  const pathD = hovered ? dropPathD : calmPathD;

  // Direction-aware tokens: red on a downtick, monochrome otherwise.
  const lineStroke = hovered ? '#ef4444' : '#E5E5E5';
  const endpointStroke = hovered ? '#ef4444' : '#F5F5F5';
  const changeTextClass = hovered
    ? 'text-[#ef4444]'
    : 'text-[#D4D4D4]';

  return (
    <div className="h-52 w-full flex items-center justify-center p-3 pointer-events-none select-none overflow-hidden relative">
      {/* Outer scale wrapper to fit component card cleanly */}
      <div className="w-[280px] h-[200px] overflow-hidden flex flex-col items-center justify-center relative">
        {/* Idle "Pull down" indicator — only shown when NOT hovered.
            On hover it stays hidden so the focus is purely on the red state. */}
        <motion.div
          animate={{
            opacity: hovered ? 0 : 1,
            y: hovered ? -10 : 0,
            scale: hovered ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="absolute top-0 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-[#202020] border border-neutral-200/90 dark:border-[#333333] shadow-md transition-colors"
        >
          <ArrowDown className="w-2.5 h-2.5 text-neutral-400 dark:text-[#A3A3A3]" />
          <span className="text-[9px] font-sans font-medium text-neutral-700 dark:text-[#E5E5E5]">
            Pull down
          </span>
        </motion.div>

        {/* Financial Statistics Card — never moves on hover.
            Only its color and chart curve morph to demonstrate the downtick UI. */}
        <div className="w-full rounded-2xl bg-white dark:bg-[#181818] border border-neutral-200/80 dark:border-[#262626] p-3.5 text-neutral-900 dark:text-[#F5F5F5] shadow-sm dark:shadow-md transition-colors">
          {/* Header */}
          <div className="flex flex-col items-start gap-0.5 mb-1">
            <div className="flex items-baseline font-sans tracking-tight">
              <span className="text-[20px] font-bold text-neutral-950 dark:text-white tracking-[-0.02em]">
                {hovered ? '$42,712' : '$43,128'}
              </span>
              <span className="text-[13px] font-semibold text-neutral-400 dark:text-[#8A8A8A] ml-0.5">
                {hovered ? '.18' : '.40'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-medium leading-none">
              <motion.span
                className={changeTextClass}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                {hovered ? '−416.22 · −1.0%' : '+982.55 · 2.3%'}
              </motion.span>
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
              <motion.path
                d={pathD}
                fill="none"
                stroke={lineStroke}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ d: pathD }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              />
              {/* Endpoint ring */}
              <motion.circle
                cx="290"
                cy={hovered ? 72 : 8}
                r="3.5"
                className="fill-white dark:fill-[#181818]"
                stroke={endpointStroke}
                strokeWidth="2"
                initial={false}
                animate={{ cy: hovered ? 72 : 8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
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
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$43.5k</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">LOW</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$41.8k</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">VOL</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">$1.1B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
