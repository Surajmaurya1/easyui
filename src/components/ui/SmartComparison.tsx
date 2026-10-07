'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Search, Sparkles, Filter, ChevronDown, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface ComparisonPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod?: string;
  badge?: string;
  featured?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface ComparisonFeature {
  id: string;
  name: string;
  description?: string;
  values: Record<string, string | boolean | React.ReactNode>;
}

export interface ComparisonCategory {
  id: string;
  title: string;
  features: ComparisonFeature[];
}

export interface SmartComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: ComparisonPlan[];
  categories: ComparisonCategory[];
  defaultPlanId?: string;
  enableSearch?: boolean;
  enableDiffFilter?: boolean;
  className?: string;
}

export const SmartComparison: React.FC<SmartComparisonProps> = ({
  plans = [],
  categories = [],
  defaultPlanId,
  enableSearch = true,
  enableDiffFilter = true,
  className,
  ...props
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultPlanId || (plans.find((p) => p.featured)?.id || plans[0]?.id || '')
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [diffOnly, setDiffOnly] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  // Filter categories and features
  const filteredCategories = useMemo(() => {
    const isFeatureDifferentiated = (feat: ComparisonFeature) => {
      if (plans.length <= 1) return true;
      const firstVal = JSON.stringify(feat.values[plans[0].id]);
      for (let i = 1; i < plans.length; i++) {
        if (JSON.stringify(feat.values[plans[i].id]) !== firstVal) {
          return true;
        }
      }
      return false;
    };

    return categories
      .map((cat) => {
        const matchingFeatures = cat.features.filter((feat) => {
          const matchSearch =
            !searchQuery.trim() ||
            feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (feat.description && feat.description.toLowerCase().includes(searchQuery.toLowerCase()));

          const matchDiff = !diffOnly || isFeatureDifferentiated(feat);

          return matchSearch && matchDiff;
        });

        return {
          ...cat,
          features: matchingFeatures,
        };
      })
      .filter((cat) => cat.features.length > 0);
  }, [categories, searchQuery, diffOnly, plans]);

  const renderValueCell = (value: string | boolean | React.ReactNode) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Check className="w-3 h-3" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#141414] text-[#6B6B6B]">
          <Minus className="w-3 h-3" />
        </span>
      );
    }

    if (typeof value === 'string') {
      return <span className="text-xs font-mono text-[#FAFAFA]">{value}</span>;
    }

    return value;
  };

  return (
    <div
      role="region"
      aria-label="Feature and plan comparison"
      className={cn(
        'w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 sm:p-5 text-[#FAFAFA] overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Controls Bar: Search + Diff Filter Toggle + Mobile Plan Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-3">
          {enableSearch && (
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#525252] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter capabilities..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#141414] border border-[#1F1F1F] text-[#FAFAFA] placeholder-[#6B6B6B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              />
            </div>
          )}

          {enableDiffFilter && (
            <button
              type="button"
              onClick={() => setDiffOnly((prev) => !prev)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer shrink-0',
                diffOnly
                  ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]'
                  : 'bg-[#141414] text-[#A1A1A1] border-[#1F1F1F] hover:text-[#FAFAFA] hover:border-[#4A4A4A]'
              )}
            >
              <Filter className="w-3 h-3" />
              <span>Differences only</span>
            </button>
          )}
        </div>

        {/* Mobile Plan Switcher Segment */}
        <div className="sm:hidden flex items-center p-1 bg-[#141414] rounded-xl border border-[#1F1F1F]">
          {plans.map((p) => {
            const isSelected = selectedPlanId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlanId(p.id)}
                className={cn(
                  'relative flex-1 py-1.5 px-2 text-xs font-medium text-center rounded-lg transition-colors cursor-pointer',
                  isSelected ? 'text-white' : 'text-[#6B6B6B] hover:text-[#A1A1A1]'
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="smartComparisonMobileTab"
                    className="absolute inset-0 bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg -z-10"
                    transition={motionTransitions.springSnappy}
                  />
                )}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plans Header Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-6 border-b border-[#1F1F1F]">
        {/* Left Column Label spacer */}
        <div className="hidden sm:flex flex-col justify-end">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B6B]">
            Feature Matrix
          </span>
          <span className="text-xs text-[#A1A1A1] mt-0.5">
            {categories.reduce((acc, c) => acc + c.features.length, 0)} specifications
          </span>
        </div>

        {/* Plan Cards */}
        {plans.map((plan) => {
          const isMobileActive = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={cn(
                'relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between',
                isMobileActive ? 'block' : 'hidden sm:flex',
                plan.featured
                  ? 'bg-gradient-to-b from-[#141414] to-[#0E0E0E] border-white/30 shadow-md'
                  : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#4A4A4A]'
              )}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAFAFA] text-[#050505] font-semibold shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#FAFAFA] flex items-center gap-1.5">
                    {plan.name}
                    {plan.featured && <Sparkles className="w-3.5 h-3.5 text-white" />}
                  </h3>
                </div>
                <p className="text-[11px] text-[#A1A1A1] mb-3 leading-snug">{plan.tagline}</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-xl font-bold font-mono text-[#FAFAFA] tracking-tight">
                    {plan.price}
                  </span>
                  {plan.billingPeriod && (
                    <span className="text-[10px] font-mono text-[#6B6B6B]">
                      /{plan.billingPeriod}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    plan.onCtaClick?.();
                  }}
                  className={cn(
                    'w-full py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white',
                    plan.featured
                      ? 'bg-[#FAFAFA] text-[#050505] hover:bg-white font-semibold'
                      : 'bg-[#141414] hover:bg-[#0E0E0E] text-[#A1A1A1] hover:text-[#FAFAFA] border border-[#1F1F1F]'
                  )}
                >
                  {plan.ctaText || 'Get Started'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Rows Grouped by Category */}
      <div className="divide-y divide-[#1F1F1F]">
        {filteredCategories.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#6B6B6B]">
            No features match your current search or difference filters.
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isCollapsed = collapsedCategories.has(category.id);

            return (
              <div key={category.id} className="py-3">
                {/* Category Header Accordion */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between py-2 text-left group cursor-pointer focus-visible:outline-none"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] group-hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    {category.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isCollapsed ? -90 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[#525252] group-hover:text-white"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Features in Category */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={motionTransitions.springGentle}
                      className="overflow-hidden space-y-1 pt-1"
                    >
                      {category.features.map((feat) => (
                        <div
                          key={feat.id}
                          className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2.5 px-2 rounded-lg hover:bg-[#141414] transition-colors items-center text-xs"
                        >
                          {/* Feature Name & Info */}
                          <div className="flex items-center gap-1.5 min-w-0 pr-2">
                            <span className="text-xs text-[#FAFAFA] font-normal truncate">
                              {feat.name}
                            </span>
                            {feat.description && (
                              <div className="relative">
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveTooltip(feat.id)}
                                  onMouseLeave={() => setActiveTooltip(null)}
                                  onClick={() =>
                                    setActiveTooltip((prev) => (prev === feat.id ? null : feat.id))
                                  }
                                  className="text-[#525252] hover:text-[#FAFAFA] cursor-pointer"
                                  aria-label={`Info about ${feat.name}`}
                                >
                                  <Info className="w-3 h-3" />
                                </button>

                                {activeTooltip === feat.id && (
                                  <div className="absolute left-0 bottom-full mb-1 z-30 w-48 p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] text-[10px] text-[#A1A1A1] shadow-md backdrop-blur-md">
                                    {feat.description}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Plan Values */}
                          {plans.map((plan) => {
                            const isMobileActive = selectedPlanId === plan.id;
                            return (
                              <div
                                key={plan.id}
                                className={cn(
                                  'sm:flex sm:justify-center items-center',
                                  isMobileActive ? 'flex justify-between py-1' : 'hidden sm:flex'
                                )}
                              >
                                <span className="sm:hidden text-[11px] font-mono text-[#6B6B6B]">
                                  {plan.name}:
                                </span>
                                <div>{renderValueCell(feat.values[plan.id])}</div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
