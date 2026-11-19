import React from 'react';
import type { DemoProps } from './demo-types';
import { DEMO_ROUTES } from './demo-route-registry';
import { resolveDemoId } from './demo-registry';

export type { InlineDemoComponents } from './demo-types';

export const InteractiveDemoRenderer: React.FC<DemoProps> = (props) => {
  const { component } = props;
  const Demo = DEMO_ROUTES[resolveDemoId(props.component.id) as keyof typeof DEMO_ROUTES];
  if (Demo) return <Demo {...props} />;

  return (
          <div className="py-12 text-center text-xs text-[#808080]">
            <p className="font-mono text-[#D4D4D4] mb-1">{component.name}</p>
            <p>{component.tagline || 'Interactive preview ready for customization.'}</p>
          </div>
        );
};
