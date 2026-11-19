import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Interactive Area Chart',
  description: 'A hand-written, dependency-free interactive SVG area chart with interruptible dataset morphing, Catmull-Rom spline resampling, scrubbing tooltip, and keyboard accessibility.',
  category: 'Feedback',
  featured: true,
  tagline: 'Zero-dependency interactive SVG area chart with range morphing and scrubbing',
  badges: ['SVG', 'Area Chart', 'Data Visualization', 'Interactive'],
  createdAt: '2026-10-13',
  features: [
    'Hand-crafted SVG path generation with zero charting library dependencies',
    'Interruptible dataset morphing transition between date ranges (7D, 30D, 1Y)',
    'Catmull-Rom spline interpolation for smooth curve rendering',
    'Fluid scrubbing with spring-tracked crosshair, dot, and floating tooltip',
    'Full keyboard scrubbing support using Left and Right arrow keys',
  ],
  props: [
    { name: 'data', type: 'AreaChartData', default: 'DEFAULT_AREA_CHART_DATA', description: 'Dictionary of time-series datasets keyed by range labels (e.g. 7D, 30D, 1Y)' },
    { name: 'defaultRange', type: 'string', default: '"30D"', description: 'Initial active range key' },
    { name: 'title', type: 'string', default: '"Revenue"', description: 'Chart title displayed in header' },
    { name: 'height', type: 'number', default: '280', description: 'Fixed pixel height of the chart SVG area' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS class names' },
  ],
  accessibility: [
    'Accessible role="img" with descriptive dynamic aria-label summarizing range and values',
    'Keyboard navigatable with ArrowLeft and ArrowRight to scrub through data points',
    'Escape key dismisses active hover tooltip and scrubber',
    'ARIA role="tablist" and role="tab" with aria-selected for range selection buttons',
    'Honors prefers-reduced-motion by bypassing initial line draw animation and spring delays',
  ],
  usageCode: `import { InteractiveAreaChart } from "@/components/ui/interactive-area-chart";

export function Demo() {
  return (
    <div className="w-full max-w-2xl p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <InteractiveAreaChart title="Monthly Recurring Revenue" />
    </div>
  );
}`,
};

export default meta;
