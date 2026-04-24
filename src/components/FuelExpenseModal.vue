<template>
  <div v-if="isOpen" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
    <div class="bg-[#1E293B] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-fade-in shadow-2xl">
      <div class="p-6 border-b border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <div>
            <h3 class="text-white font-bold text-lg leading-none">{{ t('driver.fuel_report') }}</h3>
            <p class="text-white/30 text-xs mt-1 uppercase tracking-wider font-medium">Log Vehicle Expenses</p>
          </div>
        </div>
        <button @click="$emit('close')" class="text-white/20 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-6 space-y-5">
        <div>
          <label class="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Expense Type</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="type in ['Fuel', 'Maintenance', 'Parking', 'Other']" 
              :key="type"
              @click="expenseType = type"
              :class="expenseType === type ? 'bg-accent border-accent text-white' : 'bg-white/5 border-white/10 text-white/40'"
              class="py-2.5 rounded-xl border text-xs font-bold transition-all"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Amount (ETB)</label>
            <input 
              v-model="amount"
              type="number" 
              placeholder="0.00"
              class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/10 focus:ring-1 focus:ring-accent outline-none"
            />
          </div>
          <div>
            <label class="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Liters (Optional)</label>
            <input 
              v-model="liters"
              type="number" 
              placeholder="0"
              class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/10 focus:ring-1 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Notes</label>
          <textarea 
            v-model="notes"
            placeholder="Receipt info, station name..."
            class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/10 focus:ring-1 focus:ring-accent outline-none min-h-[80px]"
          ></textarea>
        </div>
      </div>

      <div class="p-6 bg-black/20 flex gap-3">
        <button @click="$emit('close')" class="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all">
          Cancel
        </button>
        <button 
          @click="handleSubmit"
          :disabled="!amount || isSubmitting"
          class="flex-1 py-3.5 bg-accent hover:bg-orange-600 text-white rounded-xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-30"
        >
          {{ isSubmitting ? '...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUiStore } from '../stores/ui'
import { toast } from '../lib/toast'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'success'])
const ui = useUiStore()
const { t } = ui

const expenseType = ref('Fuel')
const amount = ref('')
const liters = ref('')
const notes = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  try {
    // Simulated submission
    await new Promise(r => setTimeout(r, 1000))
    toast.success(`${expenseType.value} report submitted successfully`)
    emit('success')
    emit('close')
    // Reset
    amount.value = ''
    liters.value = ''
    notes.value = ''
  } catch (err) {
    toast.error('Failed to submit report')
  } finally {
    isSubmitting.value = false
  }
}
</script>
