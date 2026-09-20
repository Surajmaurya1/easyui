import React from 'react';
import { GlyphMatrix } from '../../../ui/GlyphMatrix';
import type { ComponentPreviewProps } from '../types';

const GlyphMatrixCardPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-xl bg-[#050505]">
      <GlyphMatrix
        fontSize={13}
        color={isHovered ? '#22c55e' : '#10b981'}
        speed={isHovered ? 1.4 : 0.85}
        interactive={false}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-2 pointer-events-none">
        <span className="font-mono text-[11px] font-bold text-emerald-400 tracking-widest bg-black/70 px-2.5 py-1 rounded-md border border-emerald-500/30 backdrop-blur-xs">
          GLYPH MATRIX
        </span>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <GlyphMatrixCardPreview isHovered={hovered} />;
}
