<template>
  <div class="min-h-screen bg-[#020617] pb-12 selection:bg-accent/30 overflow-x-hidden">

    <!-- Pro Navigation Bar -->
    <nav class="sticky top-0 z-50 px-6 py-4 backdrop-blur-xl border-b border-white/5 bg-[#020617]/80">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-2">
            <img src="/favicon.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-white font-black text-sm tracking-tighter leading-none uppercase">{{ t('brand_name') }}</h1>
            <p class="text-white/30 text-[8px] font-black uppercase tracking-[0.3em] mt-1">Operational Protocol v2.4</p>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div class="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
             <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
             <span class="text-white/60 text-[10px] font-black uppercase tracking-widest">{{ formatEthiopian(new Date(), store, t) }}</span>
          </div>
          <button @click="handleSignOut" class="h-10 px-4 flex items-center justify-center text-white/40 hover:text-white transition-all bg-white/5 border border-white/10 rounded-xl group">
             <span class="text-[9px] font-black uppercase tracking-widest mr-2 opacity-0 group-hover:opacity-100 transition-all">Sign Out</span>
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </nav>

    <main class="relative z-10 max-w-7xl mx-auto px-6 py-8">
      <!-- Responsive Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT: Trip HUB & Actions (Sidebar on Desktop) -->
        <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
           <!-- 1. Trip Summary HUB -->
           <section v-if="store.driverBus" class="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div class="relative z-10">
                <div class="flex justify-between items-start mb-8">
                  <div>
                    <label class="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-2 block">Assigned Plate</label>
                    <h2 class="text-white text-4xl font-black tracking-tighter">{{ store.driverBus?.plate }}</h2>
                  </div>
                  <div class="text-right">
                    <div :class="tripStatusClass" class="text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest mb-2 border border-white/10">
                      {{ tripStatusText }}
                    </div>
                  </div>
                </div>

                <!-- Live Boarding Status (High Density) -->
                <div class="bg-black/40 rounded-3xl p-6 border border-white/5 space-y-5">
                   <div class="flex justify-between items-end">
                      <div class="space-y-1">
                        <p class="text-white/20 text-[8px] font-black uppercase tracking-widest">{{ t('boarding_progress') }}</p>
                        <p class="text-white text-2xl font-black">{{ boardedCount }} <span class="text-white/20 text-sm font-bold">/ {{ manifestoCount }}</span></p>
                      </div>
                      <div class="text-right">
                        <p class="text-accent text-lg font-black italic tracking-tighter">{{ boardingPercentage }}%</p>
                      </div>
                   </div>
                   <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                      <div class="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.3)]" :style="{ width: boardingPercentage + '%' }"></div>
                   </div>
                </div>

                <div v-if="assignedRoute" class="mt-8 flex items-center justify-between px-2">
                   <div class="text-left">
                      <p class="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">{{ t('departure') }}</p>
                      <p class="text-white text-xs font-black uppercase">{{ assignedRoute.from_city }}</p>
                   </div>
                   <div class="h-[1px] flex-1 mx-4 bg-white/10 relative">
                      <div class="absolute inset-0 bg-accent/20 animate-pulse"></div>
                   </div>
                   <div class="text-right">
                      <p class="text-white/20 text-[8px] font-black uppercase tracking-widest mb-1">{{ t('destination') }}</p>
                      <p class="text-white text-xs font-black uppercase">{{ assignedRoute.to_city }}</p>
                   </div>
                </div>
              </div>
           </section>

           <!-- 2. Ghost UI Action Grid -->
           <section v-if="store.driverBus" class="grid grid-cols-2 gap-4">
              <!-- Scan Button (Primary) -->
              <button @click="isScannerOpen = true" class="col-span-2 flex items-center justify-center gap-3 p-5 bg-accent hover:bg-orange-600 rounded-[1.5rem] transition-all active:scale-[0.98] shadow-2xl shadow-accent/20">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2M6 20h2" /></svg>
                <span class="text-white text-[11px] font-black uppercase tracking-widest">Scan Ticket</span>
              </button>

              <button @click="startTrip" :disabled="busStatus === 'On Route'" class="ghost-btn group">
                <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                  <svg class="w-4 h-4 text-white/40 group-hover:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
                </div>
                <span class="text-white/40 group-hover:text-white text-[9px] font-black uppercase tracking-widest">Depart</span>
              </button>

              <button @click="openChat" class="ghost-btn group">
                <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <svg class="w-4 h-4 text-white/40 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                </div>
                <span class="text-white/40 group-hover:text-white text-[9px] font-black uppercase tracking-widest">Hub Chat</span>
              </button>

              <button @click="triggerSOS" class="col-span-2 ghost-btn group border-red-500/10 hover:bg-red-500/5 hover:border-red-500/30">
                <div class="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 animate-pulse">
                  <svg class="w-4 h-4 text-red-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <span class="text-red-500/60 group-hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Emergency SOS</span>
              </button>
           </section>
        </div>

        <!-- RIGHT: Passenger Manifest (Scrollable area) -->
        <div class="lg:col-span-8 space-y-6">
           <div class="flex items-center justify-between px-2">
              <h3 class="text-white font-black text-xs uppercase tracking-[0.4em] opacity-30">{{ t('passenger_manifest') }}</h3>
              <div class="flex items-center gap-4">
                 <div class="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span class="text-white/40 text-[9px] font-black uppercase tracking-widest">Real-time Sync</span>
                 </div>
              </div>
           </div>

           <div class="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden min-h-[600px] shadow-3xl">
              <PassengerManifest 
                v-if="assignedRoute" 
                :initial-route="assignedRouteText"
                :show-route-filter="false"
                :show-stats="false"
                compact
              />
              
              <div v-else class="p-32 text-center">
                 <div class="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-white/[0.02]">
                    <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                 </div>
                 <h4 class="text-white/20 text-lg font-black uppercase tracking-widest">Awaiting Assignment</h4>
                 <p class="text-white/10 text-xs font-bold mt-2 uppercase tracking-widest">The manifesto will appear once a route is assigned to your bus.</p>
              </div>
           </div>
        </div>
      </div>
    </main>

    <!-- 1. SOS Countdown Modal -->
    <div v-if="sosCountdown > 0" class="fixed inset-0 z-[100] flex items-center justify-center bg-[#450a0a]/90 backdrop-blur-3xl p-6">
       <div class="text-center space-y-8 max-w-sm">
          <div class="w-32 h-32 bg-red-600 rounded-full mx-auto flex items-center justify-center animate-ping absolute opacity-20"></div>
          <div class="w-32 h-32 bg-red-600 rounded-full mx-auto flex items-center justify-center relative shadow-[0_0_50px_rgba(220,38,38,0.5)]">
             <span class="text-white text-6xl font-black italic">{{ sosCountdown }}</span>
          </div>
          <div class="space-y-2">
             <h2 class="text-white text-3xl font-black uppercase tracking-tighter">Emergency SOS</h2>
             <p class="text-white/60 text-sm font-medium">Alerting dispatch and nearby services in {{ sosCountdown }}s...</p>
          </div>
          <button @click="cancelSOS" class="w-full bg-white text-red-700 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">
             Cancel Protocol
          </button>
       </div>
    </div>

    <!-- 2. Hub Chat Sidebar/Drawer (Simulated) -->
    <div 
      :class="isChatOpen ? 'translate-x-0' : 'translate-x-full'"
      class="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[100] bg-[#0F172A] border-l border-white/10 shadow-2xl transition-transform duration-500 ease-in-out"
    >
       <div class="h-full flex flex-col">
          <div class="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
             <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                </div>
                <div>
                  <h3 class="text-white font-black text-sm uppercase tracking-widest leading-none">Dispatch Hub</h3>
                  <span class="text-green-500 text-[9px] font-black uppercase tracking-widest">Active Connection</span>
                </div>
             </div>
             <button @click="isChatOpen = false" class="text-white/20 hover:text-white transition-all p-2">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
             </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
             <div v-for="msg in chatMessages" :key="msg.id" :class="msg.isMe ? 'items-end' : 'items-start'" class="flex flex-col gap-2">
                <span class="text-[9px] font-black uppercase tracking-widest opacity-20">{{ msg.sender }}</span>
                <div :class="msg.isMe ? 'bg-accent/10 border-accent/20 rounded-tr-none' : 'bg-white/5 border-white/10 rounded-tl-none'" class="max-w-[80%] p-4 rounded-2xl border">
                   <p class="text-white/80 text-xs leading-relaxed font-medium">{{ msg.text }}</p>
                </div>
                <span class="text-[8px] font-bold opacity-10">{{ msg.time }}</span>
             </div>
          </div>

          <div class="p-6 border-t border-white/10 bg-white/[0.02]">
             <div class="relative">
                <input type="text" placeholder="Type message to dispatch..." class="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-xs text-white placeholder:text-white/10 focus:outline-none focus:ring-1 focus:ring-accent/50" />
                <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center text-white scale-90 hover:scale-100 transition-transform">
                   <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
             </div>
          </div>
       </div>
    </div>

    <!-- Scanner Modal -->
    <QRScannerModal 
      :is-open="isScannerOpen" 
      @close="isScannerOpen = false"
      @scanned="onTicketScanned"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store, t } from '../store.js'
