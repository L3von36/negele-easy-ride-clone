<template>
  <div class="min-h-screen bg-[#0F172A] overflow-x-hidden">

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 px-6 py-4 bg-[#0F172A] border-b border-white/10">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1.5">
            <img src="/favicon.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-white font-bold text-sm tracking-tight leading-none">{{ t('brand_name') }}</h1>
            <p class="text-white/30 text-[10px] font-medium uppercase tracking-widest mt-0.5">Driver Portal</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <span class="text-white/50 text-[10px] font-medium uppercase tracking-wide">{{ formatEthiopian(new Date(), store, t) }}</span>
          </div>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center justify-center gap-2 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl">
            <span class="text-[10px] font-medium uppercase tracking-wide">Sign Out</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- LEFT: Trip Info & Actions -->
        <div class="lg:col-span-4 space-y-4 lg:sticky lg:top-24">

          <!-- Trip Summary Card -->
          <section v-if="store.driverBus" class="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">Assigned Plate</p>
                <h2 class="text-white text-3xl font-bold tracking-tight">{{ store.driverBus?.plate }}</h2>
              </div>
              <div :class="tripStatusClass" class="text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                {{ tripStatusText }}
              </div>
            </div>

            <!-- Boarding Progress -->
            <div class="bg-black/20 rounded-xl p-4 border border-white/5 space-y-3">
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('boarding_progress') }}</p>
                  <p class="text-white text-xl font-bold">{{ boardedCount }} <span class="text-white/30 text-sm font-medium">/ {{ manifestoCount }}</span></p>
                </div>
                <p class="text-accent text-base font-bold">{{ boardingPercentage }}%</p>
              </div>
              <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-accent rounded-full transition-all duration-700" :style="{ width: boardingPercentage + '%' }"></div>
              </div>
            </div>

            <!-- Route -->
            <div v-if="assignedRoute" class="mt-5 flex items-center justify-between">
              <div>
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('departure') }}</p>
                <p class="text-white text-sm font-semibold uppercase">{{ assignedRoute.from_city }}</p>
              </div>
              <div class="h-px flex-1 mx-4 bg-white/10"></div>
              <div class="text-right">
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('destination') }}</p>
                <p class="text-white text-sm font-semibold uppercase">{{ assignedRoute.to_city }}</p>
              </div>
            </div>
          </section>

          <!-- Action Buttons -->
          <section v-if="store.driverBus" class="grid grid-cols-2 gap-3">
            <!-- Scan Ticket (Primary) -->
            <button @click="isScannerOpen = true" class="col-span-2 flex items-center justify-center gap-2 p-4 bg-accent hover:bg-orange-600 text-white rounded-2xl transition-colors active:scale-[0.98]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2" /></svg>
              <span class="text-sm font-bold uppercase tracking-wide">Scan Ticket</span>
            </button>

            <button @click="startTrip" :disabled="busStatus === 'On Route'" class="driver-btn group">
              <svg class="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
              <span class="text-white/40 group-hover:text-white/80 text-[11px] font-medium uppercase tracking-wide transition-colors">Depart</span>
            </button>

            <button @click="openChat" class="driver-btn group">
              <svg class="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <span class="text-white/40 group-hover:text-white/80 text-[11px] font-medium uppercase tracking-wide transition-colors">Hub Chat</span>
            </button>

            <button @click="triggerSOS" class="col-span-2 driver-btn group border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30">
              <svg class="w-4 h-4 text-red-500/60 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span class="text-red-500/60 group-hover:text-red-400 text-[11px] font-medium uppercase tracking-wide transition-colors">Emergency SOS</span>
            </button>
          </section>
        </div>

        <!-- RIGHT: Passenger Manifest -->
        <div class="lg:col-span-8 space-y-4">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-white/40 font-medium text-xs uppercase tracking-widest">{{ t('passenger_manifest') }}</h3>
            <div class="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span class="text-white/30 text-[10px] font-medium uppercase tracking-wide">Real-time Sync</span>
            </div>
          </div>

          <div class="border border-white/10 rounded-2xl overflow-hidden min-h-[500px]">
            <PassengerManifest
              v-if="assignedRoute"
              :initial-route="assignedRouteText"
              :show-route-filter="false"
              :show-stats="false"
              compact
            />

            <div v-else class="p-24 text-center">
              <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h4 class="text-white/30 text-sm font-semibold uppercase tracking-widest">Awaiting Assignment</h4>
              <p class="text-white/20 text-xs mt-2">The manifest will appear once a route is assigned to your bus.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- SOS Countdown Modal -->
    <div v-if="sosCountdown > 0" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6">
      <div class="bg-[#1E293B] border border-red-500/30 rounded-2xl p-8 text-center space-y-6 max-w-sm w-full">
        <div class="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mx-auto flex items-center justify-center">
          <span class="text-red-400 text-4xl font-bold">{{ sosCountdown }}</span>
        </div>
        <div>
          <h2 class="text-white text-xl font-bold uppercase tracking-tight">Emergency SOS</h2>
          <p class="text-white/40 text-sm mt-1">Alerting dispatch in {{ sosCountdown }}s...</p>
        </div>
        <button @click="cancelSOS" class="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium uppercase tracking-wide transition-colors text-sm">
          Cancel
        </button>
      </div>
    </div>

    <!-- Hub Chat Sidebar -->
    <div
      :class="isChatOpen ? 'translate-x-0' : 'translate-x-full'"
      class="fixed top-0 right-0 h-full w-full sm:w-[380px] z-[100] bg-[#0F172A] border-l border-white/10 transition-transform duration-300 ease-in-out"
    >
      <div class="h-full flex flex-col">
        <div class="p-5 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-sm leading-none">Dispatch Hub</h3>
              <span class="text-green-400 text-[10px] font-medium uppercase tracking-wide">Connected</span>
            </div>
          </div>
          <button @click="isChatOpen = false" class="text-white/30 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div v-for="msg in chatMessages" :key="msg.id" :class="msg.isMe ? 'items-end' : 'items-start'" class="flex flex-col gap-1">
            <span class="text-[10px] font-medium text-white/30 uppercase tracking-wide">{{ msg.sender }}</span>
            <div :class="msg.isMe ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10'" class="max-w-[80%] px-4 py-3 rounded-xl border">
              <p class="text-white/70 text-sm leading-relaxed">{{ msg.text }}</p>
            </div>
            <span class="text-[10px] text-white/20">{{ msg.time }}</span>
          </div>
        </div>

        <div class="p-5 border-t border-white/10">
          <div class="relative">
            <input type="text" placeholder="Message dispatch..." class="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/30" />
            <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
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
import { ref, computed } from 'vue'
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

const chatMessages = ref([
  { id: 1, sender: 'Dispatch', text: 'Good morning Ahmed. Traffic clear on Route 4. Proceed with scheduled departure.', time: '07:45 AM', isMe: false },
  { id: 2, sender: 'Driver (Me)', text: 'Acknowledged. Vehicle inspection complete. Ready for boarding.', time: '08:02 AM', isMe: true }
])

const assignedRoute = computed(() => store.driverBus?.routes)
const busStatus = computed(() => store.driverBus?.status || 'Active')

const tripStatusText = computed(() => {
  if (busStatus.value === 'On Route') return 'In Transit'
  return 'Ready for Duty'
})

const tripStatusClass = computed(() => {
  if (busStatus.value === 'On Route') return 'bg-green-500/10 text-green-400 border border-green-500/20'
  return 'bg-accent/10 text-accent border border-accent/20'
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
.driver-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.15s;
}

.driver-btn:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}

.driver-btn:active {
  transform: scale(0.98);
}

.driver-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 10px; }
</style>
