import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-3 pointer-events-none">
            <div className="w-full max-w-[220px] space-y-1.5">
              <div className="text-xs font-medium text-[var(--text-primary)] tracking-tight">Email</div>
              <div className="relative">
                <input
                  readOnly
                  value="you@studio.dev"
                  className="w-full h-9 px-3 text-sm text-[var(--text-primary)] bg-[var(--surface)] rounded-lg outline-none border border-[var(--border)]"
                  style={{
                    borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
                    boxShadow: hovered
                      ? '0 0 0 2px var(--accent-ring), inset 0 0 0 1px var(--border-hover)'
                      : 'none',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                />
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">Focus state locks into place</div>
            </div>
          </div>
        );
}
