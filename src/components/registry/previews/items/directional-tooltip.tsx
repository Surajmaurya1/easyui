import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="relative">
              <span className="px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] text-[var(--text-primary)]">
                Save
              </span>
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? 1 : 0.94,
                  y: hovered ? -8 : 0,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[10px] text-[var(--text-primary)] whitespace-nowrap shadow-md"
              >
                Save your changes
                <span
                  className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 border-4 border-l-transparent border-r-transparent border-b-transparent"
                  style={{ borderTopColor: 'var(--border)' }}
                />
              </motion.div>
            </div>
          </div>
        );
}
