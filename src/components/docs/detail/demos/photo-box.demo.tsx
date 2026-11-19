import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { PhotoBox } = DEMO_COMPONENTS;

export const PhotoBoxDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-2 sm:p-6 w-full max-w-2xl">
      <div className="w-full flex items-center justify-center">
        <PhotoBox />
      </div>
      <p className="text-xs text-[var(--text-muted)] text-center px-2">
        Hover to open the box · Click any print to view it large · Click anywhere to return
      </p>
    </div>
  );
};

export default PhotoBoxDemo;
