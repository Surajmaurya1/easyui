'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronDown, User, Clock, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface LedgerEntry {
  id: string;
  timestamp: Date | string;
  action: string;
  description: string;
  author?: string;
  details?: {
    diff?: string;
    preview?: string;
    metadata?: Record<string, any>;
  };
  restorable?: boolean;
}

export interface RecoveryLedgerProps {
  /** Array of chronological version history or state recovery entries. */
  entries: LedgerEntry[];
  /** Currently active / restored state entry ID. */
  currentEntryId?: string;
  /** Revert / restore callback. */
  onRestore?: (id: string) => Promise<void> | void;
  /** Entry selection handler. */
  onSelect?: (id: string) => void;
  /** Visual presentation mode. Default is 'timeline'. */
  variant?: 'timeline' | 'compact';
  /** Custom CSS class names. */
  className?: string;
}

export const RecoveryLedger: React.FC<RecoveryLedgerProps> = ({
  entries,
  currentEntryId,
  onRestore,
  onSelect,
  variant = 'timeline',
  className,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (onSelect) onSelect(id);
  };

  const handleRestore = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onRestore || restoringId) return;
    setRestoringId(id);
    try {
      await onRestore(id);
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className={cn('w-full rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1F1F1F] bg-[#141414] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#525252]" />
          <h3 className="text-xs font-semibold text-[#FAFAFA]">Recovery Ledger</h3>
          <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#141414] px-2 py-0.5 rounded-full border border-[#1F1F1F]">
            {entries.length} snapshots
          </span>
        </div>
      </div>

      {/* Ledger List */}
      <div className="relative p-4 space-y-4">
        {variant === 'timeline' && (
          <div className="absolute top-6 bottom-6 left-7 w-[2px] bg-[#1F1F1F] pointer-events-none" />
        )}

        {entries.map((entry, idx) => {
          const isCurrent = entry.id === currentEntryId;
          const isExpanded = expandedId === entry.id;
          const isRestoring = restoringId === entry.id;
          const isRestorable = entry.restorable !== false;

          const dateStr =
            typeof entry.timestamp === 'string'
              ? entry.timestamp
              : entry.timestamp.toLocaleString();

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-8"
            >
              {/* Timeline Indicator Pip */}
              <div
                className={cn(
                  'absolute left-0 top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors bg-[#0E0E0E]',
                  isCurrent
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-[#1F1F1F] text-transparent hover:border-[#4A4A4A]'
                )}
              >
                {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </div>

              {/* Entry Card */}
              <div
                onClick={() => toggleExpand(entry.id)}
                className={cn(
                  'p-3 rounded-xl border transition-all cursor-pointer',
                  isCurrent
                    ? 'bg-[#141414] border-emerald-500/30 shadow-xs'
                    : isExpanded
                    ? 'bg-[#141414] border-[#4A4A4A]'
                    : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#4A4A4A] hover:bg-[#141414]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[#FAFAFA]">
                        {entry.action}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Current Head
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#A1A1A1] mt-0.5 leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#6B6B6B] mt-2">
                      <span>{dateStr}</span>
                      {entry.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-2.5 h-2.5" />
                          {entry.author}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions (Restore & Expand) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!isCurrent && isRestorable && onRestore && (
                      <button
                        type="button"
                        disabled={Boolean(restoringId)}
                        onClick={(e) => handleRestore(entry.id, e)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[#141414] hover:bg-[#FAFAFA] hover:text-[#050505] text-[#A1A1A1] border border-[#1F1F1F] transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label={`Restore version ${entry.id}`}
                      >
                        {isRestoring ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <RotateCcw className="w-3 h-3" />
                        )}
                        <span>Revert</span>
                      </button>
                    )}

                    <div className="p-1 text-[#525252] hover:text-white">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={motionTransitions.springSnappy}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Diff / Details Panel */}
                <AnimatePresence>
                  {isExpanded && entry.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={motionTransitions.springSmooth}
                      className="mt-3 pt-2.5 border-t border-[#1F1F1F] overflow-hidden"
                    >
                      {entry.details.diff && (
                        <div className="p-2 rounded-lg bg-[#050505] border border-[#1F1F1F] font-mono text-[10px] text-[#A1A1A1] leading-relaxed overflow-x-auto">
                          <pre>{entry.details.diff}</pre>
                        </div>
                      )}
                      {entry.details.preview && (
                        <p className="text-xs text-[#A1A1A1] mt-2">
                          {entry.details.preview}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
