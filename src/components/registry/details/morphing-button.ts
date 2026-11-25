// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "morphing-button",
  "name": "Morphing Button",
  "tagline": "Dimension-preserving state morphing button with fluid icon transitions",
  "description": "A layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.",
  "category": "Buttons",
  "badges": [
    "Buttons",
    "Micro-interactions",
    "State Morphing"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-button",
  "installPromptHash": "be3eefc4de0cd819b5153cf495421d7ae063b48adc476692ae347e822da65256",
  "features": [
    "Zero layout shift architecture preserving natural bounding dimensions across states",
    "Icon morphing with spring-based scale and translation transitions",
    "Multiple design presets (Primary, Secondary, Danger, and Ghost)",
    "Interactive spring tap physics (whileTap scale 0.97)",
    "Complete disabled and busy ARIA state compatibility"
  ],
  "props": [
    {
      "name": "status",
      "type": "'idle' | 'loading' | 'success' | 'error'",
      "default": "'idle'",
      "description": "Current button lifecycle state"
    },
    {
      "name": "idleText",
      "type": "string",
      "default": "'Save Changes'",
      "description": "Label shown in default resting state"
    },
    {
      "name": "loadingText",
      "type": "string",
      "default": "'Saving...'",
      "description": "Label shown when operation is pending"
    },
    {
      "name": "successText",
      "type": "string",
      "default": "'Saved'",
      "description": "Label shown upon successful completion"
    },
    {
      "name": "errorText",
      "type": "string",
      "default": "'Failed'",
      "description": "Label shown when operation fails"
    },
    {
      "name": "variant",
      "type": "'primary' | 'secondary' | 'danger' | 'ghost'",
      "default": "'primary'",
      "description": "Visual surface styling preset"
    }
  ],
  "accessibility": [
    "ARIA live role=\"button\" with dynamic aria-busy during loading",
    "Focus-visible ring conforming to EasyUI accessibility tokens",
    "Screen readers announce state changes without losing focus target"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { MorphingButton } from \"@/components/ui/morphing-button\";\n\nexport function Demo() {\n  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');\n\n  const handleClick = () => {\n    setStatus('loading');\n    setTimeout(() => {\n      setStatus('success');\n      setTimeout(() => setStatus('idle'), 2000);\n    }, 1500);\n  };\n\n  return (\n    <MorphingButton\n      status={status}\n      idleText=\"Deploy Project\"\n      loadingText=\"Building Edge...\"\n      successText=\"Deployed ✓\"\n      onClick={handleClick}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/MorphingButton.tsx",
      "type": "registry:ui",
      "target": "components/ui/morphing-button.tsx"
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
