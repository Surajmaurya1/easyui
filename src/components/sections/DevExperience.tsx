import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export interface DevExperienceProps {
  onExploreDocs?: () => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Pick a component',
    description: 'Preview animations live, then copy the install command.',
    code: 'npx shadcn add easyui/magnetic-button',
    label: 'CLI',
  },
  {
    number: '02',
    title: 'Add to your project',
    description: 'Drop the file into your repo. Full source, no lock-in.',
    code: 'components/ui/magnetic-button.tsx',
    label: 'File',
  },
  {
    number: '03',
    title: 'Import and use',
    description: 'Style with Tailwind. Tweak anything you want — it is yours.',
    code: '<MagneticButton>Get Started</MagneticButton>',
    label: 'JSX',
  },
];

export const DevExperience: React.FC<DevExperienceProps> = ({ onExploreDocs }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    copyToClipboard(code);
    setCopiedIndex(idx);
    window.setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-24 lg:py-28 bg-background border-t border-border scroll-mt-12">
      {/* Anchor aliases for backwards compatibility */}
      <span id="workflow" className="sr-only" />
      <span id="dev-experience" className="sr-only" />

      <Container size="xl">
        {/* Section header — eyebrow + headline only, no paragraph */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
              How it works
            </span>
            <h2 className="mt-3 text-3xl sm:text-[44px] font-semibold text-text-primary tracking-[-0.02em] leading-[1.1]">
              Three steps. Own the code.
            </h2>
          </div>

          {onExploreDocs && (
            <button
              onClick={onExploreDocs}
              className="self-start md:self-auto group inline-flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors focus-ring rounded cursor-pointer"
            >
              <span className="relative">
                Read the docs
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-text-secondary transition-transform duration-300" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          )}
        </div>

        {/* Step list — equal-height cards, single-line snippets, no large empty areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {STEPS.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Quiet step number, no pill */}
              <span className="font-mono text-[11px] tracking-[0.18em] text-text-muted uppercase">
                {item.number}
              </span>

              <h3 className="mt-4 text-[20px] font-semibold text-text-primary tracking-[-0.015em] leading-snug">
                {item.title}
              </h3>

              <p className="mt-3 text-[14px] text-text-secondary leading-relaxed">
                {item.description}
              </p>

              {/* Code block — single-line snippet, follows the global light/dark theme. */}
              <div className="mt-6 flex flex-col rounded-lg border border-border bg-surface-raised text-text-primary overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {item.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.code, idx)}
                    className="p-1 rounded text-text-muted hover:text-text-primary transition-colors focus-ring"
                    title="Copy snippet"
                    aria-label={`Copy ${item.label} snippet`}
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="px-3.5 py-3 text-[11.5px] font-mono text-text-secondary leading-snug overflow-x-auto scrollbar-none whitespace-nowrap">
                  <code>{item.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
