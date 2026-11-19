import { motion } from 'framer-motion';
import { InteractiveAreaChart } from '../../../ui/InteractiveAreaChart';
import type { ComponentPreviewProps } from '../types';

export default function InteractiveAreaChartPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-52 w-full flex flex-col justify-center px-4 py-2 select-none">
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        <InteractiveAreaChart
          title=""
          height={140}
          defaultRange="30D"
        />
      </motion.div>
    </div>
  );
}
