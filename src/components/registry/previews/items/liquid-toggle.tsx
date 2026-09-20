import { LiquidToggle } from '../../../ui/LiquidToggle';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <LiquidToggle
              key={hovered ? 'hovered' : 'idle'}
              defaultValue={hovered}
              width={80}
              height={40}
            />
          </div>
        );

      // -------------------------------------------------------------------------
      // Micro-interaction components (light & dark theme aware)
      // -------------------------------------------------------------------------
}
