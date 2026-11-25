// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "ai-image-reveal",
  "name": "AI Image Reveal",
  "tagline": "Reveal generated images through a particle mosaic",
  "description": "A particle cloud gathers into a finished image, then resolves from a noisy mosaic into a sharp result.",
  "category": "Motion",
  "badges": [
    "Canvas",
    "Framer Motion",
    "Reduced Motion",
    "AI UI"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ai-image-reveal",
  "installPromptHash": "78c0fede832a4e68d19b760f4d2c9c04a49d093a51831f71e6eb051f08f23b27",
  "features": [
    "Animated idle particles while an image is generating",
    "Particles gather into image colors before the image resolves",
    "Handles cross-origin images with a graceful generic color fallback",
    "Honors reduced-motion preferences and pauses offscreen rendering",
    "Includes replay controls and accessible loading status"
  ],
  "props": [
    {
      "name": "src",
      "type": "string | null",
      "default": "undefined",
      "description": "Public image URL to reveal; omit while generating."
    },
    {
      "name": "alt",
      "type": "string",
      "description": "Alternative text for the finished image."
    },
    {
      "name": "generating",
      "type": "boolean",
      "default": "derived from src",
      "description": "Force the generating state while an image URL is present."
    },
    {
      "name": "aspectRatio",
      "type": "number",
      "default": "1",
      "description": "Width divided by height of the image frame."
    },
    {
      "name": "prompt",
      "type": "string",
      "description": "Optional caption displayed below the image."
    },
    {
      "name": "generatingLabel",
      "type": "string",
      "default": "Generating…",
      "description": "Status pill label while waiting or gathering."
    },
    {
      "name": "colors",
      "type": "string[]",
      "description": "Optional particle palette as hex colors."
    },
    {
      "name": "density",
      "type": "number",
      "default": "1",
      "description": "Particle density multiplier from 0.4 to 2."
    },
    {
      "name": "duration",
      "type": "number",
      "default": "3.2",
      "description": "Reveal duration in seconds."
    },
    {
      "name": "crossOrigin",
      "type": "\"anonymous\" | \"use-credentials\" | \"\"",
      "default": "\"anonymous\"",
      "description": "Cross-origin mode used when loading the image."
    },
    {
      "name": "onReveal",
      "type": "() => void",
      "description": "Called after the image reveal completes."
    },
    {
      "name": "onImageError",
      "type": "() => void",
      "description": "Called if the image URL cannot be loaded."
    },
    {
      "name": "ref",
      "type": "AIImageRevealHandle",
      "description": "Exposes replay() to play the reveal again."
    }
  ],
  "accessibility": [
    "The finished image receives the supplied alt text.",
    "A live status announces image generation and completion.",
    "Canvas decoration is hidden from assistive technology.",
    "Reduced-motion preferences replace particle animation with a calm fallback."
  ],
  "createdAt": "2026-11-20",
  "usageCode": "import { AIImageReveal } from \"@/components/ui/AIImageReveal\";\n\nconst imageUrl = \"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85\";\n\nexport function Demo() {\n  return (\n    <AIImageReveal\n      src={imageUrl}\n      alt=\"Mountain lake at sunset\"\n      prompt=\"A quiet lake beneath the mountains\"\n      aspectRatio={4 / 3}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/AIImageReveal.tsx",
      "type": "registry:ui",
      "target": "components/ui/ai-image-reveal.tsx"
    }
  ]
};

export default component;
