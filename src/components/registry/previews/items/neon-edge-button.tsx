import { NeonEdgeButton } from '../../../ui/NeonEdgeButton';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <NeonEdgeButton>Deploy</NeonEdgeButton>
            </div>
          </div>
        );
}
