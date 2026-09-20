import { cn } from '../../../../lib/utils';
import { SpotlightCard } from '../../../ui/SpotlightCard';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <SpotlightCard className={cn('w-full p-4 transition-colors', hovered ? 'bg-[#141414] border-[#4A4A4A]' : 'bg-[#0E0E0E] border-[#1F1F1F]')}>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-white')} />
                <span className="text-xs font-semibold text-[#FAFAFA]">Spotlight Sensor</span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">Hover pointer to track dynamic beam.</p>
            </SpotlightCard>
          </div>
        );
}
