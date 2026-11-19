import type { DemoProps } from '../../demo-types';


export const meta = { id: 'command-menu', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-10 text-center">
          <p className="text-xs text-[#A1A1A1] mb-3">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] font-mono text-white">⌘K</kbd> anywhere on the page to open.
          </p>
        </div>
      );
}
