import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full max-w-[220px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] text-center pointer-events-none shadow-xs">
              <span className="text-xs text-[#A1A1A1]">Normal Resolution</span>
              <motion.div
                animate={{ x: hovered ? [0, 30, -30, 0] : 0 }}
                transition={{ duration: 3, repeat: hovered ? Infinity : 0 }}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-bold text-white shadow-2xl"
              >
                2x Lens
              </motion.div>
            </div>
          </div>
        );
}
