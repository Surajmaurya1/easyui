// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "sheet",
  "name": "Sheet",
  "tagline": "Drag-to-dismiss sheet with spring physics",
  "description": "A draggable sheet / drawer that slides in from any side and can be dragged away to dismiss — swipe left/right sheets anywhere on touch, top/bottom sheets via the grab handle. Springs back if you let go early.",
  "category": "Overlays",
  "badges": [
    "Drag to Dismiss",
    "Spring Physics",
    "Accessible",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sheet",
  "installPromptHash": "7b11545bf88c0d1066c25401b251b335b54999a8086bda924561c14589bceedb",
  "features": [
    "Four sides: right, left, top, bottom with directional drag-to-dismiss",
    "Touch: swipe left/right sheets anywhere; top/bottom sheets use the grab handle",
    "Springs back when released early; rubber-band elastic resistance",
    "Portal rendering, focus trap + focus return, Esc, scroll lock without layout shift",
    "ARIA dialog wired to SheetTitle/SheetDescription; backdrop click closes"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "undefined",
      "description": "Controlled open state (on Sheet)"
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "default": "false",
      "description": "Initial open state (uncontrolled)"
    },
    {
      "name": "onOpenChange",
      "type": "(open: boolean) => void",
      "default": "undefined",
      "description": "Open state change callback"
    },
    {
      "name": "side",
      "type": "'right' | 'left' | 'top' | 'bottom'",
      "default": "'right'",
      "description": "Side the sheet slides in from (on SheetContent)"
    },
    {
      "name": "showClose",
      "type": "boolean",
      "default": "true",
      "description": "Show the built-in close button"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional class for the panel"
    }
  ],
  "accessibility": [
    "role=\"dialog\" with aria-modal, labelled by SheetTitle, described by SheetDescription",
    "Focus is trapped inside and returned to the trigger on close; Escape dismisses",
    "Body scroll locks while open with scrollbar-width compensation (no layout shift)"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import {\n  Sheet, SheetBody, SheetClose, SheetContent, SheetDescription,\n  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,\n} from \"@/components/ui/sheet\";\n\n<Sheet>\n  <SheetTrigger className=\"h-9 rounded-lg bg-neutral-900 px-4 text-sm text-white dark:bg-white dark:text-neutral-900\">\n    Open\n  </SheetTrigger>\n\n  <SheetContent side=\"right\">\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>Make changes, then save.</SheetDescription>\n    </SheetHeader>\n    <SheetBody>{/* scrolls on its own */}</SheetBody>\n    <SheetFooter>\n      <SheetClose>Cancel</SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/sheet.tsx",
      "type": "registry:ui",
      "target": "components/ui/sheet.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
