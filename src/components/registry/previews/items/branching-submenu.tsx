import { BranchingSubmenu } from '../../../ui/BranchingSubmenu';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <div className="w-[420px] shrink-0 origin-center scale-[0.80] flex justify-center">
              <BranchingSubmenu className="w-full shadow-none" />
            </div>
          </div>
        );
}
