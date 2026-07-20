import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

function sendToAnalytics(metric: Metric) {
  // Field CWV for local debugging and optional Vercel custom events
  if (import.meta.env.DEV) {
    console.info(`[web-vitals] ${metric.name}:`, metric.value, metric.rating)
  }

  const va = (window as Window & { va?: { track?: (n: string, p?: Record<string, unknown>) => void } }).va
  va?.track?.('web_vital', {
    name: metric.name,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    rating: metric.rating,
    id: metric.id,
  })
}

/** Report Core Web Vitals once the app is interactive. */
export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onFCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}
