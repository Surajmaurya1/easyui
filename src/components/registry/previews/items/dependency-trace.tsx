import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="flex items-center gap-4 pointer-events-none scale-100 sm:scale-100">
              <motion.div animate={{ scale: hovered ? 1.1 : 1 }} className="w-10 h-10 rounded-full bg-[#141414] border border-white text-[9px] font-mono text-white flex items-center justify-center shadow">
                API
              </motion.div>
              <motion.div animate={{ opacity: hovered ? 1 : 0.3 }} className="w-8 h-0.5 bg-white border-t border-dashed" />
              <motion.div animate={{ scale: hovered ? 1.1 : 1 }} className="w-10 h-10 rounded-full bg-[#141414] border border-emerald-400 text-[9px] font-mono text-emerald-400 flex items-center justify-center shadow">
                DB
              </motion.div>
            </div>
          </div>
        );
}
