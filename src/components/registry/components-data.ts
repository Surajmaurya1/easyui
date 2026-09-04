// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = [
  {
    "id": "activity-feed",
    "name": "Activity Feed",
    "tagline": "Real-time telemetry event stream with expandable audit payloads",
    "description": "A developer telemetry and audit log stream featuring category filtering, live real-time event simulation with Framer Motion slide insertions, and expandable JSON payloads.",
    "category": "Feedback",
    "badges": [
      "Audit Logs",
      "Live Stream",
      "JSON Inspector"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/activity-feed",
    "features": [
      "Real-time simulation toggle streaming live webhook/deploy events",
      "Framer Motion layout and AnimatePresence entry transitions",
      "Category filtering (Deploy, Security, API, System) with live count tags",
      "Integrated JSON payload inspector with syntax highlighting and copy",
      "One-click trace ID copying with animated validation feedback"
    ],
    "props": [
      {
        "name": "events",
        "type": "ActivityEvent[]",
        "default": "[]",
        "description": "Array of audit or telemetry activity events"
      },
      {
        "name": "enableLiveSimulation",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the interactive simulated live stream toggle"
      },
      {
        "name": "enableFilters",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display category filter pill buttons"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the trace search input"
      },
      {
        "name": "maxEntries",
        "type": "number",
        "default": "20",
        "description": "Maximum items retained in stream before pruning"
      },
      {
        "name": "onEventReplay",
        "type": "(event: ActivityEvent) => void",
        "default": "undefined",
        "description": "Optional callback to replay a logged event"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional custom CSS class"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA feed and log roles",
      "Accessible button controls for payload expansion and trace copy",
      "Screen reader compliant status indicators"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { ActivityFeed } from \"@/components/ui/activity-feed\";\n\nconst events = [\n  {\n    id: \"evt-1\",\n    type: \"deploy\" as const,\n    status: \"success\" as const,\n    title: \"Edge Lambda function deployed\",\n    timestamp: \"2 mins ago\",\n    description: \"Release v2.4.0 deployed to us-east-1 and eu-central-1.\",\n    duration: \"240ms\",\n    traceId: \"trc_98fa2\",\n    actor: { name: \"DeployBot\" },\n    payload: { version: \"2.4.0\", sha: \"8f3b2a\" },\n  },\n  {\n    id: \"evt-2\",\n    type: \"security\" as const,\n    status: \"warning\" as const,\n    title: \"MFA challenge requested\",\n    timestamp: \"12 mins ago\",\n    actor: { name: \"alex@company.com\" },\n  },\n];\n\nexport function Demo() {\n  return <ActivityFeed events={events} enableLiveSimulation={true} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ActivityFeed.tsx",
        "type": "registry:ui",
        "target": "components/ui/activity-feed.tsx"
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
  },
  {
    "id": "animated-file-upload",
    "name": "Animated File Upload",
    "tagline": "Physical drag-and-drop file uploader with per-file progress morphing",
    "description": "A minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.",
    "category": "Forms",
    "badges": [
      "Drag & Drop",
      "Forms",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-file-upload",
    "features": [
      "Subtle physical dropzone scaling and border reaction without exaggerated AI glow",
      "Automatic mime-type detection and contextual file icon attribution",
      "Multi-file queue management with independent Uploading → Processing → Complete stages",
      "Self-morphing progress bar into checkmark state with non-aggressive error recovery",
      "Customizable file constraints (maxSize, maxFiles, accept) with accessible screen reader labels"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "boolean",
        "default": "true",
        "description": "Allow multiple files selection and upload"
      },
      {
        "name": "accept",
        "type": "string | string[]",
        "default": "undefined",
        "description": "Accepted MIME types or file extensions (e.g. image/*, .pdf)"
      },
      {
        "name": "maxSize",
        "type": "number",
        "default": "26214400 (25MB)",
        "description": "Maximum file size in bytes"
      },
      {
        "name": "maxFiles",
        "type": "number",
        "default": "10",
        "description": "Maximum number of concurrent files in list"
      },
      {
        "name": "dropTitle",
        "type": "string",
        "default": "'Drop files here'",
        "description": "Primary drop target heading"
      },
      {
        "name": "dropSubtitle",
        "type": "string",
        "default": "'or browse from your device'",
        "description": "Secondary call-to-action text"
      },
      {
        "name": "variant",
        "type": "'standard' | 'compact'",
        "default": "'standard'",
        "description": "Display density mode"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables all interactions and file picking"
      },
      {
        "name": "onFilesSelected",
        "type": "(files: File[]) => void",
        "default": "undefined",
        "description": "Callback triggered when files are chosen"
      },
      {
        "name": "onUploadComplete",
        "type": "(file: UploadFileItem) => void",
        "default": "undefined",
        "description": "Callback fired on successful upload completion"
      },
      {
        "name": "uploadHandler",
        "type": "(file, onProgress) => Promise<void>",
        "default": "undefined",
        "description": "Custom async upload handler returning a promise"
      }
    ],
    "accessibility": [
      "Keyboard accessible dropzone triggerable via Enter or Space key",
      "Hidden semantic file input accessible to assistive technologies",
      "Aria-live announcements for file upload progression, completion, and error states",
      "Respects prefers-reduced-motion with instant state changes"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedFileUpload } from \"@/components/ui/animated-file-upload\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-md mx-auto p-4\">\n      <AnimatedFileUpload\n        multiple\n        maxSize={10 * 1024 * 1024}\n        accept=\"image/*,application/pdf\"\n        onFilesSelected={(files) => console.log('Selected:', files)}\n        onUploadComplete={(file) => console.log('Uploaded:', file.name)}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedFileUpload.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-file-upload.tsx"
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
  },
  {
    "id": "animated-number",
    "name": "Animated Number Morph",
    "tagline": "Independent column digit rolling physics for metrics and financial dashboards",
    "description": "An Apple-grade smooth rolling digit counter that independently morphs individual numerical columns with physics-based springs, locale commas, currencies, and compact notation.",
    "category": "Motion",
    "badges": [
      "Metrics",
      "Motion Physics",
      "Typography"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-number",
    "features": [
      "Independent digit column spring animation preventing layout jitter",
      "Automatic thousand grouping (e.g. 12,450) and fixed decimal formatting",
      "Compact notation support for large values (1.2M, 45K)",
      "Configurable prefixes, suffixes, and spring stiffness parameters",
      "Full accessibility with aria-label text narration"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "The numeric target value to morph towards"
      },
      {
        "name": "decimals",
        "type": "number",
        "default": "0",
        "description": "Number of decimal places to preserve"
      },
      {
        "name": "prefix",
        "type": "string",
        "default": "''",
        "description": "Text or currency prepended to number (e.g. \"$\")"
      },
      {
        "name": "suffix",
        "type": "string",
        "default": "''",
        "description": "Text or unit appended to number (e.g. \"%\", \"ms\")"
      },
      {
        "name": "useGrouping",
        "type": "boolean",
        "default": "true",
        "description": "Formats with comma separators"
      },
      {
        "name": "compact",
        "type": "boolean",
        "default": "false",
        "description": "Formats using compact abbreviations (K, M, B)"
      },
      {
        "name": "stiffness",
        "type": "number",
        "default": "170",
        "description": "Spring transition stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "22",
        "description": "Spring transition damping"
      }
    ],
    "accessibility": [
      "Screen readers read the complete rendered string via aria-label attribute",
      "Bypasses motion if user has reduced-motion preference enabled"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { AnimatedNumber } from \"@/components/ui/animated-number\";\n\nexport function Demo() {\n  const [revenue, setRevenue] = useState(12450);\n\n  return (\n    <div className=\"text-3xl font-bold\">\n      <AnimatedNumber value={revenue} prefix=\"$\" useGrouping />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedNumber.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-number.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "animated-tabs",
    "name": "Animated Tabs",
    "tagline": "Layout-spring sliding active pill indicator",
    "description": "A tabbed switcher with physical pill indicator sliding smoothly between active items with content cross-fades.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Accessible",
      "Keyboard Friendly"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-tabs",
    "features": [
      "Shared layout active pill with spring easing",
      "Independent content animation cross-fade",
      "Badge count support for notifications"
    ],
    "props": [
      {
        "name": "tabs",
        "type": "TabItem[]",
        "default": "[]",
        "description": "Array of tabs with id, label, icon, content"
      },
      {
        "name": "defaultTab",
        "type": "string",
        "default": "tabs[0].id",
        "description": "Initial active tab ID"
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Tab change callback"
      }
    ],
    "accessibility": [
      "ARIA tablist, tab, and tabpanel roles",
      "Keyboard arrow navigation"
    ],
    "createdAt": "2026-08-10",
    "usageCode": "import { AnimatedTabs } from \"@/components/ui/animated-tabs\";\n\nexport function Demo() {\n  const tabs = [\n    { id: 'overview', label: 'Overview', content: <div>Metrics Overview</div> },\n    { id: 'analytics', label: 'Analytics', content: <div>Traffic Charts</div> },\n    { id: 'settings', label: 'Settings', content: <div>Preferences</div> },\n  ];\n  return <AnimatedTabs tabs={tabs} defaultTab=\"overview\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/AnimatedTabs.tsx",
        "type": "registry:ui",
        "target": "components/ui/animated-tabs.tsx"
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
  },
  {
    "id": "batch-gesture-tray",
    "name": "Batch Gesture Tray",
    "tagline": "Spring floating tray with multi-select batch actions",
    "description": "A touch-ready contextual tray that slides into view upon item selection, presenting bulk actions and real-time count telemetry.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Batch Actions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/batch-gesture-tray",
    "features": [
      "Spring slide-up bottom tray appearing automatically when 1 or more items are selected",
      "Integrated selection counter badge with Select-All / Deselect-All triggers",
      "Async action loading indicators preventing double-submission",
      "Dismissal via close button, escape key, or outside tap"
    ],
    "props": [
      {
        "name": "items",
        "type": "BatchItem[]",
        "description": "Array of selectable list items (id, title, subtitle)"
      },
      {
        "name": "actions",
        "type": "BatchAction[]",
        "description": "Array of batch action buttons (id, label, icon, action, color)"
      },
      {
        "name": "selectedIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled array of selected item IDs"
      },
      {
        "name": "onSelectionChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Selection state callback"
      },
      {
        "name": "onActionComplete",
        "type": "(actionId: string) => void",
        "default": "undefined",
        "description": "Callback fired on action finish"
      }
    ],
    "accessibility": [
      "Accessible checkbox toggle state and keyboard selection",
      "aria-live announcements when item selection counter changes",
      "Full keyboard tab access through tray action buttons"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { BatchGestureTray } from \"@/components/ui/batch-gesture-tray\";\nimport { Trash2, Archive, Download } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'serverless-edge-fn.ts', subtitle: 'Modified 4m ago' },\n    { id: '2', title: 'redis-cache-layer.ts', subtitle: 'Modified 1h ago' },\n    { id: '3', title: 'schema-validation.ts', subtitle: 'Modified 3h ago' },\n  ];\n\n  const actions = [\n    { id: 'download', label: 'Export', icon: <Download className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'archive', label: 'Archive', icon: <Archive className=\"w-3.5 h-3.5\" />, action: async () => {} },\n    { id: 'delete', label: 'Delete', color: 'danger' as const, icon: <Trash2 className=\"w-3.5 h-3.5\" />, action: async () => {} },\n  ];\n\n  return <BatchGestureTray items={items} actions={actions} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/BatchGestureTray.tsx",
        "type": "registry:ui",
        "target": "components/ui/batch-gesture-tray.tsx"
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
  },
  {
    "id": "book-call-button",
    "name": "Book Call Button",
    "tagline": "Expanding accent pill with phone hover state",
    "description": "A premium \"Book a call\" pill with a green expanding capsule. At rest, a 36% accent capsule holds a dotted arrow + label; on hover, the capsule fills the pill, the label slides out, and a phone icon with ringing lines fades in centered.",
    "category": "Buttons",
    "badges": [
      "Spring",
      "State Choreography",
      "Reduced Motion",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/book-call-button",
    "features": [
      "Three independently-timed motion layers: expanding capsule, label/arrow, and phone icon",
      "Capsule grows from \"left center\" so the expansion feels directional, not scale-from-middle",
      "Hover lift (1.01) and tap compression (0.975) on the pill itself, independent of the inner choreography",
      "Renders as <a> when href is provided so the same component works on a marketing page or a form action",
      "prefers-reduced-motion collapses every spring to an instant state change — no travel, no entrance",
      "Decorative SVGs are aria-hidden; the label is conveyed by aria-label on the interactive root",
      "Native <button> / <a> elements with focus-visible ring tied to the accent color"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "default": "'Book a call'",
        "description": "Label rendered to the right of the dotted arrow at rest"
      },
      {
        "name": "onClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Click handler — ignored when href is also provided"
      },
      {
        "name": "href",
        "type": "string",
        "default": "undefined",
        "description": "When provided, the pill renders as an <a> with this href instead of a <button>"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the pill root"
      }
    ],
    "accessibility": [
      "Semantic <button> by default; <a> when href is provided — no <div onClick>",
      "aria-label is set from the visible children so screen readers announce the action",
      "Decorative SVGs (dotted arrow, phone) are aria-hidden",
      "Visible focus-visible ring tied to the accent (#82ff22) for keyboard navigation",
      "prefers-reduced-motion fallback: all three motion layers resolve instantly to the final state",
      "pointer-events-none on the phone overlay ensures clicks always reach the underlying interactive element"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { BookCallButton } from \"@/components/ui/book-call-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center py-12\">\n      <BookCallButton onClick={() => console.log('Book a call clicked')} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/BookCallButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/book-call-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "branching-submenu",
    "name": "Branching Submenu",
    "tagline": "Animated tree navigation with keyboard support",
    "description": "A spatial submenu that connects parent options to child actions with staged branch motion.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Keyboard Friendly",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/branching-submenu",
    "features": [
      "Parent and child panels communicate hierarchy through position and stagger",
      "Arrow keys, Enter, and Escape support menu exploration",
      "Responsive layout stacks cleanly on narrow screens"
    ],
    "props": [
      {
        "name": "items",
        "type": "BranchingSubmenuItem[]",
        "default": "demo items",
        "description": "Parent items and optional child branches"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Branching navigation'",
        "description": "Accessible navigation label"
      }
    ],
    "accessibility": [
      "Uses a labeled navigation region and focus-visible rings",
      "Supports Escape to close the branch panel and arrow-key parent navigation",
      "Reduced motion replaces branch movement with a simple fade"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { BranchingSubmenu } from \"@/components/ui/branching-submenu\";\n\nexport function Demo() {\n  return <BranchingSubmenu />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/BranchingSubmenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/branching-submenu.tsx"
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
  },
  {
    "id": "button",
    "name": "Button",
    "tagline": "Multi-variant button system with tactile physics",
    "description": "A versatile, production-ready button system with 8 visual variants, 4 sizes, loading spinner states, icon slots, and spring tap feedback.",
    "category": "Buttons",
    "badges": [
      "Multi-variant",
      "Spring Tap",
      "Micro-interactions",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/button",
    "features": [
      "8 visual variants: Primary, Secondary, Outline, Ghost, Destructive, Success, Link, Gradient",
      "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
      "Spring tap micro-interaction (whileTap 0.97) via Framer Motion",
      "Accessible loading state with integrated monochrome spinner & aria-busy",
      "Left and right icon slots with automatic sizing and gap alignment",
      "Full width layout support (fullWidth)",
      "Strictly adheres to EasyUI monochrome dark palette and sky focus ring"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link' | 'gradient'",
        "default": "'primary'",
        "description": "Visual presentation style"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'icon'",
        "default": "'md'",
        "description": "Dimensions and typography scale"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays an animated spinner and disables user interaction"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "undefined",
        "description": "Optional text displayed alongside the loading spinner"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed before children"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed after children"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches button to 100% width of parent container"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Native <button> semantics with explicit type=\"button\" default",
      "Standard focus-ring outline with Sky-400 accent on keyboard :focus-visible",
      "Proper aria-busy and disabled accessibility states",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Button } from \"@/components/ui/button\";\nimport { Sparkles, ArrowRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <Button variant=\"primary\" leftIcon={<Sparkles className=\"w-4 h-4\" />}>\n        Get Started\n      </Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Button.tsx",
        "type": "registry:ui",
        "target": "components/ui/button.tsx"
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
  },
  {
    "id": "circular-orbit",
    "name": "Circular Orbit",
    "tagline": "Continuous circular orbit gallery with depth-aware tiles",
    "description": "A circular gallery of image tiles orbiting around a centered title. All motion runs on a single MotionValue driven by useAnimationFrame, so no React renders per frame.",
    "category": "Motion",
    "badges": [
      "MotionValue",
      "Spatial Animation",
      "Depth Field",
      "Gallery"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/circular-orbit",
    "features": [
      "Single shared rotation MotionValue drives every tile — no React state per frame",
      "True circular orbit: x and y use the same radius so tiles trace a perfect circle",
      "Depth field derived from cos(angle): scale, opacity, blur, and z-index stay internally consistent",
      "Smooth ease-in / ease-out on hover-pause instead of a hard stop",
      "Configurable speed, radius, items, and pause-on-hover behaviour",
      "Respects prefers-reduced-motion: animation loop short-circuits to a static rest pose",
      "Light and dark surface variants"
    ],
    "props": [
      {
        "name": "items",
        "type": "OrbitItem[]",
        "default": "14 Unsplash tiles",
        "description": "Tiles to place around the orbit"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Push'",
        "description": "Centered headline rendered above the orbit"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "0.00022",
        "description": "Radians per millisecond. Smaller = slower"
      },
      {
        "name": "radius",
        "type": "number",
        "default": "270",
        "description": "Pixel radius of the orbit on the desktop layout"
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "default": "true",
        "description": "Smoothly stop the orbit when the pointer enters the gallery"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the section root"
      }
    ],
    "accessibility": [
      "role=\"region\" with aria-label so the gallery is announced as a single landmark",
      "Decorative tiles and the centered headline are aria-hidden — content is conveyed by the label",
      "Images use loading=\"lazy\" and decoding=\"async\" and a neutral alt for screen readers",
      "prefers-reduced-motion short-circuits the animation loop — the gallery rests in place"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { CircularOrbit } from \"@/components/ui/circular-orbit\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-3xl mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <CircularOrbit\n        title=\"Push\"\n        speed={0.00022}\n        radius={240}\n        pauseOnHover\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/CircularOrbit.tsx",
        "type": "registry:ui",
        "target": "components/ui/circular-orbit.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "code-snippet-deck",
    "name": "Code Snippet Deck",
    "tagline": "Multi-language code runner snippet deck with live variable tuning",
    "description": "An interactive multi-runtime developer code snippet deck with runtime switching (cURL, TypeScript, Python, Go, Rust), live dynamic parameter customizations, and line highlighting.",
    "category": "Buttons",
    "badges": [
      "Code Runner",
      "Multi-Runtime",
      "Live Customizer"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/code-snippet-deck",
    "features": [
      "Seamless multi-runtime tab switching (cURL, TypeScript, Python, Go, Rust)",
      "Dynamic parameter tuning drawer that updates generated code in real time",
      "Configurable line numbers and selective line highlighting",
      "macOS terminal-inspired window header with traffic dots and copy system",
      "Zero layout shift spring transition on tab changes"
    ],
    "props": [
      {
        "name": "snippets",
        "type": "SnippetItem[]",
        "default": "[]",
        "description": "Collection of language snippets and generator functions"
      },
      {
        "name": "parameters",
        "type": "SnippetParameter[]",
        "default": "[]",
        "description": "Configurable runtime variables (checkboxes, dropdowns, inputs)"
      },
      {
        "name": "defaultLanguage",
        "type": "string",
        "default": "snippets[0]?.language",
        "description": "Initially selected language key"
      },
      {
        "name": "showLineNumbers",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display code line numbering"
      },
      {
        "name": "showWindowBar",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render macOS window bar header"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS container classes"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA code viewer roles",
      "Accessible tablist and tab roles with keyboard navigation",
      "High contrast accessible code text styling"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { CodeSnippetDeck } from \"@/components/ui/code-snippet-deck\";\n\nconst snippets = [\n  {\n    language: \"typescript\",\n    label: \"TypeScript\",\n    filename: \"client.ts\",\n    highlightLines: [4, 5],\n    code: (p: any) => `import { EasyClient } from \"@easyui/sdk\";\n\nconst client = new EasyClient({\n  apiKey: \"${p.apiKey || \"sk_live_9981\"}\",\n  streaming: ${p.stream ? \"true\" : \"false\"},\n});\n\nconst response = await client.completions.create({\n  model: \"easy-4o\",\n  prompt: \"Generate modern dark UI\",\n});`,\n  },\n  {\n    language: \"curl\",\n    label: \"cURL\",\n    filename: \"request.sh\",\n    code: (p: any) => `curl https://api.easyui.dev/v1/completions \\\n  -H \"Authorization: Bearer ${p.apiKey || \"sk_live_9981\"}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"model\": \"easy-4o\", \"stream\": ${p.stream ? \"true\" : \"false\"}}'`,\n  },\n];\n\nconst parameters = [\n  { id: \"stream\", label: \"Stream response\", type: \"boolean\" as const, defaultValue: true },\n  { id: \"apiKey\", label: \"API Key\", type: \"text\" as const, defaultValue: \"sk_live_demo\" },\n];\n\nexport function Demo() {\n  return <CodeSnippetDeck snippets={snippets} parameters={parameters} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CodeSnippetDeck.tsx",
        "type": "registry:ui",
        "target": "components/ui/code-snippet-deck.tsx"
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
  },
  {
    "id": "command-menu",
    "name": "Command Menu",
    "tagline": "Global ⌘K fuzzy palette with category grouping",
    "description": "A global keyboard-first command palette with fuzzy filtering, category badges, and keyboard arrow controls.",
    "category": "Overlays",
    "badges": [
      "Keyboard First",
      "⌘K / Ctrl+K",
      "Fuzzy Filtering"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/command-menu",
    "features": [
      "Global hotkey listener (⌘K / Ctrl+K)",
      "Arrow key navigation with wrapping",
      "Category badges and action shortcuts"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "default": "false",
        "description": "Control visibility"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "Required",
        "description": "Close handler callback"
      }
    ],
    "accessibility": [
      "ARIA combobox pattern",
      "Keyboard-only navigation"
    ],
    "createdAt": "2026-08-01",
    "usageCode": "import { CommandMenu } from \"@/components/ui/command-menu\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return <CommandMenu isOpen={open} onClose={() => setOpen(false)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/CommandMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/command-menu.tsx"
      },
      {
        "path": "src/components/icons/GithubIcon.tsx",
        "type": "registry:ui",
        "target": "components/icons/github-icon.tsx"
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
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "density-lens",
    "name": "Density Lens",
    "tagline": "Cursor-tracking magnification & detail inspection lens",
    "description": "An interactive floating lens that tracks pointer movement to reveal high-density data, magnified details, or alternative views.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Inspection",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/density-lens",
    "features": [
      "Subtle spring lag cursor tracking for realistic tactile lens momentum",
      "Automatic coordinate interpolation with 2x magnification or custom overlay renderers",
      "Configurable lens geometry (circle, oval, rounded square), border glow, and zoom scale",
      "Zero layout shifts and smooth GPU-accelerated backdrop blur"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "description": "Underlying background content being inspected"
      },
      {
        "name": "renderLensContent",
        "type": "(pos: { x: number, y: number, scale: number }) => ReactNode",
        "default": "undefined",
        "description": "Custom overlay rendered inside lens"
      },
      {
        "name": "lensSize",
        "type": "number",
        "default": "150",
        "description": "Diameter/width of lens in pixels"
      },
      {
        "name": "lensShape",
        "type": "'circle' | 'oval' | 'square'",
        "default": "'circle'",
        "description": "Geometric shape of lens"
      },
      {
        "name": "zoomScale",
        "type": "number",
        "default": "2",
        "description": "Magnification factor"
      },
      {
        "name": "showBorder",
        "type": "boolean",
        "default": "true",
        "description": "Renders border and glass glow around perimeter"
      }
    ],
    "accessibility": [
      "Non-destructive hover lens overlay preserves underlying semantic document tree",
      "Includes crosshair pointer hints and smooth fade transitions",
      "Touch fallbacks support direct inspection"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DensityLens } from \"@/components/ui/density-lens\";\n\nexport function Demo() {\n  return (\n    <DensityLens lensSize={160} zoomScale={2}>\n      <div className=\"p-8 bg-[#0C0C0C] rounded-2xl border border-[#222222]\">\n        <h3 className=\"text-sm font-semibold text-white\">System Architecture</h3>\n        <p className=\"text-xs text-[#808080] mt-2\">\n          Hover pointer across surface to inspect high-resolution telemetry nodes.\n        </p>\n      </div>\n    </DensityLens>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DensityLens.tsx",
        "type": "registry:ui",
        "target": "components/ui/density-lens.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "dependency-trace",
    "name": "Dependency Trace",
    "tagline": "Interactive SVG node relationship & dependency tracer",
    "description": "An interactive SVG node graph that maps and dynamically traces relationship connections with directional bezier curves.",
    "category": "Motion",
    "badges": [
      "SVG",
      "Framer Motion",
      "Graph Visualization",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dependency-trace",
    "features": [
      "Interactive bezier curve paths with animated glow pulses on hover",
      "Automatic dimming of unrelated network branches and nodes",
      "Configurable node placement or radial auto-layout geometry",
      "Accessible region landmark with hover & click selection telemetry"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "TraceNode[]",
        "description": "Array of graph nodes (id, label, type, x, y)"
      },
      {
        "name": "connections",
        "type": "TraceConnection[]",
        "description": "Array of directional or undirected link connections (from, to, label)"
      },
      {
        "name": "onNodeSelect",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Node click event callback"
      },
      {
        "name": "onNodeHover",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Hover event callback"
      },
      {
        "name": "nodeSize",
        "type": "number",
        "default": "36",
        "description": "Node diameter in pixels"
      }
    ],
    "accessibility": [
      "Semantic role=\"region\" and descriptive aria-label",
      "Full contrast ratio compliance across connected and dimmed states",
      "Keyboard and touch-friendly target radius"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DependencyTrace } from \"@/components/ui/dependency-trace\";\n\nexport function Demo() {\n  return (\n    <DependencyTrace\n      nodes={[\n        { id: 'gateway', label: 'Gateway' },\n        { id: 'auth', label: 'Auth Svc' },\n        { id: 'database', label: 'Postgres' },\n        { id: 'cache', label: 'Redis' },\n        { id: 'queue', label: 'Kafka' },\n      ]}\n      connections={[\n        { from: 'gateway', to: 'auth' },\n        { from: 'auth', to: 'database' },\n        { from: 'auth', to: 'cache' },\n        { from: 'gateway', to: 'queue' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DependencyTrace.tsx",
        "type": "registry:ui",
        "target": "components/ui/dependency-trace.tsx"
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
  },
  {
    "id": "depth-corridor",
    "name": "Depth Corridor",
    "tagline": "CSS 3D perspective tunnel with progressive depth blur",
    "description": "A 3D spatial layer stack with receding perspective depth, progressive focal blurs, and pointer parallax motion.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "3D Perspective",
      "Parallax",
      "Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/depth-corridor",
    "features": [
      "True 3D perspective translation (translateZ) and multi-layered receding depth geometry",
      "Progressive depth-of-field focal blurring and subtle mouse tracking parallax",
      "Keyboard arrow navigation (Left/Right/Up/Down) with smooth spring transitions",
      "Tactile indicator pills and interactive layer selection"
    ],
    "props": [
      {
        "name": "layers",
        "type": "DepthLayer[]",
        "description": "Array of layer objects (id, title, subtitle, content, blurAmount)"
      },
      {
        "name": "activeLayerIndex",
        "type": "number",
        "default": "0",
        "description": "Controlled active foreground layer index"
      },
      {
        "name": "onLayerChange",
        "type": "(index: number) => void",
        "default": "undefined",
        "description": "Layer change event callback"
      },
      {
        "name": "perspectiveDepth",
        "type": "number",
        "default": "1000",
        "description": "CSS 3D perspective container depth in pixels"
      },
      {
        "name": "enableParallax",
        "type": "boolean",
        "default": "true",
        "description": "Enables mouse coordinate responsive 3D tilt"
      }
    ],
    "accessibility": [
      "Focusable region with role=\"region\" and aria-label",
      "Arrow key support for rapid layer switching",
      "Respects reduced motion by calming perspective tilt and blur values"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { DepthCorridor } from \"@/components/ui/depth-corridor\";\n\nexport function Demo() {\n  return (\n    <DepthCorridor\n      layers={[\n        { id: '1', title: 'Edge Telemetry', subtitle: 'Real-time p99 latency', content: <div>12.4ms global response</div> },\n        { id: '2', title: 'Cluster Workers', subtitle: 'Serverless nodes', content: <div>64 active workers</div> },\n        { id: '3', title: 'Cache Invalidation', subtitle: 'Instant purge API', content: <div>0.4s TTL sync</div> },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DepthCorridor.tsx",
        "type": "registry:ui",
        "target": "components/ui/depth-corridor.tsx"
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
  },
  {
    "id": "directional-tooltip",
    "name": "DirectionalTooltip",
    "tagline": "Appears from its origin direction",
    "description": "A tooltip that appears from the direction it originates — it starts a small distance outside the trigger in its preferred direction and springs inward, so it feels like it materializes from the trigger.",
    "category": "Overlays",
    "badges": [
      "Directional",
      "Spring In",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/directional-tooltip",
    "features": [
      "Entry motion originates from the chosen side (top/right/bottom/left)",
      "Snappy spring (springSnappy) settles the tooltip into place",
      "Alignment per side: start / center / end",
      "Configurable delay, offset, and optional arrow indicator",
      "Light/dark theme aware via CSS variables"
    ],
    "props": [
      {
        "name": "content",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Tooltip body content"
      },
      {
        "name": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "default": "'top'",
        "description": "Preferred side for the tooltip"
      },
      {
        "name": "align",
        "type": "'start' | 'center' | 'end'",
        "default": "'center'",
        "description": "Alignment along the chosen side"
      },
      {
        "name": "delayDuration",
        "type": "number",
        "default": "150",
        "description": "Delay before showing, in ms"
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "default": "true",
        "description": "Show the arrow indicator"
      },
      {
        "name": "offset",
        "type": "number",
        "default": "8",
        "description": "Spacing from the trigger in px"
      },
      {
        "name": "forceOpen",
        "type": "boolean",
        "default": "false",
        "description": "Force the tooltip open (for previews)"
      }
    ],
    "accessibility": [
      "role=\"tooltip\" with aria-describedby on the trigger when open",
      "Hover and focus both show the tooltip; blur / mouseleave hide it",
      "Configurable delay so accidental hovers do not flood the UI"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { DirectionalTooltip } from \"@/components/ui/directional-tooltip\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-4\">\n      <DirectionalTooltip content=\"Save your changes\" side=\"top\">\n        <PressButton>Save</PressButton>\n      </DirectionalTooltip>\n      <DirectionalTooltip content=\"Open command palette ⌘K\" side=\"bottom\" align=\"end\">\n        <PressButton variant=\"secondary\">Search</PressButton>\n      </DirectionalTooltip>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DirectionalTooltip.tsx",
        "type": "registry:ui",
        "target": "components/ui/directional-tooltip.tsx"
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
  },
  {
    "id": "dot-field",
    "name": "Dot Field",
    "tagline": "Lightweight static Canvas particle matrix background",
    "description": "High-performance lightweight static Canvas dot matrix background with dynamic gradient coloring and responsive density scaling.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Static Visual",
      "Zero Overhead"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/dot-field",
    "features": [
      "Hardware-accelerated HTML5 Canvas rendering",
      "Zero CPU overhead — renders once and updates only on resize",
      "Clean linear gradient coloring with custom stops",
      "Responsive ResizeObserver layout support"
    ],
    "props": [
      {
        "name": "dotRadius",
        "type": "number",
        "default": "1.5",
        "description": "Radius of each individual dot (px)"
      },
      {
        "name": "dotSpacing",
        "type": "number",
        "default": "14",
        "description": "Spacing between adjacent dots in the grid (px)"
      },
      {
        "name": "gradientFrom",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.35)'",
        "description": "Start gradient color"
      },
      {
        "name": "gradientTo",
        "type": "string",
        "default": "'rgba(168, 85, 247, 0.25)'",
        "description": "End gradient color"
      },
      {
        "name": "className",
        "type": "string",
        "default": "''",
        "description": "Optional container CSS class"
      }
    ],
    "accessibility": [
      "Canvas decorative element",
      "Aria-hidden/pointer-events safe layer"
    ],
    "createdAt": "2026-08-08",
    "usageCode": "import { DotField } from \"@/components/ui/dot-field\";\n\nexport function Demo() {\n  return (\n    <div className=\"relative w-full h-[300px] overflow-hidden rounded-xl bg-[#0A0A0A]\">\n      <DotField\n        dotRadius={1.5}\n        dotSpacing={14}\n        gradientFrom=\"rgba(56, 189, 248, 0.35)\"\n        gradientTo=\"rgba(168, 85, 247, 0.25)\"\n      />\n    </div>\n  );\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/DotField.tsx",
        "type": "registry:ui",
        "target": "components/ui/dot-field.tsx"
      },
      {
        "path": "src/components/ui/DotField.css",
        "type": "registry:ui",
        "target": "components/ui/dot-field.css"
      }
    ]
  },
  {
    "id": "drag-to-confirm",
    "name": "Drag to Confirm",
    "tagline": "Spring-resistant slider for confirming destructive or critical operations",
    "description": "A physical drag-to-confirm slider for high-stakes and destructive actions, equipped with elastic spring snapback physics, progressive track illumination, and accessible keyboard fallbacks.",
    "category": "Buttons",
    "badges": [
      "Confirmation",
      "Gesture Physics",
      "Safety Controls"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/drag-to-confirm",
    "features": [
      "Physical gesture drag handle with spring snapback upon incomplete drags",
      "Dynamic text opacity and track fill response correlated with drag distance",
      "Supports Delete, Archive, Confirm, Submit, and Unlock action profiles",
      "Automatic post-confirmation reset timer with customizable delay",
      "Full keyboard accessibility (Space/Enter to trigger) and touch screen compatibility"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "'Slide to confirm'",
        "description": "Action instruction text rendered along track"
      },
      {
        "name": "confirmedLabel",
        "type": "string",
        "default": "'Confirmed ✓'",
        "description": "Text shown when slider is locked into completion"
      },
      {
        "name": "actionType",
        "type": "'delete' | 'archive' | 'confirm' | 'submit' | 'unlock' | 'continue'",
        "default": "'confirm'",
        "description": "Action preset style"
      },
      {
        "name": "onConfirm",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback triggered upon successful confirmation completion"
      },
      {
        "name": "autoResetDelay",
        "type": "number",
        "default": "2500",
        "description": "Milliseconds before resetting back to start"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables slider gesture and interaction"
      }
    ],
    "accessibility": [
      "Accessible role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow attributes",
      "Focus-visible ring around draggable handle for keyboard navigators",
      "Screen reader fallback action button for assistive tech users"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { DragToConfirm } from \"@/components/ui/drag-to-confirm\";\n\nexport function Demo() {\n  return (\n    <DragToConfirm\n      actionType=\"delete\"\n      label=\"Slide to delete database →\"\n      confirmedLabel=\"Database Deleted\"\n      onConfirm={() => console.log('Destroy action confirmed')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/DragToConfirm.tsx",
        "type": "registry:ui",
        "target": "components/ui/drag-to-confirm.tsx"
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
  },
  {
    "id": "draw-checkbox",
    "name": "DrawCheckbox",
    "tagline": "Checkmark draws itself, then settles",
    "description": "A checkbox whose checkmark draws itself (path length animation) and settles with a tiny overshoot. The box scales from 0.9 -> 1.04 -> 1.0 for a tactile snap feel.",
    "category": "Forms",
    "badges": [
      "Path Draw",
      "Overshoot",
      "Indeterminate",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/draw-checkbox",
    "features": [
      "Checkmark animates via stroke-dashoffset (path length 0 -> 1) with a snappy draw curve",
      "Box scales 0.9 -> 1.04 -> 1.0 for a tiny physical overshoot, then settles",
      "Indeterminate state draws a bar from left to right via scaleX origin",
      "Accent background swaps to var(--accent) when checked — theme aware",
      "Full controlled / uncontrolled state support, plus ref forwarding"
    ],
    "props": [
      {
        "name": "label",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Label text displayed next to the box"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the label"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "When true, renders a horizontal bar instead of a checkmark"
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled checked state"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      }
    ],
    "accessibility": [
      "Hidden native <input type=\"checkbox\"> preserves semantics and screen-reader support",
      "Visible box is a label proxy — clicking it forwards to the native input",
      "Disabled state communicated both visually and via aria-disabled"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { DrawCheckbox } from \"@/components/ui/draw-checkbox\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3\">\n      <DrawCheckbox label=\"Email me product updates\" description=\"We send about one email per month.\" defaultChecked />\n      <DrawCheckbox label=\"Indeterminate option\" indeterminate />\n      <DrawCheckbox label=\"Accept terms\" />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/DrawCheckbox.tsx",
        "type": "registry:ui",
        "target": "components/ui/draw-checkbox.tsx"
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
  },
  {
    "id": "evil-eye",
    "name": "Evil Eye",
    "tagline": "Pointer-driven hanging amulet with layered spring physics",
    "description": "A hanging navy amulet disc with concentric sky-blue and white rings that swings with realistic inertia in response to the pointer, painted as a layered SVG and driven by a single spring pipeline.",
    "category": "Motion",
    "badges": [
      "Spring Physics",
      "Pointer Tracking",
      "Layered Motion",
      "Painted SVG"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/evil-eye",
    "features": [
      "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
      "Layered secondary motion — braided cord, metallic cap, and amulet disc each swing independently",
      "Painted SVG with radial gradients for the navy disc, sky-blue ring, and the signature pupil glint",
      "Configurable spring stiffness, damping, and max rotation for tuning the physical feel",
      "Geometry-aware normalization that adapts to the actual container size",
      "Respects prefers-reduced-motion with a clean static rest pose",
      "Graceful degradation when pointer events are unavailable"
    ],
    "props": [
      {
        "name": "maxRotation",
        "type": "number",
        "default": "13",
        "description": "Maximum rotation in degrees at full pointer offset"
      },
      {
        "name": "stiffnessX",
        "type": "number",
        "default": "55",
        "description": "Pointer X spring stiffness (higher = snappier follow)"
      },
      {
        "name": "stiffnessY",
        "type": "number",
        "default": "45",
        "description": "Pointer Y spring stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "9",
        "description": "Spring damping (higher = less swing overshoot)"
      },
      {
        "name": "caption",
        "type": "string",
        "default": "undefined",
        "description": "Optional screen-reader caption for the amulet"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the container"
      }
    ],
    "accessibility": [
      "role=\"img\" with descriptive aria-label for screen readers",
      "Touch-none and select-none to avoid stray text selection while interacting",
      "Complete prefers-reduced-motion fallback: pointer listeners are never wired, amulet rests in place",
      "Decorative SVG marked aria-hidden"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { EvilEye } from \"@/components/ui/evil-eye\";\n\nexport function Demo() {\n  return (\n    <EvilEye\n      maxRotation={13}\n      stiffnessX={55}\n      stiffnessY={45}\n      damping={9}\n      caption=\"Hanging evil eye amulet\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/EvilEye.tsx",
        "type": "registry:ui",
        "target": "components/ui/evil-eye.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "expandable-data-row",
    "name": "Expandable Data Row",
    "tagline": "Smooth unfolding table row with deep metadata and responsive mobile conversion",
    "description": "A polished table component with fluid accordion row unfolding, revealing deep metadata, audit activity feeds, and quick actions, with automatic card restructuring on mobile viewports.",
    "category": "Motion",
    "badges": [
      "Tables",
      "Accordion Motion",
      "Responsive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-data-row",
    "features": [
      "Soft accordion expansion unfolding details directly beneath rows without modals",
      "Single or multi-row simultaneous expansion modes",
      "Full metadata breakdown with account metrics and historical activity timeline",
      "Adaptive layout engine transforming desktop table into touch cards on mobile devices",
      "Integrated quick actions with one-click email copying and callback hooks"
    ],
    "props": [
      {
        "name": "items",
        "type": "DataRowItem[]",
        "default": "[...]",
        "description": "Data records with user, status, revenue, and metadata"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Permit multiple expanded rows concurrently"
      },
      {
        "name": "defaultExpandedIds",
        "type": "string[]",
        "default": "['usr_01']",
        "description": "Initially expanded row identifiers"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Displays pulse skeleton loaders during data fetch"
      },
      {
        "name": "onRowAction",
        "type": "(action: string, row: DataRowItem) => void",
        "default": "undefined",
        "description": "Callback fired on row action buttons"
      }
    ],
    "accessibility": [
      "Aria-expanded attributes and keyboard navigation (Enter, Space, Tab)",
      "Semantic table row and button hierarchy compliant with WCAG 2.1 AA",
      "Reduced motion support with instant height visibility toggle"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ExpandableDataRow } from \"@/components/ui/expandable-data-row\";\n\nexport function Demo() {\n  return (\n    <ExpandableDataRow\n      items={[\n        {\n          id: \"usr_01\",\n          user: { name: \"Sarah Connor\", email: \"sarah@cyberdyne.io\" },\n          status: \"active\",\n          revenue: \"$4,280\",\n          date: \"Oct 24, 2026\",\n          metadata: { plan: \"Enterprise Plus\", sessions: 482 },\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableDataRow.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-data-row.tsx"
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
  },
  {
    "id": "expandable-search",
    "name": "Expandable Search",
    "tagline": "Compact spring width morphing search input",
    "description": "A compact search pill that smoothly widens on focus with shortcut hint pills and clear button.",
    "category": "Navigation",
    "badges": [
      "Spring Expansion",
      "Shortcuts",
      "Compact"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/expandable-search",
    "features": [
      "Spring physics width expansion",
      "Shortcut badge hint",
      "Instant clear button on input"
    ],
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSearch",
        "type": "(query: string) => void",
        "default": "undefined",
        "description": "Search query callback"
      }
    ],
    "accessibility": [
      "Accessible search input role",
      "Clear button accessible label"
    ],
    "createdAt": "2026-08-02",
    "usageCode": "import { ExpandableSearch } from \"@/components/ui/expandable-search\";\n\nexport function Demo() {\n  return <ExpandableSearch onSearch={(q) => console.log(q)} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ExpandableSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/expandable-search.tsx"
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
  },
  {
    "id": "faq",
    "name": "FAQ",
    "tagline": "Expandable spring-physics accordion with search & category filtering",
    "description": "An expandable accordion FAQ component with smooth spring height calculation, single/multi-open modes, category filtering, search, and full ARIA keyboard accessibility.",
    "category": "Feedback",
    "badges": [
      "FAQ",
      "Accordion",
      "Spring Physics",
      "Searchable",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/faq",
    "features": [
      "Smooth height calculation and rotation via Framer Motion springGentle",
      "Single-open accordion or multi-open simultaneous expansion modes",
      "Controlled and uncontrolled state management (openIds / defaultOpen)",
      "Integrated search filter bar and optional category filter pills",
      "Two layout modes: Unified grouped card or separated individual cards",
      "Full keyboard accessibility (Space, Enter, Tab) and ARIA attributes"
    ],
    "props": [
      {
        "name": "items",
        "type": "FAQItem[]",
        "default": "[]",
        "description": "Array of FAQ items with id, question, answer, category, badge, icon"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows multiple accordion items to remain open simultaneously"
      },
      {
        "name": "defaultOpen",
        "type": "string[] | string",
        "default": "undefined",
        "description": "Default expanded item ID(s) on initial mount"
      },
      {
        "name": "openIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled list of currently expanded item IDs"
      },
      {
        "name": "onOpenChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Callback fired when open item selection changes"
      },
      {
        "name": "iconStyle",
        "type": "'chevron' | 'plus-minus' | 'custom'",
        "default": "'chevron'",
        "description": "Indicator icon style"
      },
      {
        "name": "searchable",
        "type": "boolean",
        "default": "false",
        "description": "Displays search filter bar above FAQ items"
      },
      {
        "name": "showCategories",
        "type": "boolean",
        "default": "false",
        "description": "Displays category filter pills above items"
      },
      {
        "name": "variant",
        "type": "'unified' | 'separated'",
        "default": "'unified'",
        "description": "Visual presentation layout"
      }
    ],
    "accessibility": [
      "aria-expanded state and aria-controls linking button headers to content regions",
      "Semantic role=\"region\" and aria-labelledby on accordion content panels",
      "Keyboard activation via Space and Enter with sky focus ring",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { FAQ } from \"@/components/ui/faq\";\n\nexport function Demo() {\n  return (\n    <FAQ\n      allowMultiple\n      searchable\n      items={[\n        {\n          id: \"1\",\n          question: \"What makes EasyUI different?\",\n          answer: \"EasyUI is distributed directly into your codebase via the official shadcn CLI, powered by spring physics rather than rigid ease-in-out transitions.\"\n        },\n        {\n          id: \"2\",\n          question: \"Can I customize the styling?\",\n          answer: \"Yes! All components are built with standard Tailwind CSS utility classes and clean React TypeScript code with zero proprietary wrappers.\"\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FAQ.tsx",
        "type": "registry:ui",
        "target": "components/ui/faq.tsx"
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
  },
  {
    "id": "floating-action-dock",
    "name": "Floating Action Dock",
    "tagline": "Magnification curve with physical spring feedback",
    "description": "A floating quick-action toolbar inspired by macOS dock physics with smooth magnification and subtle tooltips.",
    "category": "Navigation",
    "badges": [
      "Pointer Physics",
      "Magnification Curve",
      "Tooltips"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/floating-action-dock",
    "features": [
      "Continuous distance interpolation curve",
      "Tooltips with instant spring opacity",
      "Active status indicator dot"
    ],
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "default": "[]",
        "description": "Dock icons with labels, actions, and icons"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Current active item identifier"
      }
    ],
    "accessibility": [
      "Standard aria-labels for every button item",
      "Accessible keyboard focus"
    ],
    "createdAt": "2026-08-12",
    "usageCode": "import { FloatingActionDock } from \"@/components/ui/floating-action-dock\";\nimport { Terminal, Code2, Sparkles, Settings } from \"lucide-react\";\n\nexport function Demo() {\n  const items = [\n    { id: 'terminal', label: 'Terminal', icon: <Terminal /> },\n    { id: 'editor', label: 'Editor', icon: <Code2 /> },\n    { id: 'ai', label: 'AI Assistant', icon: <Sparkles /> },\n  ];\n  return <FloatingActionDock items={items} activeId=\"terminal\" />;\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/FloatingActionDock.tsx",
        "type": "registry:ui",
        "target": "components/ui/floating-action-dock.tsx"
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
  },
  {
    "id": "focus-mode",
    "name": "Focus Mode",
    "tagline": "Atmospheric UI isolation dimming background distractions without layout shifts",
    "description": "An atmospheric focus-mode interaction that isolates selected cards or sections by smoothly dimming surrounding distractions with zero layout shift, tactile spring scaling, and Escape key dismissal.",
    "category": "Motion",
    "badges": [
      "Focus Mode",
      "Motion Physics",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/focus-mode",
    "features": [
      "Subtle background opacity dampening bringing selected components into focus",
      "Zero layout shift architecture keeping existing dashboard grid geometry intact",
      "Tactile spring scaling and border elevation on active focused target",
      "Keyboard Escape key listener and explicit exit controls",
      "Reduced motion support with instant opacity transitions"
    ],
    "props": [
      {
        "name": "items",
        "type": "FocusModeItem[]",
        "default": "[...]",
        "description": "List of dashboard cards or sections"
      },
      {
        "name": "focusedId",
        "type": "string | null",
        "default": "null",
        "description": "Controlled focused card ID"
      },
      {
        "name": "onFocusChange",
        "type": "(id: string | null) => void",
        "default": "undefined",
        "description": "Callback fired when focused element changes"
      },
      {
        "name": "dimOpacity",
        "type": "number",
        "default": "0.2",
        "description": "Opacity applied to unfocused background cards"
      }
    ],
    "accessibility": [
      "Escape key listener automatically dismisses focus mode and restores full viewport opacity",
      "Focus rings remain strictly compliant with EasyUI sky-400 tokens"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { FocusMode } from \"@/components/ui/focus-mode\";\n\nexport function Demo() {\n  return (\n    <FocusMode\n      items={[\n        {\n          id: \"mrr\",\n          title: \"Monthly Recurring Revenue\",\n          metric: \"$148,290\",\n          delta: \"+18.4%\",\n          content: <p>Enterprise plan renewals</p>\n        }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/FocusMode.tsx",
        "type": "registry:ui",
        "target": "components/ui/focus-mode.tsx"
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
  },
  {
    "id": "form",
    "name": "Form",
    "tagline": "Composable, accessible form primitives and controls",
    "description": "A modular, composable form system with accessible inputs, textareas, custom selects, checkboxes, radio groups, switches, and animated validation messages.",
    "category": "Forms",
    "badges": [
      "Forms",
      "Accessible",
      "Spring Motion",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/form",
    "features": [
      "Modular layout primitives: Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage",
      "Comprehensive controls: Input, Textarea, Select, Checkbox, RadioGroup, Switch",
      "Spring-animated validation errors and password visibility toggle",
      "Tactile check, radio dot, and toggle switch spring physics",
      "Accessible ARIA semantics, required asterisks, and keyboard navigation",
      "Strict monochrome dark styling matching EasyUI surface elevation tokens"
    ],
    "props": [
      {
        "name": "onSubmit",
        "type": "(e: FormEvent) => void",
        "default": "undefined",
        "description": "Form submission handler"
      },
      {
        "name": "error",
        "type": "string | boolean",
        "default": "undefined",
        "description": "Validation error text or boolean trigger"
      },
      {
        "name": "showPasswordToggle",
        "type": "boolean",
        "default": "false",
        "description": "Enables eye icon toggle for password inputs"
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Displays red asterisk and enforces requirement"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Leading icon inside input fields"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Trailing icon inside input fields"
      }
    ],
    "accessibility": [
      "Semantic label-input association with generated IDs",
      "ARIA role=\"alert\" on animated validation messages",
      "role=\"switch\" and role=\"radiogroup\" with proper aria-checked attributes",
      "Sky-400 focus ring on all interactive focusable elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button } from \"@/components/ui/form\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [email, setEmail] = useState(\"\");\n  const [error, setError] = useState(\"\");\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!email.includes(\"@\")) {\n      setError(\"Please enter a valid email address.\");\n    } else {\n      setError(\"\");\n    }\n  };\n\n  return (\n    <Form onSubmit={handleSubmit} className=\"max-w-sm\">\n      <FormItem>\n        <FormLabel required>Email Address</FormLabel>\n        <FormControl>\n          <Input\n            type=\"email\"\n            placeholder=\"you@company.com\"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            error={!!error}\n          />\n        </FormControl>\n        <FormDescription>We will never share your email.</FormDescription>\n        <FormMessage error={error} />\n      </FormItem>\n      <Button type=\"submit\" variant=\"primary\" fullWidth>\n        Submit\n      </Button>\n    </Form>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Form.tsx",
        "type": "registry:ui",
        "target": "components/ui/form.tsx"
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
  },
  {
    "id": "glass-navbar",
    "name": "Glass Navbar",
    "tagline": "Refined glass navigation with spring physics",
    "description": "A modern, responsive glassmorphic navbar with smooth spring navigation pills, mobile menu drawer, and keyboard accessibility.",
    "category": "Navigation",
    "badges": [
      "Glassmorphism",
      "Responsive",
      "Spring Physics",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/glass-navbar",
    "features": [
      "Subtle glassmorphic blur backdrop (bg-[#050505]/85 backdrop-blur-md)",
      "Dual layout modes: Floating pill or full-width sticky bar",
      "Shared layout spring animations for hover spotlight & active indicators",
      "Responsive mobile menu drawer with smooth Framer Motion spring transition",
      "Customizable brand logo, navigation items, badges, and CTA action slot",
      "Full keyboard navigation, Escape key dismiss, and aria-expanded accessibility"
    ],
    "props": [
      {
        "name": "brand",
        "type": "React.ReactNode",
        "default": "<EasyUILogo />",
        "description": "Brand / Logo element or text component"
      },
      {
        "name": "brandHref",
        "type": "string",
        "default": "'/'",
        "description": "Root link destination for the brand logo"
      },
      {
        "name": "items",
        "type": "NavItem[]",
        "default": "Default items array",
        "description": "Array of navigation links with label, href, badge, icon"
      },
      {
        "name": "cta",
        "type": "React.ReactNode",
        "default": "<GetStartedButton />",
        "description": "Right-hand side action slot / CTA button"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Explicit active item identifier or label"
      },
      {
        "name": "variant",
        "type": "'floating' | 'full-width'",
        "default": "'floating'",
        "description": "Visual style layout structure"
      },
      {
        "name": "sticky",
        "type": "boolean",
        "default": "true",
        "description": "Pins the navigation bar to the top of the viewport"
      },
      {
        "name": "glass",
        "type": "boolean",
        "default": "true",
        "description": "Enables backdrop-blur glassmorphism background"
      },
      {
        "name": "onItemSelect",
        "type": "(item: NavItem) => void",
        "default": "undefined",
        "description": "Callback fired when any nav item is selected"
      }
    ],
    "accessibility": [
      "Semantic <header> and <nav> elements with aria-label=\"Main Navigation\"",
      "Keyboard focusable with restrained cyan focus-ring on :focus-visible",
      "Escape key dismisses the mobile navigation drawer",
      "aria-expanded and aria-current attributes on interactive items"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { GlassNavbar } from \"@/components/ui/glass-navbar\";\nimport { Sparkles } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <GlassNavbar\n      items={[\n        { label: \"Overview\", href: \"#overview\" },\n        { label: \"Components\", href: \"#components\", badge: \"20+\" },\n        { label: \"Pricing\", href: \"#pricing\" },\n      ]}\n      cta={\n        <button className=\"px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors\">\n          Get Started\n        </button>\n      }\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/GlassNavbar.tsx",
        "type": "registry:ui",
        "target": "components/ui/glass-navbar.tsx"
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
  },
  {
    "id": "gooey-menu",
    "name": "Gooey Menu",
    "tagline": "Liquid gooey spring dropdown menu with SVG filter physics",
    "description": "A tactile liquid dropdown menu with organic SVG metaball fusion filter and spring-driven extrusion animation.",
    "category": "Navigation",
    "badges": [
      "SVG Filter",
      "Framer Motion",
      "Metaball",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/gooey-menu",
    "features": [
      "Real-time SVG color-matrix metaball fusion filter creates organic liquid stretch and tear dynamics",
      "Choreographed staggered dropdown items with fast exit transitions",
      "Complete keyboard accessibility (Arrow keys, Enter, Space, Escape) and ARIA listbox semantics",
      "Click-outside listener and controlled/uncontrolled state support",
      "Respects prefers-reduced-motion: automatically disables intense blur filters"
    ],
    "props": [
      {
        "name": "options",
        "type": "string[]",
        "default": "['Home', 'About', 'Projects', 'Contact', 'Book a call', 'Follow us']",
        "description": "Array of option labels"
      },
      {
        "name": "value",
        "type": "string",
        "default": "undefined",
        "description": "Controlled active selected option"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "options[0]",
        "description": "Default selected option if uncontrolled"
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open dropdown state"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open dropdown state if uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when open state changes"
      },
      {
        "name": "onSelect",
        "type": "(option: string, index: number) => void",
        "default": "undefined",
        "description": "Callback fired on option selection"
      },
      {
        "name": "width",
        "type": "number",
        "default": "306",
        "description": "Pixel width of the menu pill and container"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS class overrides"
      }
    ],
    "accessibility": [
      "role=\"listbox\" with role=\"option\" and aria-selected for assistive technologies",
      "Full keyboard navigation: ArrowUp, ArrowDown, Enter, Space, and Escape",
      "prefers-reduced-motion turns off heavy blur/goo filter for optimal rendering"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { GooeyMenu } from \"@/components/ui/gooey-menu\";\n\nexport function Demo() {\n  return (\n    <GooeyMenu\n      options={[\"Dashboard\", \"Analytics\", \"Settings\", \"Billing\", \"Logout\"]}\n      onSelect={(opt) => console.log(\"Selected:\", opt)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/GooeyMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/gooey-menu.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "gravity-particle-burst",
    "name": "Gravity Particle Burst",
    "tagline": "Pointer-driven gravity particle feedback",
    "description": "A pointer-triggered canvas particle burst with velocity, gravity, friction, and short-lived physical follow-through.",
    "category": "Motion",
    "badges": [
      "Canvas",
      "Pointer Physics",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/gravity-particle-burst",
    "features": [
      "Particles inherit a shared origin from the pointer location",
      "Canvas rendering keeps the effect performant without many DOM nodes",
      "Gravity and friction make particles arc and settle naturally"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "'Create particle burst'",
        "description": "Default button label and accessible text"
      },
      {
        "name": "particleCount",
        "type": "number",
        "default": "34",
        "description": "Number of canvas particles emitted per burst"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom button content"
      }
    ],
    "accessibility": [
      "The canvas overlay is aria-hidden and does not intercept pointer input",
      "Reduced motion disables the particle burst while keeping the button usable"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { GravityParticleBurst } from \"@/components/ui/gravity-particle-burst\";\n\nexport function Demo() {\n  return <GravityParticleBurst>Commit release</GravityParticleBurst>;\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/GravityParticleBurst.tsx",
        "type": "registry:ui",
        "target": "components/ui/gravity-particle-burst.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "hamburger-menu",
    "name": "Hamburger Menu",
    "tagline": "Architectural line morphing & symmetrical spring motion",
    "description": "An iconic three-line menu toggle that transforms smoothly into a symmetrical close symbol.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Micro-interaction",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/hamburger-menu",
    "features": [
      "Symmetric line rotation and middle line dissolution with zero layout shift",
      "Customizable size, stroke thickness, and color tokens",
      "Keyboard accessible with Space and Enter triggers and Escape close support",
      "Integrated aria-expanded and dynamic aria-label status updates"
    ],
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "description": "Active open/closed toggle state"
      },
      {
        "name": "onChange",
        "type": "(isOpen: boolean) => void",
        "description": "Callback fired on user interaction"
      },
      {
        "name": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height of the icon bounding box in pixels"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'currentColor'",
        "description": "Color of the SVG/CSS line strokes"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Menu'",
        "description": "Accessible name announced to assistive tech"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables button interactions"
      }
    ],
    "accessibility": [
      "Proper <button> element with type=\"button\"",
      "Dynamic aria-expanded=\"true|false\" and aria-label updates",
      "Visible focus-visible ring for full keyboard accessibility"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { HamburgerMenu } from \"@/components/ui/hamburger-menu\";\n\nexport function Demo() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <HamburgerMenu\n      isOpen={isOpen}\n      onChange={setIsOpen}\n      size={24}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/HamburgerMenu.tsx",
        "type": "registry:ui",
        "target": "components/ui/hamburger-menu.tsx"
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
  },
  {
    "id": "interactive-timeline",
    "name": "Interactive Timeline",
    "tagline": "Milestone & pipeline tracker with spring progress physics",
    "description": "A developer-focused milestone and deployment timeline featuring dynamic progress lines, pulsating status nodes, expandable telemetry cards, and commit hash copy.",
    "category": "Motion",
    "badges": [
      "Milestones",
      "Deployment Track",
      "Spring Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/interactive-timeline",
    "features": [
      "Animated continuous progress line with spring physics",
      "Interactive status nodes (completed, in-progress, pending, failed) with breathing aura",
      "Collapsible details with metrics grid and commit metadata",
      "One-click commit hash copying with feedback state",
      "Accessible semantic list and keyboard navigation structure"
    ],
    "props": [
      {
        "name": "items",
        "type": "TimelineItem[]",
        "default": "[]",
        "description": "Array of timeline step items"
      },
      {
        "name": "defaultSelectedId",
        "type": "string",
        "default": "items[0]?.id",
        "description": "ID of the item initially expanded"
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "default": "true",
        "description": "Whether cards can be expanded/collapsed on click"
      },
      {
        "name": "onItemSelect",
        "type": "(item: TimelineItem) => void",
        "default": "undefined",
        "description": "Callback invoked when a timeline node or card is selected"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS classes for outer container"
      }
    ],
    "accessibility": [
      "Semantic role=\"region\" and role=\"list\" with listitem hierarchy",
      "Aria-expanded and aria-controls binding on interactive items",
      "Respects prefers-reduced-motion for smooth height and line transitions",
      "Visible focus rings for keyboard navigation"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { InteractiveTimeline } from \"@/components/ui/interactive-timeline\";\n\nconst deploymentSteps = [\n  {\n    id: \"step-1\",\n    title: \"Build & Artifact Verification\",\n    timestamp: \"10:42 AM · 48s\",\n    status: \"completed\" as const,\n    tag: \"CI/CD\",\n    commitHash: \"9f8a12bc\",\n    metrics: [{ label: \"Bundle Size\", value: \"142 KB\" }, { label: \"Tree Shake\", value: \"99.4%\" }],\n  },\n  {\n    id: \"step-2\",\n    title: \"Global Edge Replication\",\n    timestamp: \"10:43 AM · Active\",\n    status: \"in-progress\" as const,\n    tag: \"Infra\",\n    description: \"Replicating immutable build layers across 32 regional edge locations.\",\n  },\n  {\n    id: \"step-3\",\n    title: \"Traffic Cutover & Smoke Test\",\n    timestamp: \"Pending\",\n    status: \"pending\" as const,\n    tag: \"DNS\",\n  },\n];\n\nexport function Demo() {\n  return <InteractiveTimeline items={deploymentSteps} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/InteractiveTimeline.tsx",
        "type": "registry:ui",
        "target": "components/ui/interactive-timeline.tsx"
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
  },
  {
    "id": "intro-loader",
    "name": "Intro Loader",
    "tagline": "Apple-style multilingual greeting welcome splash",
    "description": "An Apple-inspired multilingual welcome splash and intro loader that rapidly cycles localized greetings with fluid blur transitions, progress tracking, and accessible skip controls.",
    "category": "Overlays",
    "badges": [
      "Apple Welcome",
      "Multilingual",
      "Splash Screen",
      "Fluid Blur",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/intro-loader",
    "features": [
      "Rapid multilingual greeting cycling inspired by Apple OS welcome splash",
      "Fluid blur, scale, and opacity entry transitions calibrated with cubic-bezier curves",
      "Apple-style hairline progress indicator tracking sequence completion",
      "Keyboard and tactile skip mechanism (ESC key or dedicated discrete button)",
      "Full accessibility support with aria-live announcements and reduced-motion fallbacks",
      "Supports both full-screen initial overlay and inline documentation preview modes"
    ],
    "props": [
      {
        "name": "greetings",
        "type": "(string | GreetingItem)[]",
        "default": "['Hello', 'Hola', 'Bonjour', ...]",
        "description": "Array of localized greeting strings or objects with text and lang to cycle through"
      },
      {
        "name": "fullScreen",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render as a fixed full-screen overlay or inline container"
      },
      {
        "name": "intervalMs",
        "type": "number",
        "default": "240",
        "description": "Milliseconds per greeting cycle"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display the Apple-style hairline progress bar"
      },
      {
        "name": "showLangBadge",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display country language badges"
      },
      {
        "name": "allowSkip",
        "type": "boolean",
        "default": "true",
        "description": "Whether to enable ESC key and Skip button dismissals"
      },
      {
        "name": "speedMultiplier",
        "type": "number",
        "default": "1",
        "description": "Speed multiplier for the animation sequence"
      },
      {
        "name": "onComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when welcome sequence completes"
      }
    ],
    "accessibility": [
      "Screen reader live region (aria-live=\"polite\" and aria-atomic=\"true\") for real-time announcements",
      "Full keyboard dismissibility with Escape key listener",
      "Complete prefers-reduced-motion fallback jumping directly to finish",
      "Dialog role with aria-label=\"Welcome intro screen\" and clean tree unmounting upon finish"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { IntroLoader } from \"@/components/ui/intro-loader\";\nimport { useState } from \"react\";\n\nexport function Demo() {\n  const [loading, setLoading] = useState(true);\n\n  if (loading) {\n    return (\n      <IntroLoader\n        allowSkip={true}\n        showProgress={true}\n        onComplete={() => setLoading(false)}\n      />\n    );\n  }\n\n  return (\n    <main className=\"min-h-screen bg-[#050505] text-[#FAFAFA] p-8\">\n      <h1>Welcome to the Application</h1>\n    </main>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/IntroLoader.tsx",
        "type": "registry:ui",
        "target": "components/ui/intro-loader.tsx"
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
  },
  {
    "id": "ios-search-bar",
    "name": "iOS-style Search Bar",
    "tagline": "Spring expanding search pill & tactile clear button",
    "description": "A minimalist search pill that smoothly expands on focus and reveals quick-clear controls with spring animation.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Search",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/ios-search-bar",
    "features": [
      "Smooth spring width expansion on input focus and auto-collapse on blur",
      "Conditional quick-clear button with spring scale entrance and exit",
      "Built-in keyboard hotkey indicator (⌘K) and Escape key blur support",
      "Semantic search input type with full WCAG AA accessibility"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "description": "Current search query string"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "description": "Input change handler"
      },
      {
        "name": "onSubmit",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Fired when Enter is pressed"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when clear button is clicked"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search...'",
        "description": "Placeholder label"
      },
      {
        "name": "collapsedWidth",
        "type": "number | string",
        "default": "'220px'",
        "description": "Width before focus"
      },
      {
        "name": "expandedWidth",
        "type": "number | string",
        "default": "'340px'",
        "description": "Width after focus"
      }
    ],
    "accessibility": [
      "Standard <input type=\"search\"> with clear descriptive aria-label",
      "Interactive clear button with accessible aria-label=\"Clear search\"",
      "Supports Escape key to blur and Enter key to submit"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { IOSSearchBar } from \"@/components/ui/ios-search-bar\";\n\nexport function Demo() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <IOSSearchBar\n      value={query}\n      onChange={setQuery}\n      placeholder=\"Search documentation...\"\n      onSubmit={(q) => console.log(\"Searching:\", q)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/IOSSearchBar.tsx",
        "type": "registry:ui",
        "target": "components/ui/ios-search-bar.tsx"
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
  },
  {
    "id": "liquid-ripple-button",
    "name": "Liquid Ripple Button",
    "tagline": "Pointer-origin liquid press feedback",
    "description": "A tactile button whose pointer-origin ripple and subtle wave layer make press feedback feel fluid.",
    "category": "Buttons",
    "badges": [
      "Button",
      "Pointer Feedback",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-ripple-button",
    "features": [
      "Ripple originates from the actual press point",
      "Slow secondary wave remains below the label and icon",
      "Primary and secondary variants match EasyUI button surfaces"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "'Run interaction'",
        "description": "Button content"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary'",
        "default": "'primary'",
        "description": "Visual style variant"
      }
    ],
    "accessibility": [
      "Uses a semantic button and preserves native keyboard activation",
      "Reduced motion removes ripple and wave animation while retaining press state"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { LiquidRippleButton } from \"@/components/ui/liquid-ripple-button\";\n\nexport function Demo() {\n  return <LiquidRippleButton variant=\"secondary\">Generate preview</LiquidRippleButton>;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/LiquidRippleButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/liquid-ripple-button.tsx"
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
  },
  {
    "id": "liquid-toggle",
    "name": "Liquid Toggle",
    "tagline": "Morphing liquid blob toggle",
    "description": "A toggle with a liquid/blob-like transition. The internal shape deforms organically as it travels from off to on — stretching along the travel axis and settling into a natural blob shape rather than simply translating.",
    "category": "Buttons",
    "badges": [
      "SVG Morph",
      "Spring",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/liquid-toggle",
    "features": [
      "Internal blob shape continuously morphs between states",
      "Transient stretch pulse along the travel axis when toggling",
      "Spring-smoothed progress with mass/damping tuning",
      "Controlled and uncontrolled usage via value/defaultValue/onChange",
      "Respects prefers-reduced-motion (uses static state fallback)"
    ],
    "props": [
      {
        "name": "value",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled value"
      },
      {
        "name": "defaultValue",
        "type": "boolean",
        "default": "false",
        "description": "Initial value for uncontrolled mode"
      },
      {
        "name": "onChange",
        "type": "(value: boolean) => void",
        "default": "undefined",
        "description": "Toggle change callback"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disabled state"
      },
      {
        "name": "offLabel",
        "type": "string",
        "default": "'Off'",
        "description": "Screen reader label when off"
      },
      {
        "name": "onLabel",
        "type": "string",
        "default": "'On'",
        "description": "Screen reader label when on"
      },
      {
        "name": "accentColor",
        "type": "string",
        "default": "'#FAFAFA'",
        "description": "Blob color when on"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "default": "true",
        "description": "Show OFF/ON text inside the track"
      },
      {
        "name": "width",
        "type": "number",
        "default": "56",
        "description": "Track width in px"
      },
      {
        "name": "height",
        "type": "number",
        "default": "32",
        "description": "Track height in px"
      }
    ],
    "accessibility": [
      "role=\"switch\" with aria-checked",
      "Visually hidden label reflects current state",
      "Keyboard interaction: Space/Enter toggles; Arrow keys set state",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-09-02",
    "usageCode": "import { LiquidToggle } from \"@/components/ui/liquid-toggle\";\n\nexport function Demo() {\n  const [on, setOn] = React.useState(false);\n  return (\n    <div className=\"flex items-center gap-2\">\n      <LiquidToggle value={on} onChange={setOn} />\n      <span className=\"text-sm\">{on ? 'Enabled' : 'Disabled'}</span>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/LiquidToggle.tsx",
        "type": "registry:ui",
        "target": "components/ui/liquid-toggle.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/theme/useTheme.tsx",
        "type": "registry:lib",
        "target": "lib/theme/useTheme.tsx"
      }
    ]
  },
  {
    "id": "loader",
    "name": "Loader",
    "tagline": "Calm, continuous feedback states with zero visual stress",
    "description": "A minimal, purpose-driven loading indicator with 4 calm, non-anxious motion variants.",
    "category": "Feedback",
    "badges": [
      "CSS & SVG",
      "Calm Motion",
      "Zero Deps",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/loader",
    "features": [
      "4 refined motion variants: rotating arc, breathing dots, sliding line, and expanding concentric rings",
      "Configurable dimensions and stroke colors with seamless dark mode support",
      "Accessible role=\"status\" and aria-busy telemetry without screen reader interruption",
      "Automatic reduced-motion adaptation for sensitive viewers"
    ],
    "props": [
      {
        "name": "size",
        "type": "number",
        "default": "32",
        "description": "Diameter or width scale in pixels"
      },
      {
        "name": "variant",
        "type": "'arc' | 'dots' | 'line' | 'rings'",
        "default": "'arc'",
        "description": "Visual animation mode"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Loading...'",
        "description": "Accessible screen reader text label"
      },
      {
        "name": "reduceMotion",
        "type": "boolean",
        "default": "false",
        "description": "Disables high-velocity continuous spins"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'currentColor'",
        "description": "CSS color string for indicator strokes"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional CSS class names"
      }
    ],
    "accessibility": [
      "Includes role=\"status\" and aria-busy=\"true\" on container",
      "Screen reader-only label announcement prevents repetitive speech spam",
      "Full prefers-reduced-motion compatibility with gentle opacity pulsing"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { Loader } from \"@/components/ui/loader\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-6 p-8 bg-[#0A0A0A] rounded-2xl border border-[#222222]\">\n      <Loader variant=\"arc\" size={32} />\n      <Loader variant=\"dots\" size={28} />\n      <Loader variant=\"line\" size={36} />\n      <Loader variant=\"rings\" size={32} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/Loader.tsx",
        "type": "registry:ui",
        "target": "components/ui/loader.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "lock-input",
    "name": "LockInput",
    "tagline": "Focus state that \"locks\" into place",
    "description": "A text input whose focus state subtly \"locks\" into place — a focus ring scales in from the center and the border tweens to active, giving the impression that the input snaps closed on itself.",
    "category": "Forms",
    "badges": [
      "Focus Lock",
      "Spring Ring",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/lock-input",
    "features": [
      "Focus ring scales in from 0.94 to 1.0 with a snappy spring, producing a physical \"lock\" feel",
      "Inset border ring fades in alongside the outer focus halo for a layered lock effect",
      "Icon and label slots adjust contrast on focus to draw the eye inward",
      "Error state replaces accent with restrained rose and animates message in",
      "Light/dark theme aware via CSS variables — same code, both themes"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "undefined",
        "description": "Visible label rendered above the input"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the input"
      },
      {
        "name": "error",
        "type": "string",
        "default": "undefined",
        "description": "Error message; presence triggers danger styling"
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed before the input value"
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Icon element placed after the input value"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Proper <label htmlFor> association for assistive technology",
      "aria-invalid toggles on error; aria-describedby links helper text",
      "Restrained focus ring is keyboard-only via :focus-visible-friendly overlay",
      "Disabled state communicated both visually and via pointer-events"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { LockInput } from \"@/components/ui/lock-input\";\nimport { Mail } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-4 max-w-sm\">\n      <LockInput\n        label=\"Email\"\n        type=\"email\"\n        placeholder=\"you@studio.dev\"\n        leftIcon={<Mail className=\"w-3.5 h-3.5\" />}\n        description=\"We'll send a confirmation link here.\"\n      />\n      <LockInput\n        label=\"Workspace\"\n        placeholder=\"acme\"\n        error=\"That workspace is already taken.\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/LockInput.tsx",
        "type": "registry:ui",
        "target": "components/ui/lock-input.tsx"
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
  },
  {
    "id": "login",
    "name": "Login",
    "tagline": "Refined authentication card with validation & social SSO",
    "description": "A production-ready authentication card built with the EasyUI form system, featuring password show/hide, remember me, validation states, and social logins.",
    "category": "Auth",
    "badges": [
      "Authentication",
      "Forms",
      "Responsive",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/login",
    "features": [
      "Built with EasyUI Form & Button architecture",
      "Interactive password visibility toggle with Lucide icons",
      "Form validation for required fields & email regex format",
      "Spring-animated error banners and inline field alerts",
      "Configurable social SSO buttons (GitHub & Google)",
      "Remember me checkbox and \"Forgot password?\" callback hooks",
      "Responsive mobile/desktop dimensions with atmospheric glow header"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Welcome back'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Sign in to access your EasyUI workspace'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side or authentication error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: LoginFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with email, password, rememberMe"
      },
      {
        "name": "onForgotPassword",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback when forgot password link is clicked"
      },
      {
        "name": "onSignUpClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for secondary sign up switch action"
      },
      {
        "name": "showSocialLogins",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "onSocialLogin",
        "type": "(provider: 'github' | 'google' | 'apple') => void",
        "default": "undefined",
        "description": "Callback when social login button is pressed"
      }
    ],
    "accessibility": [
      "Accessible input labels and autocomplete attributes (email, current-password)",
      "ARIA alert role on dynamic validation and server error banners",
      "Proper form submission handling with Enter key activation",
      "Sky-400 focus ring on all interactive elements"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { Login } from \"@/components/ui/login\";\n\nexport function Demo() {\n  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {\n    console.log(\"Authenticating:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <Login\n        onSubmit={handleLogin}\n        onForgotPassword={() => alert(\"Redirect to forgot password\")}\n        onSignUpClick={() => alert(\"Redirect to sign up\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/Login.tsx",
        "type": "registry:ui",
        "target": "components/ui/login.tsx"
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
  },
  {
    "id": "mac-os-folder-cards",
    "name": "macOS Folder Cards",
    "tagline": "macOS folder icon with fluid spring card reveal",
    "description": "An authentic porcelain-white macOS Finder folder icon that unrolls interactive cards with fluid Apple spring physics.",
    "category": "Motion",
    "badges": [
      "macOS Folder",
      "Spring Morphing",
      "Expandable",
      "Minimal"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/mac-os-folder-cards",
    "features": [
      "Porcelain-white macOS folder silhouette with 3D flap hinge and cards peeking from pocket",
      "Interactive hover parallax lifts cards and tilts folder flap in 3D perspective",
      "Opens into a minimal, seamless card grid with Apple fluid spring easing",
      "Crisp pure white icons and EasyUI dark surface harmony"
    ],
    "props": [
      {
        "name": "folderTitle",
        "type": "string",
        "default": "'Components'",
        "description": "Title label of the folder icon"
      },
      {
        "name": "folderCategory",
        "type": "string",
        "default": "'Pipeline'",
        "description": "Category breadcrumb for expanded header"
      },
      {
        "name": "items",
        "type": "MacOSFolderCardItem[]",
        "default": "demo items",
        "description": "Cards rendered in the expanded grid"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open/expanded state"
      }
    ],
    "accessibility": [
      "Uses aria-expanded state and keyboard activation (Enter/Space/Escape)",
      "Reduced motion replaces 3D transforms with clean opacity transitions"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { MacOSFolderCards } from \"@/components/ui/macos-folder-cards\";\n\nexport function Demo() {\n  return (\n    <MacOSFolderCards\n      folderTitle=\"Components\"\n      folderCategory=\"Pipeline\"\n      items={[\n        { id: '1', title: 'Registry Sync', description: 'Catalog reacts to source changes.', meta: '01' },\n        { id: '2', title: 'SEO Audit', description: 'Metadata verified before release.', meta: '02' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MacOSFolderCards.tsx",
        "type": "registry:ui",
        "target": "components/ui/mac-os-folder-cards.tsx"
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
  },
  {
    "id": "magnetic-button",
    "name": "Magnetic Button",
    "tagline": "Cursor-aware spring translation physics",
    "description": "A responsive button with subtle proximity-based physics that pulls towards the cursor on hover and snaps back on departure.",
    "category": "Buttons",
    "badges": [
      "Spring Physics",
      "Micro-interaction",
      "Tailwind"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/magnetic-button",
    "features": [
      "Spring physics coordinate tracking via Framer Motion",
      "Configurable pull strength and threshold",
      "Subtle ambient glow gradient reflection",
      "Four restrained surface styles: Primary, Secondary, Outline, Ghost"
    ],
    "props": [
      {
        "name": "strength",
        "type": "number",
        "default": "0.35",
        "description": "Cursor pull distance multiplier"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface presentation"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Button dimensions and typography"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Enable subtle background glow on hover"
      }
    ],
    "accessibility": [
      "Focus visible ring with restrained cyan accent",
      "Standard native button semantics & keyboard Enter/Space activation",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-08-18",
    "usageCode": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\nimport { ArrowUpRight } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <MagneticButton strength={0.4} variant=\"primary\">\n      <span>Get Started</span>\n      <ArrowUpRight className=\"w-4 h-4\" />\n    </MagneticButton>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MagneticButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/magnetic-button.tsx"
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
  },
  {
    "id": "metric-hud",
    "name": "Metric HUD",
    "tagline": "Interactive telemetry & sparkline HUD with live scrubbing",
    "description": "An interactive developer telemetry card featuring hardware-accelerated SVG sparklines, pointer-scrubbing point inspection, spring-animated time range morphing, and delta indicators.",
    "category": "Motion",
    "badges": [
      "SVG Sparklines",
      "Telemetry HUD",
      "Pointer Scrubbing"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/metric-hud",
    "features": [
      "Zero-dependency hardware-accelerated SVG sparkline rendering",
      "Interactive pointer crosshair scrubbing with dynamic coordinate inspection",
      "Spring-animated time-range switching (1h, 24h, 7d, 30d)",
      "Real-time delta trend badges (up / down / neutral) with status aura",
      "One-click metric value copying with validation feedback"
    ],
    "props": [
      {
        "name": "metrics",
        "type": "MetricItem[]",
        "default": "[]",
        "description": "Array of telemetry metric definitions with time-series data"
      },
      {
        "name": "timeRanges",
        "type": "string[]",
        "default": "['1h', '24h', '7d', '30d']",
        "description": "Available time window filters"
      },
      {
        "name": "defaultTimeRange",
        "type": "string",
        "default": "'24h'",
        "description": "Initial active time range"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS container styling"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA telemetry roles",
      "Min and max values clearly labeled for assistive technologies",
      "Keyboard accessible time range selection controls"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { MetricHUD } from \"@/components/ui/metric-hud\";\n\nconst metrics = [\n  {\n    id: \"latency\",\n    label: \"p99 Latency\",\n    value: \"14.2\",\n    unit: \"ms\",\n    delta: { value: \"-18.4%\", trend: \"down\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [18, 17, 16, 15, 14, 14.2],\n      \"24h\": [24, 21, 19, 18, 16, 14.2],\n      \"7d\": [32, 28, 22, 19, 15, 14.2],\n    },\n  },\n  {\n    id: \"throughput\",\n    label: \"API Throughput\",\n    value: \"84.5k\",\n    unit: \"req/s\",\n    delta: { value: \"+12.1%\", trend: \"up\" as const, isPositiveGood: true },\n    status: \"normal\" as const,\n    timeSeries: {\n      \"1h\": [60, 65, 72, 78, 81, 84.5],\n      \"24h\": [40, 52, 68, 74, 80, 84.5],\n      \"7d\": [30, 45, 60, 70, 80, 84.5],\n    },\n  },\n];\n\nexport function Demo() {\n  return <MetricHUD metrics={metrics} defaultTimeRange=\"24h\" />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MetricHUD.tsx",
        "type": "registry:ui",
        "target": "components/ui/metric-hud.tsx"
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
  },
  {
    "id": "morphing-button",
    "name": "Morphing Button",
    "tagline": "Dimension-preserving state morphing button with fluid icon transitions",
    "description": "A layout-stable interactive action button that smoothly transitions between Idle, Loading, Success, and Error states without jarring jumps or dimension shifts.",
    "category": "Buttons",
    "badges": [
      "Buttons",
      "Micro-interactions",
      "State Morphing"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-button",
    "features": [
      "Zero layout shift architecture preserving natural bounding dimensions across states",
      "Icon morphing with spring-based scale and translation transitions",
      "Multiple design presets (Primary, Secondary, Danger, and Ghost)",
      "Interactive spring tap physics (whileTap scale 0.97)",
      "Complete disabled and busy ARIA state compatibility"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'loading' | 'success' | 'error'",
        "default": "'idle'",
        "description": "Current button lifecycle state"
      },
      {
        "name": "idleText",
        "type": "string",
        "default": "'Save Changes'",
        "description": "Label shown in default resting state"
      },
      {
        "name": "loadingText",
        "type": "string",
        "default": "'Saving...'",
        "description": "Label shown when operation is pending"
      },
      {
        "name": "successText",
        "type": "string",
        "default": "'Saved'",
        "description": "Label shown upon successful completion"
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "'Failed'",
        "description": "Label shown when operation fails"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'danger' | 'ghost'",
        "default": "'primary'",
        "description": "Visual surface styling preset"
      }
    ],
    "accessibility": [
      "ARIA live role=\"button\" with dynamic aria-busy during loading",
      "Focus-visible ring conforming to EasyUI accessibility tokens",
      "Screen readers announce state changes without losing focus target"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { MorphingButton } from \"@/components/ui/morphing-button\";\n\nexport function Demo() {\n  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');\n\n  const handleClick = () => {\n    setStatus('loading');\n    setTimeout(() => {\n      setStatus('success');\n      setTimeout(() => setStatus('idle'), 2000);\n    }, 1500);\n  };\n\n  return (\n    <MorphingButton\n      status={status}\n      idleText=\"Deploy Project\"\n      loadingText=\"Building Edge...\"\n      successText=\"Deployed ✓\"\n      onClick={handleClick}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-button.tsx"
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
  },
  {
    "id": "morphing-dialog",
    "name": "Morphing Dialog",
    "tagline": "Seamless shared layoutId card to modal transition",
    "description": "An expandable card trigger that fluidly morphs into a centered dialog without jarring popup animations.",
    "category": "Overlays",
    "badges": [
      "Shared Layout",
      "Spring Physics",
      "Zero Layout Shift"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog",
    "features": [
      "Framer Motion layoutId continuous surface expansion",
      "Esc key dismissal and backdrop click support",
      "Body scroll lock handling during active state"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "Required",
        "description": "Dialog header title"
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "undefined",
        "description": "Secondary header description"
      },
      {
        "name": "trigger",
        "type": "(open: () => void) => ReactNode",
        "default": "Required",
        "description": "Render trigger button or card"
      }
    ],
    "accessibility": [
      "Traps focus and sets aria-modal=\"true\"",
      "Closes on Escape key press with focus restoration"
    ],
    "createdAt": "2026-08-14",
    "usageCode": "import { MorphingDialog } from \"@/components/ui/morphing-dialog\";\n\nexport function Demo() {\n  return (\n    <MorphingDialog\n      title=\"API Key Configuration\"\n      subtitle=\"Manage fine-grained token permissions\"\n      trigger={(open) => (\n        <button onClick={open} className=\"px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm\">\n          Configure Keys\n        </button>\n      )}\n    >\n      <p className=\"text-sm text-neutral-300\">Set read/write boundaries for automation tasks.</p>\n    </MorphingDialog>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingDialog.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-dialog.tsx"
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
  },
  {
    "id": "morphing-shape-loader",
    "name": "Morphing Shape Loader",
    "tagline": "Continuously morphing SVG shape loader",
    "description": "A loading indicator that continuously morphs between configurable SVG shapes via real path interpolation. The transition is a genuine geometric morph — never a fade out / in.",
    "category": "Feedback",
    "badges": [
      "SVG Morph",
      "Configurable",
      "Loop"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/morphing-shape-loader",
    "features": [
      "Continuous morph between matched-control-point shapes",
      "Configurable shape list, duration, hold time, and loop behavior",
      "Stroke and filled variants with optional gradient",
      "Subtle dashed backdrop ring for visual context",
      "Respects prefers-reduced-motion (renders a single static shape)"
    ],
    "props": [
      {
        "name": "shapes",
        "type": "ShapeKind[]",
        "default": "['circle','square','triangle','circle']",
        "description": "Ordered list of shapes to cycle through"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "1.6",
        "description": "Morph duration per shape change in seconds"
      },
      {
        "name": "holdDuration",
        "type": "number",
        "default": "0.4",
        "description": "Hold duration at each shape in seconds"
      },
      {
        "name": "loop",
        "type": "boolean",
        "default": "true",
        "description": "Loop the shape sequence"
      },
      {
        "name": "size",
        "type": "number",
        "default": "96",
        "description": "Loader size in pixels (square)"
      },
      {
        "name": "color",
        "type": "string",
        "default": "'#FAFAFA'",
        "description": "Stroke or fill color"
      },
      {
        "name": "filled",
        "type": "boolean",
        "default": "false",
        "description": "Filled variant instead of stroke"
      }
    ],
    "accessibility": [
      "role=\"status\" with aria-busy on the loader",
      "Visually hidden text label for screen readers",
      "Respects prefers-reduced-motion media query"
    ],
    "createdAt": "2026-09-02",
    "usageCode": "import { MorphingShapeLoader } from \"@/components/ui/morphing-shape-loader\";\n\nexport function Demo() {\n  return (\n    <MorphingShapeLoader\n      shapes={['circle', 'square', 'triangle', 'hexagon', 'star']}\n      duration={1.4}\n      holdDuration={0.3}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/MorphingShapeLoader.tsx",
        "type": "registry:ui",
        "target": "components/ui/morphing-shape-loader.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/theme/useTheme.tsx",
        "type": "registry:lib",
        "target": "lib/theme/useTheme.tsx"
      }
    ]
  },
  {
    "id": "neon-edge-button",
    "name": "Neon Edge Button",
    "tagline": "Precise travelling edge light button",
    "description": "A button with a restrained light source travelling around the border while the label remains primary.",
    "category": "Buttons",
    "badges": [
      "Button",
      "CSS Motion",
      "Reduced Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/neon-edge-button",
    "features": [
      "Travelling light follows the button perimeter instead of animating border color",
      "Neutral glow keeps the effect aligned with EasyUI surfaces",
      "Still reads as a polished button when motion is disabled"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "'Deploy preview'",
        "description": "Button content"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Multiplier for the edge-light travel speed"
      },
      {
        "name": "glow",
        "type": "boolean",
        "default": "true",
        "description": "Enables the subtle static button glow"
      }
    ],
    "accessibility": [
      "Uses a semantic button and focus-visible ring",
      "Reduced motion stops the travelling light and keeps a static edge highlight"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { NeonEdgeButton } from \"@/components/ui/neon-edge-button\";\n\nexport function Demo() {\n  return <NeonEdgeButton>Deploy preview</NeonEdgeButton>;\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NeonEdgeButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/neon-edge-button.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "nimbu-mirchi",
    "name": "Nimbu Mirchi",
    "tagline": "Pointer-driven hanging charm with layered spring physics",
    "description": "A hanging lemon-and-green-chilli charm that swings with realistic inertia in response to the pointer, built from layered physical springs rather than a single rigid illustration.",
    "category": "Motion",
    "badges": [
      "Spring Physics",
      "Pointer Tracking",
      "Layered Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/nimbu-mirchi",
    "features": [
      "Pointer position drives a normalized MotionValue pipeline (no React renders per frame)",
      "Layered secondary motion — chillies, lemon, and trailing strings each swing independently",
      "Configurable spring stiffness, damping, and max rotation for tuning the physical feel",
      "Geometry-aware normalization that adapts to the actual container size",
      "Respects prefers-reduced-motion with a clean static rest pose",
      "Graceful degradation when pointer events are unavailable"
    ],
    "props": [
      {
        "name": "maxRotation",
        "type": "number",
        "default": "13",
        "description": "Maximum rotation in degrees at full pointer offset"
      },
      {
        "name": "stiffnessX",
        "type": "number",
        "default": "55",
        "description": "Pointer X spring stiffness (higher = snappier follow)"
      },
      {
        "name": "stiffnessY",
        "type": "number",
        "default": "45",
        "description": "Pointer Y spring stiffness"
      },
      {
        "name": "damping",
        "type": "number",
        "default": "9",
        "description": "Spring damping (higher = less swing overshoot)"
      },
      {
        "name": "caption",
        "type": "string",
        "default": "undefined",
        "description": "Optional screen-reader caption for the charm"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the container"
      }
    ],
    "accessibility": [
      "role=\"img\" with descriptive aria-label for screen readers",
      "Touch-none and select-none to avoid stray text selection while interacting",
      "Complete prefers-reduced-motion fallback: pointer listeners are never wired, charm rests in place",
      "Decorative SVG and dot textures marked aria-hidden"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { NimbuMirchi } from \"@/components/ui/nimbu-mirchi\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] overflow-hidden\">\n      <NimbuMirchi\n        maxRotation={13}\n        stiffnessX={55}\n        stiffnessY={45}\n        damping={9}\n        caption=\"Hanging nimbu-mirchi charm\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/NimbuMirchi.tsx",
        "type": "registry:ui",
        "target": "components/ui/nimbu-mirchi.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "notification-bell",
    "name": "Notification Bell",
    "tagline": "Adaptive notification badge & animated alert drawer",
    "description": "An interactive notification trigger with animated badge counter, arrival shake feedback, and dropdown panel.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Feedback",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-bell",
    "features": [
      "Subtle rotational bell shake when new unread notifications arrive",
      "Spring-animated counter badge with overflow truncation (99+)",
      "Floating backdrop-blur panel with individual mark-as-read and mark-all-read controls",
      "Click-outside dismissal and accessible keyboard escape handling"
    ],
    "props": [
      {
        "name": "notifications",
        "type": "Notification[]",
        "description": "Array of notification objects (id, message, timestamp, read)"
      },
      {
        "name": "onMarkAsRead",
        "type": "(id: string) => void",
        "description": "Handler fired when an individual notification is marked read"
      },
      {
        "name": "onMarkAllAsRead",
        "type": "() => void",
        "default": "undefined",
        "description": "Handler to clear all active badges"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state of notification drawer"
      },
      {
        "name": "onOpenChange",
        "type": "(isOpen: boolean) => void",
        "default": "undefined",
        "description": "Callback on panel open/close"
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "true",
        "description": "Displays numeric badge instead of minimal red dot"
      }
    ],
    "accessibility": [
      "Dynamic aria-expanded and descriptive aria-label with unread count",
      "Full keyboard navigation with Tab, Enter, and Escape shortcuts",
      "Contrast compliant with WCAG AA standards"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { NotificationBell } from \"@/components/ui/notification-bell\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', message: 'Edge build deployment finished in 38s.', timestamp: 'Just now', read: false },\n    { id: '2', message: 'New API token generated for production.', timestamp: '12m ago', read: false },\n  ]);\n\n  const handleMarkRead = (id: string) => {\n    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));\n  };\n\n  return (\n    <NotificationBell\n      notifications={items}\n      onMarkAsRead={handleMarkRead}\n      onMarkAllAsRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NotificationBell.tsx",
        "type": "registry:ui",
        "target": "components/ui/notification-bell.tsx"
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
  },
  {
    "id": "notification-stack",
    "name": "Notification Stack",
    "tagline": "Physics swipe-to-dismiss toast stack",
    "description": "A stacked notification card system with physical spring stacking elevation, swipe-to-dismiss drag, and simulation triggers.",
    "category": "Feedback",
    "badges": [
      "Drag Physics",
      "Elevation Stacking",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/notification-stack",
    "features": [
      "Interactive drag-to-dismiss with spring rebound",
      "Dynamic stacking elevation offset and scale",
      "Expandable history view"
    ],
    "props": [
      {
        "name": "initialNotifications",
        "type": "NotificationItem[]",
        "default": "[]",
        "description": "Initial items"
      },
      {
        "name": "maxVisible",
        "type": "number",
        "default": "3",
        "description": "Max stacked cards in compact view"
      }
    ],
    "accessibility": [
      "Polite aria-live region announcements",
      "Dismiss button with accessible label"
    ],
    "createdAt": "2026-08-04",
    "usageCode": "import { NotificationStack } from \"@/components/ui/notification-stack\";\n\nexport function Demo() {\n  return <NotificationStack maxVisible={3} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/NotificationStack.tsx",
        "type": "registry:ui",
        "target": "components/ui/notification-stack.tsx"
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
  },
  {
    "id": "orbital-loading-ring",
    "name": "Orbital Loading Ring",
    "tagline": "Layered orbital processing indicator",
    "description": "A lightweight loading indicator with layered rings and orbiting particles that communicate active processing.",
    "category": "Feedback",
    "badges": [
      "CSS Motion",
      "Accessible",
      "Lightweight"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/orbital-loading-ring",
    "features": [
      "Two coordinated orbital rhythms with a subtle center pulse",
      "Size, speed, and density variants",
      "No external runtime beyond React"
    ],
    "props": [
      {
        "name": "size",
        "type": "number",
        "default": "72",
        "description": "Rendered width and height in pixels"
      },
      {
        "name": "speed",
        "type": "number",
        "default": "1",
        "description": "Multiplier for orbital animation speed"
      },
      {
        "name": "variant",
        "type": "'default' | 'dense' | 'minimal'",
        "default": "'default'",
        "description": "Particle density around the secondary orbit"
      },
      {
        "name": "label",
        "type": "string",
        "default": "'Loading'",
        "description": "Accessible status label"
      }
    ],
    "accessibility": [
      "Uses role=\"status\" with a screen-reader label",
      "Reduced motion freezes the orbital movement while preserving the loading affordance"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { OrbitalLoadingRing } from \"@/components/ui/orbital-loading-ring\";\n\nexport function Demo() {\n  return <OrbitalLoadingRing size={84} variant=\"dense\" label=\"Syncing registry\" />;\n}",
    "dependencies": [],
    "files": [
      {
        "path": "src/components/ui/OrbitalLoadingRing.tsx",
        "type": "registry:ui",
        "target": "components/ui/orbital-loading-ring.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "origin-dropdown",
    "name": "OriginDropdown",
    "tagline": "Origin-aware expansion",
    "description": "A dropdown with origin-aware expansion — the menu materializes from the chosen side with a slight scale and an inward translation, so its perceived origin is the trigger edge closest to the menu.",
    "category": "Overlays",
    "badges": [
      "Origin-Aware",
      "Spring In",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/origin-dropdown",
    "features": [
      "Menu expansion originates from one of four sides (top/right/bottom/left)",
      "Snappy spring (springSnappy) with origin-based transform-origin per side",
      "Optional items array with icon, description, and destructive variants",
      "Chevron rotates 180° on open; Escape and outside-click close",
      "Light/dark theme aware via CSS variables"
    ],
    "props": [
      {
        "name": "trigger",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom trigger content"
      },
      {
        "name": "items",
        "type": "OriginDropdownItem[]",
        "default": "undefined",
        "description": "Menu items (alternative to children)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Custom menu content"
      },
      {
        "name": "side",
        "type": "'top' | 'right' | 'bottom' | 'left'",
        "default": "'bottom'",
        "description": "Side the menu opens from"
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled open state"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Initial open state"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Open state change callback"
      }
    ],
    "accessibility": [
      "aria-haspopup / aria-expanded / role=\"menu\" / role=\"menuitem\" wired correctly",
      "Escape and outside-click dismiss the menu",
      "Disabled items skip the onSelect handler and have proper ARIA"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { OriginDropdown } from \"@/components/ui/origin-dropdown\";\nimport { Settings, LogOut, User } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap gap-3\">\n      <OriginDropdown\n        trigger=\"Account\"\n        side=\"bottom\"\n        items={[\n          { id: \"profile\", label: \"Profile\", description: \"Account settings\", icon: <User className=\"w-3.5 h-3.5\" /> },\n          { id: \"settings\", label: \"Preferences\", description: \"Theme, motion, layout\", icon: <Settings className=\"w-3.5 h-3.5\" /> },\n          { id: \"signout\", label: \"Sign out\", destructive: true, icon: <LogOut className=\"w-3.5 h-3.5\" /> },\n        ]}\n      />\n      <OriginDropdown\n        trigger=\"Origin top\"\n        side=\"top\"\n        items={[\n          { id: \"a\", label: \"Option A\" },\n          { id: \"b\", label: \"Option B\" },\n        ]}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/OriginDropdown.tsx",
        "type": "registry:ui",
        "target": "components/ui/origin-dropdown.tsx"
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
  },
  {
    "id": "particle-delete",
    "name": "Particle Delete",
    "tagline": "Physics-driven pixel particle dissolution delete animation",
    "description": "Premium physics-driven particle dissolution delete animation that rasterizes components into thousands of authentic tiny pixels and disperses them smoothly before state removal.",
    "category": "Motion",
    "badges": [
      "HTML5 Canvas",
      "Spring Physics",
      "High-DPI",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/particle-delete",
    "features": [
      "Authentic pixel capture inherits real component colors and typography",
      "Hardware-accelerated 60 FPS Canvas rendering with zero DOM overhead",
      "Configurable physics: duration, explosion force, drag, and dissolution spread",
      "Full accessibility support with automatic prefers-reduced-motion fallback",
      "Available as direct utility particleDelete(), hook useParticleDelete(), or <ParticleDeleteContainer /> wrapper"
    ],
    "props": [
      {
        "name": "onDelete",
        "type": "() => void",
        "description": "Callback invoked after the particle dissolution finishes to remove state"
      },
      {
        "name": "options.duration",
        "type": "number",
        "default": "850",
        "description": "Animation duration in milliseconds"
      },
      {
        "name": "options.force",
        "type": "number",
        "default": "1.0",
        "description": "Outward velocity multiplier for particle dispersion"
      },
      {
        "name": "options.particleSize",
        "type": "number",
        "default": "1.5",
        "description": "Visual diameter of individual particles in pixels"
      },
      {
        "name": "options.dissolvePattern",
        "type": "'center-first' | 'edges-first' | 'uniform' | 'random'",
        "default": "'center-first'",
        "description": "Dissolution spread delay algorithm"
      },
      {
        "name": "options.sampleStep",
        "type": "number",
        "default": "2 (desktop) / 3 (mobile)",
        "description": "Pixel sampling step interval"
      }
    ],
    "accessibility": [
      "Automatically honors prefers-reduced-motion: reduce with immediate subtle fade exit",
      "Delete trigger buttons maintain clear ARIA labels and keyboard focus ring states",
      "Canvas overlay is marked with aria-hidden=\"true\" and pointer-events: none"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ParticleDeleteContainer, useParticleDelete, particleDelete } from \"@/components/ui/particle-delete\";\nimport { Trash2 } from \"lucide-react\";\n\nexport function Demo() {\n  const [items, setItems] = useState([\n    { id: '1', name: 'Database Snapshot #409' },\n    { id: '2', name: 'Redis Cache Layer' }\n  ]);\n\n  const handleDelete = (id: string) => {\n    setItems((prev) => prev.filter((i) => i.id !== id));\n  };\n\n  return (\n    <div className=\"space-y-3\">\n      {items.map((item) => (\n        <ParticleDeleteContainer\n          key={item.id}\n          onDelete={() => handleDelete(item.id)}\n          className=\"p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center justify-between\"\n        >\n          {({ isDeleting, handleDelete: triggerDelete }) => (\n            <>\n              <span className=\"text-sm font-medium text-white\">{item.name}</span>\n              <button\n                type=\"button\"\n                onClick={triggerDelete}\n                disabled={isDeleting}\n                className=\"p-2 rounded-lg bg-[#141414] hover:bg-rose-950/40 text-[#888888] hover:text-rose-400 border border-[#262626] transition-colors\"\n              >\n                <Trash2 className=\"w-4 h-4\" />\n              </button>\n            </>\n          )}\n        </ParticleDeleteContainer>\n      ))}\n    </div>\n  );\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ParticleDelete.tsx",
        "type": "registry:ui",
        "target": "components/ui/particle-delete.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      },
      {
        "path": "src/lib/particle-delete.ts",
        "type": "registry:lib",
        "target": "lib/particle-delete.ts"
      }
    ]
  },
  {
    "id": "payment-receipt-printer",
    "name": "Payment Receipt Printer",
    "tagline": "Animated thermal receipt printer with smooth paper extrusion motion",
    "description": "An animated payment and order receipt printer component for React featuring realistic thermal paper extrusion, chassis micro-vibration, customizable receipt itemization, and replay controls.",
    "category": "Feedback",
    "badges": [
      "Spring Physics",
      "Feedback",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-receipt-printer",
    "features": [
      "Authentic thermal paper extrusion animation emerging downward from printer slot",
      "Subtle chassis vibration physics during active printing phase",
      "Multiple receipt items support with automatic dynamic height calculation",
      "Customizable merchant brand, order number, payment method, taxes, barcode, and message",
      "Interactive Replay, Copy Order Number, and Print action controls",
      "Light, dark, and cream paper themes with serrated paper perforation cuts",
      "Full accessibility support with aria-live status and prefers-reduced-motion detection"
    ],
    "props": [
      {
        "name": "status",
        "type": "'idle' | 'printing' | 'completed' | 'success'",
        "default": "'idle'",
        "description": "Current lifecycle state of payment and printing"
      },
      {
        "name": "merchant",
        "type": "string",
        "default": "'EasyUI Store'",
        "description": "Store or company name on receipt header"
      },
      {
        "name": "merchantSubtext",
        "type": "string",
        "default": "'Official Component Registry'",
        "description": "Location or subtitle below merchant name"
      },
      {
        "name": "merchantLogo",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Custom logo icon rendered in receipt header"
      },
      {
        "name": "orderNumber",
        "type": "string",
        "default": "'#4821'",
        "description": "Unique order or invoice tracking reference"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "Current date",
        "description": "Transaction timestamp string or Date object"
      },
      {
        "name": "items",
        "type": "ReceiptItem[]",
        "default": "[]",
        "description": "List of purchased items with prices, quantities, and descriptions"
      },
      {
        "name": "item",
        "type": "ReceiptItem",
        "default": "undefined",
        "description": "Shorthand for single item receipt"
      },
      {
        "name": "subtotal",
        "type": "string | number",
        "default": "undefined",
        "description": "Subtotal price before tax and discounts"
      },
      {
        "name": "tax",
        "type": "string | number",
        "default": "undefined",
        "description": "Tax amount displayed on receipt"
      },
      {
        "name": "discount",
        "type": "string | number",
        "default": "undefined",
        "description": "Discount or coupon amount deducted"
      },
      {
        "name": "total",
        "type": "string | number",
        "default": "'$200.00'",
        "description": "Final total payment amount"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to numeric prices"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay •••• 4242'",
        "description": "Payment method or card description"
      },
      {
        "name": "message",
        "type": "string",
        "default": "'Thank you for your order!'",
        "description": "Footer message printed at bottom of receipt"
      },
      {
        "name": "autoPrint",
        "type": "boolean",
        "default": "true",
        "description": "Whether to automatically begin printing extrusion on mount"
      },
      {
        "name": "printDuration",
        "type": "number",
        "default": "2.4",
        "description": "Extrusion animation duration in seconds"
      },
      {
        "name": "showStatusCard",
        "type": "boolean",
        "default": "true",
        "description": "Whether to display the top status card banner"
      },
      {
        "name": "statusTitle",
        "type": "string",
        "default": "'Payment Complete'",
        "description": "Heading for the top status banner"
      },
      {
        "name": "statusSubtitle",
        "type": "string",
        "default": "'Receipt has been issued'",
        "description": "Subtitle description for status banner"
      },
      {
        "name": "showActions",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render Replay and Copy action buttons"
      },
      {
        "name": "showBarcode",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the thermal barcode block"
      },
      {
        "name": "showCutEffect",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render jagged serrated paper edges"
      },
      {
        "name": "paperTheme",
        "type": "'light' | 'dark' | 'cream'",
        "default": "'light'",
        "description": "Receipt paper visual theme styling"
      },
      {
        "name": "onPrintStart",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing begins"
      },
      {
        "name": "onPrintComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when paper printing finishes"
      },
      {
        "name": "onReplay",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when animation replay is triggered"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Custom CSS classes for outer container"
      }
    ],
    "accessibility": [
      "ARIA live region for dynamic payment and printing status announcements",
      "Respects prefers-reduced-motion media query with instantaneous completion",
      "Keyboard accessible interactive replay and copy controls with focus-visible rings",
      "Semantic document structure with compliant contrast ratios"
    ],
    "createdAt": "2026-08-20",
    "usageCode": "import { PaymentReceiptPrinter } from \"@/components/ui/payment-receipt-printer\";\n\nexport function Demo() {\n  return (\n    <PaymentReceiptPrinter\n      merchant=\"EasyUI Store\"\n      orderNumber=\"#4821\"\n      items={[\n        { name: \"EasyUI Pro License\", price: \"$200.00\", quantity: 1 },\n        { name: \"Framer Motion Pack\", price: \"$20.00\", quantity: 1 },\n      ]}\n      subtotal=\"$220.00\"\n      total=\"$220.00\"\n      paymentMethod=\"Apple Pay •••• 4242\"\n      message=\"Thank you for your order!\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentReceiptPrinter.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-receipt-printer.tsx"
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
  },
  {
    "id": "payment-status",
    "name": "Payment Status",
    "tagline": "Refined transaction status card with self-drawing checkmark and receipt actions",
    "description": "A calm, Apple-grade payment confirmation card with animated SVG path checkmark drawing, staged verification lifecycle transitions, receipt inspection, and failure recovery.",
    "category": "Feedback",
    "badges": [
      "Payment",
      "Feedback",
      "SVG Motion"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/payment-status",
    "features": [
      "5 clear lifecycle states: Processing, Verifying, Success, Failed, and Refunded",
      "Self-drawing SVG stroke checkmark animation upon payment confirmation",
      "Staggered metadata reveal for amount, transaction hash, timestamp, and card info",
      "Unfolding itemized receipt accordion with instant text-file receipt download",
      "One-click transaction ID copying with instant checkmark feedback",
      "Non-aggressive error state with instant retry and payment method alternatives"
    ],
    "props": [
      {
        "name": "status",
        "type": "'processing' | 'verifying' | 'success' | 'failed' | 'refunded'",
        "default": "'processing'",
        "description": "Current lifecycle state of payment"
      },
      {
        "name": "amount",
        "type": "string | number",
        "default": "'$149.00'",
        "description": "Transaction total amount formatted or numeric"
      },
      {
        "name": "currency",
        "type": "string",
        "default": "'$'",
        "description": "Currency symbol prepended to amount"
      },
      {
        "name": "transactionId",
        "type": "string",
        "default": "'tx_9842a8d11c7f'",
        "description": "Unique transaction identifier"
      },
      {
        "name": "date",
        "type": "string | Date",
        "default": "'Today at 3:42 PM'",
        "description": "Date/time timestamp of payment"
      },
      {
        "name": "paymentMethod",
        "type": "string",
        "default": "'Apple Pay'",
        "description": "Payment gateway or card provider"
      },
      {
        "name": "last4",
        "type": "string",
        "default": "'4242'",
        "description": "Last 4 digits of card or account"
      },
      {
        "name": "items",
        "type": "PaymentReceiptItem[]",
        "default": "[...]",
        "description": "Itemized purchase items for detailed receipt view"
      },
      {
        "name": "merchantName",
        "type": "string",
        "default": "'EasyUI Cloud'",
        "description": "Merchant or brand organization name"
      },
      {
        "name": "onRetry",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Try Again"
      },
      {
        "name": "onChangePaymentMethod",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user changes card method"
      }
    ],
    "accessibility": [
      "Aria-live region alerts assistive technology on status transition updates",
      "Keyboard accessible receipt toggle and transaction ID copy buttons",
      "Compliant contrast ratio on dark monochrome surface",
      "Full reduced-motion compatibility with zero stroke animation lag"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PaymentStatus } from \"@/components/ui/payment-status\";\n\nexport function Demo() {\n  return (\n    <PaymentStatus\n      status=\"success\"\n      amount=\"$149.00\"\n      transactionId=\"tx_8830192a\"\n      paymentMethod=\"Apple Pay\"\n      last4=\"4242\"\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PaymentStatus.tsx",
        "type": "registry:ui",
        "target": "components/ui/payment-status.tsx"
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
  },
  {
    "id": "peek-card",
    "name": "Peek Card",
    "tagline": "Origin-anchored contextual preview card with edge-aware collision detection",
    "description": "An origin-anchored contextual preview popover that emerges directly from target triggers on hover or tap with smart collision edge detection and rich metadata summaries.",
    "category": "Overlays",
    "badges": [
      "Popovers",
      "Overlays",
      "Context Preview"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/peek-card",
    "features": [
      "Origin-anchored emergence animation feeling connected to source elements",
      "Automatic edge collision detection preventing viewport bounding overflow",
      "Rich preset layout for transactions, user profiles, invoices, and metrics",
      "Mobile tap toggle and desktop hover/focus dual interaction model",
      "Integrated copy actions and status indicators with reduced-motion support"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Trigger target element wrapped by peek card"
      },
      {
        "name": "data",
        "type": "PeekCardData",
        "default": "[...]",
        "description": "Structured preview dataset"
      },
      {
        "name": "delay",
        "type": "number",
        "default": "200",
        "description": "Hover activation delay in milliseconds"
      },
      {
        "name": "placement",
        "type": "'top' | 'bottom' | 'auto'",
        "default": "'auto'",
        "description": "Preferred emergence direction"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Renders skeleton placeholder during async lookup"
      }
    ],
    "accessibility": [
      "Keyboard accessible through native onFocus and onBlur handlers",
      "Closes automatically on Escape key press or outside click"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { PeekCard } from \"@/components/ui/peek-card\";\n\nexport function Demo() {\n  return (\n    <PeekCard\n      data={{\n        title: \"Payment #3948\",\n        amount: \"$249.00\",\n        customer: { name: \"Alexander Wright\", email: \"alex@acme.com\" },\n        status: \"Succeeded\",\n      }}\n    >\n      <span className=\"underline decoration-dotted cursor-pointer\">\n        Payment #3948\n      </span>\n    </PeekCard>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PeekCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/peek-card.tsx"
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
  },
  {
    "id": "pill-navigation",
    "name": "Pill Navigation",
    "tagline": "Minimal shared-pill navigation continuity with fluid submenus",
    "description": "A restrained segmented navigation control with shared pill layout morphing and nested submenu dropdown support.",
    "category": "Navigation",
    "badges": [
      "Layout Springs",
      "Submenu Dropdown",
      "Accessible",
      "Minimal"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/pill-navigation",
    "features": [
      "Single shared indicator preserves spatial continuity",
      "Interactive nested submenu with fluid spring entrance and layout morphing",
      "Dual-tier keyboard navigation for parent tabs and sub-items"
    ],
    "props": [
      {
        "name": "items",
        "type": "PillNavigationItem[]",
        "default": "demo items",
        "description": "Navigation items with optional submenu children"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "first item id",
        "description": "Initial selected item id"
      },
      {
        "name": "defaultSubValue",
        "type": "string",
        "default": "undefined",
        "description": "Initial selected submenu item id"
      },
      {
        "name": "onChange",
        "type": "(id: string, subId?: string) => void",
        "default": "undefined",
        "description": "Selection callback"
      }
    ],
    "accessibility": [
      "Uses tablist and tab roles with aria-selected and aria-expanded state",
      "Supports ArrowLeft/ArrowRight for main tabs and ArrowUp/ArrowDown for sub-items",
      "Reduced motion swaps the moving shared pill for an immediate selected background"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { PillNavigation } from \"@/components/ui/pill-navigation\";\n\nexport function Demo() {\n  return (\n    <PillNavigation\n      items={[\n        { id: 'overview', label: 'Overview' },\n        {\n          id: 'motion',\n          label: 'Motion',\n          children: [\n            { id: 'springs', label: 'Spring Physics' },\n            { id: 'caustics', label: 'Liquid Caustics' },\n          ],\n        },\n        { id: 'code', label: 'Code' },\n      ]}\n      onChange={(mainId, subId) => console.log(mainId, subId)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/PillNavigation.tsx",
        "type": "registry:ui",
        "target": "components/ui/pill-navigation.tsx"
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
  },
  {
    "id": "press-button",
    "name": "PressButton",
    "tagline": "Compresses slightly on press, then settles",
    "description": "A button that compresses slightly on press and settles with a tiny natural overshoot for a tactile, physical feel.",
    "category": "Buttons",
    "badges": [
      "Spring Press",
      "Squash Physics",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/press-button",
    "features": [
      "Layered scaleX + scaleY squash for an organic compression on press",
      "Tunable pressStrength (0-1) to control how much the button compresses",
      "Snappy spring with a tiny overshoot so the button \"settles\" instead of snapping",
      "4 visual variants: Primary, Secondary, Outline, Ghost — light/dark theme aware",
      "4 size dimensions: Small (sm), Medium (md), Large (lg), and square Icon",
      "Full keyboard accessibility with focus-ring and disabled state"
    ],
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline' | 'ghost'",
        "default": "'primary'",
        "description": "Visual presentation style"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg' | 'icon'",
        "default": "'md'",
        "description": "Dimensions and typography scale"
      },
      {
        "name": "pressStrength",
        "type": "number",
        "default": "0.04",
        "description": "Compression amount on press (0-1, clamped 0.01-0.06)"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches button to 100% width of parent container"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction and applies 30% disabled opacity"
      }
    ],
    "accessibility": [
      "Native <button> semantics with explicit type=\"button\" default",
      "Standard focus-ring outline with restrained accent on keyboard :focus-visible",
      "Disabled state is communicated both visually and via pointer-events",
      "Respects prefers-reduced-motion via the system spring config"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex flex-wrap items-center gap-3\">\n      <PressButton variant=\"primary\">Save changes</PressButton>\n      <PressButton variant=\"secondary\" pressStrength={0.05}>Cancel</PressButton>\n      <PressButton variant=\"outline\">Learn more</PressButton>\n      <PressButton variant=\"ghost\">Skip</PressButton>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/PressButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/press-button.tsx"
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
  },
  {
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
  },
  {
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
  },
  {
    "id": "recovery-ledger",
    "name": "Recovery Ledger",
    "tagline": "Version history timeline & state recovery ledger",
    "description": "An archival audit timeline and state recovery ledger with chronological snapshot markers, diff inspection, and one-click rollback triggers.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Timeline",
      "Audit Log",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/recovery-ledger",
    "features": [
      "Chronological version ledger with vertical timeline rail and active head marker",
      "One-click state rollback action with loading animation feedback",
      "Expandable code diff viewer and snapshot metadata inspection drawer",
      "Full keyboard tab access and screen reader timestamp announcements"
    ],
    "props": [
      {
        "name": "entries",
        "type": "LedgerEntry[]",
        "description": "Array of version history records (id, timestamp, action, description, author, details, restorable)"
      },
      {
        "name": "currentEntryId",
        "type": "string",
        "default": "undefined",
        "description": "Active head snapshot identifier"
      },
      {
        "name": "onRestore",
        "type": "(id: string) => Promise<void> | void",
        "default": "undefined",
        "description": "Callback fired on version revert action"
      },
      {
        "name": "onSelect",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback when an entry is clicked"
      },
      {
        "name": "variant",
        "type": "'timeline' | 'compact'",
        "default": "'timeline'",
        "description": "Display format"
      }
    ],
    "accessibility": [
      "Accessible timestamps formatted for clear assistive technology reading",
      "Proper <button> elements with clear action labels",
      "Contrast compliant with WCAG AA standards"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { RecoveryLedger } from \"@/components/ui/recovery-ledger\";\n\nexport function Demo() {\n  const [currentId, setCurrentId] = useState('v3');\n  const entries = [\n    { id: 'v3', timestamp: '2m ago', action: 'Schema Migration', description: 'Added tenant_id column to organization tables.', author: 'Alex W.', details: { diff: '+ ALTER TABLE org ADD COLUMN tenant_id UUID;' } },\n    { id: 'v2', timestamp: '1h ago', action: 'API Auth Refactor', description: 'Upgraded JWT verification to RS256 algorithm.', author: 'Sarah K.', details: { diff: '- alg: HS256\n+ alg: RS256' } },\n    { id: 'v1', timestamp: 'Yesterday', action: 'Initial Release', description: 'Base schema initialized in primary region.', author: 'Alex W.' },\n  ];\n\n  return (\n    <RecoveryLedger\n      entries={entries}\n      currentEntryId={currentId}\n      onRestore={async (id) => setCurrentId(id)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/RecoveryLedger.tsx",
        "type": "registry:ui",
        "target": "components/ui/recovery-ledger.tsx"
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
  },
  {
    "id": "reveal-card",
    "name": "Reveal Card",
    "tagline": "3D cursor physics tilt with interactive glare reveal",
    "description": "A high-definition product card with smooth cursor-driven 3D perspective rotation, dynamic glare, and revealed content.",
    "category": "Motion",
    "badges": [
      "3D Tilt",
      "Dynamic Glare",
      "Micro-interaction"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/reveal-card",
    "features": [
      "Cursor-aware 3D perspective rotation springs",
      "Dynamic radial glare reflection overlay",
      "Hidden metadata section revealed on hover"
    ],
    "props": [
      {
        "name": "maxTilt",
        "type": "number",
        "default": "12",
        "description": "Max tilt angle in degrees"
      },
      {
        "name": "revealContent",
        "type": "ReactNode",
        "default": "undefined",
        "description": "Content shown on hover"
      }
    ],
    "accessibility": [
      "Subtle tilt respects reduced-motion settings",
      "All content accessible via DOM"
    ],
    "createdAt": "2026-08-06",
    "usageCode": "import { RevealCard } from \"@/components/ui/reveal-card\";\n\nexport function Demo() {\n  return (\n    <RevealCard revealContent={<div>Expanded analytics & telemetry</div>}>\n      <h4>Cloud Engine</h4>\n    </RevealCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/RevealCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/reveal-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "rocket-party-popper",
    "name": "Rocket Party Popper",
    "tagline": "Lift-off milestone celebration with colorful confetti blast",
    "description": "An interactive black rocket launch that blasts into a colorful party popper confetti shower to reveal celebratory milestones.",
    "category": "Feedback",
    "badges": [
      "Party Popper",
      "Confetti Blast",
      "Interactive Motion",
      "Milestones"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/rocket-party-popper",
    "features": [
      "Sleek matte black rocket capsule with thruster ember anticipation",
      "Smooth lift-off acceleration trailing thruster flame and smoke",
      "360° Colorful party popper confetti explosion with physics gravity and flutter",
      "Apple-grade fluid spring reveal for celebratory milestone cards",
      "Built-in replay and reset support for repeatable celebratory interactions"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Mission Accomplished'",
        "description": "Primary celebration headline"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'All checks passed and your release is ready to deploy.'",
        "description": "Supporting celebration description"
      },
      {
        "name": "metric",
        "type": "string",
        "default": "'100% Production Ready'",
        "description": "Metadata badge shown on milestone card"
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "default": "'Launch celebration'",
        "description": "Label for the launch button"
      },
      {
        "name": "confettiCount",
        "type": "number",
        "default": "50",
        "description": "Total confetti particles spawned on blast"
      },
      {
        "name": "defaultLaunched",
        "type": "boolean",
        "default": "false",
        "description": "Initial launched/revealed state"
      },
      {
        "name": "onLaunch",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired on launch trigger"
      },
      {
        "name": "onReset",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired on reset"
      }
    ],
    "accessibility": [
      "Revealed milestone card uses role=\"status\" and aria-live=\"polite\"",
      "Supports prefers-reduced-motion with instant graceful celebration transition",
      "Full keyboard interaction via Enter and Spacebar"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { RocketPartyPopper } from \"@/components/ui/rocket-party-popper\";\n\nexport function Demo() {\n  return (\n    <RocketPartyPopper\n      title=\"Release Shipped\"\n      description=\"All registry, lint, and SEO checks passed.\"\n      metric=\"v2.4.0 Live\"\n      onLaunch={() => console.log('Rocket Launched!')}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/RocketPartyPopper.tsx",
        "type": "registry:ui",
        "target": "components/ui/rocket-party-popper.tsx"
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
  },
  {
    "id": "scroll-progress-nav",
    "name": "Scroll Progress Navigation",
    "tagline": "Floating progress navigation pill tracking scroll depth and active document headings",
    "description": "A floating table-of-contents navigation pill that tracks scroll depth, dynamically morphs between resting and floating states, highlights active sections, and enables smooth scrolling.",
    "category": "Navigation",
    "badges": [
      "Navigation",
      "Scroll Physics",
      "Floating"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/scroll-progress-nav",
    "features": [
      "Real-time document scroll progress bar integrated along the pill boundary",
      "Shared layout pill indicator smoothly moving between active headings",
      "Seamless transition from static page banner to compact floating island",
      "Smooth scroll anchoring with customizable offset threshold",
      "Mobile-optimized responsive compact menu preventing content obstruction"
    ],
    "props": [
      {
        "name": "sections",
        "type": "NavSectionItem[]",
        "default": "[...]",
        "description": "Navigation links with IDs, index numbers, and labels"
      },
      {
        "name": "scrollThreshold",
        "type": "number",
        "default": "150",
        "description": "Scroll distance in px before morphing into floating pill"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Controlled active section ID override"
      },
      {
        "name": "onSectionClick",
        "type": "(id: string) => void",
        "default": "undefined",
        "description": "Callback fired when user selects a section"
      },
      {
        "name": "position",
        "type": "'top-center' | 'bottom-center' | 'top-right'",
        "default": "'top-center'",
        "description": "Screen anchor position"
      }
    ],
    "accessibility": [
      "Semantic nav element with aria-label=\"Table of contents\"",
      "Keyboard navigable tab order and focus-visible outlines",
      "Smooth scroll honors prefers-reduced-motion settings"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { ScrollProgressNav } from \"@/components/ui/scroll-progress-nav\";\n\nexport function Demo() {\n  return (\n    <ScrollProgressNav\n      sections={[\n        { id: \"overview\", index: \"01\", label: \"Overview\" },\n        { id: \"features\", index: \"02\", label: \"Features\" },\n        { id: \"components\", index: \"03\", label: \"Components\" },\n        { id: \"docs\", index: \"04\", label: \"Documentation\" }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/ScrollProgressNav.tsx",
        "type": "registry:ui",
        "target": "components/ui/scroll-progress-nav.tsx"
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
  },
  {
    "id": "selection-basket",
    "name": "Selection Basket",
    "tagline": "Floating bulk-action toolbar for multi-item batch operations and export flows",
    "description": "A floating bulk-action toolbar that smoothly rises from the bottom of the screen when multiple dataset items are selected, supporting batch operations, horizontal scrolling, and clear triggers.",
    "category": "Overlays",
    "badges": [
      "Bulk Actions",
      "Toolbars",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/selection-basket",
    "features": [
      "Appears naturally with spring rise physics as soon as selected count > 0",
      "Responsive horizontal scrolling action container preventing mobile cutoff",
      "Integrated batch action buttons (Delete, Move, Export, Share)",
      "Dynamic select all / clear all selection toggle synchronization",
      "Accessible role=\"toolbar\" keyboard navigation and focus rings"
    ],
    "props": [
      {
        "name": "selectedCount",
        "type": "number",
        "default": "0",
        "description": "Current number of selected items"
      },
      {
        "name": "totalCount",
        "type": "number",
        "default": "undefined",
        "description": "Total item universe count"
      },
      {
        "name": "actions",
        "type": "SelectionActionItem[]",
        "default": "[...]",
        "description": "List of bulk action definitions"
      },
      {
        "name": "onClearSelection",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clears selection"
      },
      {
        "name": "onSelectAll",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user selects all"
      }
    ],
    "accessibility": [
      "ARIA role=\"toolbar\" and aria-label=\"Bulk actions toolbar\"",
      "Keyboard navigable action items with tab and arrow keys"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SelectionBasket } from \"@/components/ui/selection-basket\";\n\nexport function Demo() {\n  const [selected, setSelected] = useState<string[]>(['item-1', 'item-2']);\n\n  return (\n    <SelectionBasket\n      selectedCount={selected.length}\n      totalCount={10}\n      onClearSelection={() => setSelected([])}\n      actions={[\n        { id: 'export', label: 'Export', onClick: () => console.log('Exporting') },\n        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => console.log('Deleting') }\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SelectionBasket.tsx",
        "type": "registry:ui",
        "target": "components/ui/selection-basket.tsx"
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
  },
  {
    "id": "settle-modal",
    "name": "SettleModal",
    "tagline": "Content scales and settles, never fades",
    "description": "A modal whose content has a tiny scale/settle instead of a generic fade. The panel scales 0.94 -> 1.02 -> 1.0 with a small y travel, then the inner content layers its own gentle settle on top.",
    "category": "Overlays",
    "badges": [
      "Scale Settle",
      "Layered Motion",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/settle-modal",
    "features": [
      "Panel animates scale 0.94 -> 1.02 -> 1.0 with ease-soft curve for a tactile \"settle\"",
      "Inner content has its own layered scale-up (0.98 -> 1.0) for a nested feel",
      "Escape key dismisses; backdrop click closes by default (toggle via closeOnBackdrop)",
      "Scroll lock while open; restores previous overflow on close",
      "Three size presets (sm / md / lg) with optional title, description, and footer slots"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Whether the modal is open"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "undefined",
        "description": "Called when the modal should close"
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Optional title rendered at the top"
      },
      {
        "name": "description",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Optional secondary description below the title"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Main content area"
      },
      {
        "name": "footer",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Footer area, typically action buttons"
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "default": "false",
        "description": "Hide the close (X) button"
      },
      {
        "name": "closeOnBackdrop",
        "type": "boolean",
        "default": "true",
        "description": "Click on backdrop closes the modal"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Maximum width preset"
      }
    ],
    "accessibility": [
      "role=\"dialog\" with aria-modal=\"true\" and aria-labelledby wired to the title",
      "Body scroll lock while open; restored on close",
      "Escape key dismisses; focus-ring on the close button",
      "Reduced-motion users get the same content but the entry curve is shorter"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { useState } from \"react\";\nimport { SettleModal } from \"@/components/ui/settle-modal\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Open modal</PressButton>\n      <SettleModal\n        open={open}\n        onClose={() => setOpen(false)}\n        title=\"Confirm archive\"\n        description=\"Archived projects can be restored within 30 days.\"\n        footer={\n          <>\n            <PressButton variant=\"ghost\" onClick={() => setOpen(false)}>Cancel</PressButton>\n            <PressButton variant=\"primary\" onClick={() => setOpen(false)}>Archive</PressButton>\n          </>\n        }\n      >\n        <p className=\"text-sm text-[#A1A1A1] leading-relaxed\">\n          This project and its 14 components will be moved to the archive.\n        </p>\n      </SettleModal>\n    </>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SettleModal.tsx",
        "type": "registry:ui",
        "target": "components/ui/settle-modal.tsx"
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
  },
  {
    "id": "sign-up",
    "name": "Sign Up",
    "tagline": "Multi-step capable user registration with strength telemetry",
    "description": "A comprehensive registration card with live password strength metrics, password confirmation matching, terms validation, and social onboarding.",
    "category": "Auth",
    "badges": [
      "Registration",
      "Forms",
      "Password Strength",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/sign-up",
    "features": [
      "Integrated live 4-tier password strength indicator bar",
      "Password confirmation matching validation",
      "Interactive eye icons for show/hide password visibility",
      "Terms of service and privacy agreement checkbox validation",
      "Customizable social onboarding SSO buttons (GitHub & Google)",
      "Submitting state with monochrome button spinner",
      "Responsive layout with atmospheric glow and dark slate tokens"
    ],
    "props": [
      {
        "name": "title",
        "type": "string",
        "default": "'Create an account'",
        "description": "Primary card title text"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Join EasyUI to access components and templates'",
        "description": "Subtitle description below the title"
      },
      {
        "name": "logo",
        "type": "React.ReactNode",
        "default": "<SparklesIcon />",
        "description": "Brand badge or logo displayed at the top"
      },
      {
        "name": "error",
        "type": "string | null",
        "default": "null",
        "description": "Server-side registration error banner message"
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "default": "false",
        "description": "Submitting state displaying loader on submit button"
      },
      {
        "name": "onSubmit",
        "type": "(data: SignUpFormData) => void",
        "default": "undefined",
        "description": "Form submission callback with name, email, password, confirmPassword, agreeToTerms"
      },
      {
        "name": "onSignInClick",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback for switching to login view"
      },
      {
        "name": "showSocialSignUp",
        "type": "boolean",
        "default": "true",
        "description": "Toggles GitHub and Google SSO buttons"
      },
      {
        "name": "requireConfirmPassword",
        "type": "boolean",
        "default": "true",
        "description": "Includes confirmation password field and checks match"
      },
      {
        "name": "termsText",
        "type": "React.ReactNode",
        "default": "Default Terms & Privacy links",
        "description": "Custom agreement label text or JSX"
      }
    ],
    "accessibility": [
      "Accessible input labels with required indicators and autocomplete values (name, email, new-password)",
      "Role=\"alert\" for validation errors with smooth Framer Motion spring entrances",
      "Keyboard navigable form submission and checkbox selection",
      "Sky-400 focus ring on all focusable controls"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SignUp } from \"@/components/ui/sign-up\";\n\nexport function Demo() {\n  const handleSignUp = async (data: any) => {\n    console.log(\"Registering account:\", data);\n  };\n\n  return (\n    <div className=\"py-8 flex justify-center\">\n      <SignUp\n        onSubmit={handleSignUp}\n        onSignInClick={() => alert(\"Redirect to sign in\")}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SignUp.tsx",
        "type": "registry:ui",
        "target": "components/ui/sign-up.tsx"
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
  },
  {
    "id": "slide-pagination",
    "name": "SlidePagination",
    "tagline": "Active indicator slides between pages",
    "description": "A pagination control where the active indicator slides between pages rather than instantly switching. The active background uses shared layoutId so the indicator visibly travels from one item to the next.",
    "category": "Navigation",
    "badges": [
      "Shared Layout",
      "Indicator Travel",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/slide-pagination",
    "features": [
      "Active background uses framer-motion shared layoutId for visible travel between pages",
      "Snappy spring (springSnappy) drives the indicator for a precise, physical feel",
      "Configurable siblingCount for windowed page ranges with ellipsis",
      "Optional previous / next controls; disabled at boundaries",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "pageCount",
        "type": "number",
        "default": "undefined",
        "description": "Total number of pages"
      },
      {
        "name": "page",
        "type": "number",
        "default": "undefined",
        "description": "Controlled current page"
      },
      {
        "name": "defaultPage",
        "type": "number",
        "default": "1",
        "description": "Initial current page (uncontrolled)"
      },
      {
        "name": "siblingCount",
        "type": "number",
        "default": "1",
        "description": "Visible pages around the current one"
      },
      {
        "name": "onChange",
        "type": "(page: number) => void",
        "default": "undefined",
        "description": "Page change callback"
      },
      {
        "name": "showControls",
        "type": "boolean",
        "default": "true",
        "description": "Show previous / next buttons"
      }
    ],
    "accessibility": [
      "aria-current=\"page\" on the active item; aria-label per page button",
      "Disabled state on prev/next at boundaries",
      "Focus-ring visible on keyboard navigation"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { SlidePagination } from \"@/components/ui/slide-pagination\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center justify-center\">\n      <SlidePagination pageCount={12} defaultPage={5} siblingCount={1} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SlidePagination.tsx",
        "type": "registry:ui",
        "target": "components/ui/slide-pagination.tsx"
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
  },
  {
    "id": "small-floating-dock",
    "name": "Small Floating Dock",
    "tagline": "Hover proximity scale & tactile action pills",
    "description": "A minimal, gesture-responsive floating dock for quick access to 3-5 primary actions.",
    "category": "Navigation",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Navigation",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/small-floating-dock",
    "features": [
      "Proximity-aware hover scale with elastic spring snap-back physics",
      "Supports 3 to 5 actions with numeric unread badges and contextual tooltips",
      "Configurable screen positioning (bottom-right, bottom-center, bottom-left)",
      "Optional hide-on-scroll behavior with smooth viewport transitions",
      "Full keyboard tab navigation and WCAG AA focus rings"
    ],
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "default": "[]",
        "description": "Array of 3 to 5 action items with icon, label, action, and badge"
      },
      {
        "name": "position",
        "type": "'bottom-right' | 'bottom-center' | 'bottom-left'",
        "default": "'bottom-right'",
        "description": "Screen placement"
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Button sizing scale"
      },
      {
        "name": "hideOnScroll",
        "type": "boolean",
        "default": "false",
        "description": "Auto-hides dock during downward scroll"
      },
      {
        "name": "variant",
        "type": "'icon-only' | 'icon-label'",
        "default": "'icon-only'",
        "description": "Icon only with tooltips or labeled buttons"
      },
      {
        "name": "activeId",
        "type": "string",
        "default": "undefined",
        "description": "Selected active item ID"
      }
    ],
    "accessibility": [
      "Semantic <nav> landmark with role=\"navigation\"",
      "aria-label on all action buttons and aria-current=\"page\" on active item",
      "Keyboard focus and tooltip synchronization on Tab / Escape"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { SmallFloatingDock } from \"@/components/ui/small-floating-dock\";\nimport { Sparkles, Terminal, Code2, Bell } from \"lucide-react\";\n\nexport function Demo() {\n  return (\n    <SmallFloatingDock\n      position=\"bottom-right\"\n      items={[\n        { id: '1', label: 'AI Assistant', icon: <Sparkles className=\"w-4 h-4\" />, action: () => {} },\n        { id: '2', label: 'Terminal', icon: <Terminal className=\"w-4 h-4\" />, action: () => {} },\n        { id: '3', label: 'Editor', icon: <Code2 className=\"w-4 h-4\" />, action: () => {} },\n        { id: '4', label: 'Notifications', icon: <Bell className=\"w-4 h-4\" />, action: () => {}, badge: 3 },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SmallFloatingDock.tsx",
        "type": "registry:ui",
        "target": "components/ui/small-floating-dock.tsx"
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
  },
  {
    "id": "smart-comparison",
    "name": "Smart Comparison",
    "tagline": "Interactive tier comparison matrix with difference filtering",
    "description": "An interactive feature matrix and SaaS tier comparison component featuring live difference filtering, collapsible specification categories, search indexing, and mobile card toggle.",
    "category": "Navigation",
    "badges": [
      "Feature Matrix",
      "SaaS Pricing",
      "Diff Filter"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smart-comparison",
    "features": [
      "Live \"Differences Only\" filter to instantly surface plan divergence",
      "Integrated feature keyword search with real-time row matching",
      "Collapsible category groups with spring height transitions",
      "Segmented mobile plan selector avoiding wide horizontal table scrolling",
      "Contextual info tooltips and custom value cell rendering"
    ],
    "props": [
      {
        "name": "plans",
        "type": "ComparisonPlan[]",
        "default": "[]",
        "description": "Array of plans/tiers containing pricing and metadata"
      },
      {
        "name": "categories",
        "type": "ComparisonCategory[]",
        "default": "[]",
        "description": "Grouped feature categories with plan-specific values"
      },
      {
        "name": "defaultPlanId",
        "type": "string",
        "default": "featured plan or plans[0].id",
        "description": "Initial plan selected on mobile viewports"
      },
      {
        "name": "enableSearch",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the instant feature search input"
      },
      {
        "name": "enableDiffFilter",
        "type": "boolean",
        "default": "true",
        "description": "Whether to render the \"Differences Only\" toggle button"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Optional CSS class name for container"
      }
    ],
    "accessibility": [
      "Semantic region container with ARIA labels",
      "Keyboard accessible category accordions and tooltips",
      "High-contrast state indicators with screen reader readable labels"
    ],
    "createdAt": "2026-08-19",
    "usageCode": "import { SmartComparison } from \"@/components/ui/smart-comparison\";\n\nconst plans = [\n  { id: \"hobby\", name: \"Hobby\", tagline: \"For side projects\", price: \"$0\", billingPeriod: \"mo\" },\n  { id: \"pro\", name: \"Pro\", tagline: \"For fast-moving teams\", price: \"$29\", billingPeriod: \"mo\", featured: true, badge: \"Popular\" },\n  { id: \"enterprise\", name: \"Enterprise\", tagline: \"Dedicated compliance\", price: \"Custom\", billingPeriod: \"yr\" },\n];\n\nconst categories = [\n  {\n    id: \"compute\",\n    title: \"Compute & Scale\",\n    features: [\n      { id: \"bandwidth\", name: \"Global Bandwidth\", values: { hobby: \"100 GB\", pro: \"1 TB\", enterprise: \"Unlimited\" } },\n      { id: \"regions\", name: \"Multi-Region Routing\", values: { hobby: false, pro: true, enterprise: true } },\n      { id: \"concurrency\", name: \"Max Concurrency\", values: { hobby: \"10\", pro: \"250\", enterprise: \"Dedicated\" } },\n    ],\n  },\n];\n\nexport function Demo() {\n  return <SmartComparison plans={plans} categories={categories} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmartComparison.tsx",
        "type": "registry:ui",
        "target": "components/ui/smart-comparison.tsx"
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
  },
  {
    "id": "smooth-accordion",
    "name": "Smooth Accordion",
    "tagline": "Zero-jank spring collapsible content panels",
    "description": "An accordion component with physics height transition, rotating chevron indicators, and accessible keyboard toggles.",
    "category": "Feedback",
    "badges": [
      "Spring Height",
      "Zero Layout Shift",
      "Multi or Single"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/smooth-accordion",
    "features": [
      "Spring physics height interpolation",
      "Zero content clipping or layout jumps",
      "Single or multi-panel open mode"
    ],
    "props": [
      {
        "name": "items",
        "type": "AccordionItem[]",
        "default": "[]",
        "description": "Accordion items"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allow multiple open panels"
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "default": "[]",
        "description": "Default open item ids"
      }
    ],
    "accessibility": [
      "WAI-ARIA accordion pattern",
      "aria-expanded and aria-controls attributes"
    ],
    "createdAt": "2026-08-05",
    "usageCode": "import { SmoothAccordion } from \"@/components/ui/smooth-accordion\";\n\nexport function Demo() {\n  const items = [\n    { id: '1', title: 'How does ownership work?', content: 'You copy the full code directly into your repository.' },\n    { id: '2', title: 'Can I customize the springs?', content: 'Yes, all motion tokens are standard Framer Motion props.' }\n  ];\n  return <SmoothAccordion items={items} defaultOpen={['1']} />;\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SmoothAccordion.tsx",
        "type": "registry:ui",
        "target": "components/ui/smooth-accordion.tsx"
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
  },
  {
    "id": "spotlight-card",
    "name": "Spotlight Card",
    "tagline": "Radial pointer tracking over dark layered surface",
    "description": "A dark elevated surface that illuminates border and inner surfaces dynamically based on mouse pointer coordinates.",
    "category": "Motion",
    "badges": [
      "Shader Feel",
      "Pointer Physics",
      "Dark Elevation"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-card",
    "features": [
      "Hardware-accelerated dynamic radial mask",
      "Dual illumination (border beam + ambient inner glow)",
      "Near-black layered background preservation"
    ],
    "props": [
      {
        "name": "spotlightColor",
        "type": "string",
        "default": "'rgba(56, 189, 248, 0.08)'",
        "description": "Inner ambient radial color"
      },
      {
        "name": "spotlightSize",
        "type": "number",
        "default": "350",
        "description": "Radius of spotlight effect in pixels"
      }
    ],
    "accessibility": [
      "Accessible contrast ratio for all nested text and actions",
      "No reliance on animation for critical content reading"
    ],
    "createdAt": "2026-08-15",
    "usageCode": "import { SpotlightCard } from \"@/components/ui/spotlight-card\";\n\nexport function Demo() {\n  return (\n    <SpotlightCard className=\"max-w-sm\">\n      <h3 className=\"text-base font-semibold text-white\">Edge Computing</h3>\n      <p className=\"text-sm text-neutral-400 mt-2\">\n        Deploy globally distributed stateful workloads in 35 regions.\n      </p>\n    </SpotlightCard>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "spotlight-search",
    "name": "Spotlight Search",
    "tagline": "Global ⌘K search overlay with moving highlight spring physics",
    "description": "A global command palette and search overlay triggered by ⌘K featuring real-time fuzzy filtering, moving active highlight springs, kbd shortcuts, and full keyboard navigation.",
    "category": "Overlays",
    "badges": [
      "Command Palette",
      "Search",
      "Overlays"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spotlight-search",
    "features": [
      "Global keyboard listener for ⌘K / Ctrl+K and Escape dismissal",
      "Animated active highlight tracking item selection with layoutId spring physics",
      "Categorized search results with contextual icons and technical kbd badges",
      "Dimmed backdrop with subtle blur preserving focus on command box",
      "Full arrow key navigation and Enter selection execution"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controlled visibility state"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "undefined",
        "description": "Callback fired when modal visibility toggles"
      },
      {
        "name": "items",
        "type": "SpotlightSearchItem[]",
        "default": "[...]",
        "description": "List of searchable actions and components"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Search components, actions...'",
        "description": "Input placeholder text"
      },
      {
        "name": "onSelect",
        "type": "(item: SpotlightSearchItem) => void",
        "default": "undefined",
        "description": "Callback fired when item is chosen"
      }
    ],
    "accessibility": [
      "Aria-expanded and aria-autocomplete attributes on input",
      "Complete keyboard control (Up/Down arrows, Enter, Escape)",
      "Traps focus within dialog while active and restores focus on close"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { SpotlightSearch } from \"@/components/ui/spotlight-search\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Press ⌘K to search</button>\n      <SpotlightSearch open={open} onOpenChange={setOpen} />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SpotlightSearch.tsx",
        "type": "registry:ui",
        "target": "components/ui/spotlight-search.tsx"
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
      },
      {
        "path": "src/lib/constants.ts",
        "type": "registry:lib",
        "target": "lib/constants.ts"
      }
    ]
  },
  {
    "id": "spring-select",
    "name": "SpringSelect",
    "tagline": "Menu follows the trigger with a tiny spring",
    "description": "A select dropdown whose menu follows the trigger with a tiny spring. The chevron rotates a hair past 180° before settling, and the panel slides down with a subtle overshoot.",
    "category": "Forms",
    "badges": [
      "Origin Spring",
      "Keyboard",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/spring-select",
    "features": [
      "Dropdown panel springs from the trigger with a subtle scale: 0.98 -> 1 overshoot",
      "Chevron rotates to 192° (slightly past 180°) and settles back via snappy spring",
      "Keyboard navigation: ArrowUp/Down to move, Enter to select, Escape to close",
      "Hover and active item highlight via tracked activeIndex state",
      "Selected item checkmark that follows selection through the spring motion",
      "Light/dark theme aware via CSS variables — works in both palettes"
    ],
    "props": [
      {
        "name": "options",
        "type": "SpringSelectOption[]",
        "default": "[]",
        "description": "Array of options with value, label, optional description, and disabled"
      },
      {
        "name": "value",
        "type": "string",
        "default": "undefined",
        "description": "Controlled value"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "default": "undefined",
        "description": "Initial value (uncontrolled)"
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Select…'",
        "description": "Placeholder text when no value is selected"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "default": "undefined",
        "description": "Called when a new value is selected"
      },
      {
        "name": "label",
        "type": "string",
        "default": "undefined",
        "description": "Visible label rendered above the trigger"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      },
      {
        "name": "error",
        "type": "string",
        "default": "undefined",
        "description": "Error message; presence triggers danger styling"
      }
    ],
    "accessibility": [
      "aria-haspopup / aria-expanded / aria-selected / aria-disabled on appropriate elements",
      "Full keyboard navigation with proper focus restoration to trigger on close",
      "Escape key dismisses the panel without changing the value",
      "Disabled state is conveyed to assistive tech"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { SpringSelect } from \"@/components/ui/spring-select\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-sm\">\n      <SpringSelect\n        label=\"Workspace\"\n        placeholder=\"Choose a workspace\"\n        defaultValue=\"design\"\n        options={[\n          { value: \"design\", label: \"Design Team\", description: \"12 members\" },\n          { value: \"eng\", label: \"Engineering\", description: \"34 members\" },\n          { value: \"ops\", label: \"Operations\", description: \"8 members\" },\n          { value: \"labs\", label: \"R&D Labs\", description: \"5 members\", disabled: true },\n        ]}\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/SpringSelect.tsx",
        "type": "registry:ui",
        "target": "components/ui/spring-select.tsx"
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
  },
  {
    "id": "stack-unfold-panel",
    "name": "Stack Unfold Panel",
    "tagline": "Progressive disclosure card stack with spring height animation",
    "description": "A vertically stacked card deck that unfolds progressively with spring physics, shifting adjacent panels with zero layout jank.",
    "category": "Feedback",
    "badges": [
      "Framer Motion",
      "Spring Physics",
      "Accordion",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stack-unfold-panel",
    "features": [
      "Progressive vertical expansion with GPU-accelerated height calculation",
      "Automatic single-card accordion mode or multi-card unfolding",
      "Rotating chevron indicators with smooth 180-degree spring flip",
      "Full accessibility with aria-expanded, aria-controls, and keyboard triggers"
    ],
    "props": [
      {
        "name": "cards",
        "type": "StackCard[]",
        "description": "Array of card items (id, title, subtitle, content, badge)"
      },
      {
        "name": "expandedIds",
        "type": "string[]",
        "default": "undefined",
        "description": "Controlled array of opened card IDs"
      },
      {
        "name": "onExpandedChange",
        "type": "(ids: string[]) => void",
        "default": "undefined",
        "description": "Expansion event callback"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows simultaneous expansion of multiple cards"
      },
      {
        "name": "variant",
        "type": "'default' | 'minimal'",
        "default": "'default'",
        "description": "Bordered card or minimal underline layout"
      }
    ],
    "accessibility": [
      "Interactive header buttons with aria-expanded and aria-controls",
      "Tab key navigable with Space and Enter expansion toggles",
      "Compliant with WCAG AA contrast guidelines"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { StackUnfoldPanel } from \"@/components/ui/stack-unfold-panel\";\n\nexport function Demo() {\n  return (\n    <StackUnfoldPanel\n      cards={[\n        { id: '1', title: 'Global Edge Runtime', subtitle: 'v2.4.0 Engine', content: 'Distributed across 320+ edge point-of-presence regions with instant failover.' },\n        { id: '2', title: 'Zero-Copy Serialization', subtitle: 'Binary Protocol', content: 'High-speed Protobuf and FlatBuffers compression with minimal CPU overhead.' },\n        { id: '3', title: 'Automated CI Verification', subtitle: 'GitHub Actions', content: 'Continuous testing and schema verification on every pull request.' },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/StackUnfoldPanel.tsx",
        "type": "registry:ui",
        "target": "components/ui/stack-unfold-panel.tsx"
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
  },
  {
    "id": "stretch-switch",
    "name": "StretchSwitch",
    "tagline": "Thumb stretches on press, then snaps",
    "description": "A toggle switch whose thumb stretches slightly while dragging or pressing, then snaps naturally to its destination via a snappy spring.",
    "category": "Forms",
    "badges": [
      "Stretch Physics",
      "Spring Snap",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/stretch-switch",
    "features": [
      "Thumb scaleX -> 1.18 / scaleY -> 0.86 while pointer is held for a tactile stretch",
      "Snappy spring (springSnappy) drives the snap to the new x position on release",
      "Press state is captured via pointerdown / pointerup, so it works for keyboard activations too",
      "Controlled / uncontrolled state, with onChange callback",
      "Light/dark theme aware via CSS variables — works in both palettes"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "default": "undefined",
        "description": "Controlled checked state"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents interaction"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean) => void",
        "default": "undefined",
        "description": "Called when the switch toggles"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "default": "undefined",
        "description": "Label text on the left"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Helper text below the label"
      }
    ],
    "accessibility": [
      "role=\"switch\" with aria-checked for assistive technology",
      "Pointer-based stretch effect does not interfere with keyboard activation",
      "Disabled state communicated both visually and to AT"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { StretchSwitch } from \"@/components/ui/stretch-switch\";\n\nexport function Demo() {\n  return (\n    <div className=\"space-y-3 max-w-sm\">\n      <StretchSwitch\n        label=\"Reduce motion\"\n        description=\"Disables parallax and large translations across the app.\"\n        defaultChecked\n      />\n      <StretchSwitch\n        label=\"Show pre-release features\"\n        description=\"Toggle to preview experiments in the dashboard.\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/StretchSwitch.tsx",
        "type": "registry:ui",
        "target": "components/ui/stretch-switch.tsx"
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
  },
  {
    "id": "text-scramble-decoder",
    "name": "Text Scramble Decoder",
    "tagline": "Controlled technical typography reveal",
    "description": "A controlled text reveal that resolves scrambled glyphs into readable copy without changing the text semantics.",
    "category": "Motion",
    "badges": [
      "Typography",
      "Reduced Motion",
      "Interactive"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/text-scramble-decoder",
    "features": [
      "Position-staged character resolution with a stable final state",
      "Mount, hover, and manual replay trigger modes",
      "Configurable glyph set and duration"
    ],
    "props": [
      {
        "name": "text",
        "type": "string",
        "description": "Final readable text announced to assistive technology"
      },
      {
        "name": "characters",
        "type": "string",
        "default": "A-Z, 0-9, symbols",
        "description": "Characters used during the temporary scramble phase"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "900",
        "description": "Decode duration in milliseconds"
      },
      {
        "name": "trigger",
        "type": "'mount' | 'hover' | 'manual'",
        "default": "'mount'",
        "description": "When the decode sequence should run"
      }
    ],
    "accessibility": [
      "The readable text is exposed through aria-label while animated glyphs are hidden from assistive technology",
      "Reduced motion renders the final text immediately"
    ],
    "createdAt": "2026-08-28",
    "usageCode": "import { TextScrambleDecoder } from \"@/components/ui/text-scramble-decoder\";\n\nexport function Demo() {\n  return (\n    <TextScrambleDecoder\n      text=\"EASYUI.REGISTRY.SYNCED\"\n      trigger=\"manual\"\n      duration={1000}\n    />\n  );\n}",
    "dependencies": [
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/TextScrambleDecoder.tsx",
        "type": "registry:ui",
        "target": "components/ui/text-scramble-decoder.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  },
  {
    "id": "torque-dial",
    "name": "Torque Dial",
    "tagline": "Rotational control knob with physical spin momentum",
    "description": "A rotational control dial with realistic physical angular momentum, velocity tracking, and exponential friction deceleration.",
    "category": "Motion",
    "badges": [
      "Framer Motion",
      "Physics Simulation",
      "Precision Control",
      "Forms"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/torque-dial",
    "features": [
      "Natural angular momentum release with exponential friction deceleration decay",
      "Supports drag rotation, mouse wheel fine-tuning, keyboard arrow adjustments, and double-click centering",
      "Dynamic SVG radial progress ring with continuous value telemetry",
      "Full accessibility with role=\"slider\", aria-valuenow, and keyboard stepping"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "description": "Current numeric value"
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum dial threshold"
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum dial threshold"
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Step resolution increment"
      },
      {
        "name": "onChange",
        "type": "(val: number) => void",
        "description": "Callback fired on rotation value updates"
      },
      {
        "name": "momentum",
        "type": "boolean",
        "default": "true",
        "description": "Enables velocity-based inertial spin after drag release"
      },
      {
        "name": "size",
        "type": "number",
        "default": "120",
        "description": "Diameter in pixels"
      },
      {
        "name": "unit",
        "type": "string",
        "default": "''",
        "description": "Optional unit suffix (e.g. \"%\", \"dB\", \"°\")"
      }
    ],
    "accessibility": [
      "Semantic role=\"slider\" with aria-valuemin, aria-valuemax, and aria-valuenow",
      "Arrow keys, Home, and End support for fine keyboard tuning",
      "Visible focus outline around knob bounding perimeter"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { useState } from \"react\";\nimport { TorqueDial } from \"@/components/ui/torque-dial\";\n\nexport function Demo() {\n  const [gain, setGain] = useState(48);\n\n  return (\n    <div className=\"p-8 flex items-center justify-center bg-[#090909] rounded-2xl border border-[#1F1F1F]\">\n      <TorqueDial\n        value={gain}\n        onChange={setGain}\n        min={0}\n        max={100}\n        unit=\"%\"\n        label=\"Gain Level\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/TorqueDial.tsx",
        "type": "registry:ui",
        "target": "components/ui/torque-dial.tsx"
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
  },
  {
    "id": "typewriter-button",
    "name": "Typewriter Button",
    "tagline": "Character-by-character reveal with mechanical sound feedback",
    "description": "An interactive button that reveals its label character-by-character with optional synthesized mechanical audio feedback.",
    "category": "Buttons",
    "badges": [
      "Web Audio API",
      "Framer Motion",
      "Tactile Audio",
      "Accessible"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/typewriter-button",
    "features": [
      "Progressive character-by-character typewriter reveal with blinking cursor",
      "Synthesized mechanical click sound generated dynamically via Web Audio API (zero audio file assets)",
      "Configurable typing speed, sound volume, variants, and auto-start mode",
      "Full accessibility with complete aria-label announcement and keyboard triggers"
    ],
    "props": [
      {
        "name": "children",
        "type": "string",
        "description": "Label text to type out"
      },
      {
        "name": "charDuration",
        "type": "number",
        "default": "75",
        "description": "Milliseconds per character reveal"
      },
      {
        "name": "soundEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Enables mechanical keystroke sound cues"
      },
      {
        "name": "soundVolume",
        "type": "number",
        "default": "0.25",
        "description": "Web Audio synthesizer output volume (0 to 1)"
      },
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'outline'",
        "default": "'primary'",
        "description": "Styling appearance"
      },
      {
        "name": "autoStart",
        "type": "boolean",
        "default": "false",
        "description": "Begins typing immediately upon mounting"
      },
      {
        "name": "onComplete",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback on typing completion"
      }
    ],
    "accessibility": [
      "Always contains full text in aria-label to prevent truncated screen reader speech",
      "Respects reduced motion by immediately rendering full text if desired",
      "Interactive <button> element with standard keyboard activation"
    ],
    "createdAt": "2026-08-24",
    "usageCode": "import { TypewriterButton } from \"@/components/ui/typewriter-button\";\n\nexport function Demo() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <TypewriterButton soundEnabled variant=\"primary\">\n        npm install @easyui/react\n      </TypewriterButton>\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/TypewriterButton.tsx",
        "type": "registry:ui",
        "target": "components/ui/typewriter-button.tsx"
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
  },
  {
    "id": "undo-toast",
    "name": "Undo Toast",
    "tagline": "Refined undo notification with real-time countdown progress and reversal animation",
    "description": "An advanced undo notification toast featuring an interactive progress countdown, pause-on-hover mechanics, action reversal animation, and versatile position anchoring.",
    "category": "Feedback",
    "badges": [
      "Notification",
      "Feedback",
      "Timer Physics"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/undo-toast",
    "features": [
      "Real-time smooth countdown progress bar illustrating time window remaining",
      "Intelligent pause-on-hover physics so users never miss undo deadlines",
      "Visual state morphing upon clicking Undo before gentle dismissal",
      "Configurable multi-corner positioning (top, bottom, center, corners)",
      "Multiple semantically tinted variants: Default, Success, Warning, Error, and Info"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "true",
        "description": "Visibility state of the undo toast"
      },
      {
        "name": "title",
        "type": "string",
        "default": "'Project archived'",
        "description": "Primary notification message title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "'Changes will be permanent in a few seconds'",
        "description": "Optional descriptive subtitle"
      },
      {
        "name": "undoLabel",
        "type": "string",
        "default": "'Undo'",
        "description": "Label for undo action trigger"
      },
      {
        "name": "restoredMessage",
        "type": "string",
        "default": "'Restored successfully'",
        "description": "Title displayed when action has been reversed"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "5000",
        "description": "Duration in milliseconds before auto-dismissal"
      },
      {
        "name": "variant",
        "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
        "default": "'default'",
        "description": "Semantic visual tone"
      },
      {
        "name": "position",
        "type": "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        "default": "'bottom-center'",
        "description": "Screen placement"
      },
      {
        "name": "onUndo",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when user clicks Undo"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Callback fired when toast closes or expires"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Whether to show the countdown bar"
      }
    ],
    "accessibility": [
      "ARIA live role=\"status\" announcements for screen readers",
      "Full keyboard accessibility for Undo and Close buttons",
      "Respects reduced motion preferences by bypassing entry translations"
    ],
    "createdAt": "2026-08-21",
    "usageCode": "import { UndoToast } from \"@/components/ui/undo-toast\";\n\nexport function Demo() {\n  const [show, setShow] = useState(true);\n\n  return (\n    <UndoToast\n      open={show}\n      title=\"File deleted\"\n      description=\"Item moved to trash\"\n      duration={5000}\n      onUndo={() => console.log('Action reversed')}\n      onDismiss={() => setShow(false)}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/UndoToast.tsx",
        "type": "registry:ui",
        "target": "components/ui/undo-toast.tsx"
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
  },
  {
    "id": "unfold-accordion",
    "name": "UnfoldAccordion",
    "tagline": "Content unfolds with chevron and spacing",
    "description": "An accordion whose content unfolds with the chevron and spacing moving together. The chevron rotates 180° while the content height expands and the inner content slides up to close the gap, producing a single, fluid motion.",
    "category": "Feedback",
    "badges": [
      "Coordinated Motion",
      "Spring Height",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/unfold-accordion",
    "features": [
      "Chevron rotation, content height, and inner content slide are tuned to overlap",
      "Inner content uses a slightly faster ease so it \"leads\" the chevron by a hair",
      "Spring-based height expansion (springGentle) for a calm, continuous feel",
      "Single-open by default; allowMultiple for multi-open mode",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "items",
        "type": "UnfoldAccordionItem[]",
        "default": "[]",
        "description": "Array of accordion items"
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "default": "false",
        "description": "Allow multiple items open at once"
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "default": "[]",
        "description": "Ids of items open by default"
      }
    ],
    "accessibility": [
      "aria-expanded reflects open state on the trigger button",
      "Native <button> semantics for keyboard activation",
      "Focus-ring visible on keyboard navigation"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { UnfoldAccordion } from \"@/components/ui/unfold-accordion\";\n\nexport function Demo() {\n  return (\n    <UnfoldAccordion\n      defaultOpen={[\"design\"]}\n      items={[\n        {\n          id: \"design\",\n          title: \"Design tokens\",\n          subtitle: \"Foundations\",\n          content: \"A small set of variables for color, type, and spacing. Each token is named for its role, not its value, so themes can be swapped without rewriting components.\",\n        },\n        {\n          id: \"motion\",\n          title: \"Motion language\",\n          subtitle: \"Spring physics\",\n          content: \"Every transition is a spring with explicit mass, stiffness, and damping. Linear easing is reserved for color and opacity only.\",\n        },\n        {\n          id: \"shipping\",\n          title: \"Shipping workflow\",\n          subtitle: \"From sync to deploy\",\n          content: \"Run component:sync to regenerate the registry, then push. The CI workflow re-validates and re-syncs on every PR.\",\n        },\n      ]}\n    />\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/UnfoldAccordion.tsx",
        "type": "registry:ui",
        "target": "components/ui/unfold-accordion.tsx"
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
  },
  {
    "id": "velocity-toast",
    "name": "VelocityToast",
    "tagline": "Enters with velocity, settles naturally",
    "description": "A toast that enters with velocity and settles, with a progress indicator that responds naturally — pauses on hover, resumes with no jump, and eases slightly in the final 10% so dismissal feels intentional.",
    "category": "Feedback",
    "badges": [
      "Velocity Entry",
      "Natural Progress",
      "Accessible",
      "Light & Dark"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/velocity-toast",
    "features": [
      "Entry animation starts further out (y: 22px) for higher perceived velocity, then springs to rest",
      "Progress indicator uses a slight ease-in (pow 1.05) so the final 10% feels decisive",
      "Hover pauses progress without visual jump; resume picks up from the remaining time",
      "6 position presets, 5 variant tones, optional custom icon",
      "Light/dark theme aware — works in both palettes"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "undefined",
        "description": "Whether the toast is visible"
      },
      {
        "name": "onDismiss",
        "type": "() => void",
        "default": "undefined",
        "description": "Called when toast is dismissed (auto or manual)"
      },
      {
        "name": "title",
        "type": "string",
        "default": "undefined",
        "description": "Toast title"
      },
      {
        "name": "description",
        "type": "string",
        "default": "undefined",
        "description": "Secondary description"
      },
      {
        "name": "duration",
        "type": "number",
        "default": "4000",
        "description": "Auto-dismiss duration in ms"
      },
      {
        "name": "variant",
        "type": "'default' | 'success' | 'warning' | 'error' | 'info'",
        "default": "'default'",
        "description": "Visual tone"
      },
      {
        "name": "position",
        "type": "VelocityToastPosition",
        "default": "'bottom-center'",
        "description": "Screen placement"
      },
      {
        "name": "showProgress",
        "type": "boolean",
        "default": "true",
        "description": "Show countdown progress bar"
      }
    ],
    "accessibility": [
      "role=\"status\" with aria-live=\"polite\" for screen readers",
      "Hover pause is non-disruptive — no focus traps or input blocking",
      "Visual close button is keyboard-reachable with focus-ring"
    ],
    "createdAt": "2026-09-03",
    "usageCode": "import { useState } from \"react\";\nimport { VelocityToast } from \"@/components/ui/velocity-toast\";\nimport { PressButton } from \"@/components/ui/press-button\";\n\nexport function Demo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <PressButton onClick={() => setOpen(true)}>Show toast</PressButton>\n      <VelocityToast\n        open={open}\n        onDismiss={() => setOpen(false)}\n        title=\"File uploaded\"\n        description=\"easyui-2026-09.zip is ready.\"\n        variant=\"success\"\n        position=\"bottom-right\"\n      />\n    </>\n  );\n}",
    "dependencies": [
      "framer-motion",
      "lucide-react"
    ],
    "files": [
      {
        "path": "src/components/ui/VelocityToast.tsx",
        "type": "registry:ui",
        "target": "components/ui/velocity-toast.tsx"
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
  },
  {
    "id": "wallet-card",
    "name": "Wallet Card",
    "tagline": "Dark wallet card with pointer-driven cyan shine",
    "description": "A premium dark wallet card with a blue radial-gradient surface, live balance display, iOS-style toggle, and a primary action button. The card surface responds to the pointer with a soft cyan shine driven entirely by MotionValues.",
    "category": "Motion",
    "badges": [
      "Pointer Shine",
      "Spring Tap",
      "Painted Surface"
    ],
    "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/wallet-card",
    "features": [
      "Live balance figure with iOS-style toggle and primary action button",
      "Painted blue radial-gradient surface with diagonal specular sweep and outer glow",
      "Pointer-driven cyan shine — same MotionValue architecture as SpotlightCard",
      "Spring-tap response on the action button (0.97 scale)",
      "Full keyboard support and visible focus outline on the button",
      "Respects prefers-reduced-motion — shine is skipped, button tap is disabled",
      "Responsive aspect ratio; surface adapts without layout shift"
    ],
    "props": [
      {
        "name": "balance",
        "type": "string",
        "default": "'$4,566.00'",
        "description": "Headline balance figure rendered as the dominant type"
      },
      {
        "name": "cardType",
        "type": "string",
        "default": "'Mastercard'",
        "description": "Card brand label shown in the subtitle"
      },
      {
        "name": "cardLastFour",
        "type": "string",
        "default": "'3040'",
        "description": "Last four digits of the underlying card"
      },
      {
        "name": "buttonLabel",
        "type": "string",
        "default": "'Use Wallet'",
        "description": "Label for the primary action button"
      },
      {
        "name": "onUseWallet",
        "type": "() => void",
        "default": "undefined",
        "description": "Click handler for the action button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disable the action button"
      },
      {
        "name": "balanceLabel",
        "type": "string",
        "default": "'Total Balance'",
        "description": "Small caption under the balance figure"
      },
      {
        "name": "className",
        "type": "string",
        "default": "undefined",
        "description": "Additional Tailwind classes merged into the card root"
      }
    ],
    "accessibility": [
      "Semantic <article> root with descriptive title and subtitle",
      "Native <button> for the action with aria-label and visible focus outline",
      "Pointer shine is purely decorative — aria-hidden on all glow layers",
      "prefers-reduced-motion fallback: shine is never tracked, button tap is skipped"
    ],
    "createdAt": "2026-08-31",
    "usageCode": "import { WalletCard } from \"@/components/ui/wallet-card\";\n\nexport function Demo() {\n  return (\n    <div className=\"w-full max-w-md mx-auto\">\n      <WalletCard\n        balance=\"$4,566.00\"\n        cardType=\"Mastercard\"\n        cardLastFour=\"3040\"\n        buttonLabel=\"Use Wallet\"\n        onUseWallet={() => console.log('wallet used')}\n        balanceLabel=\"Total Balance\"\n      />\n    </div>\n  );\n}",
    "dependencies": [
      "framer-motion"
    ],
    "files": [
      {
        "path": "src/components/ui/WalletCard.tsx",
        "type": "registry:ui",
        "target": "components/ui/wallet-card.tsx"
      },
      {
        "path": "src/lib/utils.ts",
        "type": "registry:lib",
        "target": "lib/utils.ts"
      }
    ]
  }
];
