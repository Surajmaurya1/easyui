// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "bookshelf",
  "name": "Bookshelf",
  "tagline": "A shelf of interactive 3D books",
  "description": "An interactive 3D bookshelf with animated book covers, keyboard navigation, and expandable reading details.",
  "category": "Motion",
  "badges": [
    "3D",
    "Interactive",
    "Reduced Motion",
    "Responsive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/bookshelf",
  "installPromptHash": "2d5f859e8a81481823f44842907c494e1adc5d7a9693f225df9b9695d95b1a42",
  "features": [
    "CSS 3D book covers with generated typography or optional cover images",
    "Hover and keyboard focus previews a book; activation opens its cover and details",
    "Arrow keys navigate, Enter opens or closes, and Escape closes the selected book",
    "Horizontally scrollable layout on narrow screens",
    "Respects reduced-motion preferences",
    "Controlled open state and customizable action buttons"
  ],
  "props": [
    {
      "name": "books",
      "type": "BookItem[]",
      "default": "required",
      "description": "Books to display, each with an id, title, author, and cover color."
    },
    {
      "name": "openId",
      "type": "string | null",
      "default": "undefined",
      "description": "Optional controlled ID of the currently open book."
    },
    {
      "name": "onOpenChange",
      "type": "(id: string | null, book?: BookItem) => void",
      "default": "undefined",
      "description": "Called when the open book changes."
    },
    {
      "name": "onRead",
      "type": "(book: BookItem) => void",
      "default": "undefined",
      "description": "Called by the default Read action."
    },
    {
      "name": "actions",
      "type": "(book: BookItem, close: () => void) => ReactNode",
      "default": "undefined",
      "description": "Replaces the default Read and Close actions."
    },
    {
      "name": "ariaLabel",
      "type": "string",
      "default": "Bookshelf",
      "description": "Accessible label for the book list."
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Additional classes for the bookshelf root."
    }
  ],
  "accessibility": [
    "Books are keyboard focusable and support Arrow keys, Home, End, Enter, Space, and Escape.",
    "Each book exposes its open state with aria-expanded and a descriptive accessible label.",
    "Reduced-motion preferences disable animated transitions."
  ],
  "createdAt": "2026-11-25",
  "usageCode": "import Bookshelf, { type BookItem } from \"@/components/ui/Bookshelf\";\n\nconst books: BookItem[] = [\n  { id: \"gatsby\", title: \"The Great Gatsby\", author: \"F. Scott Fitzgerald\", color: \"#1f3d36\" },\n];\n\nexport function Demo() {\n  return <Bookshelf books={books} />;\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/Bookshelf.tsx",
      "type": "registry:ui",
      "target": "components/ui/bookshelf.tsx"
    }
  ]
};

export default component;
