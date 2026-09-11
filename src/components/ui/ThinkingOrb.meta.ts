import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Thinking Orb',
  description: 'Minimalist monochrome spherical particle vortex with orbital physics, pure black-and-white luminous styling, and 9 cognitive state deformations.',
  category: 'Motion',
  tagline: 'Minimalist monochrome particle vortex for AI interfaces',
  badges: ['HTML5 Canvas', 'Monochrome', 'Orbital Physics', 'Reduced Motion', 'AI Indicator'],
  createdAt: '2026-09-11',
  features: [
    'Pure monochrome aesthetic (clean white/silver on dark, deep obsidian on light) with zero colors',
    '9 unique cognitive states: working, searching, solving, listening, connecting, weaving, composing, breathing, and shaping',
    'GPU-accelerated Canvas rendering with 3D spherical trigonometry and perspective projection',
    'Adaptive particle density scaling automatically calibrated to size',
    'Full accessibility support with automatic prefers-reduced-motion fallback',
    'Minimalist optical core with subtle particle motion trailing and star sparkles',
  ],
  props: [
    {
      name: 'state',
      type: "'working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'",
      default: "'working'",
      description: 'Cognitive animation behavior preset and mathematical deformation pattern',
    },
    {
      name: 'size',
      type: 'number',
      default: '64',
      description: 'Diameter of the canvas orb in pixels (e.g. 64 for avatar/assistant, 20 for inline text)',
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Animation playback speed multiplier (1 = standard, 2 = 2x faster, 0.5 = slow)',
    },
    {
      name: 'dark',
      type: 'boolean',
      default: 'true',
      description: 'Dark mode tuning: true renders luminous white particles, false renders crisp dark graphite particles',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Freezes animation frame progression while preserving current particle positions',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional CSS class string applied to the outer container',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: 'undefined',
      description: 'Inline styles passed directly to the container span',
    },
    {
      name: 'aria-label',
      type: 'string',
      default: "'${state} orb'",
      description: 'Accessible label for screen readers announcing the orb state',
    },
  ],
  accessibility: [
    'Canvas is marked with aria-hidden="true" while wrapper span maintains descriptive ARIA role and label',
    'Automatically honors prefers-reduced-motion by freezing time-based coordinate progression',
    'Zero layout shift using explicit inline-flex dimensions and flex-shrink protection',
  ],
  usageCode: `import { ThinkingOrb } from "@/components/ui/thinking-orb";
import { useState } from "react";

export function Demo() {
  const [state, setState] = useState<
    "working" | "searching" | "solving" | "listening" | "connecting" | "weaving" | "composing" | "breathing" | "shaping"
  >("working");

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#09090b] border border-[#27272a]">
      <ThinkingOrb state={state} size={72} speed={1} dark={true} />
      <div className="flex flex-wrap justify-center gap-1.5">
        {(["working", "searching", "solving", "listening", "connecting", "weaving", "composing", "breathing", "shaping"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={\`px-3 py-1 text-xs rounded-lg transition-colors \${
              state === s
                ? "bg-white text-black font-semibold"
                : "bg-[#18181b] text-neutral-400 hover:text-white"
            }\`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}`,
};

export default meta;
