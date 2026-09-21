import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';
import { motionTransitions } from '../../../../lib/motion-tokens';

export default function ChatPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-full flex items-center justify-center p-3 select-none w-full">
      <motion.div
        animate={{
          y: isHovered ? -2 : 0,
          borderColor: isHovered ? 'var(--border-hover)' : 'var(--border)',
        }}
        transition={motionTransitions.springSnappy}
        className="w-full max-w-[280px] rounded-xl border border-border bg-surface p-3 shadow-xs space-y-2.5 font-sans"
      >
        {/* User Message */}
        <div className="flex items-start justify-end gap-1.5">
          <div className="rounded-xl rounded-tr-none bg-surface-raised border border-border px-2.5 py-1.5 text-[11px] text-text-primary max-w-[200px] shadow-xs">
            How do I add EasyUI components?
          </div>
          <div className="w-5 h-5 rounded-md bg-surface-raised border border-border flex items-center justify-center text-text-primary shrink-0">
            <User className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Assistant Response */}
        <div className="flex items-start gap-1.5">
          <div className="w-5 h-5 rounded-md bg-surface border border-border flex items-center justify-center text-text-primary shrink-0">
            <Bot className="w-2.5 h-2.5" />
          </div>
          <div className="rounded-xl rounded-tl-none bg-surface border border-border px-2.5 py-1.5 text-[11px] text-text-secondary max-w-[210px] space-y-1 shadow-xs">
            <p>Run the shadcn CLI registry command:</p>
            <div className="p-1 rounded bg-surface-raised border border-border font-mono text-[9px] text-text-primary truncate">
              npx shadcn add easyui/button
            </div>
          </div>
        </div>

        {/* Mini Composer */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-border/60">
          <div className="flex-1 rounded-lg border border-border bg-surface-raised px-2 py-1 text-[10px] text-text-muted">
            Ask something...
          </div>
          <div className="w-6 h-6 rounded-lg bg-text-primary text-background flex items-center justify-center">
            <Send className="w-2.5 h-2.5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
