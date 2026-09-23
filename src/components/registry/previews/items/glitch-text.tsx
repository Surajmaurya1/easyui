import { GlitchText } from '../../../ui/GlitchText';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] flex flex-col items-center justify-center p-6 bg-transparent overflow-hidden select-none">
      <div className="flex flex-col items-center gap-3 relative z-10 text-center">
        <GlitchText
          text="EASYUI MOTION"
          variant={isHovered ? 'rgb-split' : 'slice'}
          intensity={isHovered ? 'high' : 'medium'}
          color1="#FFFFFF"
          color2="#737373"
          className="text-2xl sm:text-3xl font-black tracking-widest text-[#F5F5F5] font-mono"
        />
        <span className="text-[10px] font-mono text-[#A3A3A3] bg-[#202020] border border-[#363636] px-2.5 py-1 rounded-md shadow-xs">
          {isHovered ? 'CHROMATIC SPLIT' : 'KINETIC GLITCH'}
        </span>
      </div>
    </div>
  );
}
