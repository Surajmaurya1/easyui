import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 h-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--text-primary)]">
                Account
                <motion.span
                  animate={{ rotate: hovered ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="text-[var(--text-secondary)]"
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </span>
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? 1 : 0.96,
                  y: hovered ? 0 : -8,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute top-full left-0 mt-2 w-44 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-elevated)] origin-top-left"
              >
                <div className="px-3 py-1.5 text-[11px] text-[var(--text-primary)] hover:bg-[var(--surface-raised)] rounded-md mx-1">Profile</div>
                <div className="px-3 py-1.5 text-[11px] text-[var(--text-primary)] hover:bg-[var(--surface-raised)] rounded-md mx-1">Preferences</div>
                <div className="px-3 py-1.5 text-[11px] text-rose-400 rounded-md mx-1">Sign out</div>
              </motion.div>
            </div>
          </div>
        );
}
