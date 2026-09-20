import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -4 : 0 }}
              className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg flex items-center gap-2 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="w-4 h-4 rounded-full bg-[#FAFAFA] text-[#050505] text-[9px] font-bold flex items-center justify-center">3</span>
              <span className="text-[10px] font-medium text-[#FAFAFA]">selected</span>
              <span className="px-2 py-0.5 rounded bg-[#141414] text-[9px] text-[#A1A1A1] border border-[#1F1F1F]">Export</span>
            </motion.div>
          </div>
        );
}
