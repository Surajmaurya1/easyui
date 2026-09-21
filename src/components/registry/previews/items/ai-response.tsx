import { motion } from 'framer-motion';
import { Sparkles, Copy, ExternalLink } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

export default function AIResponsePreview({ isHovered = false }: ComponentPreviewProps) {
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
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-foreground/80 stroke-[2]" />
            <span className="text-xs font-medium text-foreground tracking-tight">EasyAI</span>
            <span className="text-[11px] text-muted-foreground font-normal">
              — v2.0
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Streaming
          </span>
        </div>

        {/* Content */}
        <div className="text-xs leading-relaxed text-foreground/80 space-y-2">
          <p>
            Exported physics-based <strong className="text-foreground font-medium">motion tokens</strong>:
          </p>
          <div className="rounded-lg border border-border/50 bg-surface-raised/30 p-2.5 text-xs text-foreground/90 flex items-center justify-between font-sans">
            <span className="truncate">springSnappy (stiffness: 380)</span>
            <Copy className="w-3 h-3 text-muted-foreground shrink-0 ml-2" />
          </div>
        </div>

        {/* Citations & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground font-normal">
          <span className="flex items-center gap-1">
            <span>2 sources</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
          <span className="text-foreground hover:underline cursor-pointer">Copy</span>
        </div>
      </motion.div>
    </div>
  );
}
