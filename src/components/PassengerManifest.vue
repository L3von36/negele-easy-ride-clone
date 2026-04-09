<template>
  <div class="space-y-6">
    <!-- Boarding Stats -->
    <div v-if="showStats" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
       <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-bold text-text-secondary uppercase tracking-widest">{{ t('passenger') }}s</p>
          <div class="flex items-end gap-2 mt-1">
            <h3 class="text-2xl font-black text-text-primary">{{ stats.boarded }}</h3>
            <p class="text-sm text-text-secondary mb-1">/ {{ stats.total }} Boarded</p>
          </div>
          <div class="mt-3 w-full bg-primary-100 h-2 rounded-full overflow-hidden">
            <div class="bg-accent h-full transition-all duration-500" :style="{ width: stats.percentage + '%' }"></div>
          </div>
       </div>
       <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center justify-between">
          <div>
             <p class="text-xs font-bold text-text-secondary uppercase tracking-widest text-green-600">Verified</p>
             <h3 class="text-2xl font-black text-text-primary mt-1">{{ stats.boarded }}</h3>
          </div>
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          </div>
       </div>
       <div class="bg-card p-5 rounded-xl border border-border shadow-soft flex items-center justify-between">
          <div>
             <p class="text-xs font-bold text-text-secondary uppercase tracking-widest text-orange-600">Pending</p>
             <h3 class="text-2xl font-black text-text-primary mt-1">{{ stats.pending }}</h3>
          </div>
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>
          </div>
       </div>
    </div>

    <!-- Manifest Controls -->
    <div class="bg-card rounded-xl border border-border shadow-medium overflow-hidden">
      <div class="p-4 sm:p-6 border-b border-border bg-primary-100/30">
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <div class="relative flex-1 w-full">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search Name, Phone, or Ticket ID..." 
              class="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent focus:outline-none transition-all"
            />
          </div>
          <select v-if="showRouteFilter" v-model="routeFilter" class="custom-select px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none w-full sm:w-64">
            <option value="">All Active Routes</option>
            <option v-for="r in store.routes" :key="r.id" :value="r.from + ' → ' + r.to">{{ r.from }} → {{ r.to }}</option>
          </select>
        </div>
      </div>

      <!-- Manifest List -->
      <div class="divide-y divide-border">
        <div v-for="booking in manifestList" :key="booking.id" 
          class="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-primary-100/20 transition-all cursor-pointer group"
          @click="store.toggleBoarding(booking.id)"
        >
          <div class="flex items-center gap-4">
            <div 
              :class="booking.boarded ? 'bg-green-500 text-white border-green-500 shadow-md' : 'bg-white text-text-secondary border-border'"
              class="w-12 h-12 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
            >
              <svg v-if="booking.boarded" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              <span v-else class="text-xs font-black">{{ booking.id.slice(-2) }}</span>
            </div>
            <div>
              <h4 class="font-bold text-text-primary text-base sm:text-lg tracking-tight">{{ booking.name }}</h4>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                <p class="text-xs font-bold text-accent">ID: #{{ booking.id }}</p>
                <div class="px-2 py-0.5 rounded bg-primary-100 border border-border">
                  <p class="text-[10px] font-black text-text-primary">SEAT #{{ booking.seat_number || 'N/A' }}</p>
                </div>
                <p class="text-xs font-medium text-text-secondary">{{ booking.phone }}</p>
                <p class="text-xs font-medium text-text-secondary border-l border-border pl-3">{{ booking.route }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 ml-16 sm:ml-0">
            <!-- Call Button (Action) -->
            <a 
              v-if="booking.phone"
              :href="'tel:' + booking.phone" 
              @click.stop
              class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-all shadow-sm active:scale-90"
              title="Call Passenger"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </a>

            <span 
              :class="booking.boarded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-text-secondary'"
              class="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors"
            >
              {{ booking.boarded ? 'Boarded' : 'Expected' }}
            </span>
            <div 
              :class="booking.boarded ? 'bg-green-500 border-green-600 scale-110' : 'bg-gray-200 border-gray-300'"
              class="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-inner transition-all duration-300"
            >
               <div class="w-4 h-4 rounded-full bg-white shadow-md transition-all" :class="booking.boarded ? 'scale-100' : 'scale-0'"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="manifestList.length === 0" class="p-12 text-center">
           <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary grayscale opacity-50">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           </div>
           <h3 class="text-lg font-bold text-text-primary">No Matching Passengers</h3>
           <p class="text-sm text-text-secondary mt-1">Try searching with a different name or phone number.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { store, t } from '../store.js'

const props = defineProps({
  showStats: {
    type: Boolean,
    default: true
  },
  showRouteFilter: {
    type: Boolean,
    default: true
  },
  initialRoute: {
    type: String,
    default: ''
  }
})

const searchQuery = ref('')
const routeFilter = ref(props.initialRoute)

watch(() => props.initialRoute, (newVal) => {
  routeFilter.value = newVal
})

const manifestList = computed(() => {
  let list = store.bookings.filter(b => b.status === 'Confirmed')
  
  if (routeFilter.value) {
    list = list.filter(b => b.route === routeFilter.value)
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.id.toLowerCase().includes(q) || 
      (b.phone && b.phone.includes(q))
    )
  }
  
  return list
})

const stats = computed(() => {
  // Stats should be based on the filtered list (current trip) for drivers
  const relevanceList = routeFilter.value 
    ? store.bookings.filter(b => b.status === 'Confirmed' && b.route === routeFilter.value)
    : store.bookings.filter(b => b.status === 'Confirmed')
    
  const total = relevanceList.length
  const boarded = relevanceList.filter(b => b.boarded).length
  const pending = total - boarded
  const percentage = total === 0 ? 0 : Math.round((boarded / total) * 100)
  
  return { total, boarded, pending, percentage }
})
</script>
