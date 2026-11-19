import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { NotificationStack } = DEMO_COMPONENTS;

export const meta = { id: 'notification-stack', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([NotificationStack.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 flex justify-center">
          <NotificationStack key={demoKey} maxVisible={3} />
        </div>
      );
}
