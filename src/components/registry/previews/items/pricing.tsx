import { motion } from 'framer-motion';
import { Pricing } from '../../../ui/Pricing';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden select-none">
            <div className="w-[300px] h-[195px] flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ scale: hovered ? 0.38 : 0.36, y: hovered ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="origin-center shrink-0 flex items-center justify-center"
                style={{ width: 720 }}
              >
                <Pricing columns={2} className="w-[720px]" />
              </motion.div>
            </div>
          </div>
        );
}
