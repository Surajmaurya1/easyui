import React from 'react';
import { Cpu, Layers, CheckCircle2, ShieldCheck, RefreshCw, Workflow } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocArchitectureProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocArchitecture: React.FC<DocArchitectureProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-14 animate-fade-in text-text-secondary">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-10">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
          Architecture &amp; Engine · 01
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-text-primary leading-[1.1]">
          Registry Architecture
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          EasyUI eliminates manual registry maintenance. Automated scripts scan TypeScript AST imports, parse prop definitions, package dependencies, and synchronize the shadcn registry and website catalog in real time.
        </p>
      </header>

      {/* Visual Pipeline Flow */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Single Source of Truth Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
          <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
            <div>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.18em] block mb-2">
                01 · Inputs
              </span>
              <h3 className="text-[14px] text-text-primary font-semibold mb-1">Source Code &amp; Meta</h3>
              <p className="text-[12.5px] text-text-secondary leading-relaxed">
                Author writes{' '}
                <code className="text-text-primary font-mono text-[12px]">ComponentName.tsx</code> and{' '}
                <code className="text-text-primary font-mono text-[12px]">.meta.ts</code>
              </p>
            </div>
            <ul className="space-y-1 font-mono text-text-subtle text-[11px]">
              <li>• Component JSX logic</li>
              <li>• Props interface &amp; docs</li>
              <li>• Optional companion CSS</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
            <div>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.18em] block mb-2">
                02 · Engine
              </span>
              <h3 className="text-[14px] text-text-primary font-semibold mb-1">generate-registry.ts</h3>
              <p className="text-[12.5px] text-text-secondary leading-relaxed">
                Automated AST scanner inspects imports and types
              </p>
            </div>
            <ul className="space-y-1 font-mono text-text-subtle text-[11px]">
              <li>• AST dependency resolver</li>
              <li>• Package.json validation</li>
              <li>• Utility file bundler</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
            <div>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.18em] block mb-2">
                03 · Outputs
              </span>
              <h3 className="text-[14px] text-text-primary font-semibold mb-1">Synced Endpoints</h3>
              <p className="text-[12.5px] text-text-secondary leading-relaxed">
                All registries and catalog endpoints updated
              </p>
            </div>
            <ul className="space-y-1 font-mono text-text-subtle text-[11px]">
              <li>
                • <code className="text-text-primary text-[11px]">/registry.json</code> and <code className="text-text-primary text-[11px]">/source/*.json</code>
              </li>
              <li>• shadcn CLI install targets</li>
              <li>• ⌘K search index</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature 1: AST Import & Dependency Discovery */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Automated Dependency Discovery
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          When running{' '}
          <code className="text-text-primary font-mono bg-surface-raised border border-border px-1.5 py-0.5 rounded text-[12px]">
            npm run component:sync
          </code>
          , the generator reads component source code to detect dependencies:
        </p>

        <div className="space-y-2.5 text-[13px]">
          <div className="p-3.5 rounded-md border border-border bg-surface space-y-1">
            <span className="text-[13px] text-text-primary font-semibold">External NPM Packages</span>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Imports like{' '}
              <code className="text-text-primary font-mono text-[12px]">framer-motion</code> or{' '}
              <code className="text-text-primary font-mono text-[12px]">lucide-react</code> are verified and mapped to the registry dependencies array.
            </p>
          </div>

          <div className="p-3.5 rounded-md border border-border bg-surface space-y-1">
            <span className="text-[13px] text-text-primary font-semibold">Internal Utilities Linking</span>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Imports from{' '}
              <code className="text-text-primary font-mono text-[12px]">lib/motion-tokens</code> or{' '}
              <code className="text-text-primary font-mono text-[12px]">lib/utils</code> are automatically added as registry prerequisites so the CLI downloads them cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 2: Multi-File Support */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Multi-File Widget Support
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Complex components split across multiple sub-files in a directory are fully supported:
        </p>

        <DocCodeBlock
          code={`src/components/ui/custom-dock/
├── CustomDock.tsx          # Primary component
├── dock-item.tsx           # Sub-component
├── dock-physics.ts         # Math/physics helper
└── meta.ts                 # Metadata descriptor`}
          language="text"
          title="Multi-File Component Layout"
        />
      </section>

      {/* Feature 3: Registry Validation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Strict Validation Guarantees
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Automated CI verification checks ensure zero broken installations before any release:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13px]">
          {[
            'All registry JSON files conform to official shadcn schema',
            'Every component has a verified .meta.ts descriptor',
            'Zero missing or unresolvable npm dependencies',
            'Physical file paths on disk match registry targets',
            'Props documentation tables match TypeScript types',
            'Usage examples and code snippets are syntax-checked',
          ].map((check, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-3 rounded-md border border-border bg-surface"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-text-secondary">{check}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Single Sync Command */}
      <section className="p-5 rounded-lg border border-border bg-surface space-y-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-text-primary" />
          <h2 className="text-[14px] font-semibold text-text-primary">One-Command Sync &amp; Validate</h2>
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed">
          Run the sync script anytime a component or metadata changes:
        </p>
        <DocCodeBlock code="npm run component:sync" language="bash" isTerminal={true} />
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="architecture" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
