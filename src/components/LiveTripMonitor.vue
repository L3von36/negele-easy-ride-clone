<template>
  <div class="space-y-6 animate-fade-in">
    <!-- SOS / Emergency Header -->
    <div v-if="emergencyAlerts.length > 0" class="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-4 flex items-center justify-between animate-pulse">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <div>
          <h3 class="text-red-500 font-black uppercase tracking-widest text-xs">Emergency SOS Active</h3>
          <p class="text-white font-bold text-sm">{{ emergencyAlerts.length }} driver(s) signaled for help.</p>
        </div>
      </div>
      <button class="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all">Open Response Hub</button>
    </div>

    <!-- Active Trips Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2 space-y-4">
        <div class="flex items-center justify-between px-2">
          <h3 class="text-white/40 font-black text-[10px] uppercase tracking-widest">{{ t('analytics.in_transit') }}</h3>
          <span class="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
            {{ t('analytics.live_updates') }}
          </span>
        </div>

        <div v-if="activeTrips.length === 0" class="bg-card border border-border rounded-2xl p-12 text-center">
          <svg class="w-12 h-12 text-text-secondary/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <p class="text-text-secondary font-bold text-sm">{{ t('analytics.no_active') }}</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="trip in activeTrips" :key="trip.id" class="bg-card border border-border rounded-2xl p-5 hover:border-accent transition-all group shadow-soft">
            <div class="flex justify-between items-start mb-4">
              <div>
                <p class="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-0.5">{{ t('analytics.plate') }}</p>
                <h4 class="text-lg font-black text-text-primary tracking-tight">{{ trip.plate }}</h4>
              </div>
              <div class="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                {{ t('analytics.live_fleet') }}
              </div>
            </div>

            <div class="flex items-center gap-3 mb-6">
              <div class="flex-1">
                <p class="text-[9px] font-bold text-text-secondary uppercase mb-1">{{ trip.route?.from }}</p>
                <div class="h-1 bg-primary-100 rounded-full relative overflow-hidden">
                  <div class="absolute inset-y-0 left-0 bg-accent transition-all duration-1000" :style="{ width: trip.progress + '%' }"></div>
                </div>
                <p class="text-[9px] font-bold text-text-secondary uppercase mt-1 text-right">{{ trip.route?.to }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p class="text-[8px] font-black text-text-secondary uppercase tracking-tighter mb-0.5">{{ t('analytics.est_arrival') }}</p>
                <p class="text-xs font-bold text-text-primary">{{ trip.eta }}</p>
              </div>
              <div class="text-right">
                <p class="text-[8px] font-black text-text-secondary uppercase tracking-tighter mb-0.5">{{ t('analytics.passengers') }}</p>
                <p class="text-xs font-bold text-text-primary">{{ trip.passengerCount }} {{ t('analytics.bookings') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Station Throughput -->
      <div class="space-y-4">
        <h3 class="text-white/40 font-black text-[10px] uppercase tracking-widest px-2">{{ t('analytics.station_throughput') }}</h3>
        <div class="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div v-for="station in stationStats" :key="station.name" class="space-y-2">
            <div class="flex justify-between items-end">
              <p class="text-sm font-bold text-text-primary">{{ station.name }}</p>
              <p class="text-xs font-black text-accent">{{ station.active }} {{ t('analytics.loading') }}</p>
            </div>
            <div class="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full transition-all duration-1000" :style="{ width: station.loadFactor + '%' }"></div>
            </div>
            <p class="text-[10px] text-text-secondary font-medium">{{ station.totalToday }} {{ t('analytics.total_today') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { useUiStore } from '../stores/ui'
import { useBuses, useRoutes, useBookings } from '../lib/queries'

const ui = useUiStore()
const { t } = ui

const { data: busesData } = useBuses()
const { data: routesData } = useRoutes()
const { data: bookingsData } = useBookings()

const currentTime = ref(new Date())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 30000) // Update every 30s
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const activeTrips = computed(() => {
  const buses = (busesData.value || []).filter(b => b.status === 'On Route')
  const routes = routesData.value || []
  const bookings = bookingsData.value || []

  return buses.map(bus => {
    const route = routes.find(r => r.id === bus.route_id)
    const passengerCount = bookings.filter(b => b.bus_id === bus.id && b.boarded).length
    
    // Progress Calculation
    const [h, m] = (bus.depart_time || '06:00').split(':').map(Number)
    const departDate = new Date()
    departDate.setHours(h, m, 0, 0)
    
    const durationStr = route?.duration || '4h 0m'
    const dh = Number((durationStr.match(/(\d+)\s*h/) || [])[1] || 0)
    const dm = Number((durationStr.match(/(\d+)\s*m/) || [])[1] || 0)
    const durationMs = (dh * 60 + dm) * 60 * 1000
    
    const elapsedMs = currentTime.value.getTime() - departDate.getTime()
    const progress = Math.min(Math.max(Math.round((elapsedMs / durationMs) * 100), 0), 100)
    
    const etaDate = new Date(departDate.getTime() + durationMs)
    const eta = etaDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

    return {
      ...bus,
      route,
      passengerCount,
      progress,
      eta
    }
  })
})

const emergencyAlerts = computed(() => {
  return []
})

const stationStats = computed(() => {
  const cities = ['Negele Borena', 'Addis Ababa', 'Hawassa']
  const buses = busesData.value || []
  const routes = routesData.value || []

  return cities.map(city => {
    const departingHere = buses.filter(b => {
      const r = routes.find(route => route.id === b.route_id)
      return r && r.from_city === city
    })
    const active = departingHere.filter(b => b.status === 'Active').length
    const totalToday = departingHere.length
    const loadFactor = Math.min((active / (totalToday || 1)) * 100, 100)

    return {
      name: city,
      active,
      totalToday,
      loadFactor: totalToday > 0 ? loadFactor : 0
    }
  })
})
</script>
