import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Dotted Blob',
  description: 'A responsive, accessible dotted blob component for React applications built with Tailwind CSS and Framer Motion.',
  category: 'Motion',
  tagline: 'Responsive interactive dotted blob',
  badges: ['Motion', 'Tailwind', 'Interactive'],
  createdAt: '2026-09-16T13:41:39.007Z',
  features: [
    'Responsive design for modern web applications',
    'Hardware accelerated layout animations',
    'Customizable appearance with standard Tailwind utility classes',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the component' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional custom Tailwind styling' },
  ],
  accessibility: [
    'Respects prefers-reduced-motion media query',
    'Semantic HTML structure with standard keyboard support',
  ],
  usageCode: `import { DottedBlob } from "@/components/ui/dotted-blob";

export function Demo() {
  return (
    <DottedBlob>
      <span>Content goes here</span>
    </DottedBlob>
  );
}`,
};

export default meta;
