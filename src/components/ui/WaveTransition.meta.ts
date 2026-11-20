import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Wave Transition',
  description: 'A source-aware view transition with a soft rainbow light wave, refracted color, and theme-friendly edge glow.',
  category: 'Motion',
  tagline: 'Carry the interface forward on a smooth wave of color',
  badges: ['View Transition', 'Motion', 'Reduced Motion'],
  createdAt: '2026-11-18',
  features: [
    'Vertical, horizontal, and center-origin wave geometry',
    'Optional source element anchors the reveal to its measured center',
    'Organic rainbow light wash and six configurable color palettes',
    'Color and edge glow remain visible on light and dark surfaces',
    'Controlled revealed state with completion callback',
    'Reduced-motion mode replaces the expanding clip with a simple fade',
  ],
  props: [
    { name: 'revealed', type: 'boolean', default: 'required', description: 'Controls which view is shown and the wave direction' },
    { name: 'revealedContent', type: 'React.ReactNode', default: 'required', description: 'The view revealed by the wave' },
    { name: 'children', type: 'React.ReactNode', default: 'required', description: 'The starting view' },
    { name: 'type', type: '"vertical" | "horizontal" | "center"', default: '"vertical"', description: 'Wave shape and default origin' },
    { name: 'source', type: 'React.RefObject<HTMLElement | null>', default: 'undefined', description: 'Optional element whose center anchors the wave' },
    { name: 'palette', type: 'WavePalette', default: '"colorful"', description: 'Colorful, rainbow, ocean, sunset, green, mono, or three custom colors' },
    { name: 'duration', type: 'number', default: '1.1', description: 'Outgoing wave duration in seconds; return is 25% faster' },
    { name: 'overlay', type: 'React.ReactNode', default: 'undefined', description: 'Persistent content layered above both views' },
    { name: 'onFinish', type: '(revealed: boolean) => void', default: 'undefined', description: 'Called when the wave finishes' },
  ],
  accessibility: [
    'The inactive view is hidden from assistive technology and made inert',
    'Respects prefers-reduced-motion by skipping the clip-path expansion',
    'Overlay controls remain interactive above the transitioning views',
  ],
  usageCode: `import { useRef, useState } from "react";
import { WaveTransition } from "@/components/ui/WaveTransition";

export function Demo() {
  const [revealed, setRevealed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <WaveTransition
      revealed={revealed}
      revealedContent={<div className="grid h-64 place-items-center">New view</div>}
      source={triggerRef}
      palette="rainbow"
      overlay={(
        <button ref={triggerRef} onClick={() => setRevealed((value) => !value)}>
          Toggle view
        </button>
      )}
    >
      <div className="grid h-64 place-items-center">Current view</div>
    </WaveTransition>
  );
}`,
};

export default meta;
