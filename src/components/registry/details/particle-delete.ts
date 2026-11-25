// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "particle-delete",
  "name": "Particle Delete",
  "tagline": "Physics-driven pixel particle dissolution delete animation",
  "description": "Premium physics-driven particle dissolution delete animation that rasterizes components into thousands of authentic tiny pixels and disperses them smoothly before state removal.",
  "category": "Motion",
  "badges": [
    "HTML5 Canvas",
    "Spring Physics",
    "High-DPI",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/particle-delete",
  "installPromptHash": "9fe3e5be7cfa75a0f3ed1d3cde834ab81724a2f24ed129356318b017fcf2af5d",
  "features": [
    "Authentic pixel capture inherits real component colors and typography",
    "Hardware-accelerated 60 FPS Canvas rendering with zero DOM overhead",
    "Configurable physics: duration, explosion force, drag, and dissolution spread",
    "Full accessibility support with automatic prefers-reduced-motion fallback",
    "Available as direct utility particleDelete(), hook useParticleDelete(), or <ParticleDeleteContainer /> wrapper"
  ],
  "props": [
    {
      "name": "onDelete",
      "type": "() => void",
      "description": "Callback invoked after the particle dissolution finishes to remove state"
    },
    {
      "name": "options.duration",
      "type": "number",
      "default": "850",
      "description": "Animation duration in milliseconds"
    },
    {
      "name": "options.force",
      "type": "number",
      "default": "1.0",
      "description": "Outward velocity multiplier for particle dispersion"
    },
    {
      "name": "options.particleSize",
      "type": "number",
      "default": "1.5",
      "description": "Visual diameter of individual particles in pixels"
    },
    {
      "name": "options.dissolvePattern",
      "type": "'center-first' | 'edges-first' | 'uniform' | 'random'",
      "default": "'center-first'",
      "description": "Dissolution spread delay algorithm"
    },
    {
      "name": "options.sampleStep",
      "type": "number",
      "default": "2 (desktop) / 3 (mobile)",
      "description": "Pixel sampling step interval"
    }
  ],
  "accessibility": [
    "Automatically honors prefers-reduced-motion: reduce with immediate subtle fade exit",
    "Delete trigger buttons maintain clear ARIA labels and keyboard focus ring states",
    "Canvas overlay is marked with aria-hidden=\"true\" and pointer-events: none"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { ParticleDeleteContainer, useParticleDelete, particleDelete } from \"@/components/ui/particle-delete\";\nimport { Trash2 } from \"lucide-react\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', name: 'Database Snapshot #409' },\n    { id: '2', name: 'Redis Cache Layer' }\n  ]);\n\n  const handleDelete = (id: string) => {\n    setItems((prev) => prev.filter((i) => i.id !== id));\n  };\n\n  return (\n    <div className=\"space-y-3\">\n      {items.map((item) => (\n        <ParticleDeleteContainer\n          key={item.id}\n          onDelete={() => handleDelete(item.id)}\n          className=\"p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center justify-between\"\n        >\n          {({ isDeleting, handleDelete: triggerDelete }) => (\n            <>\n              <span className=\"text-sm font-medium text-white\">{item.name}</span>\n              <button\n                type=\"button\"\n                onClick={triggerDelete}\n                disabled={isDeleting}\n                className=\"p-2 rounded-lg bg-[#141414] hover:bg-rose-950/40 text-[#888888] hover:text-rose-400 border border-[#262626] transition-colors\"\n              >\n                <Trash2 className=\"w-4 h-4\" />\n              </button>\n            </>\n          )}\n        </ParticleDeleteContainer>\n      ))}\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/ParticleDelete.tsx",
      "type": "registry:ui",
      "target": "components/ui/particle-delete.tsx"
    }
  ]
};

export default component;
