import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'UnfoldAccordion',
  description: 'An accordion whose content unfolds with the chevron and spacing moving together. The chevron rotates 180° while the content height expands and the inner content slides up to close the gap, producing a single, fluid motion.',
  category: 'Feedback',
  featured: true,
  tagline: 'Content unfolds with chevron and spacing',
  badges: ['Coordinated Motion', 'Spring Height', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Chevron rotation, content height, and inner content slide are tuned to overlap',
    'Inner content uses a slightly faster ease so it "leads" the chevron by a hair',
    'Spring-based height expansion (springGentle) for a calm, continuous feel',
    'Single-open by default; allowMultiple for multi-open mode',
    'Light/dark theme aware — works in both palettes',
  ],
  props: [
    { name: 'items', type: 'UnfoldAccordionItem[]', default: '[]', description: 'Array of accordion items' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple items open at once' },
    { name: 'defaultOpen', type: 'string[]', default: '[]', description: 'Ids of items open by default' },
  ],
  accessibility: [
    'aria-expanded reflects open state on the trigger button',
    'Native <button> semantics for keyboard activation',
    'Focus-ring visible on keyboard navigation',
  ],
  usageCode: `import { UnfoldAccordion } from "@/components/ui/unfold-accordion";

export function Demo() {
  return (
    <UnfoldAccordion
      defaultOpen={["design"]}
      items={[
        {
          id: "design",
          title: "Design tokens",
          subtitle: "Foundations",
          content: "A small set of variables for color, type, and spacing. Each token is named for its role, not its value, so themes can be swapped without rewriting components.",
        },
        {
          id: "motion",
          title: "Motion language",
          subtitle: "Spring physics",
          content: "Every transition is a spring with explicit mass, stiffness, and damping. Linear easing is reserved for color and opacity only.",
        },
        {
          id: "shipping",
          title: "Shipping workflow",
          subtitle: "From sync to deploy",
          content: "Run component:sync to regenerate the registry, then push. The CI workflow re-validates and re-syncs on every PR.",
        },
      ]}
    />
  );
}`,
};

export default meta;
