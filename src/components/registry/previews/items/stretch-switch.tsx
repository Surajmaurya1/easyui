import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="w-full max-w-[220px] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[var(--text-primary)]">Reduce motion</span>
              <div
                className="relative inline-flex h-5 w-9 rounded-full border"
                style={{
                  backgroundColor: hovered ? 'var(--text-primary)' : 'var(--surface)',
                  borderColor: hovered ? 'var(--text-primary)' : 'var(--border)',
                  padding: '0 2px',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                <motion.span
                  animate={{
                    x: hovered ? 18 : 0,
                    scaleX: hovered ? 1.18 : 1,
                    scaleY: hovered ? 0.86 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{ width: 14, height: 14, originY: 0.5 }}
                  className="my-auto rounded-full shadow-xs"
                >
                  <span
                    className="block w-full h-full rounded-full"
                    style={{ backgroundColor: hovered ? 'var(--bg)' : 'var(--text-secondary)' }}
                  />
                </motion.span>
              </div>
            </div>
          </div>
        );
}
