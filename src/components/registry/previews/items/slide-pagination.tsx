import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <nav className="inline-flex items-center gap-1" aria-label="Pagination">
              {(() => {
                const active = hovered ? 4 : 2;
                return [1, 2, 3, 4, 5, 6, 7].map((p) => {
                  const isActive = p === active;
                  return (
                    <button
                      key={p}
                      className="relative w-7 h-7 inline-flex items-center justify-center rounded-md text-[11px] font-medium"
                      style={{ color: isActive ? 'var(--bg)' : 'var(--text-secondary)' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="slide-pagination-card-pill"
                          className="absolute inset-0 rounded-md bg-[var(--text-primary)] border border-[var(--text-primary)] shadow-xs"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{p}</span>
                    </button>
                  );
                });
              })()}
            </nav>
          </div>
        );
}
