import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Meteors',
  description:
    'A lightweight, highly aesthetic animated meteor shower effect that streams diagonal glowing celestial light beams across cards, badges, hero containers, and call-to-action sections.',
  category: 'Motion',
  tagline: 'Luminous diagonal meteor trails streaming across cards and hero containers',
  badges: ['CSS Animation', 'Meteors', 'Card Effect', 'New'],
  createdAt: '2026-09-20',
  features: [
    'Super lightweight pure CSS keyframe hardware-accelerated animations',
    'Configurable trajectory angle (default 215° diagonal down-left)',
    'Customizable head color, tail gradient, tail length, and speed',
    'Randomized distribution and staggered delays preventing rhythmic clustering',
    'Drop-in compatible with cards, hero banners, and button containers',
    'Full prefers-reduced-motion support disabling animations automatically',
  ],
  props: [
    {
      name: 'number',
      type: 'number',
      default: '20',
      description: 'Total number of animated meteor streaks to generate',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#94A3B8'",
      description: 'Luminous head color and halo glow tint',
    },
    {
      name: 'trailColor',
      type: 'string',
      default: "'#64748B'",
      description: 'Base color of the gradient fading tail',
    },
    {
      name: 'tailLength',
      type: 'number',
      default: '60',
      description: 'Length in pixels of each meteor streak tail',
    },
    {
      name: 'angle',
      type: 'number',
      default: '215',
      description: 'Flight trajectory angle in degrees (215° is down-left)',
    },
    {
      name: 'minDelay',
      type: 'number',
      default: '0.2',
      description: 'Minimum animation delay in seconds',
    },
    {
      name: 'maxDelay',
      type: 'number',
      default: '1.2',
      description: 'Maximum animation delay in seconds',
    },
    {
      name: 'minDuration',
      type: 'number',
      default: '2',
      description: 'Minimum animation duration in seconds',
    },
    {
      name: 'maxDuration',
      type: 'number',
      default: '8',
      description: 'Maximum animation duration in seconds',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes for container positioning',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Optional content rendered above or inside the meteor container',
    },
  ],
  accessibility: [
    'Meteor container is marked with aria-hidden="true" and pointer-events-none',
    'prefers-reduced-motion automatically hides and freezes meteor animations',
  ],
  usageCode: `import { Meteors } from "@/components/ui/meteors";

export function MeteorCardDemo() {
  return (
    <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-8 shadow-2xl">
      <Meteors number={25} color="#38BDF8" trailColor="#0284C7" />
      <div className="relative z-10">
        <span className="text-xs font-mono uppercase text-sky-400">Card Meteors</span>
        <h3 className="text-xl font-bold text-white mt-2">Space Exploration</h3>
        <p className="text-sm text-slate-400 mt-2">
          Streams of glowing meteors darting across dark surfaces with gradient tails.
        </p>
      </div>
    </div>
  );
}`,
};

export default meta;
