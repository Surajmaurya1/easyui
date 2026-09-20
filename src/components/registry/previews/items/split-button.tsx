import React from 'react';
import { SplitButton } from '../../../ui/SplitButton';
import type { ComponentPreviewProps } from '../types';

const SplitButtonCardPreview: React.FC<{ isHovered?: boolean }> = () => {
  return (
    <div className="h-52 flex flex-col items-center justify-center p-4">
      <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <SplitButton
          label="Deploy"
          size="sm"
          variant="primary"
          options={[
            { value: 'preview', label: 'Deploy preview' },
            { value: 'staging', label: 'Deploy staging' },
            { value: 'rollback', label: 'Rollback build' },
          ]}
        />
      </div>
      <span className="mt-3 text-[10px] font-mono text-text-muted">Split action + menu</span>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <SplitButtonCardPreview isHovered={hovered} />;
}
