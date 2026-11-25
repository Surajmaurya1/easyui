// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "rocket-party-popper",
  "name": "Rocket Party Popper",
  "tagline": "Lift-off milestone celebration with colorful confetti blast",
  "description": "An interactive black rocket launch that blasts into a colorful party popper confetti shower to reveal celebratory milestones.",
  "category": "Feedback",
  "badges": [
    "Party Popper",
    "Confetti Blast",
    "Interactive Motion",
    "Milestones"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/rocket-party-popper",
  "installPromptHash": "63056f69d7fe9a051bc311cadf3fa9cedafa1ad609a744436ada3b632d4bf58f",
  "features": [
    "Sleek matte black rocket capsule with thruster ember anticipation",
    "Smooth lift-off acceleration trailing thruster flame and smoke",
    "360° Colorful party popper confetti explosion with physics gravity and flutter",
    "Apple-grade fluid spring reveal for celebratory milestone cards",
    "Built-in replay and reset support for repeatable celebratory interactions"
  ],
  "props": [
    {
      "name": "title",
      "type": "string",
      "default": "'Mission Accomplished'",
      "description": "Primary celebration headline"
    },
    {
      "name": "description",
      "type": "string",
      "default": "'All checks passed and your release is ready to deploy.'",
      "description": "Supporting celebration description"
    },
    {
      "name": "metric",
      "type": "string",
      "default": "'100% Production Ready'",
      "description": "Metadata badge shown on milestone card"
    },
    {
      "name": "triggerLabel",
      "type": "string",
      "default": "'Launch celebration'",
      "description": "Label for the launch button"
    },
    {
      "name": "confettiCount",
      "type": "number",
      "default": "50",
      "description": "Total confetti particles spawned on blast"
    },
    {
      "name": "defaultLaunched",
      "type": "boolean",
      "default": "false",
      "description": "Initial launched/revealed state"
    },
    {
      "name": "onLaunch",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired on launch trigger"
    },
    {
      "name": "onReset",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired on reset"
    }
  ],
  "accessibility": [
    "Revealed milestone card uses role=\"status\" and aria-live=\"polite\"",
    "Supports prefers-reduced-motion with instant graceful celebration transition",
    "Full keyboard interaction via Enter and Spacebar"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { RocketPartyPopper } from \"@/components/ui/rocket-party-popper\";\n\nexport function Demo() {\n  return (\n    <RocketPartyPopper\n      title=\"Release Shipped\"\n      description=\"All registry, lint, and SEO checks passed.\"\n      metric=\"v2.4.0 Live\"\n      onLaunch={() => console.log('Rocket Launched!')}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/RocketPartyPopper.tsx",
      "type": "registry:ui",
      "target": "components/ui/rocket-party-popper.tsx"
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
