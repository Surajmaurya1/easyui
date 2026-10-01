import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Neon Edge Button',
  description: 'A button with a restrained light source travelling around the border while the label remains primary.',
  category: 'Buttons',
  featured: true,
  tagline: 'Precise travelling edge light button',
  badges: ['Button', 'CSS Motion', 'Reduced Motion'],
  createdAt: '2026-08-28',
  features: [
    'Travelling light follows the button perimeter instead of animating border color',
    'Neutral glow keeps the effect aligned with EasyUI surfaces',
    'Still reads as a polished button when motion is disabled',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: "'Deploy preview'", description: 'Button content' },
    { name: 'speed', type: 'number', default: '1', description: 'Multiplier for the edge-light travel speed' },
    { name: 'glow', type: 'boolean', default: 'true', description: 'Enables the subtle static button glow' },
  ],
  accessibility: [
    'Uses a semantic button and focus-visible ring',
    'Reduced motion stops the travelling light and keeps a static edge highlight',
  ],
  usageCode: `import { NeonEdgeButton } from "@/components/ui/neon-edge-button";

export function Demo() {
  return <NeonEdgeButton>Deploy preview</NeonEdgeButton>;
}`,
};

export default meta;
