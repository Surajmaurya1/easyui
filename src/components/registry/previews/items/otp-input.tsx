import { OTPInput } from '../../../ui/OtpInput';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="flex items-center justify-center  w-full">
            <OTPInput length={6} autoFocus onComplete={(value) => {
              alert(value)
            }} />
          </div>
        );
}
