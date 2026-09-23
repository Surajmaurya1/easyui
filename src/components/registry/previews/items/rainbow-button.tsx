import { RainbowButton } from '../../../ui/RainbowButton';
import { Sparkles } from 'lucide-react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full min-h-[260px] sm:min-h-[300px] flex items-center justify-center p-6 bg-transparent select-none">
      <RainbowButton
        size="default"
        speed={isHovered ? 2 : 3.5}
        glow={true}
        className="shadow-lg pointer-events-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>Rainbow Button</span>
      </RainbowButton>
    </div>
  );
}
