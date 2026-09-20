import { motion } from 'framer-motion';
import { NotificationStack } from '../../../ui/NotificationStack';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ y: hovered ? -4 : 0 }}>
              <NotificationStack maxVisible={2} />
            </motion.div>
          </div>
        );
}
