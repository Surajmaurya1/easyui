import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4" style={{ perspective: '600px' }}>
            <div className="relative w-40 h-24 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                animate={{ z: hovered ? -60 : -40, opacity: hovered ? 0.3 : 0.4 }}
                className="absolute w-32 h-16 rounded-xl bg-[#141414] border border-white/5"
              />
              <motion.div
                animate={{ z: hovered ? -30 : -20, opacity: hovered ? 0.6 : 0.7 }}
                className="absolute w-36 h-18 rounded-xl bg-[#0E0E0E] border border-white/10"
              />
              <motion.div
                animate={{ z: 0, rotateY: hovered ? 10 : 0 }}
                className="absolute w-40 h-20 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-xl p-2.5 flex flex-col justify-between"
              >
                <span className="text-[10px] font-semibold text-white">Spatial Layer</span>
                <span className="text-[8px] font-mono text-emerald-400">translateZ depth</span>
              </motion.div>
            </div>
          </div>
        );
}
