import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught application error:', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            minHeight: '100dvh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            color: '#EDEDED',
            fontFamily: 'Geist, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: '26rem',
              width: '100%',
              backgroundColor: '#090909',
              border: '1px solid #1A1A1A',
              borderRadius: '1rem',
              padding: '2rem 1.75rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Minimal Monochrome Icon */}
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                backgroundColor: '#121212',
                border: '1px solid #141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888888"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* User-Friendly Title & Description */}
            <h1
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '0 0 0.5rem 0',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                color: '#6B6B6B',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              An unexpected error occurred while rendering this page. You can try refreshing the view or return home.
            </p>

            {/* Development Error Details */}
            {Boolean(import.meta.env?.DEV) && this.state.error && (
              <pre
                style={{
                  width: '100%',
                  margin: '0 0 1.5rem 0',
                  padding: '0.75rem',
                  backgroundColor: '#050505',
                  border: '1px solid #0B0B0B',
                  borderRadius: '0.5rem',
                  fontSize: '0.6875rem',
                  color: '#A1A1A1',
                  textAlign: 'left',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: '"JetBrains Mono", monospace',
                  boxSizing: 'border-box',
                }}
              >
                {this.state.error.message}
              </pre>
            )}

            {/* Dark & Grey Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '0.625rem',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  flex: 1,
                  padding: '0.55rem 1rem',
                  borderRadius: '0.625rem',
                  backgroundColor: '#EDEDED',
                  color: '#090909',
                  border: '1px solid #EDEDED',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EDEDED';
                }}
              >
                Try again
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = '/')}
                style={{
                  flex: 1,
                  padding: '0.55rem 1rem',
                  borderRadius: '0.625rem',
                  backgroundColor: '#121212',
                  color: '#A1A1A1',
                  border: '1px solid #222222',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = '#181818';
                  target.style.color = '#FFFFFF';
                  target.style.borderColor = '#333333';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = '#121212';
                  target.style.color = '#A1A1A1';
                  target.style.borderColor = '#222222';
                }}
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
