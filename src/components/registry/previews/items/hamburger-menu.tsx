import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              className="w-12 h-12 rounded-xl bg-[#141414] border border-[#1F1F1F] flex flex-col items-center justify-center gap-1.5 pointer-events-none"
            >
              <motion.span
                animate={{ y: hovered ? 4 : 0, rotate: hovered ? 45 : 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: hovered ? 0 : 1, scaleX: hovered ? 0.2 : 1 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{ y: hovered ? -4 : 0, rotate: hovered ? -45 : 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
            </motion.div>
          </div>
        );
}
