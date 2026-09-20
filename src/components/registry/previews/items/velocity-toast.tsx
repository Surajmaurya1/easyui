import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-end justify-center p-3 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: hovered ? [22, 0] : 0, opacity: hovered ? 1 : 0.85, scale: hovered ? 1 : 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="w-full max-w-[230px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-emerald-400 text-[12px]">✓</span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-[var(--text-primary)] truncate">File uploaded</div>
                  <div className="text-[9px] text-[var(--text-secondary)] truncate">ready to share</div>
                </div>
              </div>
              <div className="mt-1.5 h-[2px] w-full bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: hovered ? '8%' : '78%' }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-[var(--text-primary)]"
                />
              </div>
            </motion.div>
          </div>
        );
}
