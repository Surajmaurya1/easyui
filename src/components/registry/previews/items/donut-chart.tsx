import { motion } from 'framer-motion';
import { DonutChart } from '../../../ui/DonutChart';
import { fullFmt } from '../../../../lib/chart-primitives';
import { CHART_DONUT } from '../../../docs/detail/demos/chart-demo-data';
import type { ComponentPreviewProps } from '../types';

export default function DonutChartPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full items-center justify-center overflow-hidden px-3 py-2 select-none">
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[186px] origin-center"
      >
        <DonutChart
          data={CHART_DONUT}
          variant="donut"
          size={186}
          thickness={14}
          centerLabel="Total spend"
          formatValue={(n) => `$${fullFmt.format(n)}`}
          showLegend={false}
          ariaLabel="Spend by service"
        />
      </motion.div>
    </div>
  );
}
