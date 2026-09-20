import { TextScrambleDecoder } from '../../../ui/TextScrambleDecoder';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <TextScrambleDecoder
              key={hovered ? 'hovered' : 'idle'}
              text="EASYUI.SYNCED"
              trigger="mount"
              duration={650}
              className="text-xs"
            />
          </div>
        );
}
