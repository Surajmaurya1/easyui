import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Earnings',
  description:
    'An earnings summary card that counts up the total, plots a scrubable trend line, and breaks income down by source with a hoverable split bar and a 7D / 30D / 12M period switcher. Light and dark themes, fully responsive.',
  category: 'Feedback',
  tagline: 'Earnings summary card with count-up total, scrubable trend, and source breakdown',
  badges: ['Data Visualization', 'Earnings', 'SVG', 'Split Bar', 'Interactive'],
  createdAt: '2026-11-02',
  features: [
    'Count-up headline total with a direction-aware delta pill against the previous period',
    'Hand-drawn monotone cubic trend line that resamples and morphs smoothly between periods',
    'Pointer, touch, and keyboard scrubbing with a spring-tracked crosshair and per-point labels',
    'Single split bar plus a row per income source, each with a share bar and optional change badge',
    'Hover, tap, or focus a source to promote it to the headline readout and dim the rest',
    'Segmented 7D / 30D / 12M switcher with layout-animated selection and an onPeriodChange callback',
    'Optional next-payout footer with a formatted amount',
    'Intl currency and locale formatting, light and dark themes, and prefers-reduced-motion support',
  ],
  props: [
    { name: 'periods', type: 'EarningsPeriod[]', description: 'Period datasets, each with its trend, optional previous total, and income sources' },
    { name: 'defaultPeriod', type: 'string', default: 'second period when 3+ exist', description: 'ID of the period shown first' },
    { name: 'onPeriodChange', type: '(id: string) => void', default: 'undefined', description: 'Called when the active period changes' },
    { name: 'title', type: 'string', default: "'Earnings'", description: 'Card heading and default readout label' },
    { name: 'currency', type: 'string', default: "'USD'", description: 'ISO currency code passed to Intl.NumberFormat' },
    { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale used for currency formatting' },
    { name: 'payout', type: '{ label?: string; date: string; amount?: number }', default: 'undefined', description: 'Optional footer line for the next payout' },
    { name: 'animated', type: 'boolean', default: 'true', description: 'Counts numbers up and animates the chart on mount; reduced motion always wins' },
    { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the card root' },
    { name: 'EarningsPeriod.id', type: 'string', description: 'Unique period identifier used by the switcher' },
    { name: 'EarningsPeriod.label', type: 'string', description: 'Segmented-control label such as "30D"' },
    { name: 'EarningsPeriod.comparison', type: 'string', description: 'Caption under the delta, e.g. "vs previous 30 days"' },
    { name: 'EarningsPeriod.total', type: 'number', description: 'Headline total; defaults to the sum of the sources' },
    { name: 'EarningsPeriod.previous', type: 'number', description: 'Previous-period total used to compute the delta' },
    { name: 'EarningsPeriod.trend', type: 'number[]', description: 'Earnings per point, ordered oldest to newest' },
    { name: 'EarningsPeriod.trendLabels', type: 'string[]', description: 'Names for each trend point, shown while scrubbing' },
    { name: 'EarningsPeriod.sources', type: 'EarningsSource[]', description: 'Income sources with amount, optional change, color, and icon' },
    { name: 'EarningsSource.id', type: 'string', description: 'Unique source identifier' },
    { name: 'EarningsSource.label', type: 'string', description: 'Source name used in the list and readout' },
    { name: 'EarningsSource.amount', type: 'number', description: 'Amount earned from this source in the period' },
    { name: 'EarningsSource.change', type: 'number', description: 'Percent change versus the previous period' },
    { name: 'EarningsSource.color', type: 'string', description: 'Any CSS color; defaults to a palette entry' },
    { name: 'EarningsSource.icon', type: 'ReactNode', description: 'Optional icon; defaults to a colored initial' },
  ],
  accessibility: [
    'The card is a labelled section with an aria-live readout for totals, sources, and scrubbed points',
    'The trend SVG is focusable and supports ArrowLeft, ArrowRight, and Escape for keyboard scrubbing',
    'Source rows are native buttons with aria-pressed and visible focus rings',
    'A visually hidden table mirrors every source amount and share for screen readers',
    'prefers-reduced-motion disables count-ups, line draw, and spring transitions',
  ],
  usageCode: `import { Earnings, type EarningsPeriod } from "@/components/ui/earnings";

const periods: EarningsPeriod[] = [
  {
    id: "30d",
    label: "30D",
    comparison: "vs previous 30 days",
    previous: 9800,
    trend: [240, 310, 280, 390, 420, 380, 510],
    trendLabels: ["Oct 1", "Oct 6", "Oct 11", "Oct 16", "Oct 21", "Oct 26", "Oct 31"],
    sources: [
      { id: "sponsors", label: "Sponsors", amount: 4200, change: 8.2 },
      { id: "pro", label: "Pro licenses", amount: 3100, change: 14.6 },
      { id: "affiliate", label: "Affiliate", amount: 1250, change: -3.1 },
    ],
  },
];

export function Demo() {
  return (
    <div className="w-full max-w-[520px]">
      <Earnings
        periods={periods}
        payout={{ date: "Nov 5", amount: 1240 }}
        onPeriodChange={(id) => console.log(id)}
      />
    </div>
  );
}`,
};

export default meta;
