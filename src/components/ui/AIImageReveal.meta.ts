import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'AI Image Reveal',
  description: 'A particle cloud gathers into a finished image, then resolves from a noisy mosaic into a sharp result.',
  category: 'Motion',
  tagline: 'Reveal generated images through a particle mosaic',
  badges: ['Canvas', 'Framer Motion', 'Reduced Motion', 'AI UI'],
  createdAt: '2026-11-20',
  features: [
    'Animated idle particles while an image is generating',
    'Particles gather into image colors before the image resolves',
    'Handles cross-origin images with a graceful generic color fallback',
    'Honors reduced-motion preferences and pauses offscreen rendering',
    'Includes replay controls and accessible loading status',
  ],
  props: [
    { name: 'src', type: 'string | null', default: 'undefined', description: 'Public image URL to reveal; omit while generating.' },
    { name: 'alt', type: 'string', description: 'Alternative text for the finished image.' },
    { name: 'generating', type: 'boolean', default: 'derived from src', description: 'Force the generating state while an image URL is present.' },
    { name: 'aspectRatio', type: 'number', default: '1', description: 'Width divided by height of the image frame.' },
    { name: 'prompt', type: 'string', description: 'Optional caption displayed below the image.' },
    { name: 'generatingLabel', type: 'string', default: 'Generating…', description: 'Status pill label while waiting or gathering.' },
    { name: 'colors', type: 'string[]', description: 'Optional particle palette as hex colors.' },
    { name: 'density', type: 'number', default: '1', description: 'Particle density multiplier from 0.4 to 2.' },
    { name: 'duration', type: 'number', default: '3.2', description: 'Reveal duration in seconds.' },
    { name: 'crossOrigin', type: '"anonymous" | "use-credentials" | ""', default: '"anonymous"', description: 'Cross-origin mode used when loading the image.' },
    { name: 'onReveal', type: '() => void', description: 'Called after the image reveal completes.' },
    { name: 'onImageError', type: '() => void', description: 'Called if the image URL cannot be loaded.' },
    { name: 'ref', type: 'AIImageRevealHandle', description: 'Exposes replay() to play the reveal again.' },
  ],
  accessibility: [
    'The finished image receives the supplied alt text.',
    'A live status announces image generation and completion.',
    'Canvas decoration is hidden from assistive technology.',
    'Reduced-motion preferences replace particle animation with a calm fallback.',
  ],
  usageCode: `import { AIImageReveal } from "@/components/ui/AIImageReveal";\n\nconst imageUrl = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85";\n\nexport function Demo() {\n  return (\n    <AIImageReveal\n      src={imageUrl}\n      alt="Mountain lake at sunset"\n      prompt="A quiet lake beneath the mountains"\n      aspectRatio={4 / 3}\n    />\n  );\n}`,
};

export default meta;
