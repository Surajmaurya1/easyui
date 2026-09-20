import { IntroLoader } from '../../../ui/IntroLoader';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <IntroLoader fullScreen={false} key={hovered ? 'hovered' : 'idle'} className="h-32 rounded-xl shadow-none border-none" />
          </div>
        );
}
