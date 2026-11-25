// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "package-box",
  "name": "Package Box",
  "tagline": "Interactive 3D package box with flap folding and rising document motion",
  "description": "A pure CSS 3D cardboard package box featuring interactive tape-splitting physics, flap-folding choreography, and an animated packing slip that rises out and turns to face the viewer.",
  "category": "Motion",
  "badges": [
    "3D Physics",
    "Motion",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/package-box",
  "installPromptHash": "b22a5dc6f2b12b4b0a4559ceba9c1ad397cc455fe7e269a09b95ccc245c27af8",
  "features": [
    "Pure CSS 3D cardboard box geometry with authentic grain texture and lighting gradients",
    "Choreographed master timeline: seam tape cut, sequential flap folding, and smooth paper rise",
    "Responsive stage scaling that fluidly adapts to any container width via ResizeObserver",
    "Customizable packing slip with itemization, totals, shipping info, and tactile rubber stamp",
    "Configurable color tokens for cardboard, tape, paper, typography, and stamp accent",
    "Full accessibility support with aria-controls, Esc dismiss, and prefers-reduced-motion adaptation"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled open state of the package box"
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "default": "false",
      "description": "Initial open state for uncontrolled usage"
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "default": "undefined",
      "description": "Callback triggered when open state changes"
    },
    {
      "name": "children",
      "type": "ReactNode",
      "default": "undefined",
      "description": "Custom React elements to render inside the rising document paper"
    },
    {
      "name": "slip",
      "type": "PackageSlip",
      "default": "DEFAULT_SLIP",
      "description": "Structured metadata for the default shipping invoice / packing slip"
    },
    {
      "name": "maxWidth",
      "type": "number",
      "default": "460",
      "description": "Maximum width in px; the 3D scene scales down responsively"
    },
    {
      "name": "colors",
      "type": "PackageBoxColors",
      "default": "undefined",
      "description": "Color overrides for box cardboard, tape, paper, ink, and accent stamp"
    },
    {
      "name": "label",
      "type": "ReactNode | false",
      "default": "undefined",
      "description": "Custom shipping label or false to hide"
    },
    {
      "name": "symbols",
      "type": "ReactNode | false",
      "default": "undefined",
      "description": "Custom fragile/handling symbols or false to hide"
    },
    {
      "name": "tape",
      "type": "boolean",
      "default": "true",
      "description": "Whether packing tape across top and seam is rendered"
    },
    {
      "name": "hint",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the accessible toggle button below the box"
    },
    {
      "name": "openLabel",
      "type": "string",
      "default": "'Click to open'",
      "description": "Accessible label when closed"
    },
    {
      "name": "closeLabel",
      "type": "string",
      "default": "'Close'",
      "description": "Accessible label when open"
    },
    {
      "name": "reserveSpace",
      "type": "boolean",
      "default": "false",
      "description": "Whether to preserve full open height while closed to avoid layout shifts"
    },
    {
      "name": "className",
      "type": "string",
      "default": "''",
      "description": "Optional CSS class names for outer wrapper"
    },
    {
      "name": "paperClassName",
      "type": "string",
      "default": "''",
      "description": "Optional CSS class names for the document paper"
    }
  ],
  "accessibility": [
    "Accessible button controller with aria-expanded and aria-controls bindings",
    "Document element labeled with role=\"document\" and inert attribute while sealed inside",
    "Keyboard support with Escape key listener to close active package",
    "Respects prefers-reduced-motion by skipping animation durations and instant state resolution"
  ],
  "createdAt": "2026-10-15",
  "usageCode": "import { PackageBox } from \"@/components/ui/package-box\";\n\nexport function Demo() {\n  return (\n    <PackageBox\n      colors={{ box: \"#b07b4a\", tape: \"#d3c3aa\" }}\n      slip={{\n        title: \"Thank you, Ana.\",\n        subtitle: \"Your order is packed and on its way.\",\n        recipient: \"Ana Rivera\",\n        items: [\n          { name: \"Oak desk lamp\", qty: 1, price: \"$89.00\" },\n          { name: \"Linen pouch\", qty: 2, price: \"$36.00\" },\n        ],\n        total: \"$125.00\",\n        stamp: \"Packed\",\n      }}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/PackageBox.tsx",
      "type": "registry:ui",
      "target": "components/ui/package-box.tsx"
    }
  ]
};

export default component;
