import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="px-4 py-2 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium shadow flex items-center gap-1.5 pointer-events-none scale-100 sm:scale-100"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hovered ? 'Saved ✓' : 'Save Changes'}</span>
            </motion.div>
          </div>
        );
}
