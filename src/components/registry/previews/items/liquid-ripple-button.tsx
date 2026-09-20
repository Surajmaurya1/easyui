import { LiquidRippleButton } from '../../../ui/LiquidRippleButton';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <LiquidRippleButton variant="secondary">Generate</LiquidRippleButton>
            </div>
          </div>
        );
}
