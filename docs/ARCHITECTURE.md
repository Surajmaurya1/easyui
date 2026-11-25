# EasyUI Architecture & Automatic Registry System

EasyUI is built on a **Single Source of Truth** architecture. Developers never manually maintain JSON registry files, copy-paste code into catalog arrays, or maintain hardcoded install commands in multiple files.

```text
Component Source (.tsx) + Component Metadata (.meta.ts)
                          ↓
              scripts/generate-registry.ts
                          ↓
  ┌─────────────────────────────────────────────────────────┐
  │ • Root registry.json (official shadcn schema)           │
  │ • src/components/registry/catalog-index.ts (small index)│
  │ • src/components/registry/details/<slug>.ts (lazy data) │
  │ • public/prompts/<slug>.txt (on-demand install prompts) │
  │ • CLI command generation (Surajmaurya1/easyui/<slug>)   │
  │ • Dependency & local utility auto-detection             │
  │ • Raw source extraction directly from source files      │
  └─────────────────────────────────────────────────────────┘
                          ↓
              scripts/validate-registry.ts
                          ↓
            Website UI + shadcn GitHub Registry
```

---

## Core Automation Capabilities

1. **Automatic Discovery**
   Scans `src/components/ui/` for components (supports both flat `.tsx` files as well as folder-based multi-file components).

2. **AST Dependency Inspection**
   Inspects TypeScript import statements, cross-references with `package.json`, and registers only necessary external packages (e.g. `framer-motion`, `lucide-react`).

3. **Local Utility Linking**
   Automatically identifies imports of internal shared utilities (`motion-tokens.ts`, `utils.ts`, `GithubIcon.tsx`, companion CSS files) and adds them to the registry item's `files` manifest with the proper `registry:lib` or `registry:ui` target.

4. **Source Code Extraction**
   Automatically reads the raw source code from disk during build/sync to feed website code viewers. No manual code duplication in data files.

5. **Dynamic UI Integration**
   The `⌘K` Command Palette, category filters, and component directory dynamically consume the generated catalog. Newly added components are instantly searchable.

---

## Multi-File Component Support

EasyUI supports complex components split across multiple files. You can create a dedicated folder inside `src/components/ui/`:

```text
src/components/ui/my-complex-widget/
├── MyComplexWidget.tsx         # Primary component
├── widget-utils.ts             # Auxiliary logic
├── widget.css                  # Custom styling
└── meta.ts                     # Component metadata
```

The generator will automatically:
1. Discover the directory and identify the primary component.
2. Read `meta.ts`.
3. Include all source files in the registry manifest so that `npx shadcn@latest add Surajmaurya1/easyui/my-complex-widget` downloads all companion files.

---

## Directory Structure Overview

```text
easyui/
├── .github/
│   └── workflows/
│       └── registry.yml                   # CI validation & build workflow
├── public/
│   ├── logo.png                           # Brand identity logo & favicon
│   ├── robots.txt                         # Search crawler directives
│   ├── sitemap.xml                        # [AUTO-GENERATED] Dynamic XML sitemap
│   └── site.webmanifest                   # Web Application Manifest
├── scripts/
│   ├── generate-registry.ts               # Auto-discovery & registry generator
│   ├── generate-sitemap.ts                # Dynamic sitemap generator
│   ├── validate-registry.ts               # Registry & catalog validator
│   ├── seo-audit.ts                       # Automated SEO health audit
│   └── component-new.ts                   # Component scaffolding CLI
├── src/
│   ├── components/
│   │   ├── docs/                          # Interactive documentation modal & views
│   │   ├── icons/                         # Brand icons (GithubIcon, etc.)
│   │   ├── layout/                        # Navbar, Footer, Container
│   │   ├── registry/
│   │   │   ├── catalog-index.ts            # [AUTO-GENERATED] Lightweight app catalog
│   │   │   ├── component-details.ts        # [AUTO-GENERATED] Lazy detail loaders
│   │   │   └── details/<slug>.ts           # [AUTO-GENERATED] Per-component metadata
│   │   ├── sections/                      # Hero, Showcases, Directory, Philosophy
│   │   └── ui/                            # Component source files + metadata
│   ├── lib/
│   │   ├── seo/                           # Automated SEO engine
│   │   ├── constants.ts                   # URLs & global constants
│   │   ├── motion-tokens.ts               # Reusable Framer Motion transitions
│   │   └── utils.ts                       # Class merging (cn) & clipboard helpers
│   ├── types/
│   │   └── component.ts                   # Component metadata type definitions
│   ├── App.tsx
│   └── main.tsx
├── registry.json                          # [AUTO-GENERATED] Root shadcn GitHub Registry
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
