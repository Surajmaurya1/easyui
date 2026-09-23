import { ShootingStars } from '../../../ui/ShootingStars';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] overflow-hidden bg-transparent select-none flex items-center justify-center">
      <ShootingStars
        background="transparent"
        starCount={isHovered ? 80 : 50}
        interval={isHovered ? 1200 : 1800}
        starColors={['#FFFFFF', '#E5E5E5', '#D4D4D4', '#A3A3A3']}
        trailColor="#E5E5E5"
        headColor="#FFFFFF"
        nebula={false}
        parallax={true}
        clickToSpawn={true}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A3A3A3] bg-[#202020]/90 border border-[#363636] px-3 py-1 rounded-md backdrop-blur-sm shadow-xs">
            Shooting Stars
          </span>
          <span className="text-[10px] text-[#737373] mt-1.5 font-sans">
            Click anywhere to summon meteor
          </span>
        </div>
      </ShootingStars>
    </div>
  );
}
