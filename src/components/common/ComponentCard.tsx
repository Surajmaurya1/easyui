import React, { useState } from 'react';
import type { EasyComponentMeta } from '../../types/component';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { NewBadge } from './NewBadge';
import { isComponentNew } from '../../lib/components';
import { copyToClipboard, cn } from '../../lib/utils';
import { ComponentPreviewRenderer } from './ComponentPreviewRenderer';

export interface ComponentCardProps {
  component: EasyComponentMeta;
  isNew?: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isNew,
  onSelect,
  className,
}) => {
  const showNew = isNew !== undefined ? isNew : isComponentNew(component);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyCLI = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(component.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onSelect(component.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onSelect(component.id);
    }
  };

  return (
    <a
      href={`/components/${component.id}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={cn(
        'group relative block rounded-[20px] border-[1.5px] border-border bg-surface p-2 hover:border-border-hover hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary/80 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {/* Inset Live Preview Box — backdrop follows the global theme. */}
      <div className="relative rounded-2xl bg-surface-raised border border-border dark:bg-[#0c0c0c] dark:border-[#161616] overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col justify-center">
        {/* Subtle Copy CLI Button (Reveals on card hover) — minimal, ghost-like */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={handleCopyCLI}
            className="p-1.5 rounded-md bg-surface/80 backdrop-blur border border-border text-text-muted hover:text-text-primary hover:border-border-hover dark:bg-black/60 dark:border-white/10 dark:text-[#525252] dark:hover:text-white dark:hover:border-white/30 transition-colors focus-ring cursor-pointer"
            title="Copy CLI command"
            aria-label={`Copy CLI command for ${component.name}`}
          >
            {copied ? (
              <Check className="w-3 h-3 text-text-primary dark:text-white" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Scalable Registry-Driven Preview Renderer */}
        <ComponentPreviewRenderer component={component} isHovered={isHovered} />
      </div>

      {/* Component Footer — large title, prominent persistent arrow */}
      <div className="pt-5 pb-2 px-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary transition-colors truncate">
            {component.name}
          </h3>
          {showNew && <NewBadge size="xs" />}
        </div>
        <ArrowUpRight
          className="w-5 h-5 text-text-muted group-hover:text-text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
          strokeWidth={2}
        />
      </div>
    </a>
  );
};
