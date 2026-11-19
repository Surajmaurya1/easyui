import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Badge } = DEMO_COMPONENTS;

export const BadgeDemo: React.FC = () => {
  const [count, setCount] = useState(3);
  const [tags, setTags] = useState(['Next.js', 'Framer Motion', 'Tailwind', 'EasyUI']);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-xl">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge tone="success" dot pulse>Live status</Badge>
        <Badge variant="outline" tone="warning">Beta release</Badge>
        <Badge variant="soft" tone="neutral">Standard</Badge>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] p-1 shadow-2xs">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="grid size-7 place-items-center rounded-full text-sm font-semibold text-[var(--text-muted)] hover:bg-neutral-100 hover:text-[var(--text-primary)] dark:hover:bg-neutral-800 transition active:scale-90 cursor-pointer"
        >
          -
        </button>
        <Badge variant="solid" tone="danger">{count}</Badge>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => setCount((c) => c + 1)}
          className="grid size-7 place-items-center rounded-full text-sm font-semibold text-[var(--text-muted)] hover:bg-neutral-100 hover:text-[var(--text-primary)] dark:hover:bg-neutral-800 transition active:scale-90 cursor-pointer"
        >
          +
        </button>
      </div>

      <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-muted)] font-medium">Removable Chips (with exit animations):</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <AnimatePresence>
            {tags.map((tag) => (
              <Badge
                key={tag}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
              >
                {tag}
              </Badge>
            ))}
          </AnimatePresence>
        </div>
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() => setTags(['Next.js', 'Framer Motion', 'Tailwind', 'EasyUI'])}
            className="text-xs text-sky-500 hover:underline mt-1 cursor-pointer"
          >
            Reset tags
          </button>
        )}
      </div>
    </div>
  );
};

export default BadgeDemo;
