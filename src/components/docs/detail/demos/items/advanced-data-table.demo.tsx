import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { AdvancedDataTableLiveShowcase } = DEMO_COMPONENTS;

export const meta = { id: 'advanced-data-table', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AdvancedDataTableLiveShowcase.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return <AdvancedDataTableLiveShowcase />;
}
