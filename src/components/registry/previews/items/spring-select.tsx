import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="w-full max-w-[220px]">
              <div className="text-[10px] font-medium text-[var(--text-primary)] tracking-tight mb-1.5">Workspace</div>
              <div
                className="relative h-8 px-3 rounded-lg border flex items-center justify-between text-[11px] text-[var(--text-primary)]"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <span className="text-[var(--text-primary)]">Design Team</span>
                <motion.span
                  animate={{ rotate: hovered ? 192 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="text-[var(--text-secondary)]"
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </div>
            </div>
          </div>
        );
}
