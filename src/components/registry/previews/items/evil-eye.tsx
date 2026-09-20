import { EvilEye } from '../../../ui/EvilEye';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 relative flex items-start justify-center overflow-hidden pointer-events-auto">
            <div className="scale-[0.42] origin-top flex items-start justify-center pt-3">
              <EvilEye maxRotation={hovered ? 18 : 6} className="!min-h-[520px]" />
            </div>
          </div>
        );
}
