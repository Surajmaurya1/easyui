import { Illustration } from '../../../ui/NotFound';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="w-full min-h-[260px] flex flex-col items-center justify-center gap-1 p-3 select-none overflow-hidden">
      <div className="w-full max-w-[280px] shrink-0 pointer-events-none">
        <Illustration parallax={isHovered} />
      </div>

      <div className="text-center mt-2 space-y-0.5">
        <p className="text-xs font-semibold text-text-primary tracking-tight">
          This page took a wrong turn.
        </p>
        <p className="text-[11px] text-text-muted">
          Error 404 · Page not found
        </p>
      </div>
    </div>
  );
}
