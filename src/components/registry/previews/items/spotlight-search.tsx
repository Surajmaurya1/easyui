import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-md pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] mb-2 border-b border-[#1F1F1F] pb-1.5">
                <span>Search components...</span>
                <span className="text-[9px] font-mono bg-[#141414] px-1 rounded text-white">ESC</span>
              </div>
              <div className="space-y-1">
                <motion.div
                  animate={{ backgroundColor: hovered ? '#141414' : '#0E0E0E' }}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] text-[#FAFAFA] flex justify-between font-medium"
                >
                  <span>Magnetic Button</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
}
