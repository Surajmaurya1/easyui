import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Product Tour',
  description: 'An interactive product walkthrough with spring-animated spotlight cutout, auto-scrolling targets, responsive bottom-sheet docking, and keyboard navigation.',
  category: 'Feedback',
  tagline: 'Interactive walkthrough with spring spotlight cutout and responsive docking',
  badges: ['Walkthrough', 'Spotlight', 'Spring Physics', 'Keyboard Nav', 'Portal'],
  createdAt: '2026-10-13',
  features: [
    'Spring-animated SVG mask spotlight that smoothly transitions between target elements',
    'Automatic scroll-into-view with scroll settlement detection before positioning',
    'Responsive viewport placement: floating tooltip on desktop, docked bottom sheet on mobile',
    'Complete keyboard controls (Left/Right arrows to navigate, Escape to dismiss, Tab trapping)',
    'Dynamic height animation with ResizeObserver as step copy changes',
    'Reduced motion support and full dark and light mode styling',
  ],
  props: [
    { name: 'steps', type: 'TourStep[]', description: 'List of tour steps with target selector, title, body, and placement preference' },
    { name: 'open', type: 'boolean', description: 'Controls whether the spotlight tour overlay is open' },
    { name: 'onClose', type: '(reason: TourCloseReason) => void', description: 'Callback triggered when tour completes, is skipped, or is dismissed' },
    { name: 'onStepChange', type: '(index: number) => void', default: 'undefined', description: 'Optional callback invoked whenever the active step index changes' },
    { name: 'startAt', type: 'number', default: '0', description: 'Zero-based initial step index when the tour opens' },
    { name: 'closeOnOverlayClick', type: 'boolean', default: 'false', description: 'Whether clicking the dim overlay dismisses the tour' },
  ],
  accessibility: [
    'Uses role="dialog" with aria-modal="true" and aria-live="polite" for dynamic step announcements',
    'Captures focus on open and returns focus to the initiating element upon dismissal',
    'Traps Tab navigation strictly within the tour dialog buttons',
    'Full keyboard shortcuts: Left/Right arrows for steps, Escape to dismiss',
    'Respects prefers-reduced-motion by bypassing springs and scroll animations',
  ],
  usageCode: `import { useState } from "react";
import { ProductTour, type TourStep } from "@/components/ui/product-tour";

export function Demo() {
  const [open, setOpen] = useState(false);

  const steps: TourStep[] = [
    { title: "Welcome", body: "Let's take a quick tour around the interface." },
    { target: "#search-input", title: "Global Search", body: "Quickly locate projects and assets.", placement: "bottom" },
    { target: "#actions-panel", title: "Actions", body: "Create or import documents here.", placement: "left" },
  ];

  return (
    <div>
      <button onClick={() => setOpen(true)}>Start Tour</button>
      <ProductTour open={open} steps={steps} onClose={() => setOpen(false)} />
    </div>
  );
}`,
};

export default meta;
