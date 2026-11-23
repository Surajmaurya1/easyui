# Contributing to EasyUI

Thank you for your interest in contributing to EasyUI! We welcome contributions, whether it's adding new micro-animated components, fixing bugs, or improving documentation.

---

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/easyui.git
   cd easyui
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the local dev server**:
   ```bash
   npm run dev
   ```

---

## Developer Workflow: Adding New Components

Adding a component to EasyUI is fully automated and takes 3 simple steps:

### Step 1: Scaffold the Component

Use the built-in scaffolding CLI to create the boilerplate:

```bash
npm run component:new <ComponentName>
```

*Example:*
```bash
npm run component:new AuroraCard
```

This automatically creates two files:
- `src/components/ui/AuroraCard.tsx` (Component code)
- `src/components/ui/AuroraCard.meta.ts` (Component metadata for catalog & SEO)

---

### Step 2: Implement the Component & Metadata

#### Component Implementation Example (`src/components/ui/AuroraCard.tsx`):
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const AuroraCard: React.FC<AuroraCardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={motionTransitions.springSnappy}
      className={cn('p-6 rounded-2xl border border-[#222222] bg-[#0E0E0E] text-[#F5F5F5]', className)}
      {...props}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
        <h3 className="text-sm font-semibold">Aurora Card</h3>
      </div>
      {children}
    </motion.div>
  );
};
```

#### Metadata Example (`src/components/ui/AuroraCard.meta.ts`):
```typescript
import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Aurora Card',
  description: 'An elevated dark surface with subtle ambient aurora glow interaction.',
  category: 'Motion',
  tagline: 'Ambient aurora gradient pointer glow',
  badges: ['Spring Physics', 'Tailwind', 'Interactive'],
  features: [
    'Pointer proximity ambient aurora illumination',
    'Configurable blur and gradient stops',
    'Accessible contrast and keyboard focus states',
  ],
  props: [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside card' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom CSS classes' },
  ],
  accessibility: [
    'Contrast compliant with WCAG AA standards',
    'Respects prefers-reduced-motion media query',
  ],
  usageCode: `import { AuroraCard } from "@/components/ui/aurora-card";

export function Demo() {
  return <AuroraCard>Hello World</AuroraCard>;
}`,
};

export default meta;
```

---

### Step 3: Sync & Validate Registry

Run the automated registry synchronization:

```bash
npm run component:sync
```

This single command:
1. Computes the kebab-case slug (`aurora-card`).
2. Detects imported npm dependencies (`framer-motion`, `lucide-react`) and shared utilities (`utils.ts`, `motion-tokens.ts`).
3. Updates the root `registry.json`, lightweight catalog index, per-component detail modules, and on-demand prompt files.
4. Updates `public/sitemap.xml` for SEO.
5. Runs the full validation suite to verify there are no broken paths.

---

### Step 4: Commit and Open a Pull Request

```bash
git checkout -b feat/aurora-card
git add .
git commit -m "feat: add AuroraCard component"
git push origin feat/aurora-card
```

Open a Pull Request on GitHub. GitHub Actions CI will automatically validate your component registry and build.

---

## Multi-File Components

For complex components that require auxiliary helper files or stylesheets, place them inside a folder in `src/components/ui/`:

```text
src/components/ui/my-complex-widget/
├── MyComplexWidget.tsx         # Primary component
├── widget-utils.ts             # Auxiliary logic
├── widget.css                  # Custom styling
└── meta.ts                     # Component metadata
```

The registry generator will automatically discover the folder and include all companion files in the registry manifest.

---

## Developer Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts Vite local development server (`http://localhost:5173`) |
| `npm run component:new <Name>` | Scaffolds a new component boilerplate (`.tsx` + `.meta.ts`) |
| `npm run component:sync` | Syncs registry, website catalog, and sitemap, then validates |
| `npm run registry:generate` | Regenerates the registry, catalog index, per-component detail modules, and prompt assets |
| `npm run registry:validate` | Validates schemas, unique slugs, file paths, and package dependencies |
| `npm run seo:audit` | Runs the automated 7-category SEO health audit |
| `npm run seo:sitemap` | Generates `public/sitemap.xml` with all component routes |
| `npm run build` | Full pipeline: syncs registry, audits SEO, typechecks, and builds Vite bundle |
| `npm run lint` | Runs `oxlint` for fast linting |

---

## Architecture

For more information on the internal AST discovery and registry pipeline, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).
