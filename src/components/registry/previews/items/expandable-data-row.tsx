import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="p-2.5 flex items-center justify-between border-b border-[#1F1F1F] bg-[#141414]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F1F1F] text-[9px] flex items-center justify-center text-white">AW</span>
                  <span className="text-[11px] font-medium text-[#FAFAFA]">Alex Wright</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">+$2,450</span>
              </div>
              <motion.div animate={{ height: hovered ? 'auto' : '26px' }} className="p-2 bg-[#0E0E0E] text-[9px] font-mono text-[#6B6B6B] flex justify-between">
                <span>Enterprise Plan</span>
                <span>{hovered ? 'Active ✓' : 'Unfolded ▾'}</span>
              </motion.div>
            </motion.div>
          </div>
        );
}
