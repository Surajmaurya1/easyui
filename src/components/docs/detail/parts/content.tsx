import React from 'react';
import type { DetailPartProps, MainTab } from '../types';
import { Check, Copy } from 'lucide-react';
import { isComponentNew } from '../../../../lib/components';
import { NewBadge } from '../../../common/NewBadge';
import { AnimatedTabs } from '../../../ui/AnimatedTabs';

export const TabNavigation: React.FC<DetailPartProps> = (props) => {
  const { component, activeTab, setActiveTab } = props;
  return (
<div className="flex items-center justify-start gap-4 pt-1">
                <AnimatedTabs
                  tabs={[
                    { id: 'preview', label: 'Preview' },
                    { id: 'usage', label: 'Usage' },
                    { id: 'code', label: 'Code' },
                  ]}
                  activeTab={activeTab}
                  onChange={(tabId: string) => setActiveTab(tabId as MainTab)}
                  variant="glass"
                  renderContent={false}
                  layoutId={`detail-glass-tab-${component.id}`}
                />
              </div>
  );
};

export const OverviewSection: React.FC<DetailPartProps> = (props) => {
  const { component } = props;
  return (
<div id="overview-section" className="space-y-2 pt-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                    {component.name}
                  </h1>
                  {isComponentNew(component) && <NewBadge size="sm" />}
                </div>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl pt-0.5">
                  {component.description || component.tagline}
                </p>
              </div>
  );
};

export const UsageSection: React.FC<DetailPartProps> = (props) => {
  const { component, activeTab, copiedCode, handleCopy } = props;
  return (
activeTab === 'usage' && (
                <div id="usage-section" className="space-y-6">
                  <div className="rounded-[26px] bg-[#F1F1F2] dark:bg-[#18181B] p-4 sm:p-6 border border-black/[0.04] dark:border-white/[0.06] space-y-6 shadow-xs">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="text-text-primary font-medium">Import Component</span>
                        <button
                          type="button"
                          onClick={() => {
                            const importStmt = `import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`;
                            handleCopy(importStmt, 'import');
                          }}
                          className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.04] dark:border-white/[0.06] text-text-subtle hover:text-text-primary transition-colors cursor-pointer"
                          title={copiedCode === 'import' ? 'Copied' : 'Copy Import Statement'}
                          aria-label={copiedCode === 'import' ? 'Copied import statement' : 'Copy import statement'}
                        >
                          {copiedCode === 'import' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-[18px] border border-black/[0.06] dark:border-white/[0.06] bg-transparent font-mono text-xs text-text-primary overflow-x-auto">
                        <code>{`import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`}</code>
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="text-text-primary font-medium">Example Code</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(component.usageCode, 'usage')}
                          className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.04] dark:border-white/[0.06] text-text-subtle hover:text-text-primary transition-colors cursor-pointer"
                          title={copiedCode === 'usage' ? 'Copied' : 'Copy Example Code'}
                          aria-label={copiedCode === 'usage' ? 'Copied example code' : 'Copy example code'}
                        >
                          {copiedCode === 'usage' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-[18px] border border-black/[0.06] dark:border-white/[0.06] bg-transparent font-mono text-xs text-text-secondary overflow-x-auto max-h-[460px] leading-relaxed scrollbar-thin">
                        <code>{component.usageCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )
  );
};

export const CodeSection: React.FC<DetailPartProps> = (props) => {
  const { component, activeTab, effectiveSourceCode, copiedCode, handleCopy } = props;
  return (
activeTab === 'code' && (
                <div id="code-section" className="space-y-3">
                  <div className="rounded-[26px] bg-[#F1F1F2] dark:bg-[#18181B] p-4 sm:p-6 border border-black/[0.04] dark:border-white/[0.06] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-text-primary font-medium font-mono">
                        src/components/ui/{component.id}.tsx
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(effectiveSourceCode, 'source')}
                        className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.04] dark:border-white/[0.06] text-text-subtle hover:text-text-primary transition-colors cursor-pointer"
                        title={copiedCode === 'source' ? 'Copied' : 'Copy Source Code'}
                        aria-label={copiedCode === 'source' ? 'Copied source code' : 'Copy source code'}
                      >
                        {copiedCode === 'source' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-[18px] border border-black/[0.06] dark:border-white/[0.06] bg-transparent font-mono text-xs text-text-secondary overflow-x-auto max-h-[520px] leading-relaxed scrollbar-thin">
                      <code>{effectiveSourceCode}</code>
                    </pre>
                  </div>
                </div>
              )
  );
};

export const PropsSection: React.FC<DetailPartProps> = (props) => {
  const { component } = props;
  return (
<section id="props-section" className="rounded-[26px] bg-[#F1F1F2] dark:bg-[#18181B] p-5 sm:p-6 border border-black/[0.04] dark:border-white/[0.06] space-y-4 shadow-xs">
                <h2 className="text-lg font-semibold text-text-primary tracking-tight">API Reference</h2>
                {component.props && component.props.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-text-secondary border-b border-black/[0.06] dark:border-white/[0.06]">
                        <tr>
                          <th scope="col" className="py-3 px-3 font-mono font-medium">Prop</th>
                          <th scope="col" className="py-3 px-3 font-mono font-medium">Type</th>
                          <th scope="col" className="py-3 px-3 font-mono font-medium">Default</th>
                          <th scope="col" className="py-3 px-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                        {component.props.map((p, i) => (
                          <tr key={i} className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-3 font-mono text-text-primary font-medium">{p.name}</td>
                            <td className="py-3 px-3 font-mono text-text-secondary">
                              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06]">{p.type}</span>
                            </td>
                            <td className="py-3 px-3 font-mono text-text-muted">{p.default || '—'}</td>
                            <td className="py-3 px-3 text-text-secondary leading-relaxed">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-text-muted">Standard React HTML element attributes supported.</p>
                )}
              </section>
  );
};

export const RelatedSection: React.FC<DetailPartProps> = (props) => {
  const { relatedComponents, onSelectComponent } = props;
  return (
relatedComponents.length > 0 && (
                <section id="related-section" className="space-y-4 pt-2">
                  <h2 className="text-lg font-semibold text-text-primary tracking-tight">Related Components</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedComponents.map((rel) => (
                      <a
                        key={rel.id}
                        href={`/components/${rel.id}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            onSelectComponent(rel.id);
                          }
                        }}
                        className="p-4 rounded-[22px] border border-black/[0.04] dark:border-white/[0.06] bg-[#F1F1F2] dark:bg-[#18181B] hover:scale-[1.01] hover:border-black/[0.08] dark:hover:border-white/[0.12] transition-all text-left group cursor-pointer block shadow-xs"
                      >
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="text-xs font-semibold text-text-primary truncate mb-1">
                          {rel.name}
                        </h4>
                        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                          {rel.tagline || rel.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              )
  );
};
