import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MagneticButton } from '../../../ui/MagneticButton';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -2 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <MagneticButton variant="primary" size="md">
                <span>Magnetic</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4D4D4]" />
              </MagneticButton>
            </motion.div>
          </div>
        );
}
