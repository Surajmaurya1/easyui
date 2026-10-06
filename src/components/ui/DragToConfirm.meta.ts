import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Drag to Confirm',
  description: 'A minimalist physical drag-to-confirm slider for high-stakes and destructive actions, equipped with progressive track fill physics, spring snapback resistance, full light/dark theme adaptation, and accessible keyboard controls.',
  category: 'Buttons',
  tagline: 'Spring-resistant slider for confirming destructive or critical operations',
  badges: ['Confirmation', 'Gesture Physics', 'Safety Controls', 'Light & Dark'],
  createdAt: '2026-08-21',
  features: [
    'Clean minimalist pill geometry with seamless light and dark mode theme compatibility',
    'Dynamic progressive track fill that physically tracks the handle as you drag',
    'Physical gesture drag handle with calibrated spring snapback upon incomplete drags',
    'Supports Delete, Archive, Confirm, Submit, and Unlock action profiles with custom sizes (sm, md, lg)',
    'Automatic post-confirmation reset timer with customizable delay or controlled state support',
    'Full keyboard accessibility (Space, Enter, ArrowRight to trigger) and mobile haptic vibration feedback',
  ],
  props: [
    { name: 'label', type: 'string', default: "'Slide to confirm'", description: 'Action instruction text rendered along track' },
    { name: 'confirmedLabel', type: 'string', default: "'Confirmed ✓'", description: 'Text shown when slider locks into completion' },
    { name: 'actionType', type: "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'", default: "'confirm'", description: 'Action preset style and icon archetype' },
    { name: 'variant', type: "'default' | 'danger' | 'warning' | 'info' | 'success'", default: 'undefined', description: 'Visual tone variant override' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider dimension profile (sm: 40px, md: 48px, lg: 54px)' },
    { name: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Custom idle state icon rendered inside thumb' },
    { name: 'confirmedIcon', type: 'React.ReactNode', default: 'undefined', description: 'Custom confirmed state icon rendered inside thumb' },
    { name: 'isConfirmed', type: 'boolean', default: 'undefined', description: 'Controlled confirmation state' },
    { name: 'onConfirm', type: '() => void', default: 'undefined', description: 'Callback triggered upon successful confirmation completion' },
    { name: 'onReset', type: '() => void', default: 'undefined', description: 'Callback triggered upon slider reset' },
    { name: 'autoResetDelay', type: 'number', default: '2500', description: 'Milliseconds before resetting back to start (0 to disable)' },
    { name: 'haptic', type: 'boolean', default: 'true', description: 'Triggers subtle vibration feedback upon confirmation' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables slider gesture and interaction' },
  ],
  accessibility: [
    'Accessible role="slider" with aria-valuemin, aria-valuemax, and aria-valuenow attributes',
    'Focus-visible ring around draggable handle for keyboard navigators',
    'Space, Enter, and ArrowRight keys trigger animated confirmation sequence',
    'Screen reader fallback action button for assistive tech users',
    'Respects prefers-reduced-motion system preference',
  ],
  usageCode: `import { DragToConfirm } from "@/components/ui/drag-to-confirm";

export function Demo() {
  return (
    <DragToConfirm
      actionType="delete"
      size="md"
      label="Slide to delete database →"
      confirmedLabel="Database Deleted ✓"
      onConfirm={() => console.log('Destroy action confirmed')}
    />
  );
}`,
};

export default meta;
