import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="w-full max-w-[240px] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="flex items-center justify-between p-2.5 text-[11px] font-medium text-[var(--text-primary)]">
                <span>Spring physics</span>
                <motion.span
                  animate={{ rotate: hovered ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="text-[var(--text-secondary)]"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {hovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="px-2.5 pb-2.5 pt-0 text-[10px] text-[var(--text-secondary)] leading-relaxed">
                      Spring tokens coordinate chevron, height, and content.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
}
