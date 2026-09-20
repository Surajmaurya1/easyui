import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="w-full max-w-[220px] space-y-3">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{
                    scale: hovered ? [0.9, 1.04, 1] : 1,
                    backgroundColor: hovered ? 'var(--text-primary)' : 'var(--surface)',
                    borderColor: hovered ? 'var(--text-primary)' : 'var(--border)',
                  }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="w-4 h-4 rounded-[4px] border flex items-center justify-center"
                >
                  {hovered && (
                    <motion.svg
                      viewBox="0 0 16 16"
                      width="10"
                      height="10"
                      fill="none"
                      stroke="var(--bg)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, scale: 0.6 }}
                      animate={{ pathLength: 1, scale: [0.6, 1.18, 1] }}
                      transition={{
                        pathLength: { duration: 0.28, ease: [0.65, 0, 0.35, 1] },
                        scale: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                      }}
                    >
                      <motion.path
                        d="M3.5 8.5 L6.5 11.5 L12.5 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                      />
                    </motion.svg>
                  )}
                </motion.div>
                <span className="text-[11px] font-medium text-[var(--text-primary)]">Product updates</span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] pl-7">Checkmark draws and overshoots</div>
            </div>
          </div>
        );
}
