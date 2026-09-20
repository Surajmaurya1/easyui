import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="px-3.5 py-2 rounded-xl bg-[#FAFAFA] text-[#050505] font-mono text-xs font-semibold flex items-center gap-1 shadow pointer-events-none"
            >
              <span>{hovered ? 'npx easyui add' : 'easyui deploy'}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-1.5 h-3.5 bg-black"
              />
            </motion.div>
          </div>
        );
}
