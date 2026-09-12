import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Story Cards',
  description:
    'A responsive, accessible story cards carousel for React applications built with Tailwind CSS and Framer Motion.',
  category: 'Motion',
  tagline: 'Responsive interactive story cards carousel',
  badges: ['Motion', 'Tailwind', 'Interactive'],
  createdAt: '2026-09-12T10:03:04.539Z',
  features: [
    'Infinite loop carousel with continuous smooth transitions',
    'Responsive horizontal story card layout',
    'Large featured card with compact preview cards',
    'Mouse wheel and trackpad horizontal/vertical scroll support',
    'Touch swipe and drag gesture navigation',
    'Smooth spring-powered layout animations',
    'Previous and next navigation controls',
    'Clickable story previews for quick navigation',
    'Optional autoplay with configurable interval and hover pause',
    'Keyboard navigation with arrow keys',
    'Hardware accelerated animations',
    'Respects reduced-motion preferences',
    'Customizable appearance with standard Tailwind utility classes',
  ],
  props: [
    {
      name: 'cards',
      type: 'StoryCard[]',
      default: 'undefined',
      description:
        'Array of story cards containing title, image, description, and optional link information',
    },
    {
      name: 'initialIndex',
      type: 'number',
      default: '0',
      description: 'Index of the story displayed initially',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Enables endless circular scrolling through the cards',
    },
    {
      name: 'enableWheelScroll',
      type: 'boolean',
      default: 'true',
      description:
        'Allows trackpad or mouse wheel gestures to scroll through cards',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      default: 'false',
      description: 'Automatically advances through the story cards',
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      default: '5000',
      description: 'Time in milliseconds between automatic story transitions',
    },
    {
      name: 'showNavigation',
      type: 'boolean',
      default: 'true',
      description:
        'Controls whether previous and next navigation buttons are displayed',
    },
    {
      name: 'title',
      type: 'string',
      default: '"What\'s happening"',
      description: 'Custom title heading for the story cards section',
    },
    {
      name: 'subtitle',
      type: 'string',
      default: '"Discover the latest stories."',
      description: 'Custom subtitle for the story cards section',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional custom Tailwind styling for the component wrapper',
    },
  ],
  accessibility: [
    'Respects prefers-reduced-motion media query',
    'Provides semantic section and button elements',
    'Supports keyboard navigation with left and right arrow keys',
    'Provides accessible labels for navigation controls and stories',
    'Uses aria-current to identify the active story',
    'Uses descriptive image alt text for story images',
    'Maintains visible focus states for interactive elements',
  ],
  usageCode: `import { StoryCards } from "@/components/ui/StoryCard";

export function Demo() {
  return (
    <StoryCards
      cards={[
        {
          id: 1,
          title: "Annual letter 2025",
          description:
            "We survived another year of meetings, deadlines, bugs, and pretending everything was part of the plan.",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
          imageAlt: "Modern office interior",
          href: "/annual-letter",
          ctaLabel: "Read the damage",
        },
        {
          id: 2,
          title: "Building for the future",
          description:
            "A deep dive into how we build things nobody asked for, then spend three weeks fixing them.",
          image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
          imageAlt: "Team collaborating in an office",
          href: "/stories/future",
          ctaLabel: "See the chaos",
        },
        {
          id: 3,
          title: "Inside the journey",
          description:
            "One person's inspiring journey from 'this should be easy' to 47 browser tabs and a Stack Overflow account.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
          imageAlt: "Person exploring a landscape",
          href: "/stories/journey",
          ctaLabel: "Join the adventure",
        },
        {
          id: 4,
          title: "The internet economy",
          description:
            "An extremely serious investigation into why everything costs money, including things that used to be free.",
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
          imageAlt: "Technology infrastructure",
          href: "/stories/economy",
          ctaLabel: "Understand capitalism",
        }
        }
    />
  );
}`,
};

export default meta;
