import { BookCallButton } from '../../../ui/BookCallButton';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <div className="w-[230px] h-[200px] overflow-hidden flex items-center justify-center">
              <div
                className="origin-center shrink-0"
                style={{ width: 306, height: 96, transform: 'scale(0.62)' }}
              >
                <BookCallButton />
              </div>
            </div>
          </div>
        );
}
