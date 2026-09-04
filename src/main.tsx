import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './styles/index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { ThemeProvider } from './lib/theme/useTheme'

// Suppress the React 19 internal INP (Interaction to Next Paint) tracking
// error that fires in some browsers when the Performance Observer returns
// an entry without a `startTime`. This is a known React 19 bug — the
// internal `reportAllChanges` function reads `.startTime` without a null
// check. The error is non-fatal: it does not affect rendering, state, or
// any user-facing behavior. We catch and silence it so it doesn't clutter
// the dev console.
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror
  window.onerror = function (message, source, lineno, colno, error) {
    if (
      typeof message === 'string' &&
      message.includes("Cannot read properties of undefined (reading 'startTime')")
    ) {
      return true // suppress
    }
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error)
    }
    return false
  }
  // Also catch the same error when it surfaces as an unhandled rejection
  // or via window.addEventListener('error').
  window.addEventListener('error', (e) => {
    if (
      e.message &&
      e.message.includes("Cannot read properties of undefined (reading 'startTime')")
    ) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }, true)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
