import { useRef, useEffect } from 'react';
import { ScrollVelocityText } from '../../../ui/Scrollvelocitytext';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof el.scrollTo !== 'function') return;
    if (isHovered) {
      el.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[260px] sm:min-h-[300px] overflow-y-auto bg-transparent p-6 flex flex-col items-center justify-center select-none relative scrollbar-none"
    >
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <span className="text-[10px] font-mono text-[#A3A3A3] bg-[#202020] border border-[#363636] px-2.5 py-1 rounded-md shadow-xs">
          {isHovered ? 'EXPANDING ON SCROLL ↓' : 'KINETIC SCROLL VELOCITY'}
        </span>
        <ScrollVelocityText
          text="VELOCITY"
          scrollContainerRef={containerRef}
          expandDistance={200}
          intensity={1.2}
          minLetterSpacing={0.05}
          maxLetterSpacing={0.4}
          maxScale={1.25}
          fadeStart={0.7}
          className="text-2xl font-black text-[#F5F5F5] tracking-wider font-mono text-center"
        />
        <span className="text-[10px] text-[#737373] font-mono">
          Scroll inside to expand
        </span>
      </div>
    </div>
  );
}
