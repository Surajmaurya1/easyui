import { Meteors } from '../../../ui/Meteors';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden bg-transparent p-6 flex flex-col items-center justify-center select-none">
      <Meteors
        number={isHovered ? 24 : 16}
        color="#E5E5E5"
        trailColor="#525252"
        tailLength={55}
        minDuration={2}
        maxDuration={6}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#202020]/90 border border-[#363636] px-2.5 py-1 rounded-md backdrop-blur-sm shadow-xs">
          Meteors Stream
        </span>
        <h4 className="text-sm font-semibold text-[#F5F5F5] mt-2">Stream Engine</h4>
        <p className="text-[11px] text-[#737373] line-clamp-1 mt-0.5">
          Luminous diagonal trails on dark surface
        </p>
      </div>
    </div>
  );
}
