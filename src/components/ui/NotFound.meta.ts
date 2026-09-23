import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Not Found',
  description:
    'A minimal, production-ready 404 / route error component featuring floating spring-physics proximity displacement on individual glyphs, clear typography hierarchy, and accessible recovery actions.',
  category: 'Feedback',
  tagline: 'Minimal spring-displaced 404 error experience with tactile proximity physics',
  badges: ['404 Page', 'Spring Physics', 'Proximity Response', 'Micro-interactions', 'Accessible'],
  featured: true,
  createdAt: '2026-09-23',
  features: [
    'Pure floating spring-physics entities for each character with custom mass and damping',
    'Continuous pointer proximity repulsion without React state re-renders (zero-jank 60fps)',
    'Mobile-first tactile tap impulse feedback for touch screens',
    'Strictly adheres to EasyUI dark neutral palette and Sky-400 focus ring',
    'Full accessibility support with screen reader announcements and semantic heading hierarchy',
    'Seamless prefers-reduced-motion fallback disabling continuous movement',
  ],
  props: [
    {
      name: 'errorCode',
      type: 'string',
      default: "'404'",
      description: 'Main error code glyphs rendered as physical interactive objects',
    },
    {
      name: 'badgeLabel',
      type: 'string',
      default: 'undefined',
      description: 'Optional status tag displayed above the glyphs',
    },
    {
      name: 'title',
      type: 'string',
      default: "'This page took a wrong turn.'",
      description: 'Primary heading title',
    },
    {
      name: 'description',
      type: 'string',
      default: "'The requested page doesn\\'t exist or may have moved.'",
      description: 'Descriptive secondary body copy',
    },
    {
      name: 'actionLabel',
      type: 'string',
      default: "'Go back home'",
      description: 'Label for the primary recovery action button',
    },
    {
      name: 'onAction',
      type: '() => void',
      default: 'undefined',
      description: 'Callback when primary action button is clicked',
    },
    {
      name: 'secondaryActionLabel',
      type: 'string',
      default: 'undefined',
      description: 'Optional label for the secondary action button',
    },
    {
      name: 'onSecondaryAction',
      type: '() => void',
      default: 'undefined',
      description: 'Callback when secondary action button is clicked',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional custom container CSS classes',
    },
  ],
  accessibility: [
    'Semantic <section> container with aria-labelledby linked to primary heading',
    'Visually hidden screen reader status announcement with sr-only',
    'All interactive controls use native <button> elements with visible focus rings',
    'Graceful degradation when prefers-reduced-motion is active',
  ],
  usageCode: `import { NotFound } from "@/components/ui/not-found";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#111113]">
      <NotFound
        title="This page took a wrong turn."
        description="The requested page doesn't exist or may have moved."
        actionLabel="Go back home"
        onAction={() => window.location.href = "/"}
      />
    </div>
  );
}`,
};

export default meta;
