import { MacOSFolderCards } from '../../../ui/MacOSFolderCards';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="scale-[0.80] origin-center shrink-0 flex items-center justify-center">
              <MacOSFolderCards isPeeked={hovered} className="min-h-0" />
            </div>
          </div>
        );
}
