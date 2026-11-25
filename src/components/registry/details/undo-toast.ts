// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "undo-toast",
  "name": "Undo Toast",
  "tagline": "Refined undo notification with real-time countdown progress and reversal animation",
  "description": "An advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.",
  "category": "Feedback",
  "badges": [
    "Notification",
    "Feedback",
    "Timer Physics"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/undo-toast",
  "installPromptHash": "2927c757d4a94cb7c6754088369b24bbc4137ea89f542489d22af86e779fdc8d",
  "features": [
    "Real-time smooth countdown progress bar illustrating time window remaining",
    "Intelligent pause-on-hover physics so users never miss undo deadlines",
    "Visual state morphing upon clicking Undo before gentle dismissal",
    "Configurable multi-corner positioning (top, bottom, center, corners)",
    "Multiple semantically tinted variants: Default, Success, Warning, Error, and Info"
  ],
  "props": [
    {
      "name": "open",
      "type": "boolean",
      "default": "true",
      "description": "Visibility state of the undo toast"
    },
    {
      "name": "title",
      "type": "string",
      "default": "'Project archived'",
      "description": "Primary notification message title"
    },
    {
      "name": "description",
      "type": "string",
      "default": "'Changes will be permanent in a few seconds'",
      "description": "Optional descriptive subtitle"
    },
    {
      "name": "undoLabel",
      "type": "string",
      "default": "'Undo'",
      "description": "Label for undo action trigger"
    },
    {
      "name": "restoredMessage",
      "type": "string",
      "default": "'Restored successfully'",
      "description": "Title displayed when action has been reversed"
    },
    {
      "name": "duration",
      "type": "number",
      "default": "5000",
      "description": "Duration in milliseconds before auto-dismissal"
    },
    {
      "name": "variant",
      "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
      "default": "'default'",
      "description": "Semantic visual tone"
    },
    {
      "name": "position",
      "type": "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      "default": "'bottom-center'",
      "description": "Screen placement"
    },
    {
      "name": "onUndo",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when user clicks Undo"
    },
    {
      "name": "onDismiss",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when toast closes or expires"
    },
    {
      "name": "showProgress",
      "type": "boolean",
      "default": "true",
      "description": "Whether to show the countdown bar"
    }
  ],
  "accessibility": [
    "ARIA live role=\"status\" announcements for screen readers",
    "Full keyboard accessibility for Undo and Close buttons",
    "Respects reduced motion preferences by bypassing entry translations"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { UndoToast } from \"@/components/ui/undo-toast\";\n\nexport function Demo() {\n  const [show, setShow] = useState(true);\n\n  return (\n    <UndoToast\n      open={show}\n      title=\"File deleted\"\n      description=\"Item moved to trash\"\n      duration={5000}\n      onUndo={() => console.log('Action reversed')}\n      onDismiss={() => setShow(false)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/UndoToast.tsx",
      "type": "registry:ui",
      "target": "components/ui/undo-toast.tsx"
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
