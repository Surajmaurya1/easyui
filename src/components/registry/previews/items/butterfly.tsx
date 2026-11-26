import { Butterfly } from '../../../ui/Butterfly';
import type { ComponentPreviewProps } from '../types';

export default function ButterflyPreview({
  isHovered = false,
  isInViewport = true,
}: ComponentPreviewProps) {
  return (
    <div className="h-52 w-full flex items-center justify-center overflow-hidden p-3 pointer-events-none">
      <Butterfly
        size={175}
        paused={!isInViewport}
        behavior={isHovered ? 'flap' : 'natural'}
        speed={isHovered ? 1.25 : 1}
        interactive={false}
      />
    </div>
  );
}
