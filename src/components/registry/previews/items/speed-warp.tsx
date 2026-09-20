import React from 'react';
import { SpeedWarp } from '../../../ui/SpeedWarp';
import type { ComponentPreviewProps } from '../types';

const SpeedWarpCardPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-xl bg-[#050505]">
      <SpeedWarp
        speed={isHovered ? 45 : 20}
        starCount={300}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-2 pointer-events-none">
        <span className="font-mono text-[11px] font-bold text-white tracking-widest bg-black/70 px-2.5 py-1 rounded-md border border-white/15 backdrop-blur-xs">
          SPEED WARP
        </span>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <SpeedWarpCardPreview isHovered={hovered} />;
}
