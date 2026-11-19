import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function ProductTourPreview({ isHovered = false }: ComponentPreviewProps) {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Global Search', desc: 'Jump to any file or command.' },
    { title: 'Keyboard First', desc: 'Navigate using Arrow keys and Esc.' },
    { title: 'Docked Tooltip', desc: 'Adapts smoothly across screen sizes.' },
  ];

  const current = steps[step];

  return (
    <div className="h-52 w-full flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Target element with minimal spotlight focus ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="flex h-8 w-60 items-center justify-between rounded-lg border border-neutral-300/80 bg-neutral-100/80 px-2.5 text-xs text-neutral-500 ring-4 ring-neutral-400/15 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400 dark:ring-white/10 shadow-xs"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <Search className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
          <span className="text-[11px] truncate">Search commands…</span>
        </div>
        <span className="rounded bg-neutral-200/80 px-1.5 py-0.5 text-[9px] font-mono text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 shrink-0">
          ⌘K
        </span>
      </motion.div>

      {/* Minimal floating tour card */}
      <motion.div
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="mt-2.5 w-60 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg shadow-black/5 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/20"
      >
        <div className="flex items-center justify-between text-[10px] tabular-nums text-neutral-400 font-mono">
          <span>
            {step + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStep(0);
            }}
            className="text-[10px] font-sans text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>

        <div className="mt-1.5 min-h-[34px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                {current.title}
              </p>
              <p className="text-[11px] leading-tight text-neutral-500 mt-0.5">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex items-center gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-200 ${
                  i === step
                    ? 'w-3.5 bg-neutral-900 dark:bg-neutral-100'
                    : 'w-1 bg-neutral-200 dark:bg-neutral-800'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStep((s) => (s + 1) % steps.length);
            }}
            className="rounded-md bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-white transition-transform active:scale-95 dark:bg-neutral-100 dark:text-neutral-900 cursor-pointer"
          >
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
