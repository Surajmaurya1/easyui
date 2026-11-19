import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Activity Heatmap',
  description: 'A GitHub-style contribution calendar and weekday-by-hour activity grid with automatic column fitting, quarterly color levels, hover tooltips, and keyboard navigation.',
  category: 'Feedback',
  tagline: 'Responsive contribution calendar and weekday-by-hour activity grid',
  badges: ['SVG', 'Heatmap', 'Data Visualization', 'Calendar', 'Interactive'],
  createdAt: '2026-10-23',
  features: [
    'Calendar mode renders one cell per day in a GitHub-style contribution grid',
    'Hours mode renders a 7 × 24 weekday-by-hour matrix with crosshair bands',
    'Automatically drops columns on narrow screens so cells never fall below the minimum size',
    'Quartile-based color levels adapt to the actual data distribution',
    'Month and weekday labels collapse intelligently as the container narrows',
    'Summary line reports total activity and the peak day or cell',
    'Tooltip follows the active cell with a spring-tracked position and live region updates',
    'Honors prefers-reduced-motion by removing the staggered cell entrance animation',
  ],
  props: [
    { name: 'mode', type: '"calendar" | "hours"', default: '"calendar"', description: 'One cell per day or a weekday-by-hour grid' },
    { name: 'data', type: 'HeatDay[]', description: 'Calendar data as { date: "YYYY-MM-DD" | Date, value: number } entries' },
    { name: 'matrix', type: 'number[][]', description: 'Hours-mode matrix with 7 rows (weekdays) and 24 columns (hours)' },
    { name: 'rowLabels', type: 'string[]', default: '["Mon", … , "Sun"]', description: 'Row names used in hours mode' },
    { name: 'weeks', type: 'number', default: '53', description: 'Maximum number of weeks to show in calendar mode' },
    { name: 'endDate', type: 'string | Date', description: 'Last day displayed; defaults to the latest date in the data' },
    { name: 'weekStart', type: '0 | 1', default: '0', description: 'First day of the week: 0 for Sunday, 1 for Monday' },
    { name: 'color', type: 'string', default: '"#34d399"', description: 'Base color mixed into the activity levels' },
    { name: 'unit', type: 'string', default: '"contributions"', description: 'Plural noun used in the summary and tooltip' },
    { name: 'minCell', type: 'number', default: '11', description: 'Smallest cell size before calendar columns are dropped' },
    { name: 'animated', type: 'boolean', default: 'true', description: 'Enables the staggered cell entrance animation' },
    { name: 'ariaLabel', type: 'string', default: 'auto-generated', description: 'Accessible description for the heatmap image role' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the heatmap wrapper' },
  ],
  accessibility: [
    'The SVG exposes role="img" with an aria-label that includes the total activity summary',
    'Arrow keys move the active cell, and Escape dismisses the tooltip',
    'A polite live region announces the active cell date and value for screen readers',
    'Every cell carries a descriptive date title used by the floating tooltip',
    'Reduced-motion users skip the staggered cell entrance animation',
  ],
  usageCode: `import { ActivityHeatmap } from "@/components/ui/activity-heatmap";

const data = [
  { date: "2026-10-18", value: 3 },
  { date: "2026-10-19", value: 9 },
  { date: "2026-10-20", value: 5 },
  { date: "2026-10-21", value: 12 },
];

export function Demo() {
  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white p-5 dark:bg-neutral-950">
      <ActivityHeatmap data={data} weekStart={1} unit="contributions" />
    </div>
  );
}`,
};

export default meta;
