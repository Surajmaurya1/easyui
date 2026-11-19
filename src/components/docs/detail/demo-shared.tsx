import { Folder, Home, Inbox, Settings, Users } from 'lucide-react';
import type { SidebarSection } from '../../ui/sidebar';

export const AVATAR_STACK_DEMO_ITEMS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', name: 'Elena Rostova', alt: 'Elena' },
  { id: 2, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', name: 'Marcus Chen', alt: 'Marcus' },
  { id: 3, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', name: 'Sarah Miller', alt: 'Sarah' },
  { id: 4, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', name: 'David Kim', alt: 'David' },
  { id: 5, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', name: 'Aria Taylor', alt: 'Aria' },
  { id: 6, src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', name: 'James Wilson', alt: 'James' },
];

export const SIDEBAR_DEMO_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'home', label: 'Home', icon: <Home /> },
      { id: 'inbox', label: 'Inbox', icon: <Inbox />, badge: 4 },
    ],
  },
  {
    title: 'Workspace',
    items: [
      {
        id: 'projects',
        label: 'Projects',
        icon: <Folder />,
        children: [
          { id: 'projects-active', label: 'Active', badge: 12 },
          { id: 'projects-archived', label: 'Archived' },
        ],
      },
      { id: 'team', label: 'Team', icon: <Users /> },
      { id: 'settings', label: 'Settings', icon: <Settings /> },
    ],
  },
];

export const COMBOBOX_DEMO_OPTIONS = [
  { value: 'next', label: 'Next.js', description: 'React framework' },
  { value: 'remix', label: 'Remix', description: 'Web standards' },
  { value: 'astro', label: 'Astro', description: 'Content sites', keywords: ['islands'] },
  { value: 'vite', label: 'Vite', description: 'Dev server', disabled: true },
  { value: 'svelte', label: 'SvelteKit', description: 'Compiler-based' },
];
