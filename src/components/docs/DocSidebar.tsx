import React from 'react';
import {
  BookOpen,
  Terminal,
  Cpu,
  GitPullRequest,
  Sliders,
  Search,
  type LucideIcon,
} from 'lucide-react';

export interface DocSidebarProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  activeTopic,
  onSelectTopic,
}) => {
  const docNavSections: NavSection[] = [
    {
      group: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: BookOpen },
        { id: 'quick-start', label: 'Quick Start', icon: Terminal },
        { id: 'motion', label: 'Motion Tokens', icon: Sliders },
      ],
    },
    {
      group: 'Architecture & Engine',
      items: [
        { id: 'architecture', label: 'Registry Architecture', icon: Cpu },
        { id: 'seo', label: 'Automated SEO System', icon: Search },
        { id: 'collaboration', label: 'Contributing Guide', icon: GitPullRequest },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col select-none">
      {/* Eyebrow label — same mono uppercase rhythm as the homepage */}
      <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.18em] mb-4">
        Documentation
      </span>

      <div className="space-y-6">
        {docNavSections.map((section) => (
          <div key={section.group} className="space-y-2">
            <h4 className="text-[10px] font-mono text-text-subtle uppercase tracking-[0.18em]">
              {section.group}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTopic === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTopic(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition-colors text-left group ${
                      isActive
                        ? 'bg-surface-hover text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-subtle group-hover:text-text-primary'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
