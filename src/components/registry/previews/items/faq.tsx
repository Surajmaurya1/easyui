import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-lg border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="p-2.5 flex items-center justify-between text-[11px] font-medium text-[#FAFAFA] border-b border-[#1F1F1F]">
                <span>How to use CLI?</span>
                <span className="text-[#6B6B6B] text-[9px]">▲</span>
              </div>
              <div className="p-2 text-[10px] text-[#A1A1A1] bg-[#141414]">
                Run npx shadcn@latest add ...
              </div>
            </motion.div>
          </div>
        );
}
