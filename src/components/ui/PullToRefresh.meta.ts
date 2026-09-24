import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Pull to Refresh',
  description: 'A physical pull-to-refresh component and container featuring realistic elastic resistance curves, smooth cubic bezier line chart visualization with interactive point scrubbing, high/low metrics, and seamless light & dark mode compatibility.',
  category: 'Feedback',
  tagline: 'Elastic pull gesture with smooth interactive line charts and async lifecycle feedback',
  badges: ['Gesture Physics', 'Interactive Chart', 'Light & Dark', 'Touch & Pointer'],
  createdAt: '2026-09-24',
  features: [
    'Seamless Light and Dark mode theming with tuned contrast and crisp aesthetics',
    'Physical logarithmic spring resistance matching iOS and native touch physics',
    'Interactive pointer and touch chart scrubbing with realtime price and timestamp tracking',
    'Integrated financial statistics card with smooth bezier curve line chart, area fill, and endpoint glow',
    'Minimal key metrics summary row (24h High, 24h Low, Volume)',
    'Reactive time range switching (1H, 4H, 1D) with spring morph pill indicators',
    'Full async lifecycle support (idle, pulling, ready, refreshing, complete)',
    'Keyboard accessible refresh triggers (Press R or Enter) and screen reader support',
  ],
  props: [
    { name: 'onRefresh', type: '() => Promise<void> | void', default: 'undefined', description: 'Async or sync callback executed when released beyond threshold' },
    { name: 'threshold', type: 'number', default: '68', description: 'Downward travel distance in pixels required to trigger refresh' },
    { name: 'maxPull', type: 'number', default: '110', description: 'Maximum drag distance limit' },
    { name: 'resistance', type: 'number', default: '0.45', description: 'Elastic resistance multiplier' },
    { name: 'refreshingHoldOffset', type: 'number', default: '48', description: 'Vertical offset to hold content at while refresh resolves' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables gesture interaction' },
    { name: 'showDefaultIndicator', type: 'boolean', default: 'true', description: 'Show the built-in minimal circular progress indicator' },
    { name: 'children', type: 'React.ReactNode', default: '<FinancialStatsCard />', description: 'Custom child content to be pulled' },
  ],
  accessibility: [
    'Accessible role="region" with aria-busy and aria-label attributes',
    'Full keyboard support with R key shortcut when focused',
    'Screen reader accessible hidden refresh button fallback',
    'Honors prefers-reduced-motion media query',
  ],
  usageCode: `import { PullToRefresh, FinancialStatsCard } from "@/components/ui/pull-to-refresh";

export function Demo() {
  return (
    <PullToRefresh
      onRefresh={async () => {
        await new Promise((res) => setTimeout(res, 1200));
      }}
    >
      <FinancialStatsCard showMetrics showActions />
    </PullToRefresh>
  );
}`,
};

export default meta;

