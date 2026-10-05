import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { DynamicIsland } from './DynamicIsland';
import DynamicIslandPreview from '../registry/previews/items/dynamic-island';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('DynamicIsland', () => {
  it('renders collapsed by default with avatar and expand button', () => {
    render(<DynamicIsland name="Suraj Maurya" role="Frontend Developer" />);

    // Region is accessible
    expect(screen.getByRole('region', { name: 'Dynamic Island' })).toBeInTheDocument();

    // In collapsed state, plus button is visible
    const expandButton = screen.getByRole('button', { name: 'Expand dynamic island' });
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    // Profile icon from Lucide rendered when avatar is not provided
    expect(screen.getByTestId('dynamic-island-profile-icon')).toBeInTheDocument();

    // Expanded content is not rendered yet
    expect(screen.queryByText(/Hello, I'm/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'View profile' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Share links' })).not.toBeInTheDocument();
  });

  it('clicking + expands the island into the summary state', () => {
    render(
      <DynamicIsland
        name="Suraj Maurya"
        greeting="Hello, I'm Suraj"
        role="Frontend Developer"
      />
    );

    const expandButton = screen.getByRole('button', { name: 'Expand dynamic island' });
    fireEvent.click(expandButton);

    // Summary text appears
    expect(screen.getByText("Hello, I'm Suraj")).toBeInTheDocument();

    // Action buttons appear
    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share links' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse dynamic island' })).toBeInTheDocument();
  });

  it('clicking the profile action opens the profile state with full details', () => {
    render(
      <DynamicIsland
        name="Suraj Maurya"
        role="Frontend Developer"
        description="Building thoughtful interfaces with React and Next.js."
        statusText="Available for hire"
        metadata={[
          { label: 'Role', value: 'Lead Engineer' },
          { label: 'Location', value: 'Remote' },
        ]}
        defaultState="expanded"
      />
    );

    const profileButton = screen.getByRole('button', { name: 'View profile' });
    fireEvent.click(profileButton);

    // Profile details are shown
    expect(screen.getByRole('heading', { level: 4, name: 'Suraj Maurya' })).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Building thoughtful interfaces with React and Next.js.')).toBeInTheDocument();
    expect(screen.getByText('Available for hire')).toBeInTheDocument();
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();

    // Back to summary button exists
    expect(screen.getByRole('button', { name: 'Back to summary' })).toBeInTheDocument();
  });

  it('clicking the back button in profile returns to expanded state', () => {
    render(
      <DynamicIsland
        name="Suraj Maurya"
        greeting="Hello, I'm Suraj"
        defaultState="profile"
      />
    );

    const backButton = screen.getByRole('button', { name: 'Back to summary' });
    fireEvent.click(backButton);

    // Returns to expanded view
    expect(screen.getByText("Hello, I'm Suraj")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument();
  });

  it('clicking the share action opens the share dock with social links', () => {
    render(
      <DynamicIsland
        defaultState="expanded"
        socials={{
          github: 'https://github.com/Surajmaurya1',
          x: 'https://x.com/suraj',
          linkedin: 'https://linkedin.com/in/suraj',
          email: 'suraj@example.com',
        }}
      />
    );

    const shareButton = screen.getByRole('button', { name: 'Share links' });
    fireEvent.click(shareButton);

    // Social links rendered as anchors with secure attributes
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Surajmaurya1');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const emailLink = screen.getByRole('link', { name: 'Email' });
    expect(emailLink).toHaveAttribute('href', 'mailto:suraj@example.com');
    expect(emailLink).not.toHaveAttribute('target');

    // Back button in share dock exists
    expect(screen.getByRole('button', { name: 'Back to overview' })).toBeInTheDocument();
  });

  it('clicking back in share dock returns to expanded state', () => {
    render(
      <DynamicIsland
        greeting="Hello, I'm Suraj"
        defaultState="share"
      />
    );

    const backButton = screen.getByRole('button', { name: 'Back to overview' });
    fireEvent.click(backButton);

    // Returns to expanded state
    expect(screen.getByText("Hello, I'm Suraj")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share links' })).toBeInTheDocument();
  });

  it('pressing Escape collapses the island from any open state', () => {
    render(
      <DynamicIsland
        name="Suraj Maurya"
        defaultState="expanded"
      />
    );

    expect(screen.getByRole('button', { name: 'Collapse dynamic island' })).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    // Should return to collapsed state where expand button is present with aria-expanded="false"
    const expandButton = screen.getByRole('button', { name: 'Expand dynamic island' });
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking outside collapses the island', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <DynamicIsland name="Suraj Maurya" defaultState="expanded" />
      </div>
    );

    expect(screen.getByRole('button', { name: 'Collapse dynamic island' })).toBeInTheDocument();

    // Click outside
    fireEvent.pointerDown(screen.getByTestId('outside-element'));

    // Collapsed
    expect(screen.getByRole('button', { name: 'Expand dynamic island' })).toBeInTheDocument();
  });

  it('supports controlled state and invokes onStateChange', () => {
    const handleStateChange = vi.fn();
    const { rerender } = render(
      <DynamicIsland
        state="collapsed"
        onStateChange={handleStateChange}
      />
    );

    const expandButton = screen.getByRole('button', { name: 'Expand dynamic island' });
    fireEvent.click(expandButton);

    expect(handleStateChange).toHaveBeenCalledWith('expanded');

    // Update controlled prop
    rerender(
      <DynamicIsland
        state="expanded"
        onStateChange={handleStateChange}
      />
    );

    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument();
  });

  it('renders custom profileContent and shareContent when provided', () => {
    render(
      <DynamicIsland
        defaultState="profile"
        profileContent={<div data-testid="custom-profile">Custom Profile Content</div>}
        shareContent={<div data-testid="custom-share">Custom Share Dock</div>}
      />
    );

    expect(screen.getByTestId('custom-profile')).toBeInTheDocument();

    render(
      <DynamicIsland
        defaultState="share"
        shareContent={<div data-testid="custom-share">Custom Share Dock</div>}
      />
    );

    expect(screen.getByTestId('custom-share')).toBeInTheDocument();
  });

  it('renders image avatar when avatar prop is provided', () => {
    render(
      <DynamicIsland
        avatar="https://example.com/avatar.jpg"
        avatarAlt="Suraj avatar"
        defaultState="collapsed"
      />
    );

    const img = screen.getByRole('img', { name: 'Suraj avatar' });
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('handles array of custom social links', () => {
    render(
      <DynamicIsland
        defaultState="share"
        socials={[
          { type: 'github', href: 'https://github.com/test', label: 'My GitHub' },
          { type: 'custom', href: 'https://customsite.com', label: 'Custom Portfolio' },
        ]}
      />
    );

    expect(screen.getByRole('link', { name: 'My GitHub' })).toHaveAttribute('href', 'https://github.com/test');
    expect(screen.getByRole('link', { name: 'Custom Portfolio' })).toHaveAttribute('href', 'https://customsite.com');
  });

  it('renders catalog preview component correctly', () => {
    const { rerender } = render(<DynamicIslandPreview isHovered={false} component={{} as any} />);
    expect(screen.getByRole('button', { name: 'Expand dynamic island' })).toBeInTheDocument();
    expect(screen.getByText('Hover to expand • Click to interact')).toBeInTheDocument();

    rerender(<DynamicIslandPreview isHovered={true} component={{} as any} />);
    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument();
  });
});
