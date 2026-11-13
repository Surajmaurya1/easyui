import { motion } from 'framer-motion';
import { ArrowUp, ChevronDown, FileText, Paperclip, X } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

/* Compact catalog-card rendering of <PromptInput />: attachment chip,
   auto-growing text field, model picker trigger and send button. */

export default function PromptInputPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full select-none items-center justify-center overflow-hidden px-4 py-2 pointer-events-none">
      <motion.div
        animate={{ y: isHovered ? -2 : 0, scale: isHovered ? 1.01 : 1 }}
        transition={motionTransitions.springSnappy}
        className="w-full max-w-[300px]"
      >
        <div
          className="rounded-[22px] bg-white p-2 ring-1 ring-black/[0.08] dark:bg-[#0f0f10] dark:ring-white/[0.09]"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 18px 40px -24px rgba(0,0,0,0.25)' }}
        >
          {/* attachment chip */}
          <div className="mb-1.5 flex w-fit max-w-full items-center gap-1.5 rounded-xl bg-black/[0.04] py-1 pl-1 pr-1 ring-1 ring-black/[0.05] dark:bg-white/[0.05] dark:ring-white/[0.06]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-neutral-500 dark:bg-white/[0.07]">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block max-w-[150px] truncate text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                launch-brief.pdf
              </span>
              <span className="block text-[9.5px] text-neutral-500">248 KB</span>
            </span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-neutral-500">
              <X className="h-2.5 w-2.5" strokeWidth={2} />
            </span>
          </div>

          {/* field */}
          <div className="px-2 pb-1 pt-1.5">
            <p className="text-[13px] leading-5 text-neutral-900 dark:text-neutral-100">
              Summarize this brief and draft a launch email…
              <span className="ml-px inline-block h-[13px] w-px translate-y-0.5 animate-pulse bg-neutral-900 align-middle dark:bg-neutral-100" />
            </p>
          </div>

          {/* toolbar */}
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-0.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl text-neutral-500">
                <Paperclip className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="inline-flex h-8 max-w-[9.5rem] items-center gap-1 rounded-xl pl-2.5 pr-2 text-[12.5px] font-medium text-neutral-600 dark:text-neutral-300">
                <span className="truncate">Fast</span>
                <ChevronDown className="h-3 w-3 shrink-0" strokeWidth={2} />
              </span>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[16px] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </div>
        </div>

        {/* hint line */}
        <div className="mt-2 flex items-center justify-between gap-2 px-3 text-[10px] text-neutral-500">
          <span className="flex items-center gap-1">
            <kbd className="inline-grid h-[15px] min-w-[15px] place-items-center rounded-[4px] bg-black/[0.06] px-1 font-sans text-[8.5px] font-medium text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
              ↵
            </kbd>
            to send
            <kbd className="ml-1 inline-grid h-[15px] min-w-[15px] place-items-center rounded-[4px] bg-black/[0.06] px-1 font-sans text-[8.5px] font-medium text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
              ⇧
            </kbd>
            new line
          </span>
          <span className="tabular-nums">62/8000</span>
        </div>
      </motion.div>
    </div>
  );
}
