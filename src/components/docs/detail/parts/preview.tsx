import React from 'react';
import type { DetailPartProps } from '../types';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Copy, Check, Maximize2, ChevronDown, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { InteractiveDemoRenderer } from '../demo-renderer';
import { Menu } from '@base-ui/react/menu';

export const PreviewSection: React.FC<DetailPartProps> = (props) => {
  const { component, activeTab, copiedCode, isFullscreenPreview, setIsFullscreenPreview, demoKey, handleCopy, inlineDemos } = props;
  const [promptStatus, setPromptStatus] = React.useState<'idle' | 'copied' | 'error'>('idle');
  const [copyingPrompt, setCopyingPrompt] = React.useState(false);
  const handleCopyPrompt = async () => {
    const prompt = component.installPrompt;
    if (copyingPrompt || !prompt?.trim()) return;
    setCopyingPrompt(true);
    try {
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(prompt);
          copied = true;
        }
      } catch { /* use the legacy fallback below */ }
      if (!copied) {
        const textarea = document.createElement('textarea');
        textarea.value = prompt;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        textarea.remove();
      }
      setPromptStatus(copied ? 'copied' : 'error');
    } catch {
      setPromptStatus('error');
    } finally {
      setCopyingPrompt(false);
      window.setTimeout(() => setPromptStatus('idle'), 2200);
    }
  };
  return (
activeTab === 'preview' && (
                <div id="preview-section" className="space-y-6">
                  {/* Main Interactive Stage Box — matching frontpage card aesthetic */}
                  <div className="relative rounded-[26px] bg-[#F1F1F2] dark:bg-[#18181B] p-2.5 sm:p-3 border border-black/[0.04] dark:border-white/[0.06] shadow-xs flex flex-col">
                    {/* Top Bar inside the preview card */}
                    <div className="px-3 py-2 flex items-center justify-end text-xs relative">
                      {/* Box Structure: [ Copy CLI | ▼ ] */}
                      <Menu.Root>
                        <div className="relative inline-flex items-center">
                        <div className="inline-flex items-center rounded-lg bg-white dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] shadow-2xs text-xs font-sans text-text-secondary overflow-hidden">
                          {component.installPrompt && (
                            <button type="button" onClick={(event) => { event.stopPropagation(); void handleCopyPrompt(); }} disabled={copyingPrompt} className="px-2 py-1 sm:pl-2.5 sm:pr-2 flex items-center gap-1.5 hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.04] rounded-l-lg transition-colors disabled:opacity-50" aria-label="Copy install prompt">
                              {promptStatus === 'copied' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-text-muted" />}
                              <span className="text-xs font-medium">{promptStatus === 'copied' ? 'Copied!' : promptStatus === 'error' ? 'Copy failed' : 'Copy Prompt'}</span>
                            </button>
                          )}
                          {/* Copy CLI action remains available in the menu */}
                          <div className="w-px h-3 bg-black/[0.08] dark:bg-white/[0.1]" />
                          <Menu.Trigger className="px-1.5 py-1 flex items-center justify-center hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.04] rounded-r-lg transition-colors text-text-secondary" title="More options" aria-label="Preview options"><ChevronDown className="w-3.5 h-3.5" /></Menu.Trigger>
                        </div>
                        <Menu.Portal><Menu.Positioner side="bottom" align="end" sideOffset={5} className="z-30"><Menu.Popup className="w-[138px] min-w-[138px] rounded-lg bg-white dark:bg-[#18181B] border border-black/[0.08] dark:border-white/[0.1] shadow-xl p-1 outline-none">
                          <Menu.Item onClick={() => handleCopy(component.cliCommand, 'cli-top')} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-text-secondary hover:text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.06] outline-none cursor-pointer"><Copy className="w-3.5 h-3.5 text-text-muted" /><span>{copiedCode === 'cli-top' ? 'Copied' : 'Copy CLI'}</span></Menu.Item>
                          <Menu.Item onClick={() => setIsFullscreenPreview(true)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-text-secondary hover:text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.06] outline-none cursor-pointer"><Maximize2 className="w-3.5 h-3.5 text-text-muted" /><span>Full screen</span></Menu.Item>
                        </Menu.Popup></Menu.Positioner></Menu.Portal>
                        </div>
                      </Menu.Root>
                      <span className="sr-only" aria-live="polite">{promptStatus === 'copied' ? 'Prompt copied to clipboard' : promptStatus === 'error' ? 'Could not copy prompt' : ''}</span>
                    </div>

                    {/* Component Render Canvas — seamless unified stage matching card background */}
                    <div className={cn("relative min-h-[360px] sm:min-h-[440px] p-2 sm:p-8 flex items-center justify-center text-text-primary", component.id === 'morphing-mega-menu' ? 'overflow-visible' : 'overflow-hidden')}>
                      <div className="w-full flex items-center justify-center">
                        {!isFullscreenPreview && (
                          <Suspense fallback={<div className="min-h-48 w-full flex items-center justify-center text-xs text-text-muted">Loading preview…</div>}>
                            <InteractiveDemoRenderer component={component} demoKey={demoKey} inlineDemos={inlineDemos} />
                          </Suspense>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
  );
};

export const FullscreenOverlay: React.FC<DetailPartProps> = (props) => {
  const { component, isFullscreenPreview, setIsFullscreenPreview, demoKey, theme, inlineDemos } = props;
  return (
isFullscreenPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={cn(
              'fixed inset-0 z-[100] flex flex-col overflow-y-auto transition-colors duration-200',
              theme === 'dark' ? 'bg-[#050505] text-text-primary' : 'bg-[#FAFAFA] text-[#0A0A0A]'
            )}
          >
            {/* Floating Close Button */}
            <button
              type="button"
              onClick={() => setIsFullscreenPreview(false)}
              className={cn(
                'fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] p-2 rounded-full border transition-colors cursor-pointer shadow-subtle',
                theme === 'dark'
                  ? 'bg-[#141414]/80 hover:bg-[#1A1A1A] border-[#29292C] hover:border-[#343438] text-[#A1A1A6] hover:text-[#F2F2F3] backdrop-blur-md'
                  : 'bg-white/80 hover:bg-zinc-100 border-[#E4E4E7] hover:border-[#D4D4D8] text-zinc-600 hover:text-zinc-900 backdrop-blur-md'
              )}
              title="Close fullscreen"
              aria-label="Close fullscreen"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Canvas Body — backdrop follows the page theme. Components that are
                not yet light/dark aware keep their original styling.

                Note: `items-start` (not `items-center`) so that when a component
                is taller than the viewport, the user can scroll the *top* of the
                content into view.  Centering on overflow causes the top of tall
                components to be clipped above the visible area on mobile. */}
            <div className="flex-1 flex items-start sm:items-center justify-center p-3 sm:p-12 overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-w-0 my-auto">
                <Suspense fallback={<div className="min-h-48 w-full flex items-center justify-center text-xs text-text-muted">Loading preview…</div>}>
                  <InteractiveDemoRenderer component={component} demoKey={demoKey} inlineDemos={inlineDemos} />
                </Suspense>
              </div>
            </div>
          </motion.div>
        )
  );
};
