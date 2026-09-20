import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ y: hovered ? -2 : 0 }}
                className="p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] flex justify-between text-[10px] text-white font-medium shadow-xs"
              >
                <span>Edge Runtime v2</span>
                <span>▾</span>
              </motion.div>
              <motion.div
                animate={{ y: hovered ? 2 : 0, opacity: hovered ? 0.8 : 0.4 }}
                className="p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] flex justify-between text-[10px] text-[#6B6B6B]"
              >
                <span>Binary Protocol</span>
                <span>▾</span>
              </motion.div>
            </div>
          </div>
        );
}
