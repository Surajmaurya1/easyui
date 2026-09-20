import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ rotate: hovered ? 180 : 45 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-[#0E0E0E] border-2 border-[#1F1F1F] relative flex items-center justify-center shadow-lg pointer-events-none"
            >
              <span className="absolute top-1.5 w-1 h-3 rounded-full bg-white" />
              <div className="w-4 h-4 rounded-full bg-[#141414] border border-white/10" />
            </motion.div>
          </div>
        );
}
