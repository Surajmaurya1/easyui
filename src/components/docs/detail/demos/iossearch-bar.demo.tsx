import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { IOSSearchBar } = DEMO_COMPONENTS;

export const IOSSearchBarShowcase: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="py-12 flex flex-col items-center justify-center gap-4">
      <div className="p-8 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] flex flex-col items-center gap-4 shadow-md">
        <IOSSearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search telemetry..."
        />
        <span className="text-xs font-mono text-[#6B6B6B]">
          {query ? `Active query: "${query}"` : 'Focus pill to test spring expansion (or press ⌘K)'}
        </span>
      </div>
    </div>
  );
};

export default IOSSearchBarShowcase;
