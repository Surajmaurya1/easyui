import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Liquid Toggle',
  description: 'A toggle with a liquid/blob-like transition. The internal shape deforms organically as it travels from off to on — stretching along the travel axis and settling into a natural blob shape rather than simply translating.',
  category: 'Buttons',
  featured: true,
  tagline: 'Morphing liquid blob toggle',
  badges: ['SVG Morph', 'Spring', 'Accessible'],
  createdAt: '2026-09-02',
  features: [
    'Internal blob shape continuously morphs between states',
    'Transient stretch pulse along the travel axis when toggling',
    'Spring-smoothed progress with mass/damping tuning',
    'Controlled and uncontrolled usage via value/defaultValue/onChange',
    'Respects prefers-reduced-motion (uses static state fallback)',
  ],
  props: [
    { name: 'value', type: 'boolean', default: 'undefined', description: 'Controlled value' },
    { name: 'defaultValue', type: 'boolean', default: 'false', description: 'Initial value for uncontrolled mode' },
    { name: 'onChange', type: '(value: boolean) => void', default: 'undefined', description: 'Toggle change callback' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    { name: 'offLabel', type: 'string', default: "'Off'", description: 'Screen reader label when off' },
    { name: 'onLabel', type: 'string', default: "'On'", description: 'Screen reader label when on' },
    { name: 'accentColor', type: 'string', default: "'#FAFAFA'", description: 'Blob color when on' },
    { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show OFF/ON text inside the track' },
    { name: 'width', type: 'number', default: '56', description: 'Track width in px' },
    { name: 'height', type: 'number', default: '32', description: 'Track height in px' },
  ],
  accessibility: [
    'role="switch" with aria-checked',
    'Visually hidden label reflects current state',
    'Keyboard interaction: Space/Enter toggles; Arrow keys set state',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { LiquidToggle } from "@/components/ui/liquid-toggle";

export function Demo() {
  const [on, setOn] = React.useState(false);
  return (
    <div className="flex items-center gap-2">
      <LiquidToggle value={on} onChange={setOn} />
      <span className="text-sm">{on ? 'Enabled' : 'Disabled'}</span>
    </div>
  );
}`,
};

export default meta;
