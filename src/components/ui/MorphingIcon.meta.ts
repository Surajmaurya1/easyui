import type { EasyUIComponentMeta } from '../../types/component';

export const MorphingIconMeta: EasyUIComponentMeta = {
  title: 'Morphing Icon',
  tagline: 'Smooth cross-fade rotation morphing between two icons or states.',
  description: 'An animated micro-interaction wrapper that smoothly morphs between two icon states with coordinated rotation, scale, and cross-fade transitions.',
  category: 'Motion',
  badges: ['Framer Motion', 'Micro-interactions', 'Icon Transition'],
  usageCode: `<button
  onClick={() => setIsBookmarked((prev) => !prev)}
  className="p-2 rounded-xl bg-surface-raised border border-border hover:bg-surface-hover transition-colors"
  aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
>
  <MorphingIcon
    active={isBookmarked}
    from={<Bookmark className="w-5 h-5 text-text-secondary" />}
    to={<BookmarkCheck className="w-5 h-5 text-emerald-400" />}
    size={20}
  />
</button>`,
  props: [
    { name: 'from', type: 'React.ReactNode', default: 'undefined', description: 'Default icon element shown when inactive' },
    { name: 'to', type: 'React.ReactNode', default: 'undefined', description: 'Target icon element shown when active' },
    { name: 'active', type: 'boolean', default: 'false', description: 'Whether the target icon state is currently active' },
    { name: 'duration', type: 'number', default: '0.3', description: 'Duration of the morph transition in seconds' },
    { name: 'size', type: 'number', default: '20', description: 'Width and height of the icon container in pixels' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional CSS class for styling the container' },
  ],
  accessibility: [
    'Toggles aria-hidden on inactive states to prevent duplicate announcement by screen readers',
    'Preserves static container dimensions during rotation to prevent surrounding layout shifts',
  ],
  features: [
    'Coordinated rotation, scaling, and opacity cross-fade for fluid icon transformations',
    'Supports any icon component (Lucide, Radix, custom SVGs)',
    'Zero layout shift with absolute positioning within a fixed-size container',
    'Configurable duration and cubic-bezier easing curve',
  ],
  createdAt: '2026-09-16',
};

export default MorphingIconMeta;
