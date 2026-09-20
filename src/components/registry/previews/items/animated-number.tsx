import React, { useState, useEffect } from 'react';
import { AnimatedNumber } from '../../../ui/AnimatedNumber';
import type { ComponentPreviewProps } from '../types';

const AnimatedNumberPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const [val, setVal] = useState(12450);

  useEffect(() => {
    if (isHovered) {
      setVal(48920);
    } else {
      setVal(12450);
    }
  }, [isHovered]);

  return (
    <div className="h-52 flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold font-mono tracking-tight text-white mb-1">
        <AnimatedNumber value={val} prefix="$" useGrouping />
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
        <span>{isHovered ? '+48.2%' : '+24.5%'}</span>
        <span className="text-[#666666]">rolling digits</span>
      </div>
    </div>
  );
};



export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return <AnimatedNumberPreview isHovered={hovered} />;
}
