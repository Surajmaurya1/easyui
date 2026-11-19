import { WalletBalance } from '../../../ui/WalletBalance';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="h-52 w-full flex items-center justify-center p-2 overflow-hidden select-none font-sans"
    >
      <div className="w-[170px] flex items-center justify-center">
        <WalletBalance visible={!isHovered} />
      </div>
    </div>
  );
}
