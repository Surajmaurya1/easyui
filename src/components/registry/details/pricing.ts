// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "pricing",
  "name": "Pricing",
  "tagline": "Minimal two-tier pricing that belongs in EasyUI",
  "description": "A minimal two-tier pricing component for EasyUI. Native to the existing design system, fully theme-aware, with a quiet Free tier and a slightly more attractive Pro tier — without resorting to SaaS marketing tropes.",
  "category": "Motion",
  "badges": [
    "Light + Dark",
    "Themed",
    "Responsive",
    "Accessible",
    "Reduced Motion"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pricing",
  "installPromptHash": "2841dda783673134e99c7be07f89b938361df65beb329de7bbbe18cc6ba372ed",
  "features": [
    "Two side-by-side pricing cards (Free + Pro) that collapse to a single column on mobile",
    "Strictly uses EasyUI design tokens — no hardcoded theme colors, automatic light / dark adaptation",
    "Typography and hierarchy communicate the tier difference; no badges, countdowns, or \"best value\" stamps",
    "Pro card receives a subtle surface elevation in light mode and a brighter surface in dark mode",
    "Pro CTA uses an animated gradient base that drifts on hover (3.6s ease-in-out, background-position slide) plus a one-pass shimmer beam (1.6s) and a subtle scale lift (1.015) — same EasyUI gradient vocabulary as the existing Button.tsx \"gradient\" variant",
    "Free CTA mirrors the secondary/outline button tone for clear hierarchy",
    "Subtle border-color hover, spring enter animation, and focus-visible ring",
    "Respects prefers-reduced-motion by disabling non-essential motion"
  ],
  "props": [
    {
      "name": "freeTier",
      "type": "PricingTier",
      "default": "EasyUI defaults",
      "description": "Configuration object for the Free tier — { name, tagline, price, cadence, features, ctaLabel, onCtaClick }. Optional: the component ships with sensible EasyUI defaults."
    },
    {
      "name": "proTier",
      "type": "PricingTier",
      "default": "EasyUI defaults",
      "description": "Configuration object for the Pro tier — same shape as freeTier. Optional: defaults to the EasyUI Pro tier ($29, one-time payment)."
    },
    {
      "name": "reverse",
      "type": "boolean",
      "default": "false",
      "description": "Swaps the order so Pro is rendered on the left"
    },
    {
      "name": "eyebrow",
      "type": "string",
      "default": "undefined",
      "description": "Optional uppercase label rendered above the heading"
    },
    {
      "name": "heading",
      "type": "string",
      "default": "undefined",
      "description": "Optional headline rendered above the cards"
    },
    {
      "name": "subheading",
      "type": "string",
      "default": "undefined",
      "description": "Optional supporting copy rendered beneath the heading"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Optional Tailwind classes appended to the outer section"
    }
  ],
  "accessibility": [
    "Uses a semantic <section> with aria-label=\"Pricing\"",
    "Feature list rendered as a <ul> with native <li> items for screen readers",
    "Buttons are real <button> elements with type=\"button\" defaults and visible :focus-visible rings",
    "CTA color contrast meets WCAG AA in both light and dark themes",
    "prefers-reduced-motion disables enter, hover, and y-translation motion"
  ],
  "createdAt": "2026-09-03",
  "usageCode": "import { Pricing } from \"@/components/ui/pricing\";\n\nexport function Demo() {\n  // Renders the EasyUI default Free + Pro pair out of the box.\n  return <Pricing />;\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/Pricing.tsx",
      "type": "registry:ui",
      "target": "components/ui/pricing.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
