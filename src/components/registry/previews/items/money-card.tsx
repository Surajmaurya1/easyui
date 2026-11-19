import { MoneyCard } from '../../../ui/MoneyCard';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div
      style={{ fontFamily: "var(--font-sans, 'Geist', sans-serif)" }}
      className="h-52 w-full flex items-center justify-center p-2 overflow-hidden select-none pointer-events-none font-sans"
    >
      <div className="w-[320px] origin-center scale-[0.52] shrink-0">
        <MoneyCard balance={isHovered ? 52352.5 : 52002.5} />
      </div>
    </div>
  );
}
