import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <motion.div
              animate={{ scale: hovered ? [0.94, 1.02, 1] : 1, y: hovered ? 0 : 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[230px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-elevated)]"
            >
              <div className="text-[11px] font-semibold text-[var(--text-primary)]">Confirm archive</div>
              <div className="text-[10px] text-[var(--text-secondary)] mt-1">Content scales and settles</div>
              <div className="mt-2.5 flex justify-end gap-1.5">
                <span className="px-2 py-1 text-[10px] rounded-md text-[var(--text-secondary)]">Cancel</span>
                <span className="px-2 py-1 text-[10px] rounded-md bg-[var(--text-primary)] text-[var(--bg)] font-medium">Archive</span>
              </div>
            </motion.div>
          </div>
        );
}
