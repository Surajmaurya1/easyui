import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Shooting Stars',
  description:
    'A high-performance deep-space cosmos background featuring multi-depth twinkling celestial stars, glowing atmospheric nebula clouds, and cinematic shooting stars with luminous head flares, tapered fading trails, ember stardust, and click-to-summon interactivity.',
  category: 'Motion',
  tagline: 'Deep space canvas cosmos with glowing shooting stars, radiant twinkling starfield, and interactive stardust',
  badges: ['Canvas', 'Space', 'Stars', 'Interactive', 'Background'],
  createdAt: '2026-09-20',
  features: [
    'Zero external runtime dependencies: 100% native HTML5 Canvas 2D with sub-pixel DPR scaling',
    'Multi-depth twinkling starfield with radiant 4-point celestial cross-sparkles and soft halo blooms',
    'Cinematic meteors with radiant head bursts, tapered linear-gradient fading trails, and custom trajectory angles',
    'Stardust ember particles dynamically shed from traveling meteor tails for realistic atmospheric burns',
    'Subtle ambient cosmic nebula haze clouds rendering layered indigo, violet, and cyan deep-space depth',
    'Interactive mouse parallax tilt creating multi-plane 3D astronomical perspective',
    'Interactive click & tap summons custom meteors sweeping directly across the interaction point',
    'Full prefers-reduced-motion compliance freezing meteors and twinkle to a serene static night sky',
    'Stratified children wrapper supporting titles, hero copy, and buttons with intact pointer events',
  ],
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Optional content rendered above the starry sky with full interactivity and clickability',
    },
    {
      name: 'background',
      type: 'string',
      default: "'#020617'",
      description: 'Deep space background color (CSS color, hex, rgba, or gradient)',
    },
    {
      name: 'starCount',
      type: 'number',
      default: '120',
      description: 'Total number of ambient background stars distributed across the sky',
    },
    {
      name: 'starColors',
      type: 'string[]',
      default: "['#FFFFFF', '#E0F2FE', '#C7D2FE', '#FEF08A']",
      description: 'Palette of celestial tints applied to ambient background stars',
    },
    {
      name: 'minStarSize',
      type: 'number',
      default: '0.6',
      description: 'Minimum radius in pixels of ambient stars',
    },
    {
      name: 'maxStarSize',
      type: 'number',
      default: '2.2',
      description: 'Maximum radius in pixels of ambient stars',
    },
    {
      name: 'twinkleSpeed',
      type: 'number',
      default: '1',
      description: 'Frequency speed multiplier for ambient star twinkle pulsation',
    },
    {
      name: 'trailColor',
      type: 'string',
      default: "'#38BDF8'",
      description: 'Primary neon/atmospheric color of the shooting star trail',
    },
    {
      name: 'headColor',
      type: 'string',
      default: "'#FFFFFF'",
      description: 'Luminous core burst color of the shooting star meteor head',
    },
    {
      name: 'interval',
      type: 'number',
      default: '2200',
      description: 'Average delay in milliseconds between automatic shooting star spawns',
    },
    {
      name: 'speed',
      type: '[number, number] | number',
      default: '[12, 22]',
      description: 'Speed range [min, max] or uniform velocity in pixels per frame',
    },
    {
      name: 'trailLength',
      type: '[number, number] | number',
      default: '[90, 180]',
      description: 'Trail length range [min, max] or uniform length in pixels',
    },
    {
      name: 'angle',
      type: 'number',
      default: '42',
      description: 'Trajectory flight angle in degrees clockwise from horizontal (45° is down-right)',
    },
    {
      name: 'maxActiveShootingStars',
      type: 'number',
      default: '2',
      description: 'Maximum concurrent active meteors streaking across the sky at once',
    },
    {
      name: 'showEmbers',
      type: 'boolean',
      default: 'true',
      description: 'Whether shooting stars shed glowing stardust ember particles in their wake',
    },
    {
      name: 'nebula',
      type: 'boolean',
      default: 'true',
      description: 'Enables layered atmospheric cosmic nebula clouds in the deep background',
    },
    {
      name: 'clickToSpawn',
      type: 'boolean',
      default: 'true',
      description: 'Enables clicking or tapping to summon a shooting star sweeping past the cursor',
    },
    {
      name: 'parallax',
      type: 'boolean',
      default: 'true',
      description: 'Enables subtle mouse parallax perspective shifting background stars by depth',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes for container sizing, layout, and styling',
    },
  ],
  accessibility: [
    'Cosmic canvas is marked with aria-hidden="true" and pointer-events-none',
    'Child elements retain standard focus order, screen reader accessibility, and pointer handling',
    'Supports prefers-reduced-motion media query: disables meteor spawning, particle embers, and twinkle oscillations',
  ],
  usageCode: `import { ShootingStars } from "@/components/ui/shooting-stars";

export function SpaceHeroDemo() {
  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
      <ShootingStars
        starCount={140}
        interval={1800}
        trailColor="#38BDF8"
        headColor="#FFFFFF"
        angle={45}
        nebula={true}
        parallax={true}
        clickToSpawn={true}
        className="w-full h-full"
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-full mb-4">
            ✦ Celestial Cosmos
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tight">
            Journey Into The Stars
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-lg">
            High-performance cosmic background with realistic meteors, radiant starfields, and atmospheric nebula glow.
          </p>
        </div>
      </ShootingStars>
    </div>
  );
}`,
};

export default meta;
