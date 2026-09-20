import { DotField } from '../../../ui/DotField';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 relative rounded-lg overflow-hidden border border-[#1F1F1F] bg-[#0E0E0E]">
            <DotField
              dotRadius={1.5}
              dotSpacing={12}
              gradientFrom={hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)'}
              gradientTo="rgba(255, 255, 255, 0.08)"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#141414]/90 px-2.5 py-1 rounded-md border border-[#1F1F1F]">
                Static Canvas Matrix
              </span>
            </div>
          </div>
        );
}
