import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[260px] p-2 rounded-xl bg-[#0E0E0E]/90 border border-[#1F1F1F] shadow-md flex items-center justify-between pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">E</span>
                <span className="text-[11px] font-semibold text-white">EasyUI</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#6B6B6B]">
                <span className="text-white font-medium bg-[#141414] px-1.5 py-0.5 rounded border border-[#1F1F1F]">Docs</span>
                <span>Blog</span>
              </div>
              <span className="text-[9px] font-medium bg-[#FAFAFA] text-[#050505] px-2 py-0.5 rounded shadow">Launch</span>
            </motion.div>
          </div>
        );
}
