import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'DrawCheckbox',
  description: 'A checkbox whose checkmark draws itself (path length animation) and settles with a tiny overshoot. The box scales from 0.9 -> 1.04 -> 1.0 for a tactile snap feel.',
  category: 'Forms',
  tagline: 'Checkmark draws itself, then settles',
  badges: ['Path Draw', 'Overshoot', 'Indeterminate', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Checkmark animates via stroke-dashoffset (path length 0 -> 1) with a snappy draw curve',
    'Box scales 0.9 -> 1.04 -> 1.0 for a tiny physical overshoot, then settles',
    'Indeterminate state draws a bar from left to right via scaleX origin',
    'Accent background swaps to var(--accent) when checked — theme aware',
    'Full controlled / uncontrolled state support, plus ref forwarding',
  ],
  props: [
    { name: 'label', type: 'React.ReactNode', default: 'undefined', description: 'Label text displayed next to the box' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Helper text below the label' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'When true, renders a horizontal bar instead of a checkmark' },
    { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state (uncontrolled)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
  ],
  accessibility: [
    'Hidden native <input type="checkbox"> preserves semantics and screen-reader support',
    'Visible box is a label proxy — clicking it forwards to the native input',
    'Disabled state communicated both visually and via aria-disabled',
  ],
  usageCode: `import { DrawCheckbox } from "@/components/ui/draw-checkbox";

export function Demo() {
  return (
    <div className="space-y-3">
      <DrawCheckbox label="Email me product updates" description="We send about one email per month." defaultChecked />
      <DrawCheckbox label="Indeterminate option" indeterminate />
      <DrawCheckbox label="Accept terms" />
    </div>
  );
}`,
};

export default meta;
