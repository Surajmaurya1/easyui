import { GooeyMenu } from '../../../ui/GooeyMenu';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <div className="w-[240px] h-[200px] overflow-hidden flex items-start justify-center pt-2">
              <div
                className="origin-top shrink-0"
                style={{ width: 306, transform: 'scale(0.50)' }}
              >
                <GooeyMenu open={hovered} defaultValue="Home" />
              </div>
            </div>
          </div>
        );
}
