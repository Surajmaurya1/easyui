'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, AlertCircle, Loader2, GitCommit, Copy, CheckCheck, ChevronDown } from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type TimelineStatus = 'completed' | 'in-progress' | 'pending' | 'failed';

export interface TimelineMetric {
  label: string;
  value: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  status: TimelineStatus;
  description?: string;
  tag?: string;
  commitHash?: string;
  metrics?: TimelineMetric[];
  author?: {
    name: string;
    role?: string;
  };
}

export interface InteractiveTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
  defaultSelectedId?: string;
  onItemSelect?: (item: TimelineItem) => void;
  className?: string;
  collapsible?: boolean;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  items = [],
  defaultSelectedId,
  onItemSelect,
  className,
  collapsible = true,
  ...props
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    defaultSelectedId || items[0]?.id
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultSelectedId ? [defaultSelectedId] : items.length > 0 ? [items[0].id] : [])
  );
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const listId = useId();

  const handleToggleExpand = (item: TimelineItem) => {
    setSelectedId(item.id);
    onItemSelect?.(item);

    if (!collapsible) return;

    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
  };

  const handleCopyHash = (e: React.MouseEvent, hash: string) => {
    e.stopPropagation();
    copyToClipboard(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getStatusIcon = (status: TimelineStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="w-3.5 h-3.5 text-white" />;
      case 'in-progress':
        return <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
      case 'pending':
      default:
        return <Clock className="w-3.5 h-3.5 text-[#606060]" />;
    }
  };

  const getStatusBadgeStyle = (status: TimelineStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-white/10 text-white border-white/20';
      case 'in-progress':
        return 'bg-white/15 text-white border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]';
      case 'failed':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'pending':
      default:
        return 'bg-[#141414] text-[#6B6B6B] border-[#1F1F1F]';
    }
  };

  const getStatusNodeStyle = (status: TimelineStatus, isSelected: boolean) => {
    switch (status) {
      case 'completed':
        return 'bg-[#141414] border-[#3B82F6] text-[#3B82F6] ring-1 ring-[#3B82F6]/20';
      case 'in-progress':
        return 'bg-[#141414] border-[#3B82F6] text-[#3B82F6] shadow-xs ring-2 ring-[#3B82F6]/30';
      case 'failed':
        return 'bg-rose-500/10 border-rose-500 text-rose-400 ring-1 ring-rose-500/30';
      case 'pending':
      default:
        return isSelected
          ? 'bg-[#141414] border-[#4A4A4A] text-[#A1A1A1]'
          : 'bg-[#0E0E0E] border-[#1F1F1F] text-[#6B6B6B]';
    }
  };

  // Calculate completed count for progress line indicator
  const completedIndex = items.reduce((acc, curr, idx) => {
    return curr.status === 'completed' || curr.status === 'in-progress' ? idx : acc;
  }, -1);

  const progressPercent =
    items.length > 1 && completedIndex >= 0
      ? (completedIndex / (items.length - 1)) * 100
      : 0;

  return (
    <div
      role="region"
      aria-label="Interactive timeline"
      className={cn(
        'w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 sm:p-5 text-[#FAFAFA]',
        className
      )}
      {...props}
    >
      <div className="relative">
        {/* Continuous Background Track Line */}
        <div className="absolute left-[17px] top-6 bottom-6 w-[2px] bg-[#1F1F1F]" />

        {/* Animated Progress Filled Line */}
        <motion.div
          className="absolute left-[17px] top-6 w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#3B82F6]/80 to-transparent origin-top"
          initial={{ height: 0 }}
          animate={{ height: `${progressPercent}%` }}
          transition={motionTransitions.springGentle}
        />

        {/* Timeline Items List */}
        <div className="space-y-3 sm:space-y-4 relative" role="list">
          {items.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const isSelected = selectedId === item.id;
            const itemId = `${listId}-item-${item.id}`;

            return (
              <div
                key={item.id}
                role="listitem"
                className="relative flex items-start gap-4 group"
              >
                {/* Status Indicator Node */}
                <button
                  type="button"
                  onClick={() => handleToggleExpand(item)}
                  aria-expanded={isExpanded}
                  aria-controls={itemId}
                  className={cn(
                    'relative z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer',
                    getStatusNodeStyle(item.status, isSelected)
                  )}
                  title={`${item.title} - ${item.status}`}
                >
                  {getStatusIcon(item.status)}
                  {item.status === 'in-progress' && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#3B82F6]/20 -z-10" />
                  )}
                </button>

                {/* Content Card */}
                <div
                  onClick={() => handleToggleExpand(item)}
                  className={cn(
                    'flex-1 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden p-3.5 sm:p-4',
                    isSelected
                      ? 'bg-[#141414] border-[#4A4A4A] shadow-xs'
                      : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#4A4A4A] hover:bg-[#141414]'
                  )}
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs sm:text-sm font-medium text-[#FAFAFA] truncate">
                          {item.title}
                        </span>
                        {item.tag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] text-[#A1A1A1]">
                            {item.tag}
                          </span>
                        )}
                        <span
                          className={cn(
                            'text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border',
                            getStatusBadgeStyle(item.status)
                          )}
                        >
                          {item.status}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-[#6B6B6B] block">
                        {item.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {collapsible && (
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#6B6B6B] group-hover:text-[#FAFAFA] p-1"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Expandable Detail Section */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={itemId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={motionTransitions.springGentle}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-[#1F1F1F] space-y-3">
                          {item.description && (
                            <p className="text-xs text-[#A1A1A1] leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {/* Metrics Grid */}
                          {item.metrics && item.metrics.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                              {item.metrics.map((m, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
                                >
                                  <span className="text-[10px] font-mono text-[#6B6B6B] block uppercase">
                                    {m.label}
                                  </span>
                                  <span className="text-xs font-mono font-medium text-[#FAFAFA]">
                                    {m.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Footer Meta: Commit + Author */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] font-mono text-[#6B6B6B]">
                            {item.author && (
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B]" />
                                <span className="text-[#A1A1A1]">{item.author.name}</span>
                                {item.author.role && (
                                  <span className="text-[#6B6B6B]">({item.author.role})</span>
                                )}
                              </div>
                            )}

                            {item.commitHash && (
                              <button
                                type="button"
                                onClick={(e) => handleCopyHash(e, item.commitHash!)}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0E0E0E] hover:bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
                                title="Copy commit hash"
                              >
                                <GitCommit className="w-3 h-3" />
                                <span>{item.commitHash.slice(0, 7)}</span>
                                {copiedHash === item.commitHash ? (
                                  <CheckCheck className="w-3 h-3 text-white" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[#6B6B6B]" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
