// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "login",
  "name": "Login",
  "tagline": "Refined authentication card with validation & social SSO",
  "description": "A production-ready authentication card built with the EasyUI form system, featuring password show/hide, remember me, validation states, and social logins.",
  "category": "Auth",
  "badges": [
    "Authentication",
    "Forms",
    "Responsive",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/login",
  "installPromptHash": "b3aa0b36366e3ccc081c4078d14361e3b6896aed263418db802b5dc9092a3a30",
  "features": [
    "Built with EasyUI Form & Button architecture",
    "Interactive password visibility toggle with Lucide icons",
    "Form validation for required fields & email regex format",
    "Spring-animated error banners and inline field alerts",
    "Configurable social SSO buttons (GitHub & Google)",
    "Remember me checkbox and \"Forgot password?\" callback hooks",
    "Responsive mobile/desktop dimensions with atmospheric glow header"
  ],
  "props": [
    {
      "name": "title",
      "type": "string",
      "default": "'Welcome back'",
      "description": "Primary card title text"
    },
    {
      "name": "description",
      "type": "string",
      "default": "'Sign in to access your EasyUI workspace'",
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
      "description": "Server-side or authentication error banner message"
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "default": "false",
      "description": "Submitting state displaying loader on submit button"
    },
    {
      "name": "onSubmit",
      "type": "(data: LoginFormData) => void",
      "default": "undefined",
      "description": "Form submission callback with email, password, rememberMe"
    },
    {
      "name": "onForgotPassword",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback when forgot password link is clicked"
    },
    {
      "name": "onSignUpClick",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback for secondary sign up switch action"
    },
    {
      "name": "showSocialLogins",
      "type": "boolean",
      "default": "true",
      "description": "Toggles GitHub and Google SSO buttons"
    },
    {
      "name": "onSocialLogin",
      "type": "(provider: 'github' | 'google' | 'apple') => void",
      "default": "undefined",
      "description": "Callback when social login button is pressed"
    }
  ],
  "accessibility": [
    "Accessible input labels and autocomplete attributes (email, current-password)",
    "ARIA alert role on dynamic validation and server error banners",
    "Proper form submission handling with Enter key activation",
    "Sky-400 focus ring on all interactive elements"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { Login } from \"@/components/ui/login\";\n\nexport function Demo() {\n  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {\n    console.log(\"Authenticating:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <Login\n        onSubmit={handleLogin}\n        onForgotPassword={() => alert(\"Redirect to forgot password\")}\n        onSignUpClick={() => alert(\"Redirect to sign up\")}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/Login.tsx",
      "type": "registry:ui",
      "target": "components/ui/login.tsx"
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
