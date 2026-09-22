import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'easyui-theme';

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage may be blocked (e.g. private mode) */
  }
  return null;
}

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.style.colorScheme = theme;
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children?: ReactNode;
  /** Optional initial theme override; useful for tests / Storybook. */
  initialTheme?: Theme;
}

/**
 * ThemeProvider — single source of truth for the page-level light/dark theme.
 *
 * Place this once near the top of the React tree. Every `useTheme()` consumer
 * will read from this context, so toggling the theme from any one consumer
 * instantly re-renders every other consumer (no more stale `theme === 'dark'`
 * branches that only update on a hard refresh).
 */
export function ThemeProvider({ children, initialTheme }: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    return readStoredTheme() ?? systemTheme();
  });

  // True on the very first useEffect flush when initialTheme was used for SSR/prerender.
  // We skip applying + persisting the SSR default so we don't overwrite the user's
  // stored preference or fight with the inline theme bootstrap script in index.html.
  const skipFirstPersist = useRef(!!initialTheme);

  // Whenever the theme changes, apply to <html> and persist to localStorage.
  // Skips the very first run if this was bootstrapped via initialTheme (SSR hydration).
  useEffect(() => {
    if (skipFirstPersist.current) {
      skipFirstPersist.current = false;
      // The inline <script> in index.html already applied the correct CSS theme class.
      // Don't overwrite localStorage with the SSR default.
      return;
    }
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // One-time post-hydration sync: if initialTheme was used for SSR compatibility,
  // check whether the user actually has a different stored or system preference
  // and apply it now (after React hydration is complete).
  useEffect(() => {
    if (!initialTheme) return;
    const preferred = readStoredTheme() ?? systemTheme();
    if (preferred !== theme) {
      setThemeState(preferred); // triggers re-render + the persist useEffect above
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep multiple tabs in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Track OS preference changes for users who haven't picked a theme explicitly.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      // Only follow the OS if the user hasn't explicitly chosen a theme.
      const stored = readStoredTheme();
      if (stored) return;
      setThemeState(e.matches ? 'dark' : 'light');
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    // Safari < 14 fallback.
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

const DEFAULT_THEME_CONTEXT: ThemeContextValue = {
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
};

/**
 * useTheme — read the current theme and (optionally) toggle it.
 *
 * Reads from <ThemeProvider> context if present, or falls back to a default dark
 * theme context when rendered outside a provider (e.g. in isolated unit tests).
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  return ctx ?? DEFAULT_THEME_CONTEXT;
}

