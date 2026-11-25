// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "code-snippet-deck",
  "name": "Code Snippet Deck",
  "tagline": "Multi-language code runner snippet deck with live variable tuning",
  "description": "An interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.",
  "category": "Buttons",
  "badges": [
    "Code Runner",
    "Multi-Runtime",
    "Live Customizer"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/code-snippet-deck",
  "installPromptHash": "48b26d4f1deba8e975009cdc3bcb3a05216fb6ce2ca677ca7bb9f96e120e8632",
  "features": [
    "Seamless multi-runtime tab switching (cURL, TypeScript, Python, Go, Rust)",
    "Dynamic parameter tuning drawer that updates generated code in real time",
    "Configurable line numbers and selective line highlighting",
    "macOS terminal-inspired window header with traffic dots and copy system",
    "Zero layout shift spring transition on tab changes"
  ],
  "props": [
    {
      "name": "snippets",
      "type": "SnippetItem[]",
      "default": "[]",
      "description": "Collection of language snippets and generator functions"
    },
    {
      "name": "parameters",
      "type": "SnippetParameter[]",
      "default": "[]",
      "description": "Configurable runtime variables (checkboxes, dropdowns, inputs)"
    },
    {
      "name": "defaultLanguage",
      "type": "string",
      "default": "snippets[0]?.language",
      "description": "Initially selected language key"
    },
    {
      "name": "showLineNumbers",
      "type": "boolean",
      "default": "true",
      "description": "Whether to display code line numbering"
    },
    {
      "name": "showWindowBar",
      "type": "boolean",
      "default": "true",
      "description": "Whether to render macOS window bar header"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Custom CSS container classes"
    }
  ],
  "accessibility": [
    "Semantic region container with ARIA code viewer roles",
    "Accessible tablist and tab roles with keyboard navigation",
    "High contrast accessible code text styling"
  ],
  "createdAt": "2026-08-19",
  "usageCode": "import { CodeSnippetDeck } from \"@/components/ui/code-snippet-deck\";\n\nconst snippets = [\n  {\n    language: \"typescript\",\n    label: \"TypeScript\",\n    filename: \"client.ts\",\n    highlightLines: [4, 5],\n    code: (p: any) => `import { EasyClient } from \"@easyui/sdk\";\n\nconst client = new EasyClient({\n  apiKey: \"${p.apiKey || \"sk_live_9981\"}\",\n  streaming: ${p.stream ? \"true\" : \"false\"},\n});\n\nconst response = await client.completions.create({\n  model: \"easy-4o\",\n  prompt: \"Generate modern dark UI\",\n});`,\n  },\n  {\n    language: \"curl\",\n    label: \"cURL\",\n    filename: \"request.sh\",\n    code: (p: any) => `curl https://api.easyui.dev/v1/completions \\\n  -H \"Authorization: Bearer ${p.apiKey || \"sk_live_9981\"}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"easy-4o\", \"stream\": ${p.stream ? \"true\" : \"false\"}}'`,\n  },\n];\n\nconst parameters = [\n  { id: \"stream\", label: \"Stream response\", type: \"boolean\" as const, defaultValue: true },\n  { id: \"apiKey\", label: \"API Key\", type: \"text\" as const, defaultValue: \"sk_live_demo\" },\n];\n\nexport function Demo() {\n  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/CodeSnippetDeck.tsx",
      "type": "registry:ui",
      "target": "components/ui/code-snippet-deck.tsx"
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
