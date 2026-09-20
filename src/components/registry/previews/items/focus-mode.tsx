import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.03 : 1, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-md pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex justify-between text-[11px] font-medium text-[#FAFAFA] mb-1">
                <span>Revenue Focus</span>
                <span className="text-[9px] font-mono text-emerald-400">+18.4%</span>
              </div>
              <span className="text-[9px] font-mono text-[#6B6B6B] block">Press ESC to exit</span>
            </motion.div>
          </div>
        );
}
