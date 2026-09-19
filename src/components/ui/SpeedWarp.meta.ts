import type { EasyUIComponentMeta } from '../../types/component';

export const SpeedWarpMeta: EasyUIComponentMeta = {
  title: 'Speed Warp',
  tagline: 'High-velocity 3D perspective starfield tunnel with canvas streaks.',
  description: 'A 3D perspective canvas starfield simulation that projects relativistic light streaks toward the viewer, creating an intense hyperspace or warp drive velocity effect.',
  category: 'Motion',
  badges: ['Canvas', 'Background Effect', '3D Perspective'],
  usageCode: `<div className="relative h-[480px] w-full overflow-hidden rounded-2xl bg-[#050505] border border-border">
  <SpeedWarp speed={30} starCount={700} />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h2 className="text-3xl font-bold tracking-tight text-white">Engage Warp Drive</h2>
  </div>
</div>`,
  props: [
    { name: 'speed', type: 'number', default: '25', description: 'Velocity multiplier of stars moving toward the camera' },
    { name: 'starCount', type: 'number', default: '600', description: 'Total number of 3D stars rendered in the volume' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Optional custom CSS class name for styling' },
    { name: 'children', type: 'React.ReactNode', description: 'Optional overlay content rendered above the starfield' },
  ],
  accessibility: [
    'Canvas is marked aria-hidden="true" to prevent screen reader interference',
    'Responsive viewport tracking via ResizeObserver without blocking the main UI thread',
    'Transparent canvas overlay preserves keyboard access and focus management for interactive children',
  ],
  features: [
    'Real-time 3D perspective projection with focal length scaling',
    'Dynamic depth-alpha fading and velocity-driven streak lines',
    'Completely transparent canvas background for seamless layering over any dark UI or hero section',
    'Automatic canvas resizing via ResizeObserver to match parent container dimensions',
  ],
  createdAt: '2026-09-16',
};

export default SpeedWarpMeta;
