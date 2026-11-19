import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Morphing Mega Menu',
  description: 'A Stripe-inspired mega menu with a single continuous morphing panel that smoothly adapts its size, position, and arrow to any trigger.',
  category: 'Navigation',
  tagline: 'Stripe-style morphing navigation panel with spring physics and cursor tracking',
  badges: ['Mega Menu', 'Morphing Panel', 'Spring Physics', 'Keyboard Nav'],
  createdAt: '2026-10-13',
  features: [
    'Single morphing surface that smoothly animates width, height, and x-position',
    'Spring-tracked arrow indicator following pointer movement along the navigation triggers',
    'ResizeObserver-driven dimension calculation for arbitrary nested menus',
    'Full keyboard accessibility including ArrowDown direct content traversal and Esc dismissal',
    'Graceful touch outside-press dismissal and reduced motion awareness',
  ],
  props: [
    { name: 'items', type: 'MegaMenuItem[]', default: 'DEFAULT_MEGA_MENU_ITEMS', description: 'Array of menu items with optional custom content panels' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS class overrides for root wrapper' },
  ],
  accessibility: [
    'Uses semantic nav and button elements with aria-expanded and aria-controls attributes',
    'ArrowDown shortcut moves focus directly into panel action links',
    'Escape key closes the active panel and restores focus to the active trigger',
    'Inert attribute ensures inactive panels cannot receive focus or pointer events',
    'Respects prefers-reduced-motion with instant position updates',
  ],
  usageCode: `import { MorphingMegaMenu } from "@/components/ui/morphing-mega-menu";

export function Demo() {
  return (
    <div className="w-full py-12 flex justify-center">
      <MorphingMegaMenu />
    </div>
  );
}`,
};

export default meta;
