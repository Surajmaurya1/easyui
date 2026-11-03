import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "Glide Dock",
  description:
    "A floating, animated navigation dock for React that intelligently hides while scrolling down and reappears when scrolling up. Features smooth spring animations, active item indicators, and a sleek glassmorphism design powered by Framer Motion and Tailwind CSS.",
  category: "Motion",
  tagline: "Floating navigation with a natural glide",
  badges: ["Motion", "Navigation", "Interactive"],
  createdAt: "2026-11-03T08:24:28.944Z",
  features: [
    "Automatically hides when scrolling down and reappears when scrolling up",
    "Remains visible when the page is near the top",
    "Smooth spring-based entrance and exit animations using Framer Motion",
    "Animated active navigation indicator with shared layout transitions",
    "Responsive navigation labels that adapt to smaller screens",
    "Modern glassmorphism design with backdrop blur and subtle borders",
    "Customizable navigation items with icons and click handlers",
    "Fixed floating positioning at the bottom center of the viewport",
  ],
  props: [
    {
      name: "items",
      type: "GlideDockItem[]",
      default: "defaultItems",
      description:
        "Array of navigation items, each containing a name, Lucide React icon component, and onClick handler.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description:
        "Optional Tailwind CSS classes for customizing the floating navigation container.",
    },
  ],
  accessibility: [
    "Uses semantic nav and button elements for accessible navigation",
    "Provides native keyboard interaction through button elements",
    "Supports descriptive navigation labels alongside icons on larger screens",
  ],
  usageCode: `import GlideDock, { type GlideDockItem } from "@/components/ui/GlideDock";
import { Home, Search, LayoutGrid, User } from "lucide-react";

const items: GlideDockItem[] = [
  {
    name: "Home",
    icon: Home,
    onClick: () => console.log("Home clicked"),
  },
  {
    name: "Explore",
    icon: Search,
    onClick: () => console.log("Explore clicked"),
  },
  {
    name: "Projects",
    icon: LayoutGrid,
    onClick: () => console.log("Projects clicked"),
  },
  {
    name: "Profile",
    icon: User,
    onClick: () => console.log("Profile clicked"),
  },
];

export function Demo() {
  return <GlideDock items={items} />;
}`,
};

export default meta;
