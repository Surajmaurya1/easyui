// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "sign-up",
  "name": "Sign Up",
  "tagline": "Multi-step capable user registration with strength telemetry",
  "description": "A comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.",
  "category": "Auth",
  "badges": [
    "Registration",
    "Forms",
    "Password Strength",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sign-up",
  "installPromptHash": "1da945d1c5c521d5640501b56146b5b3045167154b4303348218578619125e38",
  "features": [
    "Integrated live 4-tier password strength indicator bar",
    "Password confirmation matching validation",
    "Interactive eye icons for show/hide password visibility",
    "Terms of service and privacy agreement checkbox validation",
    "Customizable social onboarding SSO buttons (GitHub & Google)",
    "Submitting state with monochrome button spinner",
    "Responsive layout with atmospheric glow and dark slate tokens"
  ],
  "props": [
    {
      "name": "title",
      "type": "string",
      "default": "'Create an account'",
      "description": "Primary card title text"
    },
    {
      "name": "description",
      "type": "string",
      "default": "'Join EasyUI to access components and templates'",
      "description": "Subtitle description below the title"
    },
    {
      "name": "logo",
      "type": "React.ReactNode",
      "default": "<SparklesIcon />",
      "description": "Brand badge or logo displayed at the top"
    },
    {
      "name": "error",
      "type": "string | null",
      "default": "null",
      "description": "Server-side registration error banner message"
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "default": "false",
      "description": "Submitting state displaying loader on submit button"
    },
    {
      "name": "onSubmit",
      "type": "(data: SignUpFormData) => void",
      "default": "undefined",
      "description": "Form submission callback with name, email, password, confirmPassword, agreeToTerms"
    },
    {
      "name": "onSignInClick",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback for switching to login view"
    },
    {
      "name": "showSocialSignUp",
      "type": "boolean",
      "default": "true",
      "description": "Toggles GitHub and Google SSO buttons"
    },
    {
      "name": "requireConfirmPassword",
      "type": "boolean",
      "default": "true",
      "description": "Includes confirmation password field and checks match"
    },
    {
      "name": "termsText",
      "type": "React.ReactNode",
      "default": "Default Terms & Privacy links",
      "description": "Custom agreement label text or JSX"
    }
  ],
  "accessibility": [
    "Accessible input labels with required indicators and autocomplete values (name, email, new-password)",
    "Role=\"alert\" for validation errors with smooth Framer Motion spring entrances",
    "Keyboard navigable form submission and checkbox selection",
    "Sky-400 focus ring on all focusable controls"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { SignUp } from \"@/components/ui/sign-up\";\n\nexport function Demo() {\n  const handleSignUp = async (data: any) => {\n    console.log(\"Registering account:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <SignUp\n        onSubmit={handleSignUp}\n        onSignInClick={() => alert(\"Redirect to sign in\")}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/SignUp.tsx",
      "type": "registry:ui",
      "target": "components/ui/sign-up.tsx"
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
    },
    {
      "path": "src/components/ui/Button.tsx",
      "type": "registry:ui",
      "target": "components/ui/button.tsx"
    },
    {
      "path": "src/components/ui/Form.tsx",
      "type": "registry:ui",
      "target": "components/ui/form.tsx"
    }
  ],
  "featured": true
};

export default component;
