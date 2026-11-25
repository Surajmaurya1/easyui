// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "money-card",
  "name": "Money Card",
  "tagline": "Interactive financial wallet card with quick-send contacts and animated transfer sheets",
  "description": "An interactive financial wallet card featuring animated live balance updates, quick-send contact shortcuts, recent transaction history, and responsive modal sheets for sending, receiving, and viewing activity.",
  "category": "Motion",
  "badges": [
    "Financial Card",
    "Quick Send",
    "Interactive Sheet",
    "Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/money-card",
  "installPromptHash": "6cde791e7c1b20e3db3a24eb4b3aa387932abd8d0189f1fa91d47d5f1ceefac4",
  "features": [
    "Animated balance counter utilizing MotionValue and custom formatters for fluid number interpolation",
    "Interactive send and receive sheets with built-in keypad, contact selector, note input, and error handling",
    "Quick-send contact avatars straddling the card boundary with spring-press tactile response",
    "Animated transaction feed displaying directional amount badges and expandable activity list",
    "Settings drawer with toggleable balance masking and copyable personal payment link",
    "Container query architecture ensuring flawless responsiveness across all screen sizes"
  ],
  "props": [
    {
      "name": "user",
      "type": "{ name: string; avatar: string }",
      "default": "DEFAULT_USER",
      "description": "User profile with display name and avatar icon"
    },
    {
      "name": "balance",
      "type": "number",
      "default": "52002.5",
      "description": "Headline account balance in major currency units"
    },
    {
      "name": "contacts",
      "type": "Contact[]",
      "default": "DEFAULT_CONTACTS",
      "description": "List of quick-send contacts with avatars and tints"
    },
    {
      "name": "transactions",
      "type": "Transaction[]",
      "default": "DEFAULT_TRANSACTIONS",
      "description": "List of recent transactions sorted newest first"
    },
    {
      "name": "onSend",
      "type": "(req: TransferRequest) => Promise<void>",
      "default": "undefined",
      "description": "Async handler called upon submitting a send transfer"
    },
    {
      "name": "onRequest",
      "type": "(req: TransferRequest) => Promise<void>",
      "default": "undefined",
      "description": "Async handler called upon submitting a request transfer"
    },
    {
      "name": "onViewAll",
      "type": "() => void",
      "default": "undefined",
      "description": "Optional callback overriding default activity list opening"
    },
    {
      "name": "currency",
      "type": "string",
      "default": "'USD'",
      "description": "ISO currency symbol used for formatted monetary values"
    },
    {
      "name": "locale",
      "type": "string",
      "default": "'en-US'",
      "description": "Locale string for number and date formatting"
    },
    {
      "name": "paymentLink",
      "type": "string",
      "default": "'pay.example/ana'",
      "description": "Personal payment link displayed on receive and settings sheets"
    },
    {
      "name": "className",
      "type": "string",
      "default": "''",
      "description": "Optional CSS class overrides for the outer container"
    }
  ],
  "accessibility": [
    "Accessible dialog sheets with focus traps, Escape key dismissal, and backdrop click handlers",
    "Polite aria-live region announcing balance changes and masked privacy states",
    "Touch-friendly drag dismiss handles on mobile bottom sheets with reduced motion alternatives",
    "Semantic role=\"switch\" for privacy balance toggle with visible keyboard focus rings"
  ],
  "createdAt": "2026-10-14",
  "usageCode": "import { MoneyCard } from \"@/components/ui/money-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full py-12 flex justify-center\">\n      <MoneyCard\n        balance={52002.5}\n        onSend={async ({ contact, amount }) => {\n          console.log(`Sent ${amount} to ${contact.name}`);\n        }}\n        onRequest={async ({ contact, amount }) => {\n          console.log(`Requested ${amount} from ${contact.name}`);\n        }}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/MoneyCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/money-card.tsx"
    }
  ]
};

export default component;
