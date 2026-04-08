<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-card p-8 rounded-2xl shadow-soft border border-border">
      
      <!-- Core Logo / Identity -->
      <div class="text-center mb-8">
        <div class="bg-accent rounded-xl w-14 h-14 mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16l-4-4m8 0l-4 4m0-4V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-text-primary tracking-tight">Admin Portal</h1>
        <p class="text-sm text-text-secondary mt-1">Sign in to manage Negele Borena transport ops</p>
      </div>

      <!-- Logic Error -->
      <div v-if="authError" class="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg text-center border border-red-100">
        {{ authError }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1.5">Admin ID / Email</label>
          <input 
            v-model="email" 
            type="text" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="admin@negele.bus"
            required
          />
        </div>
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-sm font-medium text-text-primary">Password</label>
            <a href="#" class="text-xs text-accent hover:underline">Forgot?</a>
          </div>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit" 
          class="w-full bg-text-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mt-4 flex justify-center items-center h-12"
          :disabled="isLoading"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Secure Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-text-secondary">
        &copy; 2026 Transport Authority. Internally Restricted. <br> Use "admin" / "1234" to test.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const authError = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  authError.value = ''
  
  // Fake network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if ((email.value === 'admin' || email.value === 'admin@negele.bus') && password.value === '1234') {
    store.login()
    router.push('/admin')
  } else {
    authError.value = 'Invalid admin credentials.'
  }
  
  isLoading.value = false
}
</script>
