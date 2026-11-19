import React from 'react';
import type { DetailPartProps, PkgManager } from '../types';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export const InstallSection: React.FC<DetailPartProps> = (props) => {
  const { component, setActiveTab, copiedCode, pkgManager, setPkgManager, installMode, setInstallMode, handleCopy, getInstallDepCommand } = props;
  return (
<section id="install-section" className="rounded-[26px] bg-[#F1F1F2] dark:bg-[#18181B] p-5 sm:p-6 border border-black/[0.04] dark:border-white/[0.06] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-text-primary tracking-tight">Installation</h2>
                  {/* CLI vs Manual Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setInstallMode('cli')}
                      className={cn(
                        'px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer',
                        installMode === 'cli'
                          ? 'bg-white dark:bg-[#27272A] text-text-primary shadow-xs'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                    >
                      CLI
                    </button>
                    <button
                      type="button"
                      onClick={() => setInstallMode('manual')}
                      className={cn(
                        'px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer',
                        installMode === 'manual'
                          ? 'bg-white dark:bg-[#27272A] text-text-primary shadow-xs'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                    >
                      Manual
                    </button>
                  </div>
                </div>

                {installMode === 'cli' ? (
                  <div className="space-y-3">
                    <p className="text-xs text-text-secondary">
                      Add the component directly to your repository using shadcn CLI:
                    </p>
                    <div className="p-2 sm:p-2.5 flex items-center justify-between gap-3 font-mono text-xs text-text-primary">
                      <span className="truncate">{component.cliCommand}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(component.cliCommand, 'cli')}
                        className="p-1.5 rounded-lg text-text-subtle hover:text-text-primary bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCode === 'cli' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Package Manager selector */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">1. Install dependencies</span>
                      <div className="flex items-center gap-1 font-mono text-[11px] p-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                        {(['pnpm', 'npm', 'yarn', 'bun'] as PkgManager[]).map((pm) => (
                          <button
                            key={pm}
                            type="button"
                            onClick={() => setPkgManager(pm)}
                            className={cn(
                              'px-2 py-0.5 rounded-md transition-colors cursor-pointer',
                              pkgManager === pm
                                ? 'bg-white dark:bg-[#27272A] text-text-primary shadow-xs'
                                : 'text-text-muted hover:text-text-secondary'
                            )}
                          >
                            {pm}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-2 sm:p-2.5 flex items-center justify-between gap-3 font-mono text-xs text-text-primary">
                      <span className="truncate">{getInstallDepCommand()}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(getInstallDepCommand(), 'deps')}
                        className="p-1.5 rounded-lg text-text-subtle hover:text-text-primary bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.06] dark:hover:bg-white/[0.1] transition-colors cursor-pointer"
                      >
                        {copiedCode === 'deps' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-text-secondary pt-1">
                      2. Copy the component source code from the{' '}
                      <button
                        onClick={() => setActiveTab('code')}
                        className="text-text-primary underline hover:opacity-80"
                      >
                        Code tab
                      </button>{' '}
                      into your project at <code className="text-text-primary font-mono">components/ui/{component.id}.tsx</code>.
                    </p>
                  </div>
                )}
              </section>
  );
};
