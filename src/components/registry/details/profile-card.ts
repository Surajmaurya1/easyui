// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "profile-card",
  "name": "Profile Card",
  "tagline": "Dark social profile card with painted blue cover art",
  "description": "A premium dark social profile card with a painted blue cover-art panel, action row, and a detail panel with avatar, verified name, bio, follower stats, and outbound website link.",
  "category": "Motion",
  "badges": [
    "Spring Tap",
    "Tailwind",
    "Painted Artwork",
    "Responsive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/profile-card",
  "installPromptHash": "403567f3af486f4d6912f5b0057e8741478592de46484f00ac6072defb87c7e3",
  "features": [
    "Painted blue cover-art surface built from layered radial / linear gradients — no image assets required",
    "Spring-tap response on the primary action button (0.97 scale) via framer-motion",
    "Avatar and outbound link are keyboard-focusable with visible focus rings",
    "Outbound link uses rel=\"noreferrer noopener\" for safe new-tab behaviour",
    "Responsive: cover height, padding, avatar size, and type scale all collapse cleanly under 600px",
    "Decorative artwork and icons are aria-hidden; the section semantics are conveyed by the visible name and labels",
    "Respects prefers-reduced-motion: spring tap is skipped entirely on the action button"
  ],
  "props": [
    {
      "name": "name",
      "type": "string",
      "default": "'Suraj'",
      "description": "Display name shown in the detail panel header"
    },
    {
      "name": "username",
      "type": "string",
      "default": "'@surajmaurya_m'",
      "description": "Handle rendered as the small caption under the name"
    },
    {
      "name": "description",
      "type": "string",
      "default": "'Building EasyUI. Engineer.'",
      "description": "Biographical text shown under the name"
    },
    {
      "name": "followers",
      "type": "string",
      "default": "'200K'",
      "description": "Pre-formatted follower count"
    },
    {
      "name": "posts",
      "type": "string",
      "default": "'72'",
      "description": "Pre-formatted post count"
    },
    {
      "name": "website",
      "type": "string",
      "default": "'easyui.site'",
      "description": "Website domain — link href is auto-prefixed with https://"
    },
    {
      "name": "actionLabel",
      "type": "string",
      "default": "'Follow'",
      "description": "Label for the primary action button"
    },
    {
      "name": "onAction",
      "type": "() => void",
      "default": "undefined",
      "description": "Click handler for the primary action button"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional Tailwind classes merged into the card root"
    }
  ],
  "accessibility": [
    "Semantic <article> root with heading hierarchy (h2 for the name)",
    "Native <button> and <a> for the interactive controls — no <div onClick>",
    "All decorative artwork and icons are aria-hidden; the card content is conveyed by the visible labels",
    "Visible focus rings on the action button, secondary button, and outbound link (focus-visible)",
    "Outbound link announces \"(opens in a new tab)\" via aria-label",
    "prefers-reduced-motion fallback: spring tap on the action button is disabled"
  ],
  "createdAt": "2026-08-31",
  "usageCode": "import { ProfileCard } from \"@/components/ui/profile-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <ProfileCard\n        name=\"Suraj\"\n        username=\"@surajmaurya_m\"\n        description=\"Building EasyUI. Engineer.\"\n        followers=\"200K\"\n        posts=\"72\"\n        website=\"easyui.site\"\n        onAction={() => console.log('Follow clicked')}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/ProfileCard.tsx",
      "type": "registry:ui",
      "target": "components/ui/profile-card.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
