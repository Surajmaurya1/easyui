import { motion } from 'framer-motion';
import { Check, RotateCw } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

export default function AIAgentActivityPreview({ isHovered = false }: ComponentPreviewProps) {
  const steps = [
    { title: 'Search documentation', status: 'success', duration: '1.2s' },
    { title: 'Query component catalog', status: 'success', duration: '48ms' },
    { title: 'Generate solution', status: 'running', duration: 'Active' },
  ];

  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="h-full flex items-center justify-center p-4 select-none w-full font-sans"
    >
      <motion.div
        animate={{
          y: isHovered ? -2 : 0,
          borderColor: isHovered ? 'var(--border-hover)' : 'var(--border)',
        }}
        transition={motionTransitions.springSnappy}
        className="w-full max-w-[280px] rounded-xl border border-border/70 bg-surface/40 p-4 space-y-3 font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
          <span className="text-xs font-medium text-foreground tracking-tight">Activity</span>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            3 steps
          </span>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-2.5 relative pt-1">
          <div className="absolute left-[9px] top-3 bottom-3 w-px bg-border/40" />
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs relative z-10">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  s.status === 'running'
                    ? 'bg-surface border border-border ring-2 ring-emerald-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {s.status === 'running' ? (
                  <RotateCw className="w-2.5 h-2.5 animate-spin text-foreground" />
                ) : (
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                )}
              </div>
              <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                <span className="text-xs font-normal text-foreground/90 truncate">
                  {s.title}
                </span>
                <span className="text-[11px] text-muted-foreground tabular-nums shrink-0 font-normal">
                  {s.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
