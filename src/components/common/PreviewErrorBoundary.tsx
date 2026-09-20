import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export interface PreviewErrorBoundaryProps {
  componentId?: string;
  componentName?: string;
  children: ReactNode;
}

interface PreviewErrorBoundaryState {
  hasError: boolean;
}

export class PreviewErrorBoundary extends Component<
  PreviewErrorBoundaryProps,
  PreviewErrorBoundaryState
> {
  public state: PreviewErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): PreviewErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log isolated preview errors for debugging without crashing the host app
    console.warn(
      `[EasyUI Preview Error] Failed to render preview for "${this.props.componentId || 'unknown'}":`,
      error,
      errorInfo
    );
  }

  private handleRetry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="preview-error-fallback"
          className="h-52 w-full flex flex-col items-center justify-center p-4 text-center select-none"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
            <AlertCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-text-primary mb-0.5">
            Preview unavailable
          </span>
          <span className="text-[11px] text-text-muted mb-3 max-w-[200px] line-clamp-1">
            {this.props.componentName || 'Component preview could not be loaded'}
          </span>
          <button
            type="button"
            onClick={this.handleRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-md border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors focus-ring cursor-pointer shadow-xs"
            aria-label="Retry loading preview"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
