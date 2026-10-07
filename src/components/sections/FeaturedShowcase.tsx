import React from 'react';
import { Container } from '../layout/Container';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../ui/MagneticButton';
import { MorphingDialog } from '../ui/MorphingDialog';
import { FloatingActionDock } from '../ui/FloatingActionDock';
import { CATALOG_INDEX } from '../registry/catalog-index';
import { ArrowUpRight, Shield, Zap, Terminal, Code2, Globe, Database } from 'lucide-react';

export interface FeaturedShowcaseProps {
  onSelectComponent: (id: string) => void;
  onNavigateAllComponents?: () => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  onSelectComponent,
  onNavigateAllComponents,
}) => {
  const dockDemoItems = [
    { id: 'code', label: 'Editor', icon: <Code2 /> },
    { id: 'term', label: 'Terminal', icon: <Terminal /> },
    { id: 'cloud', label: 'Deploy', icon: <Globe /> },
    { id: 'db', label: 'Database', icon: <Database /> },
  ];

  return (
    <section className="py-20 bg-background">
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest">
              Showroom
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mt-1">
              Start with something beautiful.
            </h2>
            <p className="text-sm text-text-secondary mt-1.5 max-w-lg">
              Explore a curated collection of tactile components designed for effortless drop-in integration.
            </p>
          </div>
          <button
            onClick={onNavigateAllComponents || (() => onSelectComponent('spotlight-card'))}
            className="text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 self-start md:self-auto py-1 cursor-pointer focus-ring rounded"
          >
            <span>All {CATALOG_INDEX.length} components</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Layout Grid — components that are not yet light/dark aware
            keep their original styling. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Item 1: Large Featured Spotlight Card (8 cols) */}
          <div className="md:col-span-8">
            <SpotlightCard className="h-full flex flex-col justify-between rounded-[26px] p-7 bg-[#19191b] border-white/[0.08]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                      Spotlight Card
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B6B6B] px-2 py-0.5 rounded bg-[#141414] border border-[#1F1F1F]">
                    Pointer Physics
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight mb-2">
                  Fluid illumination that tracks your cursor.
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-xl leading-relaxed mb-6">
                  Dynamic micro-radial masks calculate Euclidean distance in real-time, subtly illuminating layered borders without gradient clutter.
                </p>

                {/* Interactive Inner Surface */}
                <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-[#6B6B6B] uppercase font-mono">Frame Rate</span>
                    <p className="text-sm font-semibold font-mono text-[#FAFAFA] mt-0.5">120 FPS</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B6B6B] uppercase font-mono">Mask Radius</span>
                    <p className="text-sm font-semibold font-mono text-white mt-0.5">350px</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B6B6B] uppercase font-mono">Surface Alpha</span>
                    <p className="text-sm font-semibold font-mono text-[#FAFAFA] mt-0.5">0.08</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="text-xs text-[#6B6B6B]">Hover anywhere across the card</span>
                <MagneticButton
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectComponent('spotlight-card')}
                >
                  View Code
                </MagneticButton>
              </div>
            </SpotlightCard>
          </div>

          {/* Item 2: Magnetic Button Showcase (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between p-6 rounded-[26px] border border-white/[0.08] bg-[#19191b] hover:border-white/[0.14] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Magnetic Button
                </span>
                <span className="text-[10px] font-mono text-[#6B6B6B]">0.35x Pull</span>
              </div>
              <h4 className="text-sm font-semibold text-[#FAFAFA] mb-1">
                Physical Attraction
              </h4>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-6">
                Applies spring displacement relative to cursor proximity.
              </p>

              {/* Interactive buttons test */}
              <div className="space-y-3 py-1 flex flex-col items-center">
                <MagneticButton
                  variant="primary"
                  size="md"
                  strength={0.4}
                  className="w-full"
                >
                  <span>Primary Magnetic</span>
                  <Zap className="w-3.5 h-3.5 text-neutral-400" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  size="md"
                  strength={0.3}
                  className="w-full"
                >
                  <span>Secondary Surface</span>
                </MagneticButton>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between text-xs">
              <span className="text-[#6B6B6B]">Framer Spring</span>
              <button
                onClick={() => onSelectComponent('magnetic-button')}
                className="text-[#A1A1A1] hover:text-white transition-colors text-xs"
              >
                Docs →
              </button>
            </div>
          </div>

          {/* Item 3: Morphing Dialog (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-[26px] border border-white/[0.08] bg-[#19191b] hover:border-white/[0.14] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Morphing Dialog
                </span>
                <span className="text-[10px] font-mono text-[#A1A1A1] bg-[#141414] border border-[#1F1F1F] px-1.5 py-0.5 rounded">
                  layoutId
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#FAFAFA] mb-1">
                Shared Surface Expansion
              </h4>
              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-6">
                Smooth continuous expansion from any trigger element into full modal view.
              </p>

              <MorphingDialog
                id="morph-showcase"
                title="Security Protocol Config"
                subtitle="Review authentication policies for production API gateways."
                trigger={(open) => (
                  <button
                    onClick={open}
                    className="w-full py-2.5 px-3.5 rounded-lg bg-[#141414] border border-[#1F1F1F] hover:border-[#4A4A4A] text-xs font-medium text-[#FAFAFA] flex items-center justify-between transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#525252]" />
                      <span>Open Security Dialog</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:text-[#FAFAFA]" />
                  </button>
                )}
              >
                <div className="space-y-3 text-xs text-[#A1A1A1]">
                  <div className="p-3 rounded-lg bg-[#141414] border border-[#1F1F1F]">
                    <span className="text-[#FAFAFA] font-semibold block mb-0.5">Mutual TLS 1.3 Active</span>
                    <span className="text-[#6B6B6B]">All external requests pass through automated rate limiting clusters.</span>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button className="px-3 py-1.5 rounded-md bg-[#141414] text-[#A1A1A1] text-xs hover:text-white">
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 rounded-md bg-white text-black font-medium text-xs hover:bg-[#EAEAEA]">
                      Save Policies
                    </button>
                  </div>
                </div>
              </MorphingDialog>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between text-xs">
              <span className="text-[#6B6B6B]">Zero layout shift</span>
              <button
                onClick={() => onSelectComponent('morphing-dialog')}
                className="text-[#A1A1A1] hover:text-white transition-colors"
              >
                Docs →
              </button>
            </div>
          </div>

          {/* Item 4: Floating Action Dock (8 cols) */}
          <div className="md:col-span-8 p-6 rounded-[26px] border border-white/[0.08] bg-[#19191b] hover:border-white/[0.14] transition-colors flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Floating Action Dock
                </span>
                <h4 className="text-sm font-semibold text-[#FAFAFA] mt-1">
                  Magnification Curve Physics
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#6B6B6B] px-2 py-0.5 rounded bg-[#141414] border border-[#1F1F1F] self-start">
                macOS Inspired
              </span>
            </div>

            <div className="py-6 flex items-center justify-center bg-[#050505] rounded-xl border border-[#1F1F1F] bg-dot-subtle">
              <FloatingActionDock items={dockDemoItems} activeId="code" />
            </div>

            <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between text-xs">
              <span className="text-[#6B6B6B]">Interactive hover magnification</span>
              <button
                onClick={() => onSelectComponent('floating-action-dock')}
                className="text-[#A1A1A1] hover:text-white transition-colors"
              >
                Inspect Dock →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
