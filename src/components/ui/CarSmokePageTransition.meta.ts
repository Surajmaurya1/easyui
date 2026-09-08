import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Car Smoke Page Transition',
  description:
    'A cinematic page transition where a speeding car crosses the screen, leaving a smoke trail before transitioning to the next page.',
  category: 'Motion',
  tagline: 'Cinematic automotive page transition',
  badges: ['Cinematic', 'Motion Physics', 'Reduced Motion'],
  createdAt: '2026-09-08',
  features: [
    'Hardware-accelerated Canvas particle drift smoke physics and realistic skid marks',
    'Choreographed multi-axis Ferrari drift movement, wheel spin, and speed lines',
    'Customizable travel direction (left-to-right or right-to-left), density, and scale',
    'Automatic theme awareness (light and dark mode overlay shading)',
    'Full accessibility support with automatic prefers-reduced-motion fallback',
  ],
  props: [
    { name: 'direction', type: "'left-to-right' | 'right-to-left'", default: "'left-to-right'", description: 'Direction of car travel' },
    { name: 'carDuration', type: 'number', default: '700', description: 'Duration of car crossing animation in milliseconds' },
    { name: 'carDelay', type: 'number', default: '0', description: 'Delay before car starts moving in milliseconds' },
    { name: 'carSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the car (affects scale)' },
    { name: 'smokeDensity', type: "'off' | 'low' | 'medium' | 'high'", default: "'medium'", description: 'Density of smoke particles emitted' },
    { name: 'smokeLifetime', type: 'number', default: '1200', description: 'Lifetime of smoke particles in milliseconds' },
    { name: 'showSpeedLines', type: 'boolean', default: 'true', description: 'Whether to show speed lines effect behind the car' },
    { name: 'pageTransitionDelay', type: 'number', default: '550', description: 'Delay before page transition overlay starts in milliseconds' },
    { name: 'pageTransitionDuration', type: 'number', default: '350', description: 'Duration of page transition overlay fade in milliseconds' },
    { name: 'resetDelay', type: 'number', default: '300', description: 'Delay before resetting to idle after transition completes in milliseconds' },
    { name: 'onTransitionComplete', type: '() => void', default: 'undefined', description: 'Callback fired when transition completes (call navigate() here)' },
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'The trigger element (typically a Button)' },
    { name: 'className', type: 'string', default: "undefined", description: 'Additional Tailwind classes merged into the root' },
  ],
  accessibility: [
    'The trigger is keyboard accessible via Enter and Space keys',
    'Reduced motion preference automatically disables the fast car animation and smoke effects',
    'The overlay background respects the current EasyUI theme (light/dark)',
  ],
  usageCode: `import { CarSmokePageTransition } from "@/components/ui/car-smoke-page-transition";

export function Demo() {
  return (
    <CarSmokePageTransition
      onTransitionComplete={() => {
        // Navigate to new page after animation completes
        window.location.href = "/about";
      }}
    >
      <button className="bg-[#FAFAFA] text-[#050505] hover:bg-white px-4 py-2 rounded-md font-medium transition-colors">
        Start Journey
      </button>
    </CarSmokePageTransition>
  );
}`,
};

export default meta;