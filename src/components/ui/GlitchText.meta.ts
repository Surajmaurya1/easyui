import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "Glitch Text",
  description:
    "A multi-modal cybernetic glitch typography component featuring 5 distinct animation variants (RGB split chromatic aberration, cyberpunk clip-slicing, analog VHS tracking loss, matrix rune scramble decode, and electrical voltage surge).",
  category: "Motion",
  tagline: "Cybernetic glitch typography with 5 distinct kinetic animation modes",
  badges: ["Glitch", "Cyberpunk", "Kinetic Typography", "Interactive"],
  createdAt: "2026-09-20",
  features: [
    "5 distinct visual glitch modes: 'rgb-split', 'slice', 'vhs', 'scramble', and 'pulse'",
    "Interactive trigger options: 'continuous' periodic looping, on 'hover', or interactive 'click' burst",
    "Dual chromatic color customization (color1/color2, with backward-compatible greenColor/purpleColor)",
    "Calibrated multi-tiered intensity scaling: 'low', 'medium', and 'high'",
    "Screen-reader safe: rendered as unbroken native text with aria-hidden on decorative duplicate slices",
    "Full prefers-reduced-motion compliance freezing all displacements into clean resting text",
    "Polymorphic rendering via the 'as' prop ('span', 'h1', 'h2', 'p', etc.) with full ref forwarding",
  ],
  props: [
    {
      name: "text",
      type: "string",
      description: "The text string to animate with the cybernetic glitch effects",
    },
    {
      name: "variant",
      type: "'rgb-split' | 'slice' | 'vhs' | 'scramble' | 'pulse'",
      default: "'rgb-split'",
      description: "Visual animation mode: chromatic aberration, horizontal slicing, VHS jitter, matrix decode, or voltage pulse",
    },
    {
      name: "trigger",
      type: "'continuous' | 'hover' | 'click'",
      default: "'continuous'",
      description: "Interaction trigger mode governing when the glitch animation activates",
    },
    {
      name: "color1",
      type: "string",
      default: "'#00e571'",
      description: "Primary chromatic aberration color (alias: greenColor)",
    },
    {
      name: "color2",
      type: "string",
      default: "'#8b00ff'",
      description: "Secondary chromatic aberration color (alias: purpleColor)",
    },
    {
      name: "intensity",
      type: "'low' | 'medium' | 'high'",
      default: "'medium'",
      description: "Glitch magnitude scaling multiplier for displacement, skew, and jitter",
    },
    {
      name: "duration",
      type: "number",
      default: "0.5",
      description: "Duration in seconds of an active glitch burst cycle",
    },
    {
      name: "repeatDelay",
      type: "number",
      default: "2.5",
      description: "Rest interval in seconds between continuous glitch bursts",
    },
    {
      name: "as",
      type: "keyof JSX.IntrinsicElements",
      default: "'span'",
      description: "HTML tag to render as (e.g. 'h1', 'h2', 'span', 'p', 'div')",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for font size, weight, color, and positioning",
    },
  ],
  accessibility: [
    "Decorative split layers and slice artifacts are marked with aria-hidden='true' so screen readers read the text clearly once",
    "Under prefers-reduced-motion: reduce, all jitter, slice displacement, and color oscillations are neutralized",
  ],
  usageCode: `import { GlitchText } from "@/components/ui/glitch-text";

export function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* 1. RGB Split (Chromatic Aberration) */}
      <GlitchText
        as="h2"
        text="CHROMATIC SPLIT"
        variant="rgb-split"
        color1="#00f0ff"
        color2="#ff0055"
        className="text-4xl font-black tracking-tight"
      />

      {/* 2. Cyberpunk Slicing */}
      <GlitchText
        as="h2"
        text="CYBERPUNK SLICE"
        variant="slice"
        color1="#22c55e"
        color2="#a855f7"
        className="text-4xl font-black tracking-tight"
      />

      {/* 3. Matrix Scramble Decode on Hover */}
      <GlitchText
        as="span"
        text="SYSTEM BREACH DETECTED"
        variant="scramble"
        trigger="hover"
        color1="#10b981"
        className="text-lg font-mono text-emerald-400 cursor-pointer"
      />
    </div>
  );
}`,
};

export default meta;
