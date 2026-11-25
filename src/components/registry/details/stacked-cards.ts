// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "stacked-cards",
  "name": "Stacked Cards",
  "tagline": "Scroll-driven sticky stacking cards",
  "description": "A responsive, scroll-driven stacking cards component built with Tailwind CSS and Framer Motion. Cards start aligned in a column and stack gracefully on scroll without hijacking page scrolling.",
  "category": "Motion",
  "badges": [
    "Motion",
    "Tailwind",
    "Scroll-Driven",
    "Sticky"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stacked-cards",
  "installPromptHash": "c968716995f037603d05a8662155e76b2d328ad85133c90c35b59c1670c2c534",
  "features": [
    "Naturally aligned column layout in the initial view",
    "Scroll-driven sticky stacking where cards stack one above another on scroll",
    "Non-blocking native window scrolling — continues to subsequent sections seamlessly",
    "Responsive two-column grid on desktop, single-column on mobile",
    "Dark and light mode compatible with high-contrast typography and borders",
    "Hardware accelerated motion transitions with subtle depth shadow",
    "Respects prefers-reduced-motion preferences"
  ],
  "props": [
    {
      "name": "cards",
      "type": "StackedCard[]",
      "default": "defaultCards",
      "description": "Array of card objects with title, description, image, and optional CTA link"
    },
    {
      "name": "title",
      "type": "string",
      "default": "undefined",
      "description": "Optional section heading title"
    },
    {
      "name": "subtitle",
      "type": "string",
      "default": "undefined",
      "description": "Optional section description subtitle"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional custom Tailwind styling for the outer wrapper"
    }
  ],
  "accessibility": [
    "Respects prefers-reduced-motion media query",
    "Uses semantic section and article elements",
    "Preserves standard keyboard navigation and browser focus management"
  ],
  "createdAt": "2026-09-12T11:29:47.829Z",
  "usageCode": "import { StackedCards } from \"@/components/ui/StackedCards\";\n\nexport function Demo() {\n  return (\n    <StackedCards\n      cards={[\n        {\n          id: 1,\n          title: \"Annual letter 2025\",\n          description: \"Explore the latest trends, insights, and stories.\",\n          image: \"https://images.unsplash.com/photo-1497366811353-6870744d04b2\",\n          ctaLabel: \"Read story\",\n        },\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/StackedCards.tsx",
      "type": "registry:ui",
      "target": "components/ui/stacked-cards.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
