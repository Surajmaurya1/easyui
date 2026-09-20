import { CircularOrbit } from '../../../ui/CircularOrbit';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 w-full flex items-center justify-center p-1 pointer-events-none overflow-hidden">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <div
                className="origin-center shrink-0"
                style={{ width: 440, height: 440, transform: 'scale(0.44)' }}
              >
                <CircularOrbit
                  title="Orbit"
                  speed={0.00045}
                  radius={160}
                  pauseOnHover={false}
                  className="!min-h-0 !h-[440px] !w-[440px]"
                />
              </div>
            </div>
          </div>
        );
}
