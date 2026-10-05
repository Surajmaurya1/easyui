import { DynamicIsland } from '../../../ui/DynamicIsland';
import type { ComponentPreviewProps } from '../types';

export default function DynamicIslandPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-56 flex flex-col items-center justify-center p-4">
      <DynamicIsland
        state={isHovered ? 'expanded' : 'collapsed'}
        name="Suraj Maurya"
        role="Frontend Developer"
        statusText="Online"
        description="Building thoughtful interfaces with React and Next.js."
        socials={{
          github: 'https://github.com/Surajmaurya1',
          x: 'https://x.com',
          linkedin: 'https://linkedin.com',
          email: 'mailto:suraj@example.com',
        }}
      />
      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-4 select-none">
        Hover to expand • Click to interact
      </span>
    </div>
  );
}
