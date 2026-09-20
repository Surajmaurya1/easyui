import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="text-[11px] font-semibold text-[#FAFAFA]">Welcome back</div>
              <div className="h-6 px-2 rounded-md bg-[#141414] border border-[#1F1F1F] text-[10px] text-[#6B6B6B] flex items-center">
                <span>••••••••••••</span>
              </div>
              <motion.div
                animate={{ scale: hovered ? 1.02 : 1 }}
                className="h-6 rounded-md bg-[#FAFAFA] text-[#050505] text-[10px] font-medium flex items-center justify-center shadow"
              >
                Sign In →
              </motion.div>
            </motion.div>
          </div>
        );
}
