import React from 'react';
import { Scale, X, Sparkles, Layers } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';

export interface DocComparisonProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocComparison: React.FC<DocComparisonProps> = ({ onNavigateSection }) => {
  return (
    <article className="space-y-14 animate-fade-in text-text-secondary">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-10">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
          Architecture & Alternatives · 04
        </span>
        <h1 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.02em] text-text-primary leading-[1.1]">
          Library Comparison & Alternatives
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          An honest, factual comparison of <strong className="text-text-primary font-medium">EasyUI</strong> alongside other React component solutions: shadcn/ui, Material UI (MUI), and raw Framer Motion. Understand exact tradeoffs in bundle impact, animation fidelity, and code ownership.
        </p>
      </header>

      {/* Architectural Positioning */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-text-primary" />
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Architectural Positioning
          </h2>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed max-w-3xl">
          The React UI ecosystem divides into three primary patterns: monolithic npm packages (e.g. MUI, Mantine), unstyled headless primitives (e.g. Radix, React Aria), and copy-paste component registries (e.g. shadcn/ui, EasyUI).
        </p>
        <p className="text-[14px] text-text-secondary leading-relaxed max-w-3xl">
          EasyUI specializes in the <strong className="text-text-primary font-medium">animated micro-interaction layer</strong>. It does not attempt to be a generic all-in-one form kit or an enterprise data-grid suite. Instead, it provides physics-driven interactive components that drop directly into your repository with zero runtime wrapper lock-in.
        </p>
      </section>

      {/* Comparison Matrix Table */}
      <section className="space-y-4">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
            Direct Tradeoffs
          </span>
          <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
            Feature & Tradeoff Matrix
          </h2>
        </div>

        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-surface-raised text-text-primary border-b border-border font-medium">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Dimension</th>
                  <th className="py-3.5 px-4 text-text-primary font-semibold">EasyUI</th>
                  <th className="py-3.5 px-4 text-text-secondary">shadcn/ui</th>
                  <th className="py-3.5 px-4 text-text-secondary">MUI (Material UI)</th>
                  <th className="py-3.5 px-4 text-text-secondary">Raw Framer Motion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-text-secondary font-sans">
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Distribution Model</td>
                  <td className="py-3 px-4 text-text-primary font-medium">Copy-paste / CLI Registry</td>
                  <td className="py-3 px-4">Copy-paste / CLI Registry</td>
                  <td className="py-3 px-4">Monolithic npm packages</td>
                  <td className="py-3 px-4">Single npm library</td>
                </tr>
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Code Ownership</td>
                  <td className="py-3 px-4 text-text-primary font-medium">100% in your repo</td>
                  <td className="py-3 px-4">100% in your repo</td>
                  <td className="py-3 px-4">Locked in node_modules</td>
                  <td className="py-3 px-4">Custom built per project</td>
                </tr>
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Motion & Physics</td>
                  <td className="py-3 px-4 text-text-primary font-medium">Calibrated spring tokens</td>
                  <td className="py-3 px-4">Minimal CSS transitions</td>
                  <td className="py-3 px-4">Fixed CSS cubic-beziers</td>
                  <td className="py-3 px-4">Manual configuration</td>
                </tr>
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Styling Architecture</td>
                  <td className="py-3 px-4 text-text-primary font-medium">Tailwind CSS (v4 / v3)</td>
                  <td className="py-3 px-4">Tailwind CSS</td>
                  <td className="py-3 px-4">Emotion / Pigment CSS</td>
                  <td className="py-3 px-4">Any styling solution</td>
                </tr>
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Bundle Impact</td>
                  <td className="py-3 px-4 text-text-primary font-medium">0 KB runtime package overhead</td>
                  <td className="py-3 px-4">0 KB runtime package overhead</td>
                  <td className="py-3 px-4">Heavy runtime bundle</td>
                  <td className="py-3 px-4">Framer Motion runtime only</td>
                </tr>
                <tr className="hover:bg-surface-hover/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] text-text-primary font-medium">Accessibility</td>
                  <td className="py-3 px-4 text-text-primary font-medium">WAI-ARIA + Reduced Motion</td>
                  <td className="py-3 px-4">Radix Primitives (full)</td>
                  <td className="py-3 px-4">Comprehensive built-in</td>
                  <td className="py-3 px-4">Must build manually</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to Choose EasyUI */}
      <section className="space-y-4">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          When to Choose EasyUI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg border border-border bg-surface space-y-2">
            <div className="flex items-center gap-2 text-text-primary font-medium text-[14px]">
              <Sparkles className="w-4 h-4 text-text-primary" />
              <span>Animated Micro-Interactions</span>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              When your application requires high-fidelity buttons, magnetic cursor physics, drag-to-confirm flows, or animated tabs that stand out.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border bg-surface space-y-2">
            <div className="flex items-center gap-2 text-text-primary font-medium text-[14px]">
              <Layers className="w-4 h-4 text-text-primary" />
              <span>Full Source Customization</span>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              When you need direct access to the TSX and Tailwind classes to tailor colors, spring parameters, or DOM attributes without fighting an abstracted theme engine.
            </p>
          </div>
        </div>
      </section>

      {/* When NOT to Choose EasyUI */}
      <section className="space-y-4">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          When NOT to Choose EasyUI (Honest Tradeoffs)
        </h2>
        <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
          <ul className="space-y-2 text-[13px] text-text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span><strong>Complex Enterprise Data Grids:</strong> If you need Excel-like pivot tables, infinite row virtualization, and cell formulas, use dedicated tools like TanStack Table or AG-Grid.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span><strong>Pure Unstyled Primitives:</strong> If your project requires zero default styles or animations and only headless accessibility logic, use Radix UI Primitives or React Aria directly.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span><strong>Strict Non-Framer Stacks:</strong> If your team explicitly prohibits Framer Motion or requires a CSS-only zero-JS animation budget, standard CSS keyframe libraries may be preferable.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Using with shadcn/ui */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-semibold text-text-primary tracking-[-0.01em]">
          Using EasyUI Alongside shadcn/ui
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          EasyUI is designed to be <strong>100% complementary to shadcn/ui</strong>. Because both use the same CLI registry specification, directory convention (<code className="text-text-primary font-mono text-[12px]">components/ui/</code>), and Tailwind utilities, you can use shadcn/ui for your foundational static primitives (Dialogs, Dropdowns) and EasyUI for dynamic, high-engagement animated components.
        </p>
        <DocCodeBlock
          code="npx shadcn@latest add Surajmaurya1/easyui/magnetic-button"
          language="bash"
          isTerminal={true}
        />
      </section>

      {/* Pagination */}
      <DocPagination
        currentTopic="comparison"
        onNavigateTopic={onNavigateSection}
      />
    </article>
  );
};
