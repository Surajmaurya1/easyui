import { DotShader } from '../../../ui/DotShader';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden bg-transparent flex items-center justify-center select-none">
      <DotShader
        dotColor="rgba(255, 255, 255, 0.15)"
        accentColor={isHovered ? '#FFFFFF' : '#D4D4D4'}
        spacing={18}
        dotSize={1.5}
        cursorRadius={140}
        distortionStrength={isHovered ? 0.45 : 0.25}
        maxScale={isHovered ? 2.5 : 2.0}
        speed={isHovered ? 1.2 : 0.8}
        overlay={false}
        className="absolute inset-0 h-full w-full flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center text-center pointer-events-none select-none px-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#202020]/90 border border-[#363636] px-3 py-1 rounded-md backdrop-blur-sm shadow-xs">
            Dot Matrix Shader
          </span>
          <span className="text-[10px] text-[#737373] mt-1.5 font-sans">
            Interactive WebGL Grid
          </span>
        </div>
      </DotShader>
    </div>
  );
}
