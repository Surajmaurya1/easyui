import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Cursor Follower',
  description:
    'A smooth spring-based cursor follower with customizable physics, velocity scaling, and custom child icons or badges.',
  category: 'Motion',
  tagline: 'Spring-damped pointer follower with custom icon content',
  badges: ['Framer Motion', 'Spring Physics', 'Interactive', 'Micro-Animation'],
  createdAt: '2026-09-09',
  features: [
    'Configurable spring dynamics (stiffness, damping, and mass)',
    'Dynamic velocity scaling when pointer is in motion',
    'Automatic viewport departure detection and graceful exit',
    'Reduced motion support with instant 1:1 hardware coordinate mapping',
    'Supports any custom React icon, text pill, or visual indicator',
  ],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      description: 'Custom icon, text badge, or React element displayed inside the cursor follower.',
    },
    {
      name: 'size',
      type: 'number',
      default: '40',
      description: 'Width and height of the cursor follower in pixels.',
    },
    {
      name: 'offsetX',
      type: 'number',
      default: '0',
      description: 'Horizontal offset from the cursor coordinates.',
    },
    {
      name: 'offsetY',
      type: 'number',
      default: '0',
      description: 'Vertical offset from the cursor coordinates.',
    },
    {
      name: 'stiffness',
      type: 'number',
      default: '450',
      description: 'Spring stiffness controlling how rapidly the follower catches up to the cursor.',
    },
    {
      name: 'damping',
      type: 'number',
      default: '32',
      description: 'Spring damping controlling the smoothness and friction of deceleration.',
    },
    {
      name: 'mass',
      type: 'number',
      default: '0.5',
      description: 'Spring mass controlling inertia and physical weight.',
    },
    {
      name: 'scaleOnMove',
      type: 'boolean',
      default: 'true',
      description: 'Scales the cursor follower slightly while the pointer is in active motion.',
    },
    {
      name: 'hideOnLeave',
      type: 'boolean',
      default: 'true',
      description: 'Hides the cursor follower when the pointer leaves the browser window or viewport.',
    },
    {
      name: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Optional custom Tailwind CSS utility classes.',
    },
  ],
  accessibility: [
    'Includes aria-hidden="true" and pointer-events-none so it never intercepts underlying click or keyboard interactions',
    'Bypasses spring oscillation under prefers-reduced-motion for zero visual vestibular strain',
  ],
  usageCode: `import { CursorFollower } from "@/components/ui/cursor-follower";
import { ArrowUpRight } from "lucide-react";

export function Demo() {
  return (
    <CursorFollower size={44}>
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-black shadow-lg">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </CursorFollower>
  );
}`,
};

export default meta;
export { meta as CursorFollowerMeta };
