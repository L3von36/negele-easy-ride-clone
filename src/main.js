import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store } from './store'

// Initialize Supabase data and subscriptions
store.init()

createApp(App).use(router).mount('#app')