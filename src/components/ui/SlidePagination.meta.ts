import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'SlidePagination',
  description: 'A pagination control where the active indicator slides between pages rather than instantly switching. The active background uses shared layoutId so the indicator visibly travels from one item to the next.',
  category: 'Navigation',
  featured: true,
  tagline: 'Active indicator slides between pages',
  badges: ['Shared Layout', 'Indicator Travel', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Active background uses framer-motion shared layoutId for visible travel between pages',
    'Snappy spring (springSnappy) drives the indicator for a precise, physical feel',
    'Configurable siblingCount for windowed page ranges with ellipsis',
    'Optional previous / next controls; disabled at boundaries',
    'Light/dark theme aware — works in both palettes',
  ],
  props: [
    { name: 'pageCount', type: 'number', default: 'undefined', description: 'Total number of pages' },
    { name: 'page', type: 'number', default: 'undefined', description: 'Controlled current page' },
    { name: 'defaultPage', type: 'number', default: '1', description: 'Initial current page (uncontrolled)' },
    { name: 'siblingCount', type: 'number', default: '1', description: 'Visible pages around the current one' },
    { name: 'onChange', type: '(page: number) => void', default: 'undefined', description: 'Page change callback' },
    { name: 'showControls', type: 'boolean', default: 'true', description: 'Show previous / next buttons' },
  ],
  accessibility: [
    'aria-current="page" on the active item; aria-label per page button',
    'Disabled state on prev/next at boundaries',
    'Focus-ring visible on keyboard navigation',
  ],
  usageCode: `import { SlidePagination } from "@/components/ui/slide-pagination";

export function Demo() {
  return (
    <div className="flex items-center justify-center">
      <SlidePagination pageCount={12} defaultPage={5} siblingCount={1} />
    </div>
  );
}`,
};

export default meta;
