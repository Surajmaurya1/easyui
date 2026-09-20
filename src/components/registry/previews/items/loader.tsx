import { motion } from 'framer-motion';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center gap-4 p-4 pointer-events-none">
            <motion.div
              animate={{ rotate: hovered ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white"
            />
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ scale: hovered ? [0.8, 1.3, 0.8] : 1, opacity: hovered ? [0.4, 1, 0.4] : 0.6 }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        );
}
