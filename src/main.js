import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import posthog from 'posthog-js'
import './style.css'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { registerSW } from 'virtual:pwa-register'

// Register PWA Service Worker
registerSW({ immediate: true })

const app = createApp(App)

// Initialize Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

// Initialize PostHog
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    autocapture: true
  })
}

// Initialize Supabase data and subscriptions
store.init()

app.use(router).mount('#app')