import { motion } from 'framer-motion';
import { StatCard } from '../../../ui/StatCard';
import { fullFmt } from '../../../../lib/chart-primitives';
import { DASHBOARD_DAYS, DASHBOARD_REVENUE } from '../../../docs/detail/demos/chart-demo-data';
import type { ComponentPreviewProps } from '../types';

const money = (n: number) => `$${fullFmt.format(Math.round(n))}`;

export default function StatCardPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full items-center justify-center overflow-hidden px-3 py-2 select-none">
      <motion.div
        animate={{ scale: isHovered ? 1.025 : 1 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="pointer-events-none w-full max-w-[300px] origin-center"
      >
        <StatCard
          label="Revenue"
          value={DASHBOARD_REVENUE[13]}
          previous={DASHBOARD_REVENUE[0]}
          trend={DASHBOARD_REVENUE}
          trendLabels={DASHBOARD_DAYS}
          format={money}
          period="Last 14 days"
          color="#6d7cff"
        />
      </motion.div>
    </div>
  );
}
