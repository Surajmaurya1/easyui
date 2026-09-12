import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Stacked Cards',
  description: 'A responsive, scroll-driven stacking cards component built with Tailwind CSS and Framer Motion. Cards start aligned in a column and stack gracefully on scroll without hijacking page scrolling.',
  category: 'Motion',
  tagline: 'Scroll-driven sticky stacking cards',
  badges: ['Motion', 'Tailwind', 'Scroll-Driven', 'Sticky'],
  createdAt: '2026-09-12T11:29:47.829Z',
  features: [
    'Naturally aligned column layout in the initial view',
    'Scroll-driven sticky stacking where cards stack one above another on scroll',
    'Non-blocking native window scrolling — continues to subsequent sections seamlessly',
    'Responsive two-column grid on desktop, single-column on mobile',
    'Dark and light mode compatible with high-contrast typography and borders',
    'Hardware accelerated motion transitions with subtle depth shadow',
    'Respects prefers-reduced-motion preferences',
  ],
  props: [
    { name: 'cards', type: 'StackedCard[]', default: 'defaultCards', description: 'Array of card objects with title, description, image, and optional CTA link' },
    { name: 'title', type: 'string', default: 'undefined', description: 'Optional section heading title' },
    { name: 'subtitle', type: 'string', default: 'undefined', description: 'Optional section description subtitle' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional custom Tailwind styling for the outer wrapper' },
  ],
  accessibility: [
    'Respects prefers-reduced-motion media query',
    'Uses semantic section and article elements',
    'Preserves standard keyboard navigation and browser focus management',
  ],
  usageCode: `import { StackedCards } from "@/components/ui/StackedCards";

export function Demo() {
  return (
    <StackedCards
      cards={[
        {
          id: 1,
          title: "Annual letter 2025",
          description: "Explore the latest trends, insights, and stories.",
          image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
          ctaLabel: "Read story",
        },
      ]}
    />
  );
}`,
};

export default meta;

