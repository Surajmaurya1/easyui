import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] h-10 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] p-1 flex items-center justify-between pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ x: hovered ? 120 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="w-8 h-8 rounded-lg bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[10px] font-bold shadow"
              >
                {hovered ? '✓' : '→'}
              </motion.div>
              <span className="text-[10px] font-mono text-[#6B6B6B] pr-3">{hovered ? 'Confirmed' : 'Slide to confirm'}</span>
            </div>
          </div>
        );
}
