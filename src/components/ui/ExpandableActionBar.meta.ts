import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "Expandable Action Bar",
  description:
    "A compact icon-only action bar that expands on hover or focus to reveal a label next to each icon. Built with React, Tailwind CSS and Framer Motion.",
  category: "Motion",
  tagline: "Icon bar that expands to show labels on hover",
  badges: ["Motion", "Tailwind", "Interactive"],
  createdAt: "2026-11-01T22:17:23.342Z",
  features: [
    "Shows only icons at rest, then expands to reveal labels on hover or keyboard focus",
    "Smooth spring-based layout animations as the bar grows and shrinks",
    "Each item takes an icon, a label and an onClick handler",
    "Customizable appearance with standard Tailwind utility classes",
  ],
  props: [
    {
      name: "items",
      type: "ActionBarItem[]",
      default: "required",
      description: "Actions to render, each as { icon, label, onClick }",
    },
    {
      name: "items[].icon",
      type: "ReactNode",
      default: "required",
      description: "Icon shown at all times",
    },
    {
      name: "items[].label",
      type: "string",
      default: "required",
      description:
        "Text revealed on hover or focus, also used as the accessible name",
    },
    {
      name: "items[].onClick",
      type: "() => void",
      default: "required",
      description: "Called when the item is clicked",
    },
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Optional custom Tailwind styling for the bar",
    },
    {
      name: "...props",
      type: "HTMLMotionProps<'div'>",
      default: "undefined",
      description:
        "Any other Framer Motion div props are passed to the container",
    },
  ],
  accessibility: [
    "Respects prefers-reduced-motion media query",
    "Every button keeps an aria-label, so labels are available to screen readers while hidden",
    "Tabbing into the bar expands it, matching the hover behavior",
    'Container uses role="toolbar" with visible focus rings on each action',
  ],
  usageCode: `import { Copy, Share2, Trash2 } from "lucide-react";
import { ExpandableActionBar } from "@/components/ui/expandable-action-bar";

export function Demo() {
  return (
    <ExpandableActionBar
      items={[
        { icon: <Share2 size={16} />, label: 'Share', onClick: () => { } },
        { icon: <Copy size={16} />, label: 'Copy', onClick: () => { } },
        { icon: <Download size={16} />, label: 'Export', onClick: () => { } },
        { icon: <Save size={16} />, label: 'Save', onClick: () => { } },
        { icon: <Trash2 size={16} />, label: 'Delete', onClick: () => { } },
      ]}
    />
  );
}`,
};

export default meta;