import PassengerManifest from '../components/PassengerManifest.vue'
import QRScannerModal from '../components/QRScannerModal.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'

const router = useRouter()
const isScannerOpen = ref(false)
const isChatOpen = ref(false)
const sosCountdown = ref(0)
let sosTimer = null

// Simulated Chat Data
const chatMessages = ref([
  { id: 1, sender: 'Dispatch', text: 'Good morning Ahmed. Traffic clear on Route 4. Proceed with scheduled departure.', time: '07:45 AM', isMe: false },
  { id: 2, sender: 'Driver (Me)', text: 'Acknowledged. Vehicle inspection complete. Ready for boarding.', time: '08:02 AM', isMe: true }
])

// Personalization Logic
const assignedRoute = computed(() => store.driverBus?.routes)
const busStatus = computed(() => store.driverBus?.status || 'Active')

const tripStatusText = computed(() => {
  if (busStatus.value === 'On Route') return 'In Transit'
  return 'Ready for Duty'
})

const tripStatusClass = computed(() => {
  if (busStatus.value === 'On Route') return 'bg-green-500/10 text-green-500 border-green-500/20'
  return 'bg-accent/10 text-accent border-accent/20'
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
  console.log('Successfully boarded ticket:', ticketId)
}

function startTrip() {
  if (!store.driverBus?.id) return
  store.updateBusStatus(store.driverBus.id, 'On Route')
}

function cancelSOS() {
  clearInterval(sosTimer)
  sosCountdown.value = 0
}

function triggerSOS() {
  sosCountdown.value = 5
  sosTimer = setInterval(() => {
    sosCountdown.value--
    if (sosCountdown.value <= 0) {
      clearInterval(sosTimer)
      alert("EMERGENCY SIGNAL SENT TO DISPATCH")
      sosCountdown.value = 0
    }
  }, 1000)
}

function openChat() {
  isChatOpen.value = true
}

async function handleSignOut() {
  await store.signOut()
  router.push('/admin-login')
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }

.ghost-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  transition: all 0.2s;
}

.ghost-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.ghost-btn:active {
  transform: scale(0.98);
}

.ghost-btn:disabled {
  opacity: 0.3;
}

.shadow-3xl {
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6);
}
</style>
