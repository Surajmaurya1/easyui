'use client';

import React, { useState, useMemo, useId } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, SlidersHorizontal, Sparkles } from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface SnippetParameter {
  id: string;
  label: string;
  type: 'boolean' | 'select' | 'text';
  defaultValue: any;
  options?: string[];
}

export interface SnippetItem {
  language: string;
  label: string;
  filename?: string;
  code: string | ((params: Record<string, any>) => string);
  highlightLines?: number[];
}

export interface CodeSnippetDeckProps extends React.HTMLAttributes<HTMLDivElement> {
  snippets: SnippetItem[];
  parameters?: SnippetParameter[];
  defaultLanguage?: string;
  showLineNumbers?: boolean;
  showWindowBar?: boolean;
  className?: string;
}

export const CodeSnippetDeck: React.FC<CodeSnippetDeckProps> = ({
  snippets = [],
  parameters = [],
  defaultLanguage,
  showLineNumbers = true,
  showWindowBar = true,
  className,
  ...props
}) => {
  const [activeLang, setActiveLang] = useState<string>(
    defaultLanguage || snippets[0]?.language || 'typescript'
  );
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const deckId = useId();

  // Parameter values state
  const [paramValues, setParamValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    parameters.forEach((p) => {
      initial[p.id] = p.defaultValue;
    });
    return initial;
  });

  const activeSnippet = useMemo(() => {
    return snippets.find((s) => s.language === activeLang) || snippets[0];
  }, [snippets, activeLang]);

  // Compute final code string
  const resolvedCode = useMemo(() => {
    if (!activeSnippet) return '';
    if (typeof activeSnippet.code === 'function') {
      return activeSnippet.code(paramValues);
    }
    return activeSnippet.code;
  }, [activeSnippet, paramValues]);

  const handleCopy = () => {
    copyToClipboard(resolvedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParamChange = (id: string, value: any) => {
    setParamValues((prev) => ({ ...prev, [id]: value }));
  };

  const codeLines = useMemo(() => {
    return resolvedCode.split('\n');
  }, [resolvedCode]);

  return (
    <div
      role="region"
      aria-label="Multi-runtime code snippet deck"
      className={cn(
        'w-full rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden text-[#FAFAFA] shadow-2xl',
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#141414] border-b border-[#1F1F1F]">
        <div className="flex items-center gap-3">
          {showWindowBar && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1F1F1F]" />
            </div>
          )}

          {activeSnippet?.filename && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1A1]">
              <Terminal className="w-3.5 h-3.5 text-[#525252]" />
              <span>{activeSnippet.filename}</span>
            </div>
          )}
        </div>

        <div className="flex items-center p-1 bg-[#0E0E0E] rounded-xl border border-[#1F1F1F] overflow-x-auto scrollbar-none">
          {snippets.map((snip) => {
            const isSelected = activeLang === snip.language;
            return (
              <button
                key={snip.language}
                type="button"
                onClick={() => setActiveLang(snip.language)}
                className={cn(
                  'relative py-1 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer',
                  isSelected ? 'text-white' : 'text-[#6B6B6B] hover:text-[#A1A1A1]'
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`codeDeckTab-${deckId}`}
                    className="absolute inset-0 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg -z-10"
                    transition={motionTransitions.springSnappy}
                  />
                )}
                <span>{snip.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {parameters.length > 0 && (
            <button
              type="button"
              onClick={() => setShowConfig((prev) => !prev)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                showConfig
                  ? 'bg-white text-black border-white'
                  : 'bg-[#0E0E0E] text-[#A1A1A1] border-[#1F1F1F] hover:text-white'
              )}
              title="Customize snippet parameters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Params</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E0E0E] hover:bg-[#282828] border border-[#1F1F1F] text-xs font-mono text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showConfig && parameters.length > 0 && (
        <div className="p-3.5 bg-[#0E0E0E] border-b border-[#1F1F1F] flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#525252] font-mono text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Interactive Variables:</span>
          </div>

          {parameters.map((param) => {
            if (param.type === 'boolean') {
              const checked = !!paramValues[param.id];
              return (
                <label
                  key={param.id}
                  className="flex items-center gap-2 cursor-pointer select-none text-[#A1A1A1] hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleParamChange(param.id, e.target.checked)}
                    className="rounded bg-[#141414] border-[#1F1F1F] text-white focus:ring-0 cursor-pointer"
                  />
                  <span>{param.label}</span>
                </label>
              );
            }

            if (param.type === 'select') {
              return (
                <div key={param.id} className="flex items-center gap-1.5">
                  <span className="text-[#525252]">{param.label}:</span>
                  <select
                    value={paramValues[param.id]}
                    onChange={(e) => handleParamChange(param.id, e.target.value)}
                    className="bg-[#141414] border border-[#1F1F1F] rounded-md px-2 py-0.5 text-xs text-[#FAFAFA] focus:outline-none focus:border-[#4A4A4A] cursor-pointer"
                  >
                    {param.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0E0E0E] text-[#FAFAFA]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (param.type === 'text') {
              return (
                <div key={param.id} className="flex items-center gap-2">
                  <span className="text-[#525252]">{param.label}:</span>
                  <input
                    type="text"
                    value={paramValues[param.id] || ''}
                    onChange={(e) => handleParamChange(param.id, e.target.value)}
                    className="px-2 py-1 rounded bg-[#141414] border border-[#1F1F1F] text-xs text-white w-32 focus-visible:outline-none"
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      <div className="relative overflow-x-auto max-h-[500px] scrollbar-thin bg-[#050505]">
        <pre className="p-4 font-mono text-xs text-[#FAFAFA] leading-relaxed">
          {codeLines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = activeSnippet?.highlightLines?.includes(lineNum);

            return (
              <div
                key={idx}
                className={cn(
                  'flex items-start -mx-4 px-4 transition-colors',
                  isHighlighted ? 'bg-white/10 border-l-2 border-white' : ''
                )}
              >
                {showLineNumbers && (
                  <span className="w-8 select-none text-[#505050] text-right pr-4 shrink-0">
                    {lineNum}
                  </span>
                )}
                <span className="flex-1 whitespace-pre">{line || ' '}</span>
              </div>
            );
          })}
        </pre>
      </div>

      <div className="px-4 py-2.5 bg-[#141414] border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono text-[#6B6B6B]">
        <span>Runtime: {activeSnippet?.label}</span>
        <span>{codeLines.length} lines</span>
      </div>
    </div>
  );
};
