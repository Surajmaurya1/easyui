'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Layers, Terminal, Sparkles, Cpu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface MacOSFolderCardItem {
  id: string;
  title: string;
  description: string;
  meta?: string;
  icon?: React.ReactNode;
}

export interface MacOSFolderCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  folderTitle?: string;
  folderCategory?: string;
  items?: MacOSFolderCardItem[];
  defaultOpen?: boolean;
  isPeeked?: boolean;
}

const defaultItems: MacOSFolderCardItem[] = [
  {
    id: 'sync',
    title: 'Registry Sync',
    description: 'Catalog files react to component source changes.',
    meta: '01',
    icon: <Layers className="h-4 w-4 text-white" />,
  },
  {
    id: 'audit',
    title: 'SEO Audit',
    description: 'Generated metadata is verified before release.',
    meta: '02',
    icon: <Sparkles className="h-4 w-4 text-white" />,
  },
  {
    id: 'ship',
    title: 'Component Ship',
    description: 'Consumers install source-owned UI through shadcn.',
    meta: '03',
    icon: <Terminal className="h-4 w-4 text-white" />,
  },
  {
    id: 'engine',
    title: 'Motion Engine',
    description: 'Physics-calibrated spring tokens with zero jitter.',
    meta: '04',
    icon: <Cpu className="h-4 w-4 text-white" />,
  },
];

export const MacOSFolderCards: React.FC<MacOSFolderCardsProps> = ({
  folderTitle = 'Components',
  items = defaultItems,
  defaultOpen = false,
  isPeeked,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalHover, setInternalHover] = useState(false);
  const reducedMotion = useReducedMotion();

  const isHovered = isPeeked !== undefined ? isPeeked : internalHover;

  const toggleFolder = () => setIsOpen((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFolder();
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full max-w-3xl mx-auto select-none flex flex-col items-center justify-center min-h-[220px]',
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================== */
          /* 1. LARGE MINIMAL WHITE macOS FOLDER ICON WITH CARD PEEKS   */
          /* ========================================================== */
          <motion.div
            key="white-folder-icon"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={motionTransitions.springGentle}
            onMouseEnter={() => setInternalHover(true)}
            onMouseLeave={() => setInternalHover(false)}
            onClick={toggleFolder}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-expanded={false}
            aria-label={`${folderTitle} folder. Click to reveal cards.`}
            className="group flex flex-col items-center gap-3.5 cursor-pointer focus-ring rounded-3xl p-2"
          >
            {/* macOS 3D Folder Body (Enlarged) */}
            <motion.div
              animate={
                isHovered && !reducedMotion
                  ? { scale: 1.06, y: -5 }
                  : { scale: 1, y: 0 }
              }
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={motionTransitions.springSnappy}
              style={{ perspective: 700 }}
              className="relative h-32 w-44 sm:h-36 sm:w-48 select-none"
            >
              {/* Back Folder Body (Clean Porcelain White) */}
              <div className="absolute inset-0 rounded-[22px] border border-[#E0E0E0] bg-[#FFFFFF] shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                {/* macOS Tab Notch */}
                <div className="absolute left-0 top-0 h-7 w-20 rounded-tl-[20px] rounded-tr-xl bg-[#F0F0F0] border-r border-b border-[#E0E0E0]" />
              </div>

              {/* Emerging Peek Cards (Inside Folder Pocket) */}
              <div className="absolute inset-x-4 bottom-3 h-20 pointer-events-none">
                {/* Card Layer 3 (Deepest) */}
                <motion.div
                  animate={
                    isHovered && !reducedMotion
                      ? { y: -24, rotate: 6, scale: 0.94 }
                      : { y: 0, rotate: 2, scale: 0.92 }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute inset-x-2 top-0 h-18 rounded-xl border border-[#3A3A3A] bg-[#141414] opacity-70 shadow-sm"
                />

                {/* Card Layer 2 (Middle) */}
                <motion.div
                  animate={
                    isHovered && !reducedMotion
                      ? { y: -18, rotate: -4, scale: 0.97 }
                      : { y: 0, rotate: -1.5, scale: 0.96 }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute inset-x-1 top-0 h-18 rounded-xl border border-[#444444] bg-[#0B0B0B] opacity-90 shadow-sm flex items-center justify-between px-3"
                >
                  <span className="font-mono text-[10px] text-[#525252]">02</span>
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </motion.div>

                {/* Card Layer 1 (Front Peek) */}
                <motion.div
                  animate={
                    isHovered && !reducedMotion
                      ? { y: -10, rotate: 0, scale: 1 }
                      : { y: 0, rotate: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute inset-x-0 top-0 h-18 rounded-xl border border-[#4A4A4A] bg-[#222222] shadow-md flex items-center justify-between px-3.5"
                >
                  <span className="font-mono text-[10px] font-semibold text-[#A1A1A1]">01</span>
                  <span className="text-xs font-semibold text-white truncate max-w-[85px]">
                    {items[0]?.title}
                  </span>
                  <Layers className="h-4 w-4 text-white" />
                </motion.div>
              </div>

              {/* Front Folder Flap (3D Tilt Hinge) */}
              <motion.div
                animate={
                  isHovered && !reducedMotion
                    ? { rotateX: -16, y: 2 }
                    : { rotateX: 0, y: 0 }
                }
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                className="absolute inset-x-0 bottom-0 h-24 rounded-b-[22px] rounded-t-xs border-t border-x border-[#E5E5E5] bg-gradient-to-b from-[#FFFFFF] to-[#F2F2F2] shadow-xs"
              />
            </motion.div>

            {/* Folder Label */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
              <span>{folderTitle}</span>
              <span className="text-xs text-[#6B6B6B] font-mono">({items.length})</span>
            </div>
          </motion.div>
        ) : (
          /* ========================================================== */
          /* 2. MINIMAL OPENED VIEW (SEAMLESS CARD GRID)                */
          /* ========================================================== */
          <motion.div
            key="minimal-cards-expanded"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={motionTransitions.springGentle}
            className="w-full space-y-4"
          >
            {/* Minimal Header Bar */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-[#FAFAFA]">{folderTitle}</span>
                <span className="text-xs text-[#6B6B6B] font-mono">• {items.length} items</span>
              </div>

              <button
                type="button"
                onClick={toggleFolder}
                className="focus-ring inline-flex items-center gap-1 text-xs font-mono text-[#525252] hover:text-[#FAFAFA] transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-[#0E0E0E] border border-transparent hover:border-[#1F1F1F]"
                aria-label="Close folder"
              >
                <X className="h-3.5 w-3.5 text-white" />
                <span>Close</span>
              </button>
            </div>

            {/* Clean Minimalist Cards Grid */}
            <div className="grid w-full gap-3.5 sm:grid-cols-2">
              {items.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={reducedMotion ? false : { opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 26,
                    delay: index * 0.03,
                  }}
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  className="group rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-5 transition-colors hover:border-[#4A4A4A] hover:bg-[#141414] cursor-pointer"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#161616] border border-[#1F1F1F] text-white">
                      {item.icon || <Layers className="h-4 w-4 text-white" />}
                    </div>
                    <span className="font-mono text-[10px] text-[#6B6B6B] group-hover:text-[#A1A1A1] transition-colors">
                      {item.meta || `0${index + 1}`}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-[#FAFAFA] group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#A1A1A1] group-hover:text-zinc-300 transition-colors">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Aliases for backwards compatibility
export const VelocityAwareScrollCards = MacOSFolderCards;
export type VelocityAwareScrollCardsProps = MacOSFolderCardsProps;
export type VelocityCardItem = MacOSFolderCardItem;

export default MacOSFolderCards;
