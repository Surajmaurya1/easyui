import { MorphingBlob } from '../../../ui/MorphingBlob';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="flex items-center justify-center  w-full">
            <MorphingBlob speed={10} baseRadius={40} points={10} height={60} width={60} />
          </div>
        );
}
