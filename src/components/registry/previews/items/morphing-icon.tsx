import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { MorphingIcon } from '../../../ui/MorphingIcon';
import type { ComponentPreviewProps } from '../types';

const MorphingIconPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const [active, setActive] = useState(false);
  const isEffectiveActive = isHovered || active;

  return (
    <div className="h-52 flex flex-col items-center justify-center p-4 gap-3 select-none">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setActive((prev) => !prev);
        }}
        className={cn(
          "px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-medium shadow-xs",
          isEffectiveActive
            ? "bg-surface-hover border-border text-emerald-400"
            : "bg-surface-raised border-border text-text-secondary hover:text-text-primary hover:border-border-hover"
        )}
      >
        <MorphingIcon
          active={isEffectiveActive}
          from={<Bookmark className="w-4 h-4 text-text-muted" />}
          to={<BookmarkCheck className="w-4 h-4 text-emerald-400" />}
          size={16}
        />
        <span>{isEffectiveActive ? "Saved" : "Save"}</span>
      </div>
      <span className="text-[10px] font-mono text-text-muted">Hover or tap to morph</span>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <MorphingIconPreview isHovered={hovered} />;
}
