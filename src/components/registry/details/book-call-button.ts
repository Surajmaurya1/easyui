// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "book-call-button",
  "name": "Book Call Button",
  "tagline": "Expanding accent pill with phone hover state",
  "description": "A premium \"Book a call\" pill with a green expanding capsule. At rest, a 36% accent capsule holds a dotted arrow + label; on hover, the capsule fills the pill, the label slides out, and a phone icon with ringing lines fades in centered.",
  "category": "Buttons",
  "badges": [
    "Spring",
    "State Choreography",
    "Reduced Motion",
    "Responsive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/book-call-button",
  "installPromptHash": "8cabce1778752704caa3eb53c3b5d49be06701d18df35f75499d63b0754282e4",
  "features": [
    "Three independently-timed motion layers: expanding capsule, label/arrow, and phone icon",
    "Capsule grows from \"left center\" so the expansion feels directional, not scale-from-middle",
    "Hover lift (1.01) and tap compression (0.975) on the pill itself, independent of the inner choreography",
    "Renders as <a> when href is provided so the same component works on a marketing page or a form action",
    "prefers-reduced-motion collapses every spring to an instant state change — no travel, no entrance",
    "Decorative SVGs are aria-hidden; the label is conveyed by aria-label on the interactive root",
    "Native <button> / <a> elements with focus-visible ring tied to the accent color"
  ],
  "props": [
    {
      "name": "children",
      "type": "string",
      "default": "'Book a call'",
      "description": "Label rendered to the right of the dotted arrow at rest"
    },
    {
      "name": "onClick",
      "type": "() => void",
      "default": "undefined",
      "description": "Click handler — ignored when href is also provided"
    },
    {
      "name": "href",
      "type": "string",
      "default": "undefined",
      "description": "When provided, the pill renders as an <a> with this href instead of a <button>"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional Tailwind classes merged into the pill root"
    }
  ],
  "accessibility": [
    "Semantic <button> by default; <a> when href is provided — no <div onClick>",
    "aria-label is set from the visible children so screen readers announce the action",
    "Decorative SVGs (dotted arrow, phone) are aria-hidden",
    "Visible focus-visible ring tied to the accent (#82ff22) for keyboard navigation",
    "prefers-reduced-motion fallback: all three motion layers resolve instantly to the final state",
    "pointer-events-none on the phone overlay ensures clicks always reach the underlying interactive element"
  ],
  "createdAt": "2026-08-31",
  "usageCode": "import { BookCallButton } from \"@/components/ui/book-call-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center py-12\">\n      <BookCallButton onClick={() => console.log('Book a call clicked')} />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/BookCallButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/book-call-button.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
