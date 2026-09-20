import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4 select-none pointer-events-none">
            <motion.div
              animate={{
                x: hovered ? 2 : 0,
                scale: hovered ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="px-4 py-2 rounded-xl bg-text-primary text-background text-xs font-medium flex items-center gap-2 shadow-xs"
            >
              <span>Start Journey</span>
              <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="text-xs opacity-60"
              >
                →
              </motion.span>
            </motion.div>
          </div>
        );
}
