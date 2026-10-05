import React from 'react';

export interface PreviewSkeletonProps {
  componentId?: string;
}

export const PreviewSkeleton: React.FC<PreviewSkeletonProps> = ({ componentId }) => {
  // Common skeleton styles
  const shimmer = "animate-pulse bg-surface-hover/80 dark:bg-white/5 border border-border/50 dark:border-white/10";
  const shimmerSolid = "animate-pulse bg-surface-hover/60 dark:bg-white/5";

  const renderSkeleton = () => {
    switch (componentId) {
      case 'draw-checkbox':
        return (
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-md ${shimmer}`} />
            <div className={`h-4 w-24 rounded ${shimmerSolid}`} />
          </div>
        );
      case 'lock-input':
        return (
          <div className="flex flex-col gap-2">
            <div className={`h-10 w-64 rounded-xl ${shimmer}`} />
          </div>
        );
      case 'origin-dropdown':
        return (
          <div className={`h-10 w-32 rounded-xl ${shimmer}`} />
        );
      case 'slide-pagination':
        return (
          <div className="flex gap-2">
            <div className={`w-8 h-8 rounded-lg ${shimmer}`} />
            <div className={`w-8 h-8 rounded-lg ${shimmer}`} />
            <div className={`w-8 h-8 rounded-lg ${shimmer}`} />
            <div className={`w-8 h-8 rounded-lg ${shimmer}`} />
          </div>
        );
      case 'unfold-accordion':
        return (
          <div className="flex flex-col gap-2 w-full max-w-60">
            <div className={`h-12 w-full rounded-xl ${shimmer}`} />
            <div className={`h-12 w-full rounded-xl ${shimmer}`} />
            <div className={`h-12 w-full rounded-xl ${shimmer}`} />
          </div>
        );
      case 'liquid-toggle':
        return (
          <div className={`w-14 h-8 rounded-full ${shimmer}`} />
        );
      case 'gooey-menu':
        return (
          <div className={`w-12 h-12 rounded-full ${shimmer}`} />
        );
      case 'pill-navigation':
        return (
          <div className="flex gap-2">
            <div className={`h-8 w-16 rounded-full ${shimmer}`} />
            <div className={`h-8 w-16 rounded-full ${shimmer}`} />
            <div className={`h-8 w-16 rounded-full ${shimmer}`} />
          </div>
        );
      case 'neon-edge-button':
        return (
          <div className={`h-10 w-32 rounded-lg ${shimmer}`} />
        );
      // Buttons & Small Toggles
      case 'button':
      case 'magnetic-button':
      case 'split-button':
      case 'liquid-ripple-button':
      case 'typewriter-button':
      case 'rainbow-button':
      case 'morphing-button':
      case 'press-button':
        return (
          <div className={`h-10 w-32 rounded-lg ${shimmer}`} />
        );

      // Navigations, Docks & Tabs
      case 'animated-tabs':
      case 'floating-action-dock':
      case 'small-floating-dock':
      case 'glass-navbar':
      case 'hamburger-menu':
      case 'branching-submenu':
        return (
          <div className="flex gap-2 p-2 rounded-2xl bg-surface-hover/20">
            <div className={`w-10 h-10 rounded-full ${shimmer}`} />
            <div className={`w-10 h-10 rounded-full ${shimmer}`} />
            <div className={`w-10 h-10 rounded-full ${shimmer}`} />
          </div>
        );

      // Cards & Big Containers
      case 'card':
      case 'spotlight-card':
      case 'reveal-card':
      case 'peek-card':
      case 'wallet-card':
      case 'stacked-cards':
      case 'story-card':
      case 'pricing':
      case 'faq':
      case 'login':
      case 'sign-up':
      case 'profile-card':
      case 'payment-receipt-printer':
        return (
          <div className="flex flex-col gap-3 w-full max-w-64 p-4 rounded-xl border border-border/50">
            <div className={`h-32 w-full rounded-lg ${shimmer}`} />
            <div className={`h-4 w-3/4 rounded ${shimmerSolid}`} />
            <div className={`h-4 w-1/2 rounded ${shimmerSolid}`} />
          </div>
        );

      // Modals & Dialogs
      case 'morphing-dialog':
      case 'settle-modal':
        return (
          <div className={`w-64 h-48 rounded-2xl ${shimmer}`} />
        );

      // Inputs & Search
      case 'expandable-search':
      case 'ios-search-bar':
      case 'spotlight-search':
      case 'otp-input':
        return (
          <div className={`h-12 w-64 rounded-full ${shimmer}`} />
        );

      // Toasts & Notifications
      case 'notification-stack':
      case 'undo-toast':
      case 'velocity-toast':
      case 'notification-bell':
        return (
          <div className="flex flex-col gap-2 items-center">
            <div className={`h-14 w-64 rounded-xl ${shimmer}`} />
            <div className={`h-14 w-60 rounded-xl ${shimmer} opacity-60`} />
          </div>
        );

      // Loaders & Circular Animations
      case 'orbital-loading-ring':
      case 'morphing-shape-loader':
      case 'intro-loader':
      case 'loader':
      case 'circular-orbit':
      case 'thinking-orb':
      case 'speed-warp':
        return (
          <div className={`w-16 h-16 rounded-full ${shimmer}`} />
        );

      // Text & Typography
      case 'text-scramble-decoder':
      case 'glyph-matrix':
      case 'glitch-text':
      case 'scrollvelocitytext':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className={`h-8 w-48 rounded ${shimmer}`} />
            <div className={`h-8 w-32 rounded ${shimmer}`} />
          </div>
        );

      // Specific Lists & Feeds
      case 'activity-feed':
      case 'ai-agent-activity':
      case 'ai-response':
        return (
          <div className="flex flex-col gap-3 w-full max-w-60">
            <div className="flex gap-3 items-center">
              <div className={`w-8 h-8 rounded-full ${shimmer}`} />
              <div className={`h-3 w-32 rounded ${shimmerSolid}`} />
            </div>
            <div className={`h-16 w-full rounded-xl ${shimmer}`} />
          </div>
        );
      case 'advanced-data-table':
      case 'smart-comparison':
      case 'metric-hud':
      case 'interactive-timeline':
      case 'expandable-data-row':
        return (
          <div className="flex flex-col gap-2 w-full max-w-70">
            <div className="flex justify-between items-center mb-2">
              <div className={`h-6 w-24 rounded ${shimmerSolid}`} />
              <div className={`h-6 w-16 rounded ${shimmerSolid}`} />
            </div>
            <div className={`h-8 w-full rounded-md ${shimmer}`} />
            <div className={`h-8 w-full rounded-md ${shimmer}`} />
            <div className={`h-8 w-full rounded-md ${shimmer}`} />
          </div>
        );
      case 'avatar-stack':
        return (
          <div className="flex -space-x-4">
            <div className={`w-12 h-12 rounded-full ${shimmer} border-2 border-background z-30`} />
            <div className={`w-12 h-12 rounded-full ${shimmer} border-2 border-background z-20`} />
            <div className={`w-12 h-12 rounded-full ${shimmer} border-2 border-background z-10`} />
          </div>
        );
      case 'animated-number':
        return (
          <div className={`h-10 w-24 rounded-lg ${shimmer}`} />
        );
      default:
        // Default generic component layout
        return (
          <div className="w-full max-w-55 flex flex-col items-center gap-2.5">
            <div className={`w-16 h-16 rounded-xl ${shimmer}`} />
            <div className={`h-2 w-24 rounded ${shimmerSolid}`} />
            <div className={`h-1.5 w-16 rounded ${shimmerSolid} opacity-70`} />
          </div>
        );
    }
  };

  return (
    <div
      data-testid="preview-skeleton"
      className="h-52 w-full flex flex-col items-center justify-center p-4 select-none"
      aria-label="Loading component preview..."
      role="status"
    >
      {renderSkeleton()}
    </div>
  );
};
