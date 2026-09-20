import { AnimatedTabs } from '../../../ui/AnimatedTabs';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <AnimatedTabs
              tabs={[
                { id: 'tab1', label: 'Code', content: <div className="text-xs text-[#6B6B6B]">React 18 JSX</div> },
                { id: 'tab2', label: 'Styles', content: <div className="text-xs text-[#6B6B6B]">Tailwind v3</div> },
              ]}
              defaultTab={hovered ? 'tab2' : 'tab1'}
            />
          </div>
        );
}
