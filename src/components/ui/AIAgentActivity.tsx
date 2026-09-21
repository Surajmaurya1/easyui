import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Check,
  RotateCw,
  AlertCircle,
  Pause,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// =============================================================================
// DESIGN SYSTEM CONSTANTS & SPRING TOKENS
// =============================================================================

const SPRING_PHYSICS = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 32,
  mass: 0.6,
};

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type ActivityType =
  | 'thinking'
  | 'searching'
  | 'reading'
  | 'writing'
  | 'tool_execution'
  | 'api_request'
  | 'database_query'
  | 'code_execution'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type ActivityStatus = 'pending' | 'running' | 'success' | 'error' | 'cancelled';

export interface AgentActivityItemData {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  status: ActivityStatus;
  duration?: string;
  timestamp?: string;
  metadata?: Record<string, any>;
  details?: {
    input?: string | Record<string, any>;
    output?: string | Record<string, any>;
    codeSnippet?: string;
    language?: string;
  };
}

export interface AgentActivityContextValue {
  activities: AgentActivityItemData[];
  isRunning?: boolean;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  accentColor?: string;
}

const AgentActivityContext = createContext<AgentActivityContextValue | null>(null);

export function useAgentActivity() {
  const ctx = useContext(AgentActivityContext);
  if (!ctx) {
    throw new Error('AgentActivity compound subcomponents must be used within <AgentActivity>');
  }
  return ctx;
}

// =============================================================================
// HELPER: TYPE & STATUS ICONS (MINIMALIST & REFINED)
// =============================================================================

export function getActivityIcon(_type: ActivityType, status: ActivityStatus): React.ReactNode {
  if (status === 'running') {
    return <RotateCw className="w-3 h-3 animate-spin text-foreground stroke-[2]" />;
  }
  if (status === 'error') {
    return <AlertCircle className="w-3.5 h-3.5 text-rose-500 stroke-[2]" />;
  }
  if (status === 'cancelled') {
    return <Pause className="w-3 h-3 text-muted-foreground stroke-[2]" />;
  }
  if (status === 'success') {
    return <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />;
  }

  // Pending / default: clean minimal point
  return <div className="w-1.5 h-1.5 rounded-full bg-border" />;
}

// =============================================================================
// SUB-COMPONENTS (MINIMALIST, SPATIOUS, GEIST TYPOGRAPHY)
// =============================================================================

export interface AgentActivityHeaderProps {
  title?: string;
  agentName?: string;
  showControls?: boolean;
  className?: string;
}

export const AgentActivityHeader: React.FC<AgentActivityHeaderProps> = ({
  title = 'Activity',
  agentName,
  showControls = true,
  className,
}) => {
  const { activities, isRunning, expandAll, collapseAll } = useAgentActivity();
  const completedCount = activities.filter((a) => a.status === 'success').length;

  return (
    <div
      className={cn(
        'px-4 py-3.5 sm:px-8 sm:py-5 border-b border-border/60 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4 select-none',
        className
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <h3 className="text-sm font-medium text-foreground tracking-tight truncate">
            {title}
          </h3>
          {agentName && (
            <span className="text-xs text-muted-foreground font-normal truncate">
              — {agentName}
            </span>
          )}
        </div>

        <span className="w-1 h-1 rounded-full bg-border shrink-0 hidden sm:inline-block" />

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Running
            </span>
          ) : (
            <span>
              {completedCount} of {activities.length} completed
            </span>
          )}
        </div>
      </div>

      {showControls && (
        <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-muted-foreground font-normal shrink-0 ml-auto sm:ml-0">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Expand all
          </button>
          <span className="text-border/80">/</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-foreground transition-colors cursor-pointer py-1"
          >
            Collapse all
          </button>
        </div>
      )}
    </div>
  );
};

export interface AgentActivityItemProps {
  activity: AgentActivityItemData;
  isLast?: boolean;
  className?: string;
}

