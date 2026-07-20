import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/600.css'
import './index.css'
import { App } from './app/App.tsx'
import { reportWebVitals } from './lib/reportWebVitals.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)

reportWebVitals()
