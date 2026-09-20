import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] relative pointer-events-none scale-100 sm:scale-100">
              <div className="p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] flex items-center gap-2 mb-2 shadow-xs">
                <span className="w-3.5 h-3.5 rounded bg-[#FAFAFA] text-[#050505] text-[8px] flex items-center justify-center font-bold">✓</span>
                <span className="text-[10px] text-[#FAFAFA]">3 items selected</span>
              </div>
              <motion.div
                animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
                className="p-1.5 rounded-xl bg-[#141414] border border-[#1F1F1F] flex justify-between text-[9px] text-[#FAFAFA]"
              >
                <span className="bg-white/10 px-2 py-0.5 rounded">Archive</span>
                <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded">Delete</span>
              </motion.div>
            </div>
          </div>
        );
}