export const AgentActivityItem: React.FC<AgentActivityItemProps> = ({
  activity,
  isLast = false,
  className,
}) => {
  const { expandedIds, toggleExpand } = useAgentActivity();
  const isExpanded = expandedIds.has(activity.id);
  const hasDetails = Boolean(activity.details || activity.metadata);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('relative flex items-start gap-3 sm:gap-4 group', className)}>
      {/* Subtle timeline connector line */}
      {!isLast && (
        <div className="absolute left-[9px] sm:left-[11px] top-6 bottom-[-20px] w-px bg-border/50 group-last:hidden" />
      )}

      {/* Minimal state indicator */}
      <div className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 mt-0.5">
        <div
          className={cn(
            'w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all',
            activity.status === 'running'
              ? 'bg-surface border border-border ring-2 ring-emerald-500/20'
              : activity.status === 'success'
              ? 'bg-emerald-500/10 dark:bg-emerald-500/15'
              : activity.status === 'error'
              ? 'bg-rose-500/10 dark:bg-rose-500/20'
              : 'bg-surface border border-border/80'
          )}
        >
          {getActivityIcon(activity.type, activity.status)}
        </div>
      </div>

      {/* Item Body */}
      <div className="flex-1 min-w-0 pb-4 sm:pb-5">
        <div
          onClick={() => hasDetails && toggleExpand(activity.id)}
          className={cn(
            'select-none transition-colors',
            hasDetails && 'cursor-pointer group/row'
          )}
        >
          {/* Title and metadata row */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={cn(
                  'text-xs sm:text-sm tracking-tight transition-colors truncate',
                  activity.status === 'running'
                    ? 'font-medium text-foreground'
                    : 'font-normal text-foreground/90 group-hover/row:text-foreground'
                )}
              >
                {activity.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground tabular-nums">
              {activity.duration && <span>{activity.duration}</span>}
              {hasDetails && (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_PHYSICS}
                  className="text-muted-foreground/60 group-hover/row:text-foreground transition-colors"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Optional concise description */}
          {activity.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              {activity.description}
            </p>
          )}
        </div>

        {/* Expandable Details Drawer */}
        <AnimatePresence>
          {hasDetails && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_PHYSICS}
              className="overflow-hidden mt-3 pt-3 pl-3 sm:pl-3.5 border-l border-border/60 space-y-3 font-sans text-xs"
            >
              {/* Input parameters */}
              {activity.details?.input && (
                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-muted-foreground">
                    Parameters
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-surface-raised/50 dark:bg-surface-raised/20 border border-border/40 text-foreground text-xs leading-relaxed overflow-x-auto select-text">
                    {typeof activity.details.input === 'string'
                      ? activity.details.input
                      : JSON.stringify(activity.details.input, null, 2)}
                  </div>
                </div>
              )}

              {/* Code snippet */}
              {activity.details?.codeSnippet && (
                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {activity.details.language || 'Code'}
                  </div>
                  <pre className="p-2.5 sm:p-3 rounded-lg bg-surface-raised/50 dark:bg-surface-raised/20 border border-border/40 text-foreground text-xs leading-relaxed overflow-x-auto select-text font-sans">
                    <code>{activity.details.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Output Result */}
              {activity.details?.output && (
                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-muted-foreground">
                    Output Result
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-surface-raised/50 dark:bg-surface-raised/20 border border-border/40 text-muted-foreground text-xs leading-relaxed overflow-x-auto select-text">
                    {typeof activity.details.output === 'string'
                      ? activity.details.output
                      : JSON.stringify(activity.details.output, null, 2)}
                  </div>
                </div>
              )}

              {/* Metadata */}
              {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 text-xs text-muted-foreground">
                  {Object.entries(activity.metadata).map(([key, val]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-raised/50 border border-border/40 text-[11px]"
                    >
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="text-foreground font-medium">{String(val)}</span>
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export interface AgentActivityTimelineProps {
  className?: string;
}

export const AgentActivityTimeline: React.FC<AgentActivityTimelineProps> = ({ className }) => {
  const { activities } = useAgentActivity();

  if (activities.length === 0) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground font-normal">
        No activity recorded
      </div>
    );
  }

  return (
    <div className={cn('px-4 sm:px-8 py-4 sm:py-7 space-y-2', className)}>
      {activities.map((activity, index) => (
        <AgentActivityItem
          key={activity.id}
          activity={activity}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
};

// =============================================================================
// ROOT COMPOUND COMPONENT & STANDALONE
// =============================================================================

export interface AIAgentActivityProps {
  activities: AgentActivityItemData[];
  isRunning?: boolean;
  title?: string;
  agentName?: string;
  accentColor?: string;
  defaultExpandedIds?: string[];
  className?: string;
  children?: React.ReactNode;
}

export const AIAgentActivity: React.FC<AIAgentActivityProps> = ({
  activities = [],
  isRunning = false,
  title,
  agentName,
  accentColor,
  defaultExpandedIds = [],
  className,
  children,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(activities.map((a) => a.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const contextValue: AgentActivityContextValue = {
    activities,
    isRunning,
    expandedIds,
    toggleExpand,
    expandAll,
    collapseAll,
    accentColor,
  };

  return (
    <AgentActivityContext.Provider value={contextValue}>
      <div
        style={{
          fontFamily: "var(--font-sans, 'Geist', sans-serif)",
          ...(accentColor ? ({ '--accent-custom': accentColor } as React.CSSProperties) : {}),
        }}
        className={cn(
          'w-full font-sans rounded-2xl border border-border/70 bg-surface/50 dark:bg-surface/25 text-foreground overflow-hidden transition-colors',
          className
        )}
      >
        {children || (
          <>
            <AgentActivityHeader title={title} agentName={agentName} />
            <AgentActivityTimeline />
          </>
        )}
      </div>
    </AgentActivityContext.Provider>
  );
};
