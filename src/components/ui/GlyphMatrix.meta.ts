import type { EasyUIComponentMeta } from '../../types/component';

export const GlyphMatrixMeta: EasyUIComponentMeta = {

  title: 'Glyph Matrix',
  tagline: 'Canvas-driven Matrix digital rain background with glowing phosphor trails.',
  description: 'A high-performance, canvas-driven Matrix digital rain background effect featuring streaming Katakana and numeric glyphs, glowing head highlights, decaying phosphor trails, and interactive cursor disturbances.',
  category: 'Motion',
  badges: ['Canvas', 'Background Effect', 'Interactive'],
  usageCode: `<GlyphMatrix
  className="h-[500px] w-full rounded-2xl"
  color="#00FF66"
  headColor="#FFFFFF"
  speed={1.2}
  interactive
>
  <div className="text-center">
    <h2 className="text-3xl font-bold text-white tracking-tight">Wake up, Neo...</h2>
    <p className="text-emerald-400/80 text-sm mt-2 font-mono">The Matrix has you.</p>
  </div>
</GlyphMatrix>`,
  props: [
    { name: 'fontSize', type: 'number', default: '16', description: 'Font size in pixels for the glyph grid' },
    { name: 'color', type: 'string', default: "'#00FF66'", description: 'Primary rain stream color' },
    { name: 'headColor', type: 'string', default: "'#FFFFFF'", description: 'Color of the leading head glyph in each column' },
    { name: 'backgroundColor', type: 'string', default: "'#050505'", description: 'Background color used for trail fading' },
    { name: 'speed', type: 'number', default: '1', description: 'Fall speed multiplier' },
    { name: 'fadeRate', type: 'number', default: '0.06', description: 'Decay rate per frame for phosphor trails' },
    { name: 'interactive', type: 'boolean', default: 'true', description: 'Whether mouse proximity disturbs and accelerates glyph streams' },
    { name: 'paused', type: 'boolean', default: 'false', description: 'Pauses stream animation' },
    { name: 'fullPage', type: 'boolean', default: 'false', description: 'Fixes canvas to fill the entire viewport as a full-page background' },
    { name: 'opacity', type: 'number', default: '1', description: 'Overall opacity of the matrix backdrop' },
    { name: 'children', type: 'React.ReactNode', description: 'Optional content layered over the matrix background' },
  ],
  accessibility: [
    'Canvas is marked aria-hidden="true" to keep screen readers focused on content',
    'Falls back to a static ambient glyph array under prefers-reduced-motion',
    'Pauses rendering automatically when scrolled out of viewport via IntersectionObserver',
    'Children layered on top retain full keyboard access and standard browser focus',
  ],
  features: [
    'GPU-friendly HTML5 Canvas implementation running at silky 60fps',
    'Phosphor decay trails rendered via progressive alpha blending',
    'Authentic Katakana, matrix operators, and hexadecimal character set',
    'Interactive pointer disturbance causing streams near the cursor to flare and accelerate',
    'Supports both bounded containers and full-page fixed background backdrops',
  ],
  createdAt: '2026-09-16',
};

export default GlyphMatrixMeta;
