import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.05 : 1 }}
              className="p-1.5 rounded-full bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg flex items-center gap-1.5 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="w-7 h-7 rounded-full bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[10px] font-bold">⌘</span>
              <span className="w-7 h-7 rounded-full bg-[#141414] text-[#A1A1A1] flex items-center justify-center text-[10px]">⌥</span>
              <span className="w-7 h-7 rounded-full bg-[#141414] text-[#A1A1A1] flex items-center justify-center text-[10px]">⇧</span>
              <span className="relative w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px]">
                ★
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full text-[8px] flex items-center justify-center text-white">3</span>
              </span>
            </motion.div>
          </div>
        );
}
