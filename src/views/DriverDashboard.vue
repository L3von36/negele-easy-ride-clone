<template>
  <div class="min-h-screen bg-[#0F172A] pb-20 overflow-x-hidden">
    <!-- Driver Header -->
    <header class="pt-8 pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
             <div class="p-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <img src="/favicon.png" alt="Logo" class="w-10 h-10 flex-shrink-0 object-cover rounded-xl" />
             </div>
             <div>
                <h1 class="text-white font-black text-xl tracking-tight leading-none">{{ t('brand_name') }}</h1>
                <p class="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-1.5 flex items-center gap-2">
                   <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                   {{ t('driver_active_duty') }}
                </p>
             </div>
          </div>
          <div class="flex items-center gap-3">
            <button @click="handleSignOut" class="h-12 w-12 flex items-center justify-center text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <!-- Assignment Information Card -->
        <div class="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/10 shadow-3xl relative overflow-hidden group">
           <div class="relative z-10">
              <div class="flex justify-between items-start mb-8">
                 <div>
                    <p class="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Assigned Vehicle</p>
                    <h2 class="text-white text-4xl font-black tracking-tighter">
                       {{ store.driverBus?.plate || 'Awaiting Bus' }}
                    </h2>
                 </div>
                 <div v-if="store.driverBus" class="flex flex-col items-end">
                    <div :class="tripStatusClass" class="text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg transition-all duration-500">
                       {{ tripStatusText }}
                    </div>
                    <p class="text-white/30 text-[10px] font-bold mt-2 uppercase tracking-widest">{{ assignedRoute?.duration }} Est.</p>
                 </div>
              </div>

              <!-- Route Path UI -->
              <div v-if="assignedRoute" class="flex items-center gap-6 py-6 border-y border-white/5 my-8">
                 <div class="flex-1">
                    <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">{{ t('departure') }}</p>
                    <p class="text-white text-lg font-black tracking-tight leading-tight uppercase">{{ assignedRoute.from_city }}</p>
                 </div>
                 <div class="flex flex-col items-center flex-shrink-0">
                    <div class="w-16 h-[2px] bg-white/10 relative">
                       <div class="absolute -top-2 left-1/2 -ml-2.5 w-5 h-5 bg-accent rounded-full border-[3px] border-[#1E293B] shadow-lg shadow-accent/40"></div>
                    </div>
                 </div>
                 <div class="flex-1 text-right">
                    <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">{{ t('destination') }}</p>
                    <p class="text-white text-lg font-black tracking-tight leading-tight uppercase">{{ assignedRoute.to_city }}</p>
                 </div>
              </div>

              <!-- Boarding Progress -->
              <div v-if="store.driverBus" class="space-y-4">
                 <div class="flex justify-between items-end">
                    <div class="flex items-center gap-2">
                       <p class="text-white/40 text-[10px] font-black uppercase tracking-widest">{{ t('boarding_progress') }}</p>
                       <span class="text-accent text-[10px] font-black tracking-widest">{{ boardedCount }}/{{ manifestoCount }}</span>
                    </div>
                    <p class="text-white font-black text-xl italic tracking-tighter">{{ boardingPercentage }}%</p>
                 </div>
                 <div class="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-gradient-to-r from-accent to-orange-400 transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.4)]" :style="{ width: boardingPercentage + '%' }"></div>
                 </div>
              </div>

              <div v-else class="py-10 text-center">
                 <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white/20">
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                 </div>
                 <p class="text-white text-sm font-bold">No Vehicle Assigned</p>
                 <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Contact Administrator</p>
              </div>

              <!-- Trip Controls (Pro Feature) -->
              <div v-if="store.driverBus" class="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <button 
                    @click="startTrip" 
                    :disabled="busStatus === 'On Route'"
                    class="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white p-4 rounded-3xl font-black text-[10px] tracking-widest uppercase transition-all flex flex-col items-center gap-2 border border-white/10"
                  >
                    <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
                    Depart Station
                  </button>
                  <button 
                    @click="endTrip" 
                    :disabled="busStatus === 'Active'"
                    class="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white p-4 rounded-3xl font-black text-[10px] tracking-widest uppercase transition-all flex flex-col items-center gap-2 border border-white/10"
                  >
                    <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Finish Trip
                  </button>
              </div>
           </div>
           
           <!-- Decorative Background Glow -->
           <div class="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-1000"></div>
        </div>
      </div>
    </header>

    <!-- Manifest Content -->
    <main class="max-w-2xl mx-auto px-6 -mt-16 relative z-20">
        <div class="flex items-center justify-between mb-4 px-2">
           <h3 class="text-white font-black text-sm uppercase tracking-[0.2em] opacity-40">{{ t('passenger_manifest') }}</h3>
           <button 
            @click="isScannerOpen = true"
            class="bg-accent hover:bg-orange-600 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-accent/40 flex items-center gap-2 transition-all active:scale-95"
           >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2M6 20h2" /></svg>
              Scan Ticket
           </button>
        </div>

        <div class="bg-[#1E293B] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden min-h-[400px]">
          <PassengerManifest 
            v-if="assignedRoute" 
            :initial-route="assignedRouteText"
            :show-route-filter="false"
            :show-stats="false"
            compact
          />
          
          <!-- Empty Trip State -->
          <div v-else-if="!store.driverBus" class="p-20 text-center animate-fade-in">
             <div class="w-24 h-24 bg-white/5 rounded-[2rem] rotate-6 flex items-center justify-center mx-auto mb-8 text-white/10">
                <svg class="w-12 h-12 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
             </div>
             <h3 class="text-white text-xl font-black tracking-tight">Assignment Pending</h3>
             <p class="text-white/40 mt-3 max-w-xs mx-auto text-xs leading-relaxed font-bold tracking-wide uppercase">Your profile needs to be linked to a bus plate by an administrator.</p>
          </div>
        </div>
    </main>

    <!-- Modals -->
    <QRScannerModal 
      :is-open="isScannerOpen" 
      @close="isScannerOpen = false"
      @scanned="onTicketScanned"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, t } from '../store.js'
