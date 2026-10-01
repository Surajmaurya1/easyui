import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'OriginDropdown',
  description: 'A dropdown with origin-aware expansion — the menu materializes from the chosen side with a slight scale and an inward translation, so its perceived origin is the trigger edge closest to the menu.',
  category: 'Overlays',
  featured: true,
  tagline: 'Origin-aware expansion',
  badges: ['Origin-Aware', 'Spring In', 'Accessible', 'Light & Dark'],
  createdAt: '2026-09-03',
  features: [
    'Menu expansion originates from one of four sides (top/right/bottom/left)',
    'Snappy spring (springSnappy) with origin-based transform-origin per side',
    'Optional items array with icon, description, and destructive variants',
    'Chevron rotates 180° on open; Escape and outside-click close',
    'Light/dark theme aware via CSS variables',
  ],
  props: [
    { name: 'trigger', type: 'React.ReactNode', default: 'undefined', description: 'Custom trigger content' },
    { name: 'items', type: 'OriginDropdownItem[]', default: 'undefined', description: 'Menu items (alternative to children)' },
    { name: 'children', type: 'React.ReactNode', default: 'undefined', description: 'Custom menu content' },
    { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Side the menu opens from' },
    { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Open state change callback' },
  ],
  accessibility: [
    'aria-haspopup / aria-expanded / role="menu" / role="menuitem" wired correctly',
    'Escape and outside-click dismiss the menu',
    'Disabled items skip the onSelect handler and have proper ARIA',
  ],
  usageCode: `import { OriginDropdown } from "@/components/ui/origin-dropdown";
import { Settings, LogOut, User } from "lucide-react";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-3">
      <OriginDropdown
        trigger="Account"
        side="bottom"
        items={[
          { id: "profile", label: "Profile", description: "Account settings", icon: <User className="w-3.5 h-3.5" /> },
          { id: "settings", label: "Preferences", description: "Theme, motion, layout", icon: <Settings className="w-3.5 h-3.5" /> },
          { id: "signout", label: "Sign out", destructive: true, icon: <LogOut className="w-3.5 h-3.5" /> },
        ]}
      />
      <OriginDropdown
        trigger="Origin top"
        side="top"
        items={[
          { id: "a", label: "Option A" },
          { id: "b", label: "Option B" },
        ]}
      />
    </div>
  );
}`,
};

export default meta;
