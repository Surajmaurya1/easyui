import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-1.5 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-[#FAFAFA]">Payment #3948</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">Succeeded</span>
              </div>
              <div className="text-[10px] text-[#6B6B6B]">Alexander Wright · $249.00</div>
            </motion.div>
          </div>
        );
}
