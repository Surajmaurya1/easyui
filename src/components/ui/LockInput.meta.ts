import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'LockInput',
  description: 'A text input whose focus state subtly "locks" into place — a focus ring scales in from the center and the border tweens to active, giving the impression that the input snaps closed on itself.',
  category: 'Forms',
  featured: true,
  tagline: 'Focus state that "locks" into place',
  badges: ['Focus Lock', 'Spring Ring', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Focus ring scales in from 0.94 to 1.0 with a snappy spring, producing a physical "lock" feel',
    'Inset border ring fades in alongside the outer focus halo for a layered lock effect',
    'Icon and label slots adjust contrast on focus to draw the eye inward',
    'Error state replaces accent with restrained rose and animates message in',
    'Light/dark theme aware via CSS variables — same code, both themes',
  ],
  props: [
    { name: 'label', type: 'string', default: 'undefined', description: 'Visible label rendered above the input' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Helper text below the input' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Error message; presence triggers danger styling' },
    { name: 'leftIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon element placed before the input value' },
    { name: 'rightIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon element placed after the input value' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and applies 30% disabled opacity' },
  ],
  accessibility: [
    'Proper <label htmlFor> association for assistive technology',
    'aria-invalid toggles on error; aria-describedby links helper text',
    'Restrained focus ring is keyboard-only via :focus-visible-friendly overlay',
    'Disabled state communicated both visually and via pointer-events',
  ],
  usageCode: `import { LockInput } from "@/components/ui/lock-input";
import { Mail } from "lucide-react";

export function Demo() {
  return (
    <div className="space-y-4 max-w-sm">
      <LockInput
        label="Email"
        type="email"
        placeholder="you@studio.dev"
        leftIcon={<Mail className="w-3.5 h-3.5" />}
        description="We'll send a confirmation link here."
      />
      <LockInput
        label="Workspace"
        placeholder="acme"
        error="That workspace is already taken."
      />
    </div>
  );
}`,
};

export default meta;
