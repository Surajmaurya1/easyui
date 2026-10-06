'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface StackCard {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export interface StackUnfoldPanelProps {
  /** Array of cards in the stack. */
  cards: StackCard[];
  /** Controlled array of expanded card IDs. */
  expandedIds?: string[];
  /** Expansion change callback. */
  onExpandedChange?: (ids: string[]) => void;
  /** Allow multiple cards to remain open simultaneously. Default is false. */
  allowMultiple?: boolean;
  /** Visual presentation style. Default is 'default'. */
  variant?: 'default' | 'minimal';
  /** Custom CSS class names. */
  className?: string;
}

export const StackUnfoldPanel: React.FC<StackUnfoldPanelProps> = ({
  cards,
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  allowMultiple = false,
  variant = 'default',
  className,
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>([cards[0]?.id || '']);

  const activeIds = controlledExpandedIds !== undefined ? controlledExpandedIds : internalExpandedIds;

  const toggleCard = (id: string) => {
    let nextIds: string[];
    if (activeIds.includes(id)) {
      nextIds = activeIds.filter((item) => item !== id);
    } else {
      nextIds = allowMultiple ? [...activeIds, id] : [id];
    }

    if (onExpandedChange) onExpandedChange(nextIds);
    else setInternalExpandedIds(nextIds);
  };

  return (
    <div className={cn('w-full space-y-2.5', className)}>
      {cards.map((card, idx) => {
        const isExpanded = activeIds.includes(card.id);

        return (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransitions.springSmooth}
            className={cn(
              'rounded-2xl border transition-colors overflow-hidden',
              isExpanded
                ? 'bg-[#141414] border-[#4A4A4A] shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
                : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#4A4A4A] hover:bg-[#141414]',
              variant === 'minimal' && 'bg-transparent border-b border-t-0 border-x-0 rounded-none'
            )}
          >
            {/* Header / Trigger */}
            <button
              type="button"
              onClick={() => toggleCard(card.id)}
              disabled={card.disabled}
              aria-expanded={isExpanded}
              aria-controls={`stack-content-${card.id}`}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-[#6B6B6B]">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-[#FAFAFA] hover:text-white transition-colors">
                    {card.title}
                  </h4>
                  {card.subtitle && (
                    <p className="text-[11px] text-[#6B6B6B] mt-0.5">{card.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                    {card.badge}
                  </span>
                )}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={motionTransitions.springSnappy}
                  className="p-1 rounded-lg text-[#525252] hover:text-white"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </button>

            {/* Unfolding Body */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`stack-content-${card.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={motionTransitions.springSmooth}
                >
                  <div className="px-4 pb-4 pt-1 text-xs text-[#A1A1A1] leading-relaxed border-t border-[#1F1F1F]">
                    {card.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
