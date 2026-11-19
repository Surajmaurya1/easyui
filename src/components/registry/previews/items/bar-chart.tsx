import { motion } from 'framer-motion';
import { BarChart } from '../../../ui/BarChart';
import { fullFmt } from '../../../../lib/chart-primitives';
import { CHART_BARS, CHART_SERIES } from '../../../docs/detail/demos/chart-demo-data';
import type { ComponentPreviewProps } from '../types';

const PREVIEW_DATA = CHART_BARS.slice(0, 6);

export default function BarChartPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full items-center justify-center overflow-hidden px-2 py-2 select-none sm:px-4">
      <motion.div
        animate={{ scale: isHovered ? 1.015 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full origin-center"
      >
        <BarChart
          data={PREVIEW_DATA}
          series={CHART_SERIES}
          variant="grouped"
          height={176}
          showLegend={false}
          formatValue={(n) => `${fullFmt.format(n)} req`}
          ariaLabel="Monthly requests by platform"
        />
      </motion.div>
    </div>
  );
}
