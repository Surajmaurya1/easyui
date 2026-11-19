import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { IntroLoader } = DEMO_COMPONENTS;

export const meta = { id: 'intro-loader', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([IntroLoader.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-6 w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          <IntroLoader
            key={demoKey}
            fullScreen={false}
            showLangBadge={true}
            showProgress={true}
            allowSkip={true}
          />
        </div>
      );
}
