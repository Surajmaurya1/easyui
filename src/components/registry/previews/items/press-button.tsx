import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="flex items-center gap-2.5 pointer-events-none">
              <motion.span
                animate={{ scale: hovered ? 0.96 : 1, y: hovered ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="px-3.5 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium shadow"
              >
                Save changes
              </motion.span>
              <motion.span
                animate={{ scale: hovered ? 0.97 : 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="px-3.5 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-medium"
              >
                Cancel
              </motion.span>
            </div>
          </div>
        );
}
