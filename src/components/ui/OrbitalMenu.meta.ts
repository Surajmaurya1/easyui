import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "Orbital Menu",
  description:
    "A circular button that opens an orbit ring around itself on click, with menu items spreading out along the ring. Built with React, Tailwind CSS and Framer Motion.",
  category: "Motion",
  tagline: "Circle button that opens into an orbiting menu",
  badges: ["Motion", "Tailwind", "Interactive"],
  createdAt: "2026-11-02T00:00:00.000Z",
  features: [
    "Circular trigger button that draws an orbit ring outward when opened",
    "Items swirl out from the center and settle at evenly spaced angles on the ring",
    "Full circle or partial arc layouts using startAngle and sweep",
    "Closes on outside click, Escape, or after selecting an item",
    "Customizable appearance with standard Tailwind utility classes",
  ],
  props: [
    {
      name: "items",
      type: "OrbitalMenuItem[]",
      default: "required",
      description: "Menu items, each as { icon, label, onClick }",
    },
    {
      name: "triggerIcon",
      type: "ReactNode",
      default: "plus icon",
      description:
        "Icon inside the center button. It rotates when the menu opens",
    },
    {
      name: "radius",
      type: "number",
      default: "88",
      description: "Distance in px from the center button to each item",
    },
    {
      name: "triggerSize",
      type: "number",
      default: "56",
      description: "Diameter in px of the center button",
    },
    {
      name: "itemSize",
      type: "number",
      default: "44",
      description: "Diameter in px of each item",
    },
    {
      name: "startAngle",
      type: "number",
      default: "-90",
      description: "Angle in degrees of the first item. -90 is straight up",
    },
    {
      name: "sweep",
      type: "number",
      default: "360",
      description: "Total arc in degrees the items spread across",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Whether the menu starts open",
    },
    {
      name: "closeOnSelect",
      type: "boolean",
      default: "true",
      description: "Close the menu after an item is clicked",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "undefined",
      description: "Called whenever the menu opens or closes",
    },
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Optional custom Tailwind styling for the container",
    },
  ],
  accessibility: [
    "Respects prefers-reduced-motion media query",
    "Trigger exposes aria-expanded, aria-haspopup and aria-controls",
    'Items use role="menuitem" with an aria-label and are removed from tab order while closed',
    "Escape closes the menu and returns focus to the trigger",
    "Visible focus rings and label tooltips on hover and keyboard focus",
  ],
  usageCode: `import { Copy, Share2, Pencil, Trash2 } from "lucide-react";
import { OrbitalMenu } from "@/components/ui/orbital-menu";

export function Demo() {
  return (
    <OrbitalMenu
      items={[
        { icon: <Pencil size={16} />, label: "Edit", onClick: () => console.log("edit") },
        { icon: <Copy size={16} />, label: "Copy", onClick: () => console.log("copy") },
        { icon: <Share2 size={16} />, label: "Share", onClick: () => console.log("share") },
        { icon: <Trash2 size={16} />, label: "Delete", onClick: () => console.log("delete") },
      ]}
    />
  );
}`,
};

export default meta;
