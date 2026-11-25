// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "form",
  "name": "Form",
  "tagline": "Composable, accessible form primitives and controls",
  "description": "A modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.",
  "category": "Forms",
  "badges": [
    "Forms",
    "Accessible",
    "Spring Motion",
    "Tailwind"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/form",
  "installPromptHash": "d474a9554051e7b16a222d3c0b1d53946dc531c4221a644ecd9d03c4da0226f6",
  "features": [
    "Modular layout primitives: Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage",
    "Comprehensive controls: Input, Textarea, Select, Checkbox, RadioGroup, Switch",
    "Spring-animated validation errors and password visibility toggle",
    "Tactile check, radio dot, and toggle switch spring physics",
    "Accessible ARIA semantics, required asterisks, and keyboard navigation",
    "Strict monochrome dark styling matching EasyUI surface elevation tokens"
  ],
  "props": [
    {
      "name": "onSubmit",
      "type": "(e: FormEvent) => void",
      "default": "undefined",
      "description": "Form submission handler"
    },
    {
      "name": "error",
      "type": "string | boolean",
      "default": "undefined",
      "description": "Validation error text or boolean trigger"
    },
    {
      "name": "showPasswordToggle",
      "type": "boolean",
      "default": "false",
      "description": "Enables eye icon toggle for password inputs"
    },
    {
      "name": "required",
      "type": "boolean",
      "default": "false",
      "description": "Displays red asterisk and enforces requirement"
    },
    {
      "name": "leftIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Leading icon inside input fields"
    },
    {
      "name": "rightIcon",
      "type": "React.ReactNode",
      "default": "undefined",
      "description": "Trailing icon inside input fields"
    }
  ],
  "accessibility": [
    "Semantic label-input association with generated IDs",
    "ARIA role=\"alert\" on animated validation messages",
    "role=\"switch\" and role=\"radiogroup\" with proper aria-checked attributes",
    "Sky-400 focus ring on all interactive focusable elements"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from \"@/components/ui/form\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [email, setEmail] = useState(\"\");\n  const [error, setError] = useState(\"\");\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!email.includes(\"@\")) {\n      setError(\"Please enter a valid email address.\");\n    } else {\n      setError(\"\");\n    }\n  };\n\n  return (\n    <Form onSubmit={handleSubmit} className=\"max-w-sm\">\n      <FormItem>\n        <FormLabel required>Email Address</FormLabel>\n        <FormControl>\n          <Input\n            type=\"email\"\n            placeholder=\"you@company.com\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            error={!!error}\n          />\n        </FormControl>\n        <FormDescription>We will never share your email.</FormDescription>\n        <FormMessage error={error} />\n      </FormItem>\n      <Button type=\"submit\" variant=\"primary\" fullWidth>\n        Submit\n      </Button>\n    </Form>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/Form.tsx",
      "type": "registry:ui",
      "target": "components/ui/form.tsx"
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
  ],
  "featured": true
};

export default component;
