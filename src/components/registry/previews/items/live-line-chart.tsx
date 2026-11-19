import { motion } from 'framer-motion';
import { LiveLineChart } from '../../../ui/LiveLineChart';
import { DASHBOARD_LIVE_INITIAL, DASHBOARD_LIVE_SOURCE } from '../../../docs/detail/demos/chart-demo-data';
import type { ComponentPreviewProps } from '../types';

export default function LiveLineChartPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex min-h-52 w-full items-center justify-center overflow-hidden px-3 py-2 select-none">
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[330px] origin-center"
      >
        <LiveLineChart
          source={DASHBOARD_LIVE_SOURCE}
          initial={DASHBOARD_LIVE_INITIAL}
          unit="req/s"
          height={130}
          ariaLabel="Live requests per second preview"
        />
      </motion.div>
    </div>
  );
}
