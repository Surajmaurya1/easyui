import { useEffect } from 'react'
import { initializeTracwell } from './tracwell-client'

/** Mount once at the application root so Tracwell initializes after the document exists. */
export function TracwellAnalytics() {
  useEffect(() => {
    try {
      initializeTracwell()
    } catch (error) {
      console.warn('[Tracwell] Analytics initialization failed; continuing without analytics.', error)
    }
  }, [])

  return null
}
