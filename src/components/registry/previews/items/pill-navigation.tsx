import { PillNavigation } from '../../../ui/PillNavigation';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <PillNavigation defaultValue={hovered ? 'motion' : 'overview'} />
            </div>
          </div>
        );
}
