import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { InteractiveAreaChart } = DEMO_COMPONENTS;

export const InteractiveAreaChartDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-1 sm:p-4 w-full max-w-2xl">
      <div className="w-full rounded-2xl border border-[var(--border)] bg-card p-3 sm:p-6 shadow-xs">
        <InteractiveAreaChart
          title="Portfolio Valuation"
          height={260}
          defaultRange="30D"
        />
      </div>
    </div>
  );
};

export default InteractiveAreaChartDemo;
