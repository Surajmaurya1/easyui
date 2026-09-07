import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface DocPaginationProps {
  currentTopic: string;
  onNavigateTopic: (topicId: string) => void;
}

interface DocNavEntry {
  id: string;
  title: string;
  category: string;
}

const DOC_ORDER: DocNavEntry[] = [
  { id: 'introduction', title: 'Introduction & Vision', category: 'Getting Started' },
  { id: 'quick-start', title: 'Quick Start & Setup', category: 'Getting Started' },
  { id: 'motion', title: 'Motion Tokens & Physics', category: 'Getting Started' },
  { id: 'architecture', title: 'Registry Architecture', category: 'Architecture & Engine' },
  { id: 'seo', title: 'Automated SEO System', category: 'Architecture & Engine' },
  { id: 'collaboration', title: 'Contributing Guide', category: 'Architecture & Engine' },
];

export const DocPagination: React.FC<DocPaginationProps> = ({
  currentTopic,
  onNavigateTopic,
}) => {
  const currentIndex = DOC_ORDER.findIndex((item) => item.id === currentTopic);
  const prevDoc = currentIndex > 0 ? DOC_ORDER[currentIndex - 1] : null;
  const nextDoc = currentIndex < DOC_ORDER.length - 1 ? DOC_ORDER[currentIndex + 1] : null;

  if (!prevDoc && !nextDoc) return null;

  return (
    <nav
      aria-label="Documentation Pagination"
      className="pt-10 mt-12 border-t border-border flex items-center justify-between gap-6 select-none"
    >
      {prevDoc ? (
        <button
          onClick={() => onNavigateTopic(prevDoc.id)}
          className="group inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-text-subtle group-hover:text-text-primary transition-transform group-hover:-translate-x-0.5" />
          <span className="relative">
            {prevDoc.title}
            <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-text-secondary transition-transform duration-300" />
          </span>
        </button>
      ) : (
        <div />
      )}

      {nextDoc && (
        <button
          onClick={() => onNavigateTopic(nextDoc.id)}
          className="group inline-flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary transition-colors ml-auto text-right cursor-pointer"
        >
          <span className="relative">
            {nextDoc.title}
            <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-text-secondary transition-transform duration-300" />
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-text-subtle group-hover:text-text-primary transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </nav>
  );
};
