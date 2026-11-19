import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Gooey Menu',
  description: 'A tactile liquid dropdown menu with organic SVG metaball fusion filter and spring-driven extrusion animation.',
  category: 'Navigation',
  featured: true,
  tagline: 'Liquid gooey spring dropdown menu with SVG filter physics',
  badges: ['SVG Filter', 'Framer Motion', 'Metaball', 'Spring Physics'],
  createdAt: '2026-08-31',
  features: [
    'Real-time SVG color-matrix metaball fusion filter creates organic liquid stretch and tear dynamics',
    'Choreographed staggered dropdown items with fast exit transitions',
    'Complete keyboard accessibility (Arrow keys, Enter, Space, Escape) and ARIA listbox semantics',
    'Click-outside listener and controlled/uncontrolled state support',
    'Optional custom triggers: the panel animates from the measured button dimensions and corner shape without resizing the button',
    'Start, center, and end panel alignment with RTL support and independent IDs for multiple instances',
    'Respects prefers-reduced-motion: disables spring movement, stagger, and the blur filter',
  ],
  props: [
    { name: 'options', type: 'string[]', default: "['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us']", description: 'Array of option labels' },
    { name: 'value', type: 'string', default: 'undefined', description: 'Controlled active selected option' },
    { name: 'defaultValue', type: 'string', default: "options[0]", description: 'Default selected option if uncontrolled' },
    { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open dropdown state' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open dropdown state if uncontrolled' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Callback fired when open state changes' },
    { name: 'onSelect', type: '(option: string, index: number) => void', default: 'undefined', description: 'Callback fired on option selection' },
    { name: 'width', type: 'number', default: '306', description: 'Pixel width of the dropdown panel and default pill; custom triggers keep their own size' },
    { name: 'trigger', type: 'ReactNode', default: 'undefined', description: 'Optional non-interactive content inside the trigger button, such as an avatar. Do not pass a nested button or link.' },
    { name: 'triggerLabel', type: 'string', default: '"Toggle menu" for custom triggers', description: 'Accessible name for the trigger and its options' },
    { name: 'triggerClassName', type: 'string', default: 'undefined', description: 'Classes for the trigger button, including dimensions and border radius' },
    { name: 'triggerStyle', type: 'CSSProperties', default: 'undefined', description: 'Inline trigger styles; size and corner radii are measured automatically' },
    { name: 'align', type: '"start" | "center" | "end"', default: '"start"', description: 'Logical alignment of the panel relative to the trigger. Start and end follow the inherited text direction.' },
    { name: 'optionClassName', type: 'string | ((option: string, index: number) => string | undefined)', default: 'undefined', description: 'Additional classes for all options or individual actions, such as a red logout option' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS class overrides' },
  ],
  accessibility: [
    'role="listbox" with role="option" and aria-selected for assistive technologies',
    'Full keyboard navigation: ArrowUp, ArrowDown, Enter, Space, and Escape',
    'Keyboard opening focuses the listbox; Escape and selection return focus to the trigger',
    'Closed options are inert and hidden from assistive technology while the exit animation finishes',
    'Give avatar or icon triggers an accessible name with triggerLabel',
    'prefers-reduced-motion disables the goo filter, springs, and item stagger',
  ],
  usageCode: `import { GooeyMenu } from "@/components/ui/gooey-menu";

export function Demo() {
  return (
    <GooeyMenu
      options={["Dashboard", "Analytics", "Settings", "Billing", "Logout"]}
      onSelect={(opt) => console.log("Selected:", opt)}
    />
  );
}

export function ProfileMenu() {
  return (
    <GooeyMenu
      width={232}
      options={["Profile", "Settings", "Privacy and Security", "Notifications", "Log out"]}
      optionClassName={(option) => option === "Log out" ? "text-red-400 hover:text-red-300" : undefined}
      triggerLabel="Open profile menu"
      triggerStyle={{ width: 44, height: 44, borderRadius: "50%", padding: 0 }}
      trigger={
        <span aria-hidden="true" className="flex h-full w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white">
          SM
        </span>
      }
      onSelect={(option) => console.log("Profile action:", option)}
    />
  );
}`,
};

export default meta;
