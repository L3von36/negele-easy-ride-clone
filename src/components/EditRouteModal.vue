<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex justify-between items-center bg-primary">
        <h2 class="text-xl font-bold text-text-primary">Edit Route</h2>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSave" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Departure</label>
          <input v-model="formData.from" type="text" class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Destination</label>
          <input v-model="formData.to" type="text" class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" required />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Price (ETB)</label>
            <input v-model="formData.price" type="number" class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Distance</label>
            <input v-model="formData.distance" type="text" class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1">Duration</label>
          <input v-model="formData.duration" type="text" class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" />
        </div>

        <button type="submit" class="w-full bg-black text-white hover:bg-accent transition-colors py-3 mt-2 flex justify-center items-center rounded-xl text-sm font-bold">
          Save Changes
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { store } from '../store.js'

const props = defineProps({
  isOpen: Boolean,
  routeData: Object
})

const emit = defineEmits(['close'])

const formData = reactive({
  id: '',
  from: '',
  to: '',
  price: 0,
  distance: '',
  duration: ''
})

watch(() => props.routeData, (newVal) => {
  if (newVal) {
    Object.assign(formData, newVal)
  }
}, { immediate: true })

function handleSave() {
  store.updateRoute(formData.id, { ...formData })
  emit('close')
}
</script>
