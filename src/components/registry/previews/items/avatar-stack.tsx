import React from 'react';
import { AvatarStack } from '../../../ui/AvatarStack';
import type { ComponentPreviewProps } from '../types';

const AVATAR_STACK_ITEMS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', name: 'Elena R.', alt: 'Elena' },
  { id: 2, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', name: 'Marcus C.', alt: 'Marcus' },
  { id: 3, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', name: 'Sarah M.', alt: 'Sarah' },
  { id: 4, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', name: 'David K.', alt: 'David' },
  { id: 5, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', name: 'Aria T.', alt: 'Aria' },
];

const AvatarStackPreview: React.FC<{ isHovered?: boolean }> = () => {
  return (
    <div className="h-52 flex flex-col items-center justify-center p-4">
      <div className="pointer-events-auto">
        <AvatarStack
          avatars={AVATAR_STACK_ITEMS}
          size="lg"
          max={4}
          overlap="md"
          showTooltip={true}
          showCount={true}
        />
      </div>
      <span className="mt-3 text-[10px] font-mono text-text-muted">Spring hover elevation</span>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <AvatarStackPreview isHovered={hovered} />;
}
