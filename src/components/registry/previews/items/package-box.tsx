import { useState } from 'react';
import { PackageBox } from '../../../ui/PackageBox';
import type { ComponentPreviewProps } from '../types';

export default function PackageBoxPreview({ isHovered = false }: ComponentPreviewProps) {
  const [tapOpen, setTapOpen] = useState(false);
  const isOpen = isHovered || tapOpen;

  return (
    <div
      className="h-52 w-full flex items-center justify-center p-2 overflow-hidden select-none cursor-pointer"
      onClick={() => setTapOpen((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label="Toggle 3D Package Box preview"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setTapOpen((prev) => !prev);
        }
      }}
    >
      <div className="w-[360px] max-w-full origin-center scale-[0.40] xs:scale-[0.44] sm:scale-[0.48] shrink-0 pointer-events-none">
        <PackageBox
          open={isOpen}
          hint={false}
          reserveSpace={false}
          maxWidth={360}
        />
      </div>
    </div>
  );
}
