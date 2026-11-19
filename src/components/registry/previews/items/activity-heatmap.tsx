import { ActivityHeatmap } from '../../../ui/ActivityHeatmap';
import { CHART_DAYS } from '../../../docs/detail/demos/chart-demo-data';
import type { ComponentPreviewProps } from '../types';

export default function ActivityHeatmapPreview(_props: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full items-center justify-center overflow-hidden px-2 py-2 select-none sm:px-4">
      <div className="w-full">
        <ActivityHeatmap data={CHART_DAYS} weeks={30} minCell={9} unit="contributions" />
      </div>
    </div>
  );
}
