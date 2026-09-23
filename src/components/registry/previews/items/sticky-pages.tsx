import { useRef, useEffect } from 'react';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof el.scrollTo !== 'function') return;
    if (isHovered) {
      el.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isHovered]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full min-h-[260px] sm:min-h-[300px] overflow-y-auto bg-transparent p-4 select-none relative scrollbar-none flex flex-col justify-center"
    >
      <div className="space-y-2.5 pb-2">
        <div className="sticky top-0 z-10 rounded-xl bg-[#202020] border border-[#363636] p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#A3A3A3]">01. ARCHITECTURE</span>
            <span className="text-[9px] text-[#737373] font-mono">Sticky Stack</span>
          </div>
          <p className="text-xs font-semibold text-[#F5F5F5] mt-1">High-Speed Engine</p>
        </div>

        <div className="sticky top-2 z-20 rounded-xl bg-[#242424] border border-[#363636] p-3.5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#A3A3A3]">02. DESIGN SYSTEM</span>
            <span className="text-[9px] text-[#737373] font-mono">Layer Depth</span>
          </div>
          <p className="text-xs font-semibold text-[#F5F5F5] mt-1">Modern Aesthetic</p>
        </div>

        <div className="sticky top-4 z-30 rounded-xl bg-[#282828] border border-[#363636] p-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#F5F5F5]">03. PRODUCTION</span>
            <span className="text-[9px] text-[#A3A3A3] font-mono">Static Shadow</span>
          </div>
          <p className="text-xs font-semibold text-[#F5F5F5] mt-1">Zero Distortion</p>
        </div>
      </div>
    </div>
  );
}
