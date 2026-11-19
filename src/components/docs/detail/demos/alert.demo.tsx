import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Alert, AlertTitle, AlertDescription } = DEMO_COMPONENTS;

export const AlertDemo: React.FC = () => {
  const [alerts, setAlerts] = useState({
    success: true,
    warning: true,
    danger: true,
  });

  const resetAll = () => setAlerts({ success: true, warning: true, danger: true });

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full max-w-xl">
      <div className="w-full space-y-3">
        {alerts.success && (
          <Alert tone="success" dismissible onDismiss={() => setAlerts((a) => ({ ...a, success: false }))}>
            <AlertTitle>Operation successful</AlertTitle>
            <AlertDescription>Your components have been deployed cleanly to production.</AlertDescription>
          </Alert>
        )}

        {alerts.warning && (
          <Alert
            tone="warning"
            dismissible
            action={
              <button
                type="button"
                className="h-7 rounded-md border border-amber-300 dark:border-amber-600/40 px-2.5 text-xs font-medium text-amber-900 dark:text-amber-200 hover:bg-amber-100/50 dark:hover:bg-amber-500/10 cursor-pointer"
              >
                Review
              </button>
            }
            onDismiss={() => setAlerts((a) => ({ ...a, warning: false }))}
          >
            <AlertTitle>Subscription renewing soon</AlertTitle>
            <AlertDescription>Your team plan will automatically renew in 3 days.</AlertDescription>
          </Alert>
        )}

        {alerts.danger && (
          <Alert tone="danger" dismissible onDismiss={() => setAlerts((a) => ({ ...a, danger: false }))}>
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>Your card was declined. Content collapses smoothly when dismissed.</AlertDescription>
          </Alert>
        )}
      </div>

      {(!alerts.success || !alerts.warning || !alerts.danger) && (
        <button
          type="button"
          onClick={resetAll}
          className="h-8 px-4 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium cursor-pointer transition hover:opacity-90"
        >
          Reset dismissed alerts
        </button>
      )}
    </div>
  );
};

export default AlertDemo;
