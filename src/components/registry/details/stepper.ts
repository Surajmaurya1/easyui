// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "stepper",
  "name": "Stepper",
  "tagline": "Animated connector line, gliding focus ring, and step panels",
  "description": "A multi-step progress indicator with line fills, gliding active rings, drawing checkmarks, and direction-aware sliding step panels.",
  "category": "Navigation",
  "badges": [
    "Connector Line",
    "Draw Checkmark",
    "Directional Panels",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stepper",
  "installPromptHash": "8475ee62ff688ca94292172639ac826670018c8305e9327a846d8aa9b67047ed",
  "features": [
    "Connector line fills smoothly as you advance through steps",
    "A single active indicator ring glides between steps using Framer Motion layoutId",
    "Completed step checkmark animates its stroke path on completion",
    "Direction-aware StepPanels: slides left/right depending on forward or backward navigation",
    "Horizontal and vertical layouts, clickable completed steps, and responsive mobile labels"
  ],
  "props": [
    {
      "name": "steps",
      "type": "Step[]",
      "default": "undefined",
      "description": "List of steps with title and optional description"
    },
    {
      "name": "current",
      "type": "number",
      "default": "0",
      "description": "Zero-based index of the active step"
    },
    {
      "name": "onStepChange",
      "type": "(index: number) => void",
      "default": "undefined",
      "description": "Callback enabling jump-back clicks on completed steps"
    },
    {
      "name": "orientation",
      "type": "'horizontal' | 'vertical'",
      "default": "'horizontal'",
      "description": "Layout direction of the stepper line"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional CSS classes for the stepper container"
    }
  ],
  "accessibility": [
    "Uses semantic <ol aria-label=\"Progress\"> and <li> elements with aria-current=\"step\"",
    "Provides hidden text \"(completed)\" for screen readers on completed steps",
    "Full keyboard navigation and visible focus rings for interactive step buttons"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { Stepper, StepPanels, type Step } from \"@/components/ui/stepper\";\n\nconst steps: Step[] = [\n  { title: \"Account\", description: \"Your details\" },\n  { title: \"Workspace\", description: \"Name it\" },\n  { title: \"Invite\", description: \"Optional\" },\n  { title: \"Done\" },\n];\n\nconst [current, setCurrent] = React.useState(0);\n\n<Stepper steps={steps} current={current} onStepChange={setCurrent} />\n<StepPanels current={current}>\n  <div>Step 1 content</div>\n  <div>Step 2 content</div>\n  <div>Step 3 content</div>\n  <div>Step 4 content</div>\n</StepPanels>",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/stepper.tsx",
      "type": "registry:ui",
      "target": "components/ui/stepper.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
