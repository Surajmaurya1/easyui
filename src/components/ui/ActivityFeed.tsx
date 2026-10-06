'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Shield,
  Zap,
  Server,
  AlertTriangle,
  Radio,
  Search,
  ChevronDown,
  Copy,
  Check,
  RotateCw,
  Terminal,
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export type ActivityEventType = 'deploy' | 'security' | 'api' | 'system' | 'error';
export type ActivityEventStatus = 'success' | 'warning' | 'error' | 'info';

export interface ActivityActor {
  name: string;
  avatar?: string;
  email?: string;
}

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  status: ActivityEventStatus;
  title: string;
  timestamp: string;
  isoTimestamp?: string;
  description?: string;
  actor?: ActivityActor;
  traceId?: string;
  duration?: string;
  payload?: Record<string, any>;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  events: ActivityEvent[];
  enableLiveSimulation?: boolean;
  enableFilters?: boolean;
  enableSearch?: boolean;
  maxEntries?: number;
  onEventReplay?: (event: ActivityEvent) => void;
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  events: initialEvents = [],
  enableLiveSimulation = true,
  enableFilters = true,
  enableSearch = true,
  maxEntries = 20,
  onEventReplay,
  className,
  ...props
}) => {
  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [expandedPayloadIds, setExpandedPayloadIds] = useState<Set<string>>(new Set());
  const [copiedTraceId, setCopiedTraceId] = useState<string | null>(null);

  // Sync if initialEvents change
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  // Live simulation generator
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const mockTypes: ActivityEventType[] = ['deploy', 'api', 'security', 'system'];
      const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
      const randomId = `live-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      let newEvent: ActivityEvent;
      if (randomType === 'deploy') {
        newEvent = {
          id: randomId,
          type: 'deploy',
          status: 'success',
          title: 'Vercel Edge function deployed',
          timestamp: 'Just now',
          description: 'Production branch merged into main. SSL cert auto-renewed.',
          duration: '412ms',
          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,
          actor: { name: 'Bot Pipeline', email: 'ci@easyui.dev' },
          payload: { commit: '7a29e1f', region: 'iad1', buildTimeMs: 1420 },
        };
      } else if (randomType === 'api') {
        newEvent = {
          id: randomId,
          type: 'api',
          status: 'success',
          title: 'POST /v1/auth/session 200 OK',
          timestamp: 'Just now',
          description: 'JWT token rotation completed for client.',
          duration: '18ms',
          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,
          actor: { name: 'User session' },
          payload: { method: 'POST', status: 200, ip: '192.168.1.1' },
        };
      } else {
        newEvent = {
          id: randomId,
          type: randomType,
          status: randomType === 'security' ? 'warning' : 'info',
          title: randomType === 'security' ? 'Rate limit throttle triggered' : 'Cache purged across edge',
          timestamp: 'Just now',
          description: randomType === 'security' ? 'IP exceeded 100 req/s bucket window.' : 'Global CDN stale cache invalidated.',
          duration: '4ms',
          traceId: `trc_${Math.random().toString(36).slice(2, 8)}`,
          payload: { action: 'throttle', limit: 100, window: '60s' },
        };
      }

      setEvents((prev) => [newEvent, ...prev.slice(0, maxEntries - 1)]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveStreaming, maxEntries]);

  const togglePayload = (id: string) => {
    setExpandedPayloadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopyTrace = (e: React.MouseEvent, traceId: string) => {
    e.stopPropagation();
    copyToClipboard(traceId);
    setCopiedTraceId(traceId);
    setTimeout(() => setCopiedTraceId(null), 2000);
  };

  const getTypeIcon = (type: ActivityEventType) => {
    switch (type) {
      case 'deploy':
        return <Rocket className="w-3.5 h-3.5 text-white" />;
      case 'security':
        return <Shield className="w-3.5 h-3.5 text-amber-400" />;
      case 'api':
        return <Zap className="w-3.5 h-3.5 text-sky-400" />;
      case 'system':
        return <Server className="w-3.5 h-3.5 text-emerald-400" />;
      case 'error':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-white" />;
    }
  };

  const getStatusDot = (status: ActivityEventStatus) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-400';
      case 'warning':
        return 'bg-amber-400';
      case 'error':
        return 'bg-rose-400';
      case 'info':
      default:
        return 'bg-sky-400';
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchType = selectedType === 'all' || ev.type === selectedType;
      const matchSearch =
        !searchQuery.trim() ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.description && ev.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.traceId && ev.traceId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.actor?.name && ev.actor.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchType && matchSearch;
    });
  }, [events, selectedType, searchQuery]);

  const categories: Array<{ id: string; label: string; count: number }> = useMemo(() => {
    const counts: Record<string, number> = { all: events.length };
    events.forEach((e) => {
      counts[e.type] = (counts[e.type] || 0) + 1;
    });
    return [
      { id: 'all', label: 'All', count: counts.all || 0 },
      { id: 'deploy', label: 'Deploy', count: counts.deploy || 0 },
      { id: 'security', label: 'Security', count: counts.security || 0 },
      { id: 'api', label: 'API', count: counts.api || 0 },
      { id: 'system', label: 'System', count: counts.system || 0 },
    ];
  }, [events]);

  return (
    <div
      role="region"
      aria-label="Activity and telemetry event feed"
      className={cn(
        'w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] p-3.5 sm:p-5 text-[#FAFAFA]',
        className
      )}
      {...props}
    >
      {/* Feed Top Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#1F1F1F]">
        <div className="flex items-center gap-2">
          {enableSearch && (
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#6B6B6B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trace..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#141414] border border-[#1F1F1F] text-[#FAFAFA] placeholder-[#6B6B6B] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              />
            </div>
          )}
        </div>

        {/* Live Simulation Switch */}
        {enableLiveSimulation && (
          <button
            type="button"
            onClick={() => setIsLiveStreaming((prev) => !prev)}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer',
              isLiveStreaming
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[#141414] border-[#1F1F1F] text-[#6B6B6B] hover:text-white'
            )}
          >
            <Radio
              className={cn(
                'w-3.5 h-3.5',
                isLiveStreaming ? 'animate-pulse text-emerald-400' : 'text-[#6B6B6B]'
              )}
            />
            <span>{isLiveStreaming ? 'Live Stream Active' : 'Start Live Stream'}</span>
          </button>
        )}
      </div>

      {/* Filter Category Tabs */}
      {enableFilters && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedType(cat.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap',
                selectedType === cat.id
                  ? 'bg-[#141414] text-white border border-[#1F1F1F]'
                  : 'bg-[#0E0E0E] text-[#6B6B6B] border border-[#1F1F1F] hover:text-[#A1A1A1] hover:bg-[#141414]'
              )}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>
      )}

      {/* Events List with Framer Motion Layout & Entry Animations */}
      <div className="space-y-2.5 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#6B6B6B] rounded-xl border border-[#1F1F1F] bg-[#141414]">
            No activity events recorded matching filters.
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredEvents.map((ev) => {
              const isPayloadOpen = expandedPayloadIds.has(ev.id);

              return (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={motionTransitions.springSnappy}
                  className="rounded-xl border border-[#1F1F1F] bg-[#141414] hover:border-[#4A4A4A] transition-all overflow-hidden p-3.5"
                >
                  {/* Event Main Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Icon Circle */}
                      <div className="w-8 h-8 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-center shrink-0 mt-0.5">
                        {getTypeIcon(ev.type)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-white truncate">
                            {ev.title}
                          </span>
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full inline-block shrink-0',
                              getStatusDot(ev.status)
                            )}
                          />
                        </div>

                        {ev.description && (
                          <p className="text-[11px] text-[#A1A1A1] line-clamp-1 mb-1.5">
                            {ev.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#6B6B6B]">
                          <span>{ev.timestamp}</span>
                          {ev.duration && (
                            <>
                              <span>•</span>
                              <span>{ev.duration}</span>
                            </>
                          )}
                          {ev.actor && (
                            <>
                              <span>•</span>
                              <span className="text-[#A1A1A1]">{ev.actor.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Trace copy + Payload Expand + Replay */}
                    <div className="flex items-center gap-1 shrink-0">
                      {ev.traceId && (
                        <button
                          type="button"
                          onClick={(e) => handleCopyTrace(e, ev.traceId!)}
                          className="px-2 py-1 rounded bg-[#0E0E0E] hover:bg-[#171717] border border-[#1F1F1F] text-[10px] font-mono text-[#A1A1A1] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Copy Trace ID"
                        >
                          <span>{ev.traceId}</span>
                          {copiedTraceId === ev.traceId ? (
                            <Check className="w-3 h-3 text-white" />
                          ) : (
                            <Copy className="w-3 h-3 text-[#6B6B6B]" />
                          )}
                        </button>
                      )}

                      {onEventReplay && (
                        <button
                          type="button"
                          onClick={() => onEventReplay(ev)}
                          className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-white hover:bg-[#0E0E0E] transition-colors cursor-pointer"
                          title="Replay event"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {ev.payload && (
                        <button
                          type="button"
                          onClick={() => togglePayload(ev.id)}
                          className="p-1 rounded-lg text-[#6B6B6B] hover:text-white hover:bg-[#0E0E0E] transition-colors cursor-pointer"
                          title="Toggle JSON payload"
                        >
                          <motion.div
                            animate={{ rotate: isPayloadOpen ? 180 : 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </motion.div>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expandable JSON Inspector */}
                  <AnimatePresence>
                    {isPayloadOpen && ev.payload && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={motionTransitions.springGentle}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#1F1F1F]">
                          <div className="flex items-center justify-between mb-1 text-[10px] font-mono text-[#6B6B6B]">
                            <span>PAYLOAD SNAPSHOT (JSON)</span>
                            <button
                              type="button"
                              onClick={(e) =>
                                handleCopyTrace(e, JSON.stringify(ev.payload, null, 2))
                              }
                              className="text-[#A1A1A1] hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy JSON</span>
                            </button>
                          </div>
                          <pre className="p-3 rounded-lg bg-[#050505] border border-[#1F1F1F] font-mono text-[11px] text-[#A1A1A1] overflow-x-auto leading-relaxed">
                            <code>{JSON.stringify(ev.payload, null, 2)}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
