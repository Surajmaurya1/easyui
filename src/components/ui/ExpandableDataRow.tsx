'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  CreditCard,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface DataRowItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  status: 'active' | 'pending' | 'churned' | 'paused';
  revenue: string | number;
  date: string;
  metadata?: {
    plan?: string;
    sessions?: number;
    lastActive?: string;
    billingMethod?: string;
    location?: string;
  };
  recentActivity?: Array<{
    action: string;
    timestamp: string;
  }>;
}

export interface ExpandableDataRowProps {
  /** Array of row items */
  items?: DataRowItem[];
  /** Allow multiple open rows simultaneously */
  allowMultiple?: boolean;
  /** Initial expanded row IDs */
  defaultExpandedIds?: string[];
  /** Loading skeleton state */
  isLoading?: boolean;
  /** Custom action callback */
  onRowAction?: (action: string, row: DataRowItem) => void;
  /** Custom class name */
  className?: string;
}

const defaultItems: DataRowItem[] = [
  {
    id: 'usr_01',
    user: {
      name: 'Sarah Connor',
      email: 'sarah.c@cyberdyne.io',
      role: 'Lead Architect',
    },
    status: 'active',
    revenue: '$4,280',
    date: 'Oct 24, 2026',
    metadata: {
      plan: 'Enterprise Plus',
      sessions: 482,
      lastActive: '12m ago',
      billingMethod: 'Visa •••• 8841',
      location: 'San Francisco, CA',
    },
    recentActivity: [
      { action: 'Upgraded team seat quota to 50 members', timestamp: '2 hours ago' },
      { action: 'Generated production API key for US-East cluster', timestamp: 'Yesterday' },
      { action: 'Completed SAML SSO authentication setup', timestamp: '3 days ago' },
    ],
  },
  {
    id: 'usr_02',
    user: {
      name: 'Marcus Vance',
      email: 'marcus@hyperion.tech',
      role: 'VP Engineering',
    },
    status: 'pending',
    revenue: '$1,950',
    date: 'Oct 22, 2026',
    metadata: {
      plan: 'Growth Pro',
      sessions: 124,
      lastActive: '2h ago',
      billingMethod: 'Mastercard •••• 1092',
      location: 'London, UK',
    },
    recentActivity: [
      { action: 'Requested custom SOC2 compliance report', timestamp: '4 hours ago' },
      { action: 'Added 4 new engineers to developer workspace', timestamp: '2 days ago' },
    ],
  },
  {
    id: 'usr_03',
    user: {
      name: 'Elena Rostova',
      email: 'elena@solaris.design',
      role: 'Principal Designer',
    },
    status: 'active',
    revenue: '$3,400',
    date: 'Oct 19, 2026',
    metadata: {
      plan: 'Design Scale',
      sessions: 890,
      lastActive: 'Just now',
      billingMethod: 'Apple Pay',
      location: 'Berlin, DE',
    },
    recentActivity: [
      { action: 'Exported component token dictionary (JSON)', timestamp: '10m ago' },
      { action: 'Created 8 new shared motion templates', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'usr_04',
    user: {
      name: 'Alex Chen',
      email: 'alex@quantum-ops.co',
      role: 'DevOps Lead',
    },
    status: 'paused',
    revenue: '$850',
    date: 'Oct 14, 2026',
    metadata: {
      plan: 'Starter Team',
      sessions: 42,
      lastActive: '5d ago',
      billingMethod: 'Invoice (Net-30)',
      location: 'Toronto, CA',
    },
    recentActivity: [
      { action: 'Paused subscription renewal pending budget review', timestamp: '5 days ago' },
    ],
  },
];

export const ExpandableDataRow: React.FC<ExpandableDataRowProps> = ({
  items = defaultItems,
  allowMultiple = false,
  defaultExpandedIds = ['usr_01'],
  isLoading = false,
  onRowAction,
  className,
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleCopyEmail = (email: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: DataRowItem['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            Pending
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-500/10 text-[#A1A1A1] text-[10px] font-mono border border-neutral-500/20">
            <span className="w-1 h-1 rounded-full bg-[#808080]" />
            Paused
          </span>
        );
      case 'churned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-mono border border-rose-500/20">
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            Churned
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className={cn('w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-4 space-y-3', className)}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-12 rounded-lg bg-[#141414] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden select-none font-sans', className)}>
      {/* Desktop Table Header (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-[#1F1F1F] text-[11px] font-mono text-[#6B6B6B] bg-[#141414]">
        <div className="col-span-5">User & Account</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Revenue</div>
        <div className="col-span-2">Date Added</div>
        <div className="col-span-1 text-right">Details</div>
      </div>

      {/* Row Items */}
      <div className="divide-y divide-[#1F1F1F]">
        {items.map((item) => {
          const isExpanded = expandedIds.includes(item.id);

          return (
            <div key={item.id} className="transition-colors hover:bg-[#141414]/60">
              {/* Row Header Target */}
              <button
                type="button"
                onClick={() => toggleRow(item.id)}
                className="w-full text-left p-3.5 sm:px-5 sm:py-3.5 focus-ring block cursor-pointer"
                aria-expanded={isExpanded}
              >
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={motionTransitions.springSnappy}
                      className="text-[#525252]"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>

                    <div className="w-7 h-7 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[11px] font-medium text-[#FAFAFA] shrink-0">
                      {item.user.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#FAFAFA] truncate">{item.user.name}</p>
                      <p className="text-[11px] text-[#6B6B6B] truncate font-mono">{item.user.email}</p>
                    </div>
                  </div>

                  <div className="col-span-2">{getStatusBadge(item.status)}</div>

                  <div className="col-span-2 text-xs font-mono text-[#FAFAFA] font-medium">
                    {item.revenue}
                  </div>

                  <div className="col-span-2 text-xs font-mono text-[#6B6B6B]">
                    {item.date}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <span className="text-[11px] font-mono text-[#525252] hover:text-white transition-colors">
                      {isExpanded ? 'Hide' : 'View'}
                    </span>
                  </div>
                </div>

                {/* Mobile Responsive Card layout */}
                <div className="md:hidden flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-xs font-medium text-[#FAFAFA] shrink-0">
                      {item.user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-[#FAFAFA] truncate">{item.user.name}</p>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-mono text-[#6B6B6B]">
                        <span className="text-[#FAFAFA] font-medium">{item.revenue}</span>
                        <span>·</span>
                        <span className="truncate">{item.user.email}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={motionTransitions.springSnappy}
                    className="text-[#525252] shrink-0 p-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </button>

              {/* Smooth Unfolding Expansion Container (Minimal & Calm) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={motionTransitions.springGentle}
                    className="overflow-hidden bg-[#141414]/40 border-t border-[#1F1F1F]"
                  >
                    <div className="p-4 sm:p-5 sm:pl-12 space-y-5">
                      {/* 3-Column Minimal Grid on Desktop, Clean Stack on Mobile */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                        {/* Section 1: Account Specs (Clean Key-Value Pairs) */}
                        <div className="md:col-span-5 space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B6B] block">
                            Account Metadata
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between py-1 border-b border-[#1F1F1F]/60">
                              <span className="text-[#6B6B6B]">Plan Tier</span>
                              <span className="text-[#FAFAFA] font-medium">{item.metadata?.plan || 'Standard'}</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-[#1F1F1F]/60">
                              <span className="text-[#6B6B6B]">Location</span>
                              <span className="text-[#A1A1A1]">{item.metadata?.location || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-[#1F1F1F]/60">
                              <span className="text-[#6B6B6B]">Payment Method</span>
                              <span className="text-[#A1A1A1] font-mono text-[11px]">{item.metadata?.billingMethod || 'Card'}</span>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-[#1F1F1F]/60">
                              <span className="text-[#6B6B6B]">Last Active</span>
                              <span className="text-[#A1A1A1] font-mono text-[11px]">{item.metadata?.lastActive || 'Recently'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Recent Activity (Subtle Timeline) */}
                        <div className="md:col-span-4 space-y-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B6B] block">
                            Recent Activity
                          </span>
                          <div className="space-y-2.5">
                            {item.recentActivity?.map((act, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] mt-1.5 shrink-0" />
                                <div className="min-w-0 space-y-0.5">
                                  <p className="text-[#FAFAFA] text-[11px] leading-relaxed">{act.action}</p>
                                  <span className="text-[10px] font-mono text-[#6B6B6B] block">{act.timestamp}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 3: Actions & ID */}
                        <div className="md:col-span-3 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B6B] block">
                              Actions
                            </span>
                            <div className="space-y-1.5">
                              <button
                                type="button"
                                onClick={(e) => handleCopyEmail(item.user.email, item.id, e)}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#171717] border border-[#1F1F1F] text-xs text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
                              >
                                <span>Copy Email</span>
                                {copiedId === item.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[#6B6B6B]" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => onRowAction?.('manage-billing', item)}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#171717] border border-[#1F1F1F] text-xs text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
                              >
                                <span>Manage Billing</span>
                                <CreditCard className="w-3 h-3 text-[#6B6B6B]" />
                              </button>

                              <button
                                type="button"
                                onClick={() => onRowAction?.('view-profile', item)}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#171717] border border-[#1F1F1F] text-xs text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring cursor-pointer"
                              >
                                <span>User Profile</span>
                                <ArrowUpRight className="w-3 h-3 text-[#6B6B6B]" />
                              </button>
                            </div>
                          </div>

                          <div className="text-[10px] font-mono text-[#6B6B6B] pt-2 border-t border-[#1F1F1F]/60">
                            Ref: {item.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
