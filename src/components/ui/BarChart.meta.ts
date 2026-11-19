import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Bar Chart',
  description: 'A hand-written, dependency-free SVG bar chart with grouped and stacked layouts, morphing bar transitions, interactive legend toggles, and accessible hover and keyboard tooltips.',
  category: 'Feedback',
  tagline: 'Animated grouped and stacked SVG bar chart with legend filtering',
  badges: ['SVG', 'Bar Chart', 'Data Visualization', 'Interactive'],
  createdAt: '2026-10-23',
  features: [
    'Grouped and stacked layouts with interruptible, morphing bar transitions',
    'Zero charting library dependencies — every bar is generated with hand-written SVG paths',
    'Interactive legend that toggles series on and off while keeping at least one visible',
    'Floating tooltip tracks the hovered category and shows per-series values and totals',
    'Container-aware sizing with a ResizeObserver so the chart fits cards on mobile',
    'Screen-reader table and keyboard navigation with arrow keys, Home, End, and Escape',
    'Honors prefers-reduced-motion by disabling entrance and layout animations',
  ],
  props: [
    { name: 'data', type: 'BarDatum[]', description: 'Categories to render; each row needs a label plus one numeric key per series' },
    { name: 'series', type: 'BarSeries[]', description: 'Series definitions with a data key, display label, and optional color' },
    { name: 'variant', type: '"grouped" | "stacked"', default: '"grouped"', description: 'Places bars side by side or stacks them on top of each other' },
    { name: 'height', type: 'number', default: '260', description: 'Height of the chart area in pixels' },
    { name: 'formatValue', type: '(n: number) => string', default: 'Intl.NumberFormat', description: 'Formats values shown in tooltips and the accessible data table' },
    { name: 'formatTick', type: '(n: number) => string', default: 'compact Intl.NumberFormat', description: 'Formats the y-axis tick labels' },
    { name: 'showLegend', type: 'boolean', default: 'true', description: 'Shows the interactive series legend when more than one series exists' },
    { name: 'animated', type: 'boolean', default: 'true', description: 'Enables entrance and bar morph animations (disabled for reduced motion)' },
    { name: 'ariaLabel', type: 'string', default: 'auto-generated', description: 'Accessible description for the chart image role' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the chart wrapper' },
  ],
  accessibility: [
    'The SVG exposes role="img" with a descriptive aria-label derived from the series and category count',
    'ArrowLeft and ArrowRight move the active category, Home and End jump to the first or last, and Escape dismisses the tooltip',
    'A visually hidden data table mirrors every category and series value for screen readers',
    'Legend buttons use aria-pressed to communicate the visible state of each series',
    'Tooltips are aria-hidden because the same information is available through the data table and focus interactions',
    'prefers-reduced-motion disables entrance, morph, and hover-band transitions',
  ],
  usageCode: `import { BarChart } from "@/components/ui/bar-chart";

const data = [
  { label: "Jan", web: 2400, mobile: 1700 },
  { label: "Feb", web: 2800, mobile: 1950 },
  { label: "Mar", web: 3150, mobile: 2120 },
];

const series = [
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
];

export function Demo() {
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-5 dark:bg-neutral-950">
      <BarChart data={data} series={series} variant="grouped" height={260} />
    </div>
  );
}`,
};

export default meta;
