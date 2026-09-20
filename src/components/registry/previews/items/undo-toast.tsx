import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0 }}
              className="w-full max-w-[250px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-[#FAFAFA]">Project archived</span>
                <span className="px-2 py-0.5 rounded bg-[#FAFAFA] text-[#050505] text-[9px] font-medium">Undo</span>
              </div>
              <div className="h-0.5 w-full bg-[#141414] rounded-full overflow-hidden">
                <motion.div animate={{ width: hovered ? '10%' : '75%' }} transition={{ duration: 1.5 }} className="h-full bg-white/70" />
              </div>
            </motion.div>
          </div>
        );
}
