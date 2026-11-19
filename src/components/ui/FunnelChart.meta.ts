import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Funnel Chart',
  description:
    'A conversion funnel with per-stage widths, curved drop-off bridges, and a loss chip between every stage. An optional summary line reports overall conversion and the single biggest drop-off, all in hand-written SVG.',
  category: 'Feedback',
  tagline: 'Conversion funnel with per-stage drop-off and a loss summary',
  badges: ['SVG', 'Funnel Chart', 'Data Visualization', 'Conversion', 'Interactive'],
  createdAt: '2026-10-23',
  features: [
    'Proportional stage bars with rounded ends and a color ramp from first to last stage',
    'Curved bridges show the users lost between each pair of stages',
    'Drop-off chips sit between stages and highlight the hovered step',
    'Summary line reports overall conversion and the biggest single drop-off',
    'Floating tooltip shows users, percentage of the top stage, and the next loss',
    'Container-aware sizing keeps labels and values readable on mobile',
    'Keyboard navigation with ArrowUp, ArrowDown, and Escape',
    'Screen-reader table mirrors every stage value and percentage',
    'prefers-reduced-motion disables bridge and bar entrance animations',
  ],
  props: [
    { name: 'stages', type: 'FunnelStage[]', description: 'Ordered stages with a label, value, and optional color' },
    { name: 'formatValue', type: '(n: number) => string', default: 'Intl.NumberFormat', description: 'Formats stage values in the chart, tooltip, and data table' },
    { name: 'showSummary', type: 'boolean', default: 'true', description: 'Shows overall conversion and the biggest drop-off above the funnel' },
    { name: 'animated', type: 'boolean', default: 'true', description: 'Enables bridge, bar, and chip entrance animations' },
    { name: 'ariaLabel', type: 'string', default: 'auto-generated', description: 'Accessible chart description and data table caption' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the funnel wrapper' },
  ],
  accessibility: [
    'The SVG exposes role="img" with a descriptive aria-label listing the first and last stages',
    'ArrowUp and ArrowDown move between stages and Escape dismisses the tooltip',
    'A visually hidden data table mirrors every stage, value, and percentage of the top stage',
    'Drop-off chips combine the percentage with the stage labels they sit between',
    'prefers-reduced-motion disables the bridge, bar, and chip entrance animations',
  ],
  usageCode: `import { FunnelChart } from "@/components/ui/funnel-chart";

const stages = [
  { label: "Visited site", value: 48200 },
  { label: "Signed up", value: 15840 },
  { label: "Created project", value: 9120 },
  { label: "Started paid plan", value: 1380 },
];

export function Demo() {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-5 dark:bg-neutral-950">
      <FunnelChart stages={stages} />
    </div>
  );
}`,
};

export default meta;
