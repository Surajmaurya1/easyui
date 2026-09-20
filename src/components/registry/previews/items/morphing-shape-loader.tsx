import { MorphingShapeLoader } from '../../../ui/MorphingShapeLoader';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center p-4 pointer-events-none overflow-hidden">
            <MorphingShapeLoader
              key={hovered ? 'hovered' : 'idle'}
              size={130}
              shapes={['circle', 'square', 'triangle', 'hexagon', 'star', 'pentagon']}
              duration={0.9}
              strokeWidth={0.06}
            />
          </div>
        );
}
