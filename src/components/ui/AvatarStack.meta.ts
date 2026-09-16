import type { EasyComponentMeta } from '../../types/component';

export const AvatarStackMeta: EasyComponentMeta = {
  id: 'avatar-stack',
  name: 'Avatar Stack',
  title: 'Avatar Stack',
  tagline: 'Overlapping avatar pile with spring-animated hover elevation and tooltips.',
  description: 'An interactive, stacked facepile of overlapping avatars that smoothly elevates and scales the hovered avatar to the front with spring physics, revealing the full image and name tooltip.',
  category: 'Overlays',
  badges: ['Framer Motion', 'Interactive', 'Micro-interactions'],
  cliCommand: 'npx shadcn@latest add Surajmaurya1/easyui/avatar-stack',
  usageCode: `<AvatarStack
  size="lg"
  overlap="lg"
  avatars={[
    { id: 1, src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },
    { id: 2, src: 'https://i.pravatar.cc/150?img=2', alt: 'Sarah Smith' },
    { id: 3, src: 'https://i.pravatar.cc/150?img=3', alt: 'Mike Johnson' },
    { id: 4, src: 'https://i.pravatar.cc/150?img=4', alt: 'Emily Davis' },
    { id: 5, src: 'https://i.pravatar.cc/150?img=5', alt: 'Alex Wilson' },
    { id: 6, src: 'https://i.pravatar.cc/150?img=6', alt: 'Chris Brown' },
  ]}
/>`,
  sourceCode: '', // Automatically populated by sync script
  props: [
    { name: 'avatars', type: 'AvatarStackItem[]', default: '[]', description: 'Array of avatar objects with id, src, alt, and fallback' },
    { name: 'max', type: 'number', default: '5', description: 'Maximum visible avatars before showing the +N counter' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'lg'", description: 'Dimension variant for each avatar circle' },
    { name: 'overlap', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Negative margin overlap amount between adjacent avatars' },
    { name: 'showCount', type: 'boolean', default: 'true', description: 'Whether to show the +N counter badge for overflow items' },
    { name: 'showTooltip', type: 'boolean', default: 'true', description: 'Whether to show a floating tooltip label on hover' },
  ],
  accessibility: [
    'Uses semantic role="group" container with accessible aria labels for remaining count',
    'Preserves image alt text and falls back to generated initials for screen readers',
    'Hover tooltip uses pointer-events-none to prevent interfering with clicks',
  ],
  features: [
    'Dynamic z-index elevation on hover so the hovered avatar is 100% visible and unclipped',
    'Spring-animated scale and lift transition powered by Framer Motion',
    'Floating name tooltip with spring entrance and exit',
    'Automatic initial extraction when images are unavailable or fail to load',
    'Truncation badge (+N) with customizable maximum visible avatars',
  ],
  createdAt: '2026-09-16',
  dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  files: [
    { path: 'src/components/ui/AvatarStack.tsx', type: 'registry:ui' },
  ],
};

export default AvatarStackMeta;
