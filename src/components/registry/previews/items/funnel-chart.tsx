import { motion } from 'framer-motion';
import { FunnelChart } from '../../../ui/FunnelChart';
import { fullFmt } from '../../../../lib/chart-primitives';
import type { ComponentPreviewProps } from '../types';

const PREVIEW_STAGES = [
  { label: 'Visited site', value: 48200 },
  { label: 'Signed up', value: 15840 },
  { label: 'Started paid', value: 1380 },
];

export default function FunnelChartPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-60 w-full items-center justify-center overflow-hidden px-2 py-2 select-none sm:px-4">
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[320px] origin-center"
      >
        <FunnelChart
          stages={PREVIEW_STAGES}
          formatValue={(n: number) => fullFmt.format(n)}
          showSummary={false}
          ariaLabel="Signup funnel preview: visited site, signed up, started paid"
        />
      </motion.div>
    </div>
  );
}
