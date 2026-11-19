import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { AirportMatrixClock } = DEMO_COMPONENTS;

export const meta = { id: 'airport-matrix-clock', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AirportMatrixClock.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div key={demoKey} className="w-full max-w-xl mx-auto">
          <AirportMatrixClock showControls />
        </div>
      );
}
