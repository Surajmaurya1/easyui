import { motion } from 'framer-motion';
import { ExpandableSearch } from '../../../ui/ExpandableSearch';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ width: hovered ? '100%' : 'auto' }} className="flex justify-center">
              <ExpandableSearch placeholder="Search components..." />
            </motion.div>
          </div>
        );
}
