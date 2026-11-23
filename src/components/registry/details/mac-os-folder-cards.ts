// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "mac-os-folder-cards",
  "name": "macOS Folder Cards",
  "tagline": "macOS folder icon with fluid spring card reveal",
  "description": "An authentic porcelain-white macOS Finder folder icon that unrolls interactive cards with fluid Apple spring physics.",
  "category": "Motion",
  "badges": [
    "macOS Folder",
    "Spring Morphing",
    "Expandable",
    "Minimal"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/mac-os-folder-cards",
  "installPromptHash": "4f05afc7790716e37d6c2d0fa47f0dc20d713ebdee9f1d11684278c32498ad61",
  "features": [
    "Porcelain-white macOS folder silhouette with 3D flap hinge and cards peeking from pocket",
    "Interactive hover parallax lifts cards and tilts folder flap in 3D perspective",
    "Opens into a minimal, seamless card grid with Apple fluid spring easing",
    "Crisp pure white icons and EasyUI dark surface harmony"
  ],
  "props": [
    {
      "name": "folderTitle",
      "type": "string",
      "default": "'Components'",
      "description": "Title label of the folder icon"
    },
    {
      "name": "folderCategory",
      "type": "string",
      "default": "'Pipeline'",
      "description": "Category breadcrumb for expanded header"
    },
    {
      "name": "items",
      "type": "MacOSFolderCardItem[]",
      "default": "demo items",
      "description": "Cards rendered in the expanded grid"
    },
    {
      "name": "defaultOpen",
      "type": "boolean",
      "default": "false",
      "description": "Initial open/expanded state"
    }
  ],
  "accessibility": [
    "Uses aria-expanded state and keyboard activation (Enter/Space/Escape)",
    "Reduced motion replaces 3D transforms with clean opacity transitions"
  ],
  "createdAt": "2026-08-28",
  "usageCode": "import { MacOSFolderCards } from \"@/components/ui/macos-folder-cards\";\n\nexport function Demo() {\n  return (\n    <MacOSFolderCards\n      folderTitle=\"Components\"\n      folderCategory=\"Pipeline\"\n      items={[\n        { id: '1', title: 'Registry Sync', description: 'Catalog reacts to source changes.', meta: '01' },\n        { id: '2', title: 'SEO Audit', description: 'Metadata verified before release.', meta: '02' },\n      ]}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/MacOSFolderCards.tsx",
      "type": "registry:ui",
      "target": "components/ui/mac-os-folder-cards.tsx"
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
