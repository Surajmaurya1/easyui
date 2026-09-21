import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App Routing and Navigation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState(null, '', '/');
  });

  it('renders homepage showcase by default on root path', async () => {
    render(<App />);

    expect(screen.getAllByText('easyui').length).toBeGreaterThan(0);
    expect(screen.getByRole('navigation', { name: 'Main Navigation' })).toBeInTheDocument();
  });

  it('shows 404 Component Not Found state when navigating to an invalid component slug', async () => {
    window.history.replaceState(null, '', '/components/invalid-slug-does-not-exist');

    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByText('Component Not Found')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(screen.getByText('/components/invalid-slug-does-not-exist')).toBeInTheDocument();
    expect(screen.getByText('Browse Components')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders valid component route when direct URL is accessed', async () => {
    window.history.replaceState(null, '', '/components/button');

    render(<App />);

    const heading = await screen.findByRole(
      'heading',
      { name: /button/i, level: 1 },
      { timeout: 20000 }
    );
    expect(heading).toBeInTheDocument();
  }, 25000);

  it('renders documentation page when /docs or /doc route is accessed', async () => {
    window.history.replaceState(null, '', '/docs/quick-start');

    render(<App />);

    const docHeading = await screen.findByRole(
      'heading',
      { name: /quick start/i },
      { timeout: 10000 }
    );
    expect(docHeading).toBeInTheDocument();
  }, 15000);
});

