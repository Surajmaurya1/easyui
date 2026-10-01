import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Gooey Menu',
  description: 'A tactile liquid dropdown menu with organic SVG metaball fusion filter and spring-driven extrusion animation.',
  category: 'Navigation',
  featured: true,
  tagline: 'Liquid gooey spring dropdown menu with SVG filter physics',
  badges: ['SVG Filter', 'Framer Motion', 'Metaball', 'Spring Physics'],
  createdAt: '2026-08-31',
  features: [
    'Real-time SVG color-matrix metaball fusion filter creates organic liquid stretch and tear dynamics',
    'Choreographed staggered dropdown items with fast exit transitions',
    'Complete keyboard accessibility (Arrow keys, Enter, Space, Escape) and ARIA listbox semantics',
    'Click-outside listener and controlled/uncontrolled state support',
    'Respects prefers-reduced-motion: automatically disables intense blur filters',
  ],
  props: [
    { name: 'options', type: 'string[]', default: "['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us']", description: 'Array of option labels' },
    { name: 'value', type: 'string', default: 'undefined', description: 'Controlled active selected option' },
    { name: 'defaultValue', type: 'string', default: "options[0]", description: 'Default selected option if uncontrolled' },
    { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open dropdown state' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open dropdown state if uncontrolled' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback fired when open state changes' },
    { name: 'onSelect', type: '(option: string, index: number) => void', default: 'undefined', description: 'Callback fired on option selection' },
    { name: 'width', type: 'number', default: '306', description: 'Pixel width of the menu pill and container' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS class overrides' },
  ],
  accessibility: [
    'role="listbox" with role="option" and aria-selected for assistive technologies',
    'Full keyboard navigation: ArrowUp, ArrowDown, Enter, Space, and Escape',
    'prefers-reduced-motion turns off heavy blur/goo filter for optimal rendering',
  ],
  usageCode: `import { GooeyMenu } from "@/components/ui/gooey-menu";

export function Demo() {
  return (
    <GooeyMenu
      options={["Dashboard", "Analytics", "Settings", "Billing", "Logout"]}
      onSelect={(opt) => console.log("Selected:", opt)}
    />
  );
}`,
};

export default meta;
