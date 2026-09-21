import React, { useState, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  ChevronDown,
  Sparkles,
  AlertCircle,
  Wrench,
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';

// =============================================================================
// DESIGN SYSTEM CONSTANTS & SPRING TOKENS
// =============================================================================

const SPRING_PHYSICS = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 32,
  mass: 0.6,
};

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type AIResponseStatus = 'idle' | 'generating' | 'streaming' | 'complete' | 'error' | 'cancelled';

export interface AIResponseSource {
  id: string | number;
  title: string;
  url?: string;
  snippet?: string;
  sourceType?: 'doc' | 'github' | 'web' | 'api' | string;
}

export interface AIResponseContextValue {
  content: string;
  status: AIResponseStatus;
  modelName?: string;
  sources: AIResponseSource[];
  copied: boolean;
  copyContent: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: 'like' | 'dislike') => void;
  feedback?: 'like' | 'dislike' | null;
  accentColor?: string;
}

const AIResponseContext = createContext<AIResponseContextValue | null>(null);

export function useAIResponseContext() {
  const context = useContext(AIResponseContext);
  if (!context) {
    throw new Error('AIResponse compound components must be used within <AIResponse>');
  }
  return context;
}

// =============================================================================
// SUB-COMPONENT: CODE BLOCK (MINIMALIST, GEIST FONT ONLY)
// =============================================================================

export interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'typescript',
  code,
  filename,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'my-4 overflow-hidden rounded-xl border border-border/60 bg-surface-raised/30 dark:bg-surface-raised/15 font-sans text-xs',
        className
      )}
    >
      {/* Titlebar */}
      <div className="flex items-center justify-between border-b border-border/40 bg-surface-raised/25 px-3.5 sm:px-4 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-normal text-muted-foreground truncate">
            {filename || language}
          </span>
        </div>
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          onClick={handleCopy}
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" />
              <span className="text-emerald-500 font-normal">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="font-normal">Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-3 sm:p-4 text-foreground/90 leading-relaxed font-sans">
        <pre className="font-sans text-xs leading-relaxed select-text">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// =============================================================================
// STREAMING MARKDOWN PARSER & RENDERER (MINIMALIST & GEIST FONT ONLY)
// =============================================================================

