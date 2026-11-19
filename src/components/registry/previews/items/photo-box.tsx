import { PhotoBox } from '../../../ui/PhotoBox';
import type { ComponentPreviewProps } from '../types';

export default function PhotoBoxPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="h-52 w-full flex items-center justify-center p-2 overflow-hidden select-none font-sans"
    >
      <div className="w-[380px] origin-center scale-[0.46] shrink-0">
        <PhotoBox open={isHovered} />
      </div>
    </div>
  );
}
