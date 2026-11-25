// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "smart-comparison",
  "name": "Smart Comparison",
  "tagline": "Interactive tier comparison matrix with difference filtering",
  "description": "An interactive feature matrix and SaaS tier comparison component featuring live difference filtering, collapsible specification categories, search indexing, and mobile card toggle.",
  "category": "Navigation",
  "badges": [
    "Feature Matrix",
    "SaaS Pricing",
    "Diff Filter"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smart-comparison",
  "installPromptHash": "6a9dce456bb1cd64a02a0f192724f4d059987ec99e33492f2426f12650c9b2a0",
  "features": [
    "Live \"Differences Only\" filter to instantly surface plan divergence",
    "Integrated feature keyword search with real-time row matching",
    "Collapsible category groups with spring height transitions",
    "Segmented mobile plan selector avoiding wide horizontal table scrolling",
    "Contextual info tooltips and custom value cell rendering"
  ],
  "props": [
    {
      "name": "plans",
      "type": "ComparisonPlan[]",
      "default": "[]",
      "description": "Array of plans/tiers containing pricing and metadata"
    },
    {
      "name": "categories",
      "type": "ComparisonCategory[]",
      "default": "[]",
      "description": "Grouped feature categories with plan-specific values"
    },
    {
      "name": "defaultPlanId",
      "type": "string",
      "default": "featured plan or plans[0].id",
      "description": "Initial plan selected on mobile viewports"
    },
    {
      "name": "enableSearch",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the instant feature search input"
    },
    {
      "name": "enableDiffFilter",
      "type": "boolean",
      "default": "true",
      "description": "Whether to render the \"Differences Only\" toggle button"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional CSS class name for container"
    }
  ],
  "accessibility": [
    "Semantic region container with ARIA labels",
    "Keyboard accessible category accordions and tooltips",
    "High-contrast state indicators with screen reader readable labels"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { SmartComparison } from \"@/components/ui/smart-comparison\";\n\nconst plans = [\n  { id: \"hobby\", name: \"Hobby\", tagline: \"For side projects\", price: \"$0\", billingPeriod: \"mo\" },\n  { id: \"pro\", name: \"Pro\", tagline: \"For fast-moving teams\", price: \"$29\", billingPeriod: \"mo\", featured: true, badge: \"Popular\" },\n  { id: \"enterprise\", name: \"Enterprise\", tagline: \"Dedicated compliance\", price: \"Custom\", billingPeriod: \"yr\" },\n];\n\nconst categories = [\n  {\n    id: \"compute\",\n    title: \"Compute & Scale\",\n    features: [\n      { id: \"bandwidth\", name: \"Global Bandwidth\", values: { hobby: \"100 GB\", pro: \"1 TB\", enterprise: \"Unlimited\" } },\n      { id: \"regions\", name: \"Multi-Region Routing\", values: { hobby: false, pro: true, enterprise: true } },\n      { id: \"concurrency\", name: \"Max Concurrency\", values: { hobby: \"10\", pro: \"250\", enterprise: \"Dedicated\" } },\n    ],\n  },\n];\n\nexport function Demo() {\n  return <SmartComparison plans={plans} categories={categories} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SmartComparison.tsx",
      "type": "registry:ui",
      "target": "components/ui/smart-comparison.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
