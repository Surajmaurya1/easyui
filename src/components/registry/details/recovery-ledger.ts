// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "recovery-ledger",
  "name": "Recovery Ledger",
  "tagline": "Version history timeline & state recovery ledger",
  "description": "An archival audit timeline and state recovery ledger with chronological snapshot markers, diff inspection, and one-click rollback triggers.",
  "category": "Feedback",
  "badges": [
    "Framer Motion",
    "Timeline",
    "Audit Log",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/recovery-ledger",
  "installPromptHash": "af84e9bd3afd1f7a1515080aba77468a6a726ab1983fcd4a96773c95c5006f33",
  "features": [
    "Chronological version ledger with vertical timeline rail and active head marker",
    "One-click state rollback action with loading animation feedback",
    "Expandable code diff viewer and snapshot metadata inspection drawer",
    "Full keyboard tab access and screen reader timestamp announcements"
  ],
  "props": [
    {
      "name": "entries",
      "type": "LedgerEntry[]",
      "description": "Array of version history records (id, timestamp, action, description, author, details, restorable)"
    },
    {
      "name": "currentEntryId",
      "type": "string",
      "default": "undefined",
      "description": "Active head snapshot identifier"
    },
    {
      "name": "onRestore",
      "type": "(id: string) => Promise<void> | void",
      "default": "undefined",
      "description": "Callback fired on version revert action"
    },
    {
      "name": "onSelect",
      "type": "(id: string) => void",
      "default": "undefined",
      "description": "Callback when an entry is clicked"
    },
    {
      "name": "variant",
      "type": "'timeline' | 'compact'",
      "default": "'timeline'",
      "description": "Display format"
    }
  ],
  "accessibility": [
    "Accessible timestamps formatted for clear assistive technology reading",
    "Proper <button> elements with clear action labels",
    "Contrast compliant with WCAG AA standards"
  ],
  "createdAt": "2026-08-24",
  "usageCode": "import { useState } from \"react\";\nimport { RecoveryLedger } from \"@/components/ui/recovery-ledger\";\n\nexport function Demo() {\n  const [currentId, setCurrentId] = useState('v3');\n  const entries = [\n    { id: 'v3', timestamp: '2m ago', action: 'Schema Migration', description: 'Added tenant_id column to organization tables.', author: 'Alex W.', details: { diff: '+ ALTER TABLE org ADD COLUMN tenant_id UUID;' } },\n    { id: 'v2', timestamp: '1h ago', action: 'API Auth Refactor', description: 'Upgraded JWT verification to RS256 algorithm.', author: 'Sarah K.', details: { diff: '- alg: HS256\n+ alg: RS256' } },\n    { id: 'v1', timestamp: 'Yesterday', action: 'Initial Release', description: 'Base schema initialized in primary region.', author: 'Alex W.' },\n  ];\n\n  return (\n    <RecoveryLedger\n      entries={entries}\n      currentEntryId={currentId}\n      onRestore={async (id) => setCurrentId(id)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/RecoveryLedger.tsx",
      "type": "registry:ui",
      "target": "components/ui/recovery-ledger.tsx"
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
