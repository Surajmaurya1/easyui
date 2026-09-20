import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div animate={{ y: hovered ? -1 : 0 }} className="p-2 rounded-lg bg-[#0E0E0E] border border-emerald-500/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-[#FAFAFA] font-medium">Head v3</span>
                </div>
                <span className="text-[9px] font-mono text-[#6B6B6B]">Just now</span>
              </motion.div>
              <div className="p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] flex items-center justify-between text-[#6B6B6B] text-[10px]">
                <span>Snapshot v2</span>
                <span className="text-[9px] text-[#FAFAFA] bg-white/10 px-1.5 py-0.5 rounded">Revert</span>
              </div>
            </div>
          </div>
        );
}
