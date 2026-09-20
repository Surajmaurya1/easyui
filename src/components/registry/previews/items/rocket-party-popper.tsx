import { RocketPartyPopper } from '../../../ui/RocketPartyPopper';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="scale-[0.72] origin-center shrink-0 flex items-center justify-center">
              <RocketPartyPopper
                defaultLaunched={hovered}
                title="Launch Complete"
                description="Milestone celebrated."
                metric="59 Components"
              />
            </div>
          </div>
        );
}
