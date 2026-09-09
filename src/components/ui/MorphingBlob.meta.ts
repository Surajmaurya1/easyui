import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Morphing Blob',
  description:
    'An ambient, accessible SVG blob background that continuously morphs with spring physics and subtly follows the cursor for a fluid, interactive visual effect.',
  category: 'Motion',
  tagline: 'Fluid spring-physics blob with cursor interaction',
  badges: ['Motion', 'SVG', 'Interactive'],
  createdAt: '2026-09-09T12:15:29.957Z',

  features: [
    'Spring-physics anchor points with Catmull-Rom smoothing for a fluid, organic shape',
    'Smooth cursor-follow interaction with configurable strength and responsiveness',
    'Imperative per-frame path updates for smooth animation without unnecessary React re-renders',
    'Independently configurable SVG width and height',
    'Customizable point count, radius, variance, speed, stiffness, and damping',
    'Configurable gradient start and end colors',
    'Automatically respects the prefers-reduced-motion accessibility preference',
    'Pointer-events disabled by default so the decorative blob never blocks foreground interactions',
  ],

  props: [
    {
      name: 'width',
      type: 'number',
      default: '400',
      description: 'Width of the SVG viewport in pixels',
    },
    {
      name: 'height',
      type: 'number',
      default: '400',
      description: 'Height of the SVG viewport in pixels',
    },
    {
      name: 'points',
      type: 'number',
      default: '8',
      description: 'Number of anchor points used to construct the blob shape',
    },
    {
      name: 'baseRadius',
      type: 'number',
      default: '120',
      description: 'Resting radius of the blob in pixels',
    },
    {
      name: 'variance',
      type: 'number',
      default: '28',
      description:
        'Maximum radius variation applied to each anchor point during morphing',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.7',
      description:
        'Controls how frequently new random morph targets are generated',
    },
    {
      name: 'stiffness',
      type: 'number',
      default: '45',
      description:
        'Spring stiffness controlling how strongly anchor points move toward their targets',
    },
    {
      name: 'damping',
      type: 'number',
      default: '9',
      description:
        'Spring damping controlling the resistance and smoothness of the blob motion',
    },
    {
      name: 'cursorFollow',
      type: 'boolean',
      default: 'true',
      description:
        'Enables or disables cursor-follow interaction',
    },
    {
      name: 'cursorStrength',
      type: 'number',
      default: '0.35',
      description:
        'Controls how strongly the blob moves toward the cursor position',
    },
    {
      name: 'cursorSmoothness',
      type: 'number',
      default: '0.08',
      description:
        'Controls how smoothly the blob catches up to the cursor; lower values create more fluid trailing motion',
    },
    {
      name: 'colors',
      type: '[string, string]',
      default: "['#7C3AED', '#06B6D4']",
      description:
        'Two colors used for the blob gradient, from start to end',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description:
        'Additional CSS classes for positioning, sizing, opacity, layering, and other styling',
    },
  ],

  accessibility: [
    'Respects the prefers-reduced-motion media query by freezing the blob in its static resting shape',
    'Uses aria-hidden="true" because the blob is purely decorative',
    'Uses role="presentation" to communicate that the SVG has no meaningful semantic content',
    'Uses pointer-events-none so the decorative element never intercepts clicks, hover, or other pointer interactions',
  ],

  usageCode: `import { MorphingBlob } from "@/components/ui/morphing-blob";

export function Demo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-[#0E0E0E]">
      <MorphingBlob
        width={600}
        height={400}
        cursorFollow
        cursorStrength={0.35}
        cursorSmoothness={0.08}
        colors={['#7C3AED', '#06B6D4']}
        className="absolute -top-20 -left-20 opacity-70"
      />

      <div className="relative z-10 p-8 text-white">
        Content sits above the blob.
      </div>
    </div>
  );
}`,

};

export default meta;