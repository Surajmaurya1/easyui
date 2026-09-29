import { track } from '@vercel/analytics';

const truncate = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

export function reportClientError(error: unknown, source: string, details?: string): void {
  if (typeof window === 'undefined') return;

  const normalized = error instanceof Error ? error : new Error(String(error));
  track('client_error', {
    source,
    error_name: normalized.name,
    error_message: truncate(normalized.message || 'Unknown client error', 180),
    ...(details ? { details: truncate(details, 260) } : {}),
  });
}

export function installGlobalErrorReporting(): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const handleError = (event: ErrorEvent) => {
    reportClientError(event.error || event.message, 'window.error', event.filename);
  };
  const handleRejection = (event: PromiseRejectionEvent) => {
    reportClientError(event.reason, 'unhandledrejection');
  };

  window.addEventListener('error', handleError);
  window.addEventListener('unhandledrejection', handleRejection);
  return () => {
    window.removeEventListener('error', handleError);
    window.removeEventListener('unhandledrejection', handleRejection);
  };
}
