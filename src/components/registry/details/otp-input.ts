// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "otp-input",
  "name": "OTP Input",
  "tagline": "Auto-advancing digit boxes with pop feedback",
  "description": "An accessible one-time-passcode input made of auto-advancing digit boxes, each with a spring-driven pop animation on entry, built with Framer Motion and Tailwind CSS.",
  "category": "Forms",
  "badges": [
    "Motion",
    "Tailwind",
    "Forms"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/otp-input",
  "installPromptHash": "27852211c492764e3519ff286cd188b5c9d2b622f2938a9def6fb4e92b405ddb",
  "features": [
    "Auto-advances focus to the next box as each digit is entered",
    "Backspace clears the current digit or steps back into the previous box",
    "Full-code paste support, distributing pasted digits across all boxes",
    "Per-digit spring pop animation on entry for tactile feedback",
    "Works as a controlled or uncontrolled component"
  ],
  "props": [
    {
      "name": "length",
      "type": "number",
      "default": "6",
      "description": "Number of digit boxes to render"
    },
    {
      "name": "value",
      "type": "string",
      "default": "undefined",
      "description": "Controlled value; omit to let the component manage its own state"
    },
    {
      "name": "onChange",
      "type": "(value: string) => void",
      "default": "undefined",
      "description": "Called with the joined code whenever any digit changes"
    },
    {
      "name": "onComplete",
      "type": "(value: string) => void",
      "default": "undefined",
      "description": "Called once with the full code when every box is filled"
    },
    {
      "name": "autoFocus",
      "type": "boolean",
      "default": "false",
      "description": "Focuses the first box on mount"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables all digit boxes"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Classes applied to the wrapping group element"
    },
    {
      "name": "boxClassName",
      "type": "string",
      "default": "undefined",
      "description": "Classes applied to each individual digit box"
    }
  ],
  "accessibility": [
    "Wrapping element uses role=\"group\" with an aria-label describing the field",
    "Each digit box has its own aria-label (e.g. \"Digit 3 of 6\") for screen readers",
    "Full keyboard support: typing advances focus, Backspace clears/steps back, Left/Right arrows move between boxes",
    "autoComplete=\"one-time-code\" on the first box enables SMS autofill on supporting platforms"
  ],
  "createdAt": "2026-09-09T12:15:29.957Z",
  "usageCode": "import { OTPInput } from \"@/components/ui/otp-input\";\n\nexport function Demo() {\n  return (\n    <OTPInput\n      length={6}\n      autoFocus\n      onComplete={(code) => console.log(\"Submitted code:\", code)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/OtpInput.tsx",
      "type": "registry:ui",
      "target": "components/ui/otp-input.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