interface ParsedBlock {
  type: 'paragraph' | 'heading' | 'code' | 'list' | 'blockquote' | 'table';
  level?: number;
  content?: string;
  language?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

function parseMarkdownContent(raw: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = raw.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const language = line.trim().replace(/^```/, '') || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: 'code',
        language,
        content: codeLines.join('\n'),
      });
      i++;
      continue;
    }

    // Markdown Table
    if (line.includes('|') && lines[i + 1] && lines[i + 1].includes('|') && lines[i + 1].includes('-')) {
      const headers = line.split('|').map((s) => s.trim()).filter(Boolean);
      i += 2; // skip header + divider
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        const row = lines[i].split('|').map((s) => s.trim()).filter(Boolean);
        if (row.length > 0) rows.push(row);
        i++;
      }
      blocks.push({
        type: 'table',
        headers,
        rows,
      });
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      blocks.push({ type: 'heading', level: 1, content: line.slice(2) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', level: 2, content: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', level: 3, content: line.slice(4) });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        content: quoteLines.join('\n'),
      });
      continue;
    }

    // Bullet List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({
        type: 'list',
        items,
      });
      continue;
    }

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('> ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ')
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({
      type: 'paragraph',
      content: paraLines.join(' '),
    });
  }

  return blocks;
}

function renderInlineFormatted(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      tokens.push(
        <code
          key={match.index}
          className="rounded px-1.5 py-0.5 bg-muted/40 border border-border/40 text-xs font-sans text-foreground"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const titleMatch = token.match(/\[(.*?)\]/);
      const urlMatch = token.match(/\((.*?)\)/);
      if (titleMatch && urlMatch) {
        tokens.push(
          <a
            key={match.index}
            href={urlMatch[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            <span>{titleMatch[1]}</span>
            <ExternalLink className="w-2.5 h-2.5 text-muted-foreground inline" />
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

export interface AIResponseHeaderProps {
  title?: string;
  modelBadge?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AIResponseHeader: React.FC<AIResponseHeaderProps> = ({
  title = 'Assistant',
  modelBadge,
  timestamp,
  icon,
  className,
}) => {
  const { status, modelName } = useAIResponseContext();
  const badge = modelBadge || modelName;

  return (
    <div className={cn('flex items-center justify-between gap-2.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-border/50 select-none', className)}>
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
        <div className="text-foreground/80 shrink-0">
          {icon || <Sparkles className="w-4 h-4 stroke-[2]" />}
        </div>
        <span className="text-sm font-medium text-foreground tracking-tight truncate">{title}</span>
        {badge && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
            <span className="text-border">/</span>
            <span>{badge}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-xs text-muted-foreground font-normal">
        {status === 'streaming' && (
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Streaming</span>
          </span>
        )}
        {status === 'generating' && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <RotateCw className="w-3 h-3 animate-spin" />
            <span>Thinking</span>
          </span>
        )}
        {timestamp && <span className="hidden sm:inline">{timestamp}</span>}
      </div>
    </div>
  );
};

export interface AIResponseContentProps {
  className?: string;
}

export const AIResponseContent: React.FC<AIResponseContentProps> = ({ className }) => {
  const { content, status } = useAIResponseContext();
  const blocks = useMemo(() => parseMarkdownContent(content), [content]);

  if (status === 'generating' && !content) {
    return (
      <div className="py-8 space-y-4 font-sans" role="status" aria-label="Generating response">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RotateCw className="w-3 h-3 animate-spin text-foreground" />
          <span>Synthesizing response...</span>
        </div>
        <div className="space-y-2.5 pt-1">
          <div className="h-2.5 w-3/4 rounded-full bg-muted/40 animate-pulse" />
          <div className="h-2.5 w-11/12 rounded-full bg-muted/40 animate-pulse" />
          <div className="h-2.5 w-1/2 rounded-full bg-muted/40 animate-pulse" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="my-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs text-rose-500 flex items-start gap-3 font-sans"
        role="alert"
      >
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium text-foreground">Unable to complete response generation</p>
          <p className="text-muted-foreground">
            {content || 'An unexpected connection or model timeout occurred. Please retry.'}
          </p>
        </div>
      </div>
    );
  }

  if (!content && status === 'idle') {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground font-sans">
        Ready to generate response.
      </div>
    );
  }

  return (
    <div
      className={cn('py-4 text-sm leading-relaxed text-foreground/85 space-y-3.5 font-sans', className)}
      role="region"
      aria-live={status === 'streaming' ? 'polite' : 'off'}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 1) {
              return (
                <h2 key={idx} className="text-base font-semibold text-foreground tracking-tight pt-2">
                  {block.content}
                </h2>
              );
            }
            if (block.level === 2) {
              return (
                <h3 key={idx} className="text-sm font-semibold text-foreground tracking-tight pt-2">
                  {block.content}
                </h3>
              );
            }
            return (
              <h4 key={idx} className="text-xs font-medium text-foreground pt-1">
                {block.content}
              </h4>
            );
          }

          case 'paragraph':
            return (
              <p key={idx} className="text-sm text-foreground/85 leading-relaxed">
                {renderInlineFormatted(block.content || '')}
              </p>
            );

          case 'code':
            return <CodeBlock key={idx} language={block.language} code={block.content || ''} />;

          case 'list':
            return (
              <ul key={idx} className="space-y-1.5 pl-4 list-disc text-sm text-foreground/85 marker:text-muted-foreground">
                {block.items?.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInlineFormatted(item)}</li>
                ))}
              </ul>
            );

          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-border/70 pl-4 py-1 my-3 text-sm italic text-muted-foreground"
              >
                {renderInlineFormatted(block.content || '')}
              </blockquote>
            );

          case 'table':
            return (
              <div key={idx} className="my-4 overflow-x-auto rounded-xl border border-border/60 bg-surface/30">
                <table className="w-full border-collapse text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-border/60 bg-surface-raised/30 text-xs font-medium text-muted-foreground">
                      {block.headers?.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-2.5 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 text-xs">
                    {block.rows?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-hover/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-2.5 text-foreground/80">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}

      {/* Streaming blinking cursor */}
      {status === 'streaming' && (
        <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-foreground rounded-xs animate-pulse" />
      )}
    </div>
  );
};

export interface AIResponseSourcesProps {
  sources?: AIResponseSource[];
  title?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export const AIResponseSources: React.FC<AIResponseSourcesProps> = ({
  sources: propSources,
  title = 'Cited Sources',
  defaultExpanded = false,
  className,
}) => {
  const { sources: contextSources } = useAIResponseContext();
  const sources = propSources || contextSources;
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!sources || sources.length === 0) return null;

  return (
    <div className={cn('pt-3 border-t border-border/50 font-sans', className)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1"
        aria-expanded={expanded}
      >
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform duration-200', expanded && 'rotate-180')}
        />
        <span>
          {title} ({sources.length})
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING_PHYSICS}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
              {sources.map((source, idx) => (
                <a
                  key={source.id || idx}
                  href={source.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-border/50 bg-surface-raised/20 hover:bg-surface-raised/40 transition-colors group cursor-pointer"
                >
                  <span className="text-xs text-muted-foreground font-medium shrink-0 pt-0.5">
                    {idx + 1}.
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-medium text-foreground group-hover:text-foreground transition-colors truncate">
                        {source.title}
                      </p>
                      <ExternalLink className="w-3 h-3 text-muted-foreground/60 group-hover:text-foreground shrink-0 transition-colors" />
                    </div>
                    {source.snippet && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {source.snippet}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface AIResponseToolsSummaryProps {
  toolCount: number;
  tools?: Array<{ name: string; status?: 'success' | 'running' | 'error'; duration?: string }>;
  onToggleDetails?: () => void;
  className?: string;
}

export const AIResponseToolsSummary: React.FC<AIResponseToolsSummaryProps> = ({
  toolCount,
  tools = [],
  onToggleDetails,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (toolCount <= 0) return null;

  return (
    <div className={cn('py-1 font-sans', className)}>
      <motion.button
        type="button"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        onClick={() => {
          setExpanded(!expanded);
          onToggleDetails?.();
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-surface-raised/20 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors cursor-pointer"
      >
        <Wrench className="w-3 h-3 text-muted-foreground" />
        <span>Used {toolCount} {toolCount === 1 ? 'tool' : 'tools'}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', expanded && 'rotate-180')} />
      </motion.button>

      <AnimatePresence>
        {expanded && tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING_PHYSICS}
            className="overflow-hidden mt-2 space-y-1.5"
          >
            {tools.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-border/40 bg-surface-raised/15 text-xs"
              >
                <span className="text-foreground/80 truncate">{t.name}</span>
                {t.duration && <span className="text-muted-foreground tabular-nums shrink-0 ml-2">{t.duration}</span>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface AIResponseActionsProps {
  className?: string;
}

export const AIResponseActions: React.FC<AIResponseActionsProps> = ({ className }) => {
  const { copied, copyContent, onRegenerate, onFeedback, feedback, status } = useAIResponseContext();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('flex items-center justify-between pt-3.5 sm:pt-4 border-t border-border/50 font-sans select-none', className)}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Copy Button */}
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          onClick={copyContent}
          title="Copy response"
          aria-label={copied ? 'Response copied' : 'Copy response'}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[32px]"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
          <span className={copied ? 'text-emerald-500' : ''}>{copied ? 'Copied' : 'Copy'}</span>
        </motion.button>

        {/* Regenerate Button */}
        {onRegenerate && (
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={onRegenerate}
            disabled={status === 'streaming' || status === 'generating'}
            title="Regenerate response"
            aria-label="Regenerate response"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer min-h-[32px]"
          >
            <RotateCw className={cn('w-3.5 h-3.5', (status === 'streaming' || status === 'generating') && 'animate-spin')} />
            <span>Regenerate</span>
          </motion.button>
        )}
      </div>

      <div className="flex items-center gap-1">
        {/* Like */}
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          onClick={() => onFeedback?.('like')}
          title="Good response"
          aria-label="Good response"
          className={cn(
            'p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center',
            feedback === 'like' && 'text-foreground bg-surface-raised'
          )}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </motion.button>

        {/* Dislike */}
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          onClick={() => onFeedback?.('dislike')}
          title="Poor response"
          aria-label="Poor response"
          className={cn(
            'p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center',
            feedback === 'dislike' && 'text-foreground bg-surface-raised'
          )}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
};

// =============================================================================
// ROOT COMPOUND COMPONENT
// =============================================================================

export interface AIResponseProps {
  /** Text or markdown content to display */
  content?: string;
  /** Current generation status */
  status?: AIResponseStatus;
  /** Model name badge displayed in header */
  modelName?: string;
  /** Optional citations/sources */
  sources?: AIResponseSource[];
  /** Controlled accent color (e.g. #FC4C01, #1A73F2) */
  accentColor?: string;
  /** Callback for regenerate action */
  onRegenerate?: () => void;
  /** Callback for thumbs feedback */
  onFeedback?: (type: 'like' | 'dislike') => void;
  /** Custom wrapper class */
  className?: string;
  /** Compound children or default composition */
  children?: React.ReactNode;
}

export const AIResponse: React.FC<AIResponseProps> = ({
  content = '',
  status = 'complete',
  modelName = 'EasyAI 2.0',
  sources = [],
  accentColor,
  onRegenerate,
  onFeedback,
  className,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const copyContent = () => {
    copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    setFeedback((prev) => (prev === type ? null : type));
    onFeedback?.(type);
  };

  const contextValue: AIResponseContextValue = {
    content,
    status,
    modelName,
    sources,
    copied,
    copyContent,
    onRegenerate,
    onFeedback: handleFeedback,
    feedback,
    accentColor,
  };

  return (
    <AIResponseContext.Provider value={contextValue}>
      <div
        style={{
          fontFamily: "var(--font-sans, 'Geist', sans-serif)",
          ...(accentColor ? ({ '--accent-custom': accentColor } as React.CSSProperties) : {}),
        }}
        className={cn(
          'w-full font-sans rounded-2xl border border-border/70 bg-surface/50 dark:bg-surface/25 p-4 sm:p-7 text-foreground transition-colors',
          className
        )}
      >
        {children || (
          <>
            <AIResponseHeader />
            <AIResponseContent />
            {sources.length > 0 && <AIResponseSources sources={sources} />}
            <AIResponseActions />
          </>
        )}
      </div>
    </AIResponseContext.Provider>
  );
};
