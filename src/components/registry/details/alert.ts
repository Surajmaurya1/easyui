// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "alert",
  "name": "Alert",
  "tagline": "Smooth height collapse on dismissal with tone styling",
  "description": "An alert component that collapses smoothly in height and opacity on dismissal, with tone-aware icons, action slot, and accessibility roles.",
  "category": "Feedback",
  "badges": [
    "Height Collapse",
    "Dismissible",
    "Accessible Roles",
    "Light & Dark"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/alert",
  "installPromptHash": "296968ef4274bf05705461f95631770c4c3d31770d5b78a85d2ac66b7941f9d2",
  "features": [
    "Dismissing collapses height and fades out smoothly without sudden content jumps",
    "Supports 5 semantic tones: neutral, info, success, warning, and danger",
    "Automatic matching Lucide icons with custom icon or icon={false} override",
    "Action slot on the right for buttons, retry triggers, or secondary actions",
    "Proper accessibility: role=\"alert\" for danger/warning and role=\"status\" for neutral/info/success"
  ],
  "props": [
    {
      "name": "tone",
      "type": "'neutral' | 'info' | 'success' | 'warning' | 'danger'",
      "default": "'neutral'",
      "description": "Color tone and severity semantic level"
    },
    {
      "name": "icon",
      "type": "React.ReactNode | false",
      "default": "undefined",
      "description": "Custom icon element, or false to suppress icon"
    },
    {
      "name": "dismissible",
      "type": "boolean",
      "default": "false",
      "description": "Renders an interactive close button"
    },
    {
      "name": "onDismiss",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback invoked after the exit collapse animation completes"
    },
    {
      "name": "action",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Optional right-hand action element (e.g. action button)"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional CSS classes for the alert container"
    }
  ],
  "accessibility": [
    "Applies role=\"alert\" for high-priority warning/danger tones and role=\"status\" for informative tones",
    "Dismiss button includes aria-label=\"Dismiss\" and clear focus-visible rings",
    "High contrast color ratios in both light and dark themes"
  ],
  "createdAt": "2026-10-11",
  "usageCode": "import { Alert, AlertTitle, AlertDescription } from \"@/components/ui/alert\";\n\n<Alert tone=\"danger\" dismissible onDismiss={() => handleDismiss()}>\n  <AlertTitle>Payment failed</AlertTitle>\n  <AlertDescription>Your card was declined. Please try another card.</AlertDescription>\n</Alert>\n\n<Alert tone=\"success\">\n  <AlertTitle>Changes saved successfully</AlertTitle>\n</Alert>",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/alert.tsx",
      "type": "registry:ui",
      "target": "components/ui/alert.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
