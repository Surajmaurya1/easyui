import { SparklesCore } from '../../../ui/SparklesCore';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden bg-transparent flex items-center justify-center select-none">
      <SparklesCore
        background="transparent"
        minSize={0.6}
        maxSize={2.0}
        particleDensity={isHovered ? 110 : 75}
        particleColor="#E5E5E5"
        particleColors={['#FFFFFF', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373']}
        particleShape="mixed"
        cursorMode="repulse"
        className="w-full h-full"
      >
        <div className="flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#202020]/90 border border-[#363636] px-3 py-1 rounded-md backdrop-blur-sm shadow-xs">
            Sparkles Core Engine
          </span>
          <span className="text-[10px] text-[#737373] mt-1.5 font-sans">
            Zero-dependency canvas engine
          </span>
        </div>
      </SparklesCore>
    </div>
  );
}
