import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SplitButton } = DEMO_COMPONENTS;

export const SplitButtonShowcase: React.FC = () => {
  return (
    <div className="py-12 flex flex-wrap items-center justify-center gap-4 w-full max-w-xl mx-auto">
      {/* Primary Split Button */}
      <SplitButton
        label="Deploy"
        variant="primary"
        size="md"
        options={[
          { value: 'preview', label: 'Deploy Preview' },
          { value: 'staging', label: 'Deploy Staging' },
          { value: 'rollback', label: 'Rollback Build' },
        ]}
      />

      {/* Secondary Split Button */}
      <SplitButton
        label="Save Draft"
        variant="secondary"
        size="md"
        options={[
          { value: 'publish', label: 'Publish now' },
          { value: 'schedule', label: 'Schedule post' },
          { value: 'export', label: 'Export JSON' },
        ]}
      />

      {/* Danger Split Button */}
      <SplitButton
        label="Delete"
        variant="danger"
        size="md"
        options={[
          { value: 'archive', label: 'Archive instead' },
          { value: 'purge', label: 'Hard purge' },
        ]}
      />
    </div>
  );
};

export default SplitButtonShowcase;
