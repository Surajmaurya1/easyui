import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={hovered ? { rotate: [0, -14, 12, -8, 6, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="relative p-2.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-[#FAFAFA] shadow-md pointer-events-none"
            >
              <Bell className="w-5 h-5 text-[#FAFAFA]" />
              <motion.span
                animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: hovered ? Infinity : 0, duration: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-[#0E0E0E]"
              >
                2
              </motion.span>
            </motion.div>
          </div>
        );
}