import PassengerManifest from '../components/PassengerManifest.vue'
import QRScannerModal from '../components/QRScannerModal.vue'

const router = useRouter()
const isScannerOpen = ref(false)

// Personalization Logic
const assignedRoute = computed(() => store.driverBus?.routes)
const busStatus = computed(() => store.driverBus?.status || 'Active')

const tripStatusText = computed(() => {
  if (busStatus.value === 'On Route') return 'In Transit'
  return 'Ready for Duty'
})

const tripStatusClass = computed(() => {
  if (busStatus.value === 'On Route') return 'bg-green-500 text-white shadow-green-500/40'
  return 'bg-accent text-white shadow-accent/40'
})

const assignedRouteText = computed(() => {
  if (!assignedRoute.value) return ''
  return assignedRoute.value.from_city + ' → ' + assignedRoute.value.to_city
})

const manifestoCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => 
    b.status === 'Confirmed' && 
    b.route === assignedRouteText.value
  ).length
})

const boardedCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => 
    b.status === 'Confirmed' && 
    b.route === assignedRouteText.value && 
    b.boarded
  ).length
})

const boardingPercentage = computed(() => {
  if (manifestoCount.value === 0) return 0
  return Math.round((boardedCount.value / manifestoCount.value) * 100)
})

function onTicketScanned(ticketId) {
  // Logic already handled in QRScannerModal via store.toggleBoarding
  console.log('Successfully boarded ticket:', ticketId)
}

function startTrip() {
  if (!store.driverBus?.id) return
  store.updateBusStatus(store.driverBus.id, 'On Route')
}

function endTrip() {
  if (!store.driverBus?.id) return
  store.updateBusStatus(store.driverBus.id, 'Active')
}

async function handleSignOut() {
  await store.signOut()
  router.push('/admin-login')
}
</script>

<style scoped>
.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.5);
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
