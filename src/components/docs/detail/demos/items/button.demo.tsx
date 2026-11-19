import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { Button } = DEMO_COMPONENTS;

export const meta = { id: 'button', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Button.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  void props;
return (
        <div className="py-6 w-full space-y-6 max-w-xl mx-auto">
          <div className="p-5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-4">
            <div className="text-xs font-semibold text-[#FAFAFA]">Visual Variants</div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="gradient">Gradient</Button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-4">
            <div className="text-xs font-semibold text-[#FAFAFA]">Sizes & Interactive Loading</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="primary">Small (sm)</Button>
              <Button size="md" variant="primary">Medium (md)</Button>
              <Button size="lg" variant="primary">Large (lg)</Button>
              <Button size="md" variant="secondary" isLoading={true} loadingText="Processing...">
                Loading
              </Button>
            </div>
          </div>
        </div>
      );
}
