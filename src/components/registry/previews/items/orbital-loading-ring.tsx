import { OrbitalLoadingRing } from '../../../ui/OrbitalLoadingRing';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <OrbitalLoadingRing size={64} variant={hovered ? 'dense' : 'default'} label="Loading preview" />
          </div>
        );
}
