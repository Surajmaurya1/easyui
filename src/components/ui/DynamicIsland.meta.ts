import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Dynamic Island',
  description: 'A physical morphing island component that smoothly transitions between a compact indicator, interactive summary, profile card, and social dock with spring physics.',
  category: 'Navigation',
  tagline: 'Continuous physical morphing island with spring layout physics',
  badges: ['Navigation', 'Layout Morphing', 'Spring Physics', 'Interactive'],
  createdAt: '2026-10-05',
  features: [
    'Continuous physical morphing between collapsed, expanded, profile, and share states',
    'Spring-based layout-aware geometry and radius interpolation with no abrupt snapping',
    'Persistent spatial continuity for the avatar across collapsed and profile states',
    'Fully accessible keyboard navigation with Escape key dismissal and click-outside collapse',
    'Configurable social dock supporting predefined platform detection and custom links',
    'Light and dark mode compatibility adhering strictly to the EasyUI design token system',
    'Respects prefers-reduced-motion media query with instant fallback states',
  ],
  props: [
    { name: 'avatar', type: 'string', default: 'undefined', description: 'URL of user avatar image' },
    { name: 'avatarAlt', type: 'string', default: 'undefined', description: 'Alt text for the avatar image' },
    { name: 'name', type: 'string', default: "'Suraj Maurya'", description: 'Display name in expanded and profile views' },
    { name: 'role', type: 'string', default: "'Frontend Developer'", description: 'Subtitle or profession title' },
    { name: 'description', type: 'string', default: "'Building thoughtful interfaces...'", description: 'Bio or description text rendered in profile view' },
    { name: 'greeting', type: 'string', default: "'Hello, I am [name]'", description: 'Custom message displayed in expanded state' },
    { name: 'statusText', type: 'string', default: "'Available for work'", description: 'Optional availability chip displayed beside name' },
    { name: 'metadata', type: 'DynamicIslandMetadataItem[]', default: 'undefined', description: 'Key-value badges rendered in profile card' },
    { name: 'socials', type: 'DynamicIslandSocials', default: '5 default links', description: 'Social links as an array of items or platform key-value object' },
    { name: 'state', type: "'collapsed' | 'expanded' | 'profile' | 'share'", default: 'undefined', description: 'Controlled state value' },
    { name: 'defaultState', type: "'collapsed' | 'expanded' | 'profile' | 'share'", default: "'collapsed'", description: 'Initial uncontrolled state' },
    { name: 'onStateChange', type: '(state: DynamicIslandState) => void', default: 'undefined', description: 'Callback invoked whenever state changes' },
    { name: 'profileContent', type: 'ReactNode', default: 'undefined', description: 'Custom ReactNode replacing default profile body' },
    { name: 'shareContent', type: 'ReactNode', default: 'undefined', description: 'Custom ReactNode replacing default share dock' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional additional styling applied to the island container' },
  ],
  accessibility: [
    'Semantic native button and anchor elements with descriptive aria-labels',
    'Escape key dismisses island back to collapsed state',
    'Clicking outside the island boundary automatically collapses it',
    'Full keyboard tabbing order across controls and social anchors with focus-ring outlines',
    'Respects prefers-reduced-motion query by eliminating spring animations',
  ],
  usageCode: `import { DynamicIsland } from "@/components/ui/dynamic-island";

export function Demo() {
  return (
    <DynamicIsland
      name="Suraj Maurya"
      role="Frontend Developer"
      description="Building thoughtful interfaces with React and Next.js."
      statusText="Available for hire"
      socials={{
        github: "https://github.com/Surajmaurya1",
        x: "https://x.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        email: "mailto:suraj@example.com",
      }}
    />
  );
}`,
};

export default meta;
