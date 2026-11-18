import type { ComponentPreviewProps } from '../types';

export default function Preview({ component }: ComponentPreviewProps) {
  return (
    <div className="flex h-52 w-full flex-col items-center justify-center px-6 text-center select-none">
      <h3 className="text-xs font-semibold tracking-tight text-text-primary">
        {component.name}
      </h3>
      <p className="mt-1 max-w-[220px] text-[11px] leading-[1.5] text-text-muted">
        {component.tagline}
      </p>
    </div>
  );
}
