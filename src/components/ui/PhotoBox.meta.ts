import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Photo Box',
  description: 'Tactile Japanese stationery-inspired photo box featuring frosted glass translucency, sliding paper box mechanics, fanning polaroid prints, and full-bleed image zoom.',
  category: 'Motion',
  tagline: 'Frosted paper box with fanning polaroids and tactile zoom inspection',
  badges: ['Polaroid', 'Stationery', 'Glassmorphism', 'Motion', 'Interactive'],
  createdAt: '2026-10-14',
  features: [
    'Translucent frosted glass cover with realistic backdrop-blur and warm gradient sheen',
    'Sliding paper box drawer physics with spring-tuned easing and offset lip reveal',
    'Tri-slot polaroid fanning layout that expands on hover, tap, or focus',
    'Click-to-zoom polaroid inspection view with high-res framing and title captions',
    'Accessible keyboard navigation (Tab through prints, Enter to expand, Esc to dismiss)',
    'Responsive auto-scaling stage with ResizeObserver keeping pixel-perfect geometry down to mobile screens',
  ],
  props: [
    {
      name: 'prints',
      type: 'PhotoPrint[]',
      default: 'DEFAULT_PRINTS',
      description: 'Up to 3 photo prints to display inside the box slots (title, caption, src or art)',
    },
    {
      name: 'title',
      type: 'string',
      default: "'写真箱'",
      description: 'Headline kanji or text displayed on the frosted cover',
    },
    {
      name: 'subtitle',
      type: 'string',
      default: "'Photo Box · 3 prints'",
      description: 'Subtext printed beneath the headline title',
    },
    {
      name: 'open',
      type: 'boolean',
      default: 'undefined',
      description: 'Optional controlled open state for external hover or trigger controls',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional CSS class overrides applied to the outer stage container',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      default: 'undefined',
      description: 'Callback invoked whenever the box opens or closes',
    },
    {
      name: 'onSelect',
      type: '(id: string | null) => void',
      default: 'undefined',
      description: 'Callback invoked when an individual polaroid print is inspected or closed',
    },
  ],
  accessibility: [
    'Full keyboard navigation allowing Tab selection and Enter activation of unboxed polaroid prints',
    'Esc key listener to collapse enlarged polaroids and pinned touch drawers',
    'ARIA attributes including role="dialog", aria-modal="true", and aria-expanded',
    'Automatic prefers-reduced-motion detection with instantaneous transitions',
  ],
  usageCode: `import { PhotoBox } from "@/components/ui/photo-box";

export function Demo() {
  return (
    <div className="w-full py-12 flex justify-center">
      <PhotoBox />
    </div>
  );
}`,
};

export default meta;
