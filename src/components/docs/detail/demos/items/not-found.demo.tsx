import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { NotFound } = DEMO_COMPONENTS;

export const meta = { id: 'not-found', aliases: ['notfound', '404'] } as const;

export async function preload(): Promise<void> {
  await Promise.all([NotFound.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full py-4 sm:py-8 flex items-center justify-center">
          <NotFound
            key={demoKey}
            errorCode="404"
            title="This page took a wrong turn."
            headingLevel={2}
            includeDocumentMetadata={false}
            description="The requested page doesn't exist or may have moved."
            actionLabel="Go back home"
          />
        </div>
      );
}
