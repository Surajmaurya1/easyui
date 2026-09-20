import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="flex items-center gap-2 pointer-events-none scale-100 sm:scale-100">
              <motion.span
                animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -2 : 0 }}
                className="px-3 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium shadow flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Primary
              </motion.span>
              <motion.span
                animate={{ scale: hovered ? 0.98 : 1 }}
                className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-[#FAFAFA] text-xs font-medium"
              >
                Secondary
              </motion.span>
            </div>
          </div>
        );
}
