import { ThinkingOrb } from '../../../ui/ThinkingOrb';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex flex-col items-center justify-center p-4 gap-3 pointer-events-none">
            <ThinkingOrb
              state={hovered ? 'solving' : 'working'}
              size={hovered ? 76 : 68}
              speed={hovered ? 1.3 : 1}
            />
            <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border bg-surface-raised border-border text-text-secondary shadow-xs transition-colors">
              {hovered ? 'state: solving' : 'state: working'}
            </span>
          </div>
        );
}
