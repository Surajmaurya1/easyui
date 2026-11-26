import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { Butterfly } = DEMO_COMPONENTS;

export const meta = { id: 'butterfly', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Butterfly.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  return (
    <div key={demoKey} className="flex w-full flex-col items-center justify-center gap-8 px-4 py-6 antialiased">
      <div className="w-full max-w-[380px]">
        <Butterfly />
        <p className="mt-3 text-center font-mono text-xs tracking-tight text-[var(--text-secondary,#52525B)] dark:text-[var(--text-secondary,#A1A1A6)]">
          Split medium · Hover or tap to startle
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-8 border-t border-[var(--border,#E4E4E7)] pt-8 sm:grid-cols-2 dark:border-[var(--border,#29292C)]">
        {(
          [
            ['lines', 'Vector Lines'],
            ['ascii', 'Live ASCII'],
          ] as const
        ).map(([variant, label]) => (
          <figure key={variant} className="m-0 flex flex-col items-center">
            <Butterfly variant={variant} behavior="flap" size={230} />
            <figcaption className="mt-2 text-center font-mono text-xs tracking-tight text-[var(--text-secondary,#52525B)] dark:text-[var(--text-secondary,#A1A1A6)]">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
