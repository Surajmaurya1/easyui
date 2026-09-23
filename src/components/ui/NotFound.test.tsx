import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('NotFound component', () => {
  it('renders default 404 error state with title, description, and recovery button', () => {
    const onAction = vi.fn();
    const onSecondaryAction = vi.fn();

    render(
      <NotFound
        onAction={onAction}
        secondaryActionLabel="Previous page"
        onSecondaryAction={onSecondaryAction}
      />
    );

    expect(screen.getByText('This page took a wrong turn.')).toBeInTheDocument();
    expect(
      screen.getByText("The requested page doesn't exist or may have moved.")
    ).toBeInTheDocument();
    expect(screen.getByText('Go back home')).toBeInTheDocument();
    expect(screen.getByText('Previous page')).toBeInTheDocument();

    // Verify screen reader announcement
    expect(screen.getByText('Error 404: This page took a wrong turn.')).toBeInTheDocument();

    // Trigger action buttons
    fireEvent.click(screen.getByText('Go back home'));
    expect(onAction).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Previous page'));
    expect(onSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('renders custom error code, custom badge, and custom title', () => {
    render(
      <NotFound
        errorCode="500"
        badgeLabel="SERVER ERROR // 500"
        title="Internal server breakdown."
        description="The telemetry service is currently unreachable."
        actionLabel="Retry request"
      />
    );

    expect(screen.getByText('Internal server breakdown.')).toBeInTheDocument();
    expect(screen.getByText('The telemetry service is currently unreachable.')).toBeInTheDocument();
    expect(screen.getByText('SERVER ERROR // 500')).toBeInTheDocument();
    expect(screen.getByText('Retry request')).toBeInTheDocument();
    expect(screen.getByText('Error 500: Internal server breakdown.')).toBeInTheDocument();
  });

  it('allows rendering custom children actions slot', () => {
    render(
      <NotFound>
        <button type="button" data-testid="custom-action">
          Custom Return Link
        </button>
      </NotFound>
    );

    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    expect(screen.queryByText('Go back home')).not.toBeInTheDocument();
  });

  it('supports custom className prop', () => {
    const { container } = render(<NotFound className="custom-404-wrapper" />);
    expect(container.querySelector('.custom-404-wrapper')).toBeInTheDocument();
  });
});
