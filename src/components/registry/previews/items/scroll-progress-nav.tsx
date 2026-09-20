import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="rounded-full bg-[#0E0E0E] border border-[#1F1F1F] shadow-xl p-1 flex items-center gap-1 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#6B6B6B]">01</span>
              <motion.span
                animate={{ backgroundColor: hovered ? '#141414' : '#0E0E0E' }}
                className="px-3 py-1 rounded-full text-[11px] font-medium border border-[#1F1F1F] text-[#FAFAFA] flex items-center gap-1.5 shadow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Features
              </motion.span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#6B6B6B]">03 Docs</span>
            </motion.div>
          </div>
        );
}
