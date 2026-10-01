import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Pill Navigation',
  description: 'A restrained segmented navigation control with shared pill layout morphing and nested submenu dropdown support.',
  category: 'Navigation',
  featured: true,
  tagline: 'Minimal shared-pill navigation continuity with fluid submenus',
  badges: ['Layout Springs', 'Submenu Dropdown', 'Accessible', 'Minimal'],
  createdAt: '2026-08-28',
  features: [
    'Single shared indicator preserves spatial continuity',
    'Interactive nested submenu with fluid spring entrance and layout morphing',
    'Dual-tier keyboard navigation for parent tabs and sub-items',
  ],
  props: [
    { name: 'items', type: 'PillNavigationItem[]', default: 'demo items', description: 'Navigation items with optional submenu children' },
    { name: 'defaultValue', type: 'string', default: 'first item id', description: 'Initial selected item id' },
    { name: 'defaultSubValue', type: 'string', default: 'undefined', description: 'Initial selected submenu item id' },
    { name: 'onChange', type: '(id: string, subId?: string) => void', default: 'undefined', description: 'Selection callback' },
  ],
  accessibility: [
    'Uses tablist and tab roles with aria-selected and aria-expanded state',
    'Supports ArrowLeft/ArrowRight for main tabs and ArrowUp/ArrowDown for sub-items',
    'Reduced motion swaps the moving shared pill for an immediate selected background',
  ],
  usageCode: `import { PillNavigation } from "@/components/ui/pill-navigation";

export function Demo() {
  return (
    <PillNavigation
      items={[
        { id: 'overview', label: 'Overview' },
        {
          id: 'motion',
          label: 'Motion',
          children: [
            { id: 'springs', label: 'Spring Physics' },
            { id: 'caustics', label: 'Liquid Caustics' },
          ],
        },
        { id: 'code', label: 'Code' },
      ]}
      onChange={(mainId, subId) => console.log(mainId, subId)}
    />
  );
}`,
};

export default meta;

