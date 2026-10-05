import { AirportMatrixClock } from '../../../ui/AirportMatrixClock';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered: _isHovered, component: _component }: ComponentPreviewProps) {
  return (
    <div className="flex w-full items-center justify-center p-3 sm:p-4">
      <AirportMatrixClock
        cities={['los-angeles', 'london', 'tokyo']}
        showControls={false}
        className="max-w-[360px] [&_header]:px-3 [&_header]:py-2 [&_li]:px-3 [&_li]:py-2 [&_footer]:px-3 [&_footer]:py-2"
      />
    </div>
  );
}
