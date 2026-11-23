// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "story-card",
  "name": "Story Cards",
  "tagline": "Responsive interactive story cards carousel",
  "description": "A responsive, accessible story cards carousel for React applications built with Tailwind CSS and Framer Motion.",
  "category": "Motion",
  "badges": [
    "Motion",
    "Tailwind",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/story-card",
  "installPromptHash": "7dd2278fa19b9c1436990e94ffa33d3ffc092336f5193bbdf680e71bc3ef8bfc",
  "features": [
    "Infinite loop carousel with continuous smooth transitions",
    "Responsive horizontal story card layout",
    "Large featured card with compact preview cards",
    "Mouse wheel and trackpad horizontal/vertical scroll support",
    "Touch swipe and drag gesture navigation",
    "Smooth spring-powered layout animations",
    "Previous and next navigation controls",
    "Clickable story previews for quick navigation",
    "Optional autoplay with configurable interval and hover pause",
    "Keyboard navigation with arrow keys",
    "Hardware accelerated animations",
    "Respects reduced-motion preferences",
    "Customizable appearance with standard Tailwind utility classes"
  ],
  "props": [
    {
      "name": "cards",
      "type": "StoryCard[]",
      "default": "undefined",
      "description": "Array of story cards containing title, image, description, and optional link information"
    },
    {
      "name": "initialIndex",
      "type": "number",
      "default": "0",
      "description": "Index of the story displayed initially"
    },
    {
      "name": "loop",
      "type": "boolean",
      "default": "true",
      "description": "Enables endless circular scrolling through the cards"
    },
    {
      "name": "enableWheelScroll",
      "type": "boolean",
      "default": "true",
      "description": "Allows trackpad or mouse wheel gestures to scroll through cards"
    },
    {
      "name": "autoPlay",
      "type": "boolean",
      "default": "false",
      "description": "Automatically advances through the story cards"
    },
    {
      "name": "autoPlayInterval",
      "type": "number",
      "default": "5000",
      "description": "Time in milliseconds between automatic story transitions"
    },
    {
      "name": "showNavigation",
      "type": "boolean",
      "default": "true",
      "description": "Controls whether previous and next navigation buttons are displayed"
    },
    {
      "name": "title",
      "type": "string",
      "default": "\"What's happening\"",
      "description": "Custom title heading for the story cards section"
    },
    {
      "name": "subtitle",
      "type": "string",
      "default": "\"Discover the latest stories.\"",
      "description": "Custom subtitle for the story cards section"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional custom Tailwind styling for the component wrapper"
    }
  ],
  "accessibility": [
    "Respects prefers-reduced-motion media query",
    "Provides semantic section and button elements",
    "Supports keyboard navigation with left and right arrow keys",
    "Provides accessible labels for navigation controls and stories",
    "Uses aria-current to identify the active story",
    "Uses descriptive image alt text for story images",
    "Maintains visible focus states for interactive elements"
  ],
  "createdAt": "2026-09-12T10:03:04.539Z",
  "usageCode": "import { StoryCards } from \"@/components/ui/StoryCard\";\n\nexport function Demo() {\n  return (\n    <StoryCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description:\n            \"We survived another year of meetings, deadlines, bugs, and pretending everything was part of the plan.\",\n          image:\n            \"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85\",\n          imageAlt: \"Modern office interior\",\n          ctaLabel: \"Read the damage\",\n        },\n        {\n          id: 2,\n          title: \"Building for the future\",\n          description:\n            \"A deep dive into how we build things nobody asked for, then spend three weeks fixing them.\",\n          image:\n            \"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Team collaborating in an office\",\n          ctaLabel: \"See the chaos\",\n        },\n        {\n          id: 3,\n          title: \"Inside the journey\",\n          description:\n            \"One person's inspiring journey from 'this should be easy' to 47 browser tabs and a Stack Overflow account.\",\n          image:\n            \"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Person exploring a landscape\",\n          ctaLabel: \"Join the adventure\",\n        },\n        {\n          id: 4,\n          title: \"The internet economy\",\n          description:\n            \"An extremely serious investigation into why everything costs money, including things that used to be free.\",\n          image:\n            \"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85\",\n          imageAlt: \"Technology infrastructure\",\n          ctaLabel: \"Understand capitalism\",\n        }\n        }\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/StoryCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/story-card.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
