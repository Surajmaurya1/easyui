import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="px-3.5 py-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-xs font-mono text-[#A1A1A1] flex items-center gap-2 transition-colors shadow-xs"
            >
              <span className="text-white font-semibold bg-[#141414] px-1.5 py-0.5 rounded border border-[#1F1F1F]">⌘K</span>
              <span>Global Command Palette</span>
            </motion.div>
          </div>
        );
}
