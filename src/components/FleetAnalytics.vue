<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Top Summary Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
        <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">{{ t('analytics.best_route') }}</p>
        <h3 class="text-xl font-black text-text-primary truncate">{{ topRoute.name || 'N/A' }}</h3>
        <p class="text-xs text-accent font-bold mt-2">{{ topRoute.revenue?.toLocaleString() }} {{ t('etb_label') }} {{ t('analytics.total') }}</p>
      </div>
      <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
        <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">{{ t('analytics.top_bus') }}</p>
        <h3 class="text-xl font-black text-text-primary truncate">{{ topBus.plate || 'N/A' }}</h3>
        <p class="text-xs text-green-600 font-bold mt-2">{{ topBus.efficiency }}% {{ t('analytics.efficiency') }}</p>
      </div>
      <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
        <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">{{ t('analytics.top_driver') }}</p>
        <h3 class="text-xl font-black text-text-primary truncate">{{ topDriver.name || 'N/A' }}</h3>
        <p class="text-xs text-blue-600 font-bold mt-2">{{ topDriver.trips }} {{ t('analytics.bookings') }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue by Bus Chart -->
      <div class="bg-card p-6 rounded-2xl border border-border shadow-medium h-[400px] flex flex-col">
        <h3 class="text-lg font-black text-text-primary tracking-tight mb-6">{{ t('analytics.revenue_bus') }}</h3>
        <div class="flex-1 relative">
          <Bar :data="busRevenueData" :options="chartOptions" />
        </div>
      </div>

      <!-- Bus Profitability Table -->
      <div class="bg-card rounded-2xl border border-border shadow-medium overflow-hidden">
        <div class="px-6 py-5 border-b border-border">
          <h3 class="text-lg font-black text-text-primary tracking-tight">{{ t('analytics.efficiency_monitor') }}</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-primary-100/50">
                <th class="px-6 py-3 text-[10px] font-black text-text-secondary uppercase tracking-widest">{{ t('analytics.plate') }}</th>
                <th class="px-6 py-3 text-[10px] font-black text-text-secondary uppercase tracking-widest">{{ t('analytics.revenue') }}</th>
                <th class="px-6 py-3 text-[10px] font-black text-text-secondary uppercase tracking-widest">{{ t('analytics.bookings') }}</th>
                <th class="px-6 py-3 text-[10px] font-black text-text-secondary uppercase tracking-widest">{{ t('analytics.efficiency') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="bus in busStats" :key="bus.id" class="hover:bg-primary-100/30 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-text-primary">{{ bus.plate }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary font-medium">{{ bus.revenue.toLocaleString() }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ bus.count }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
                      <div class="h-full bg-accent rounded-full" :style="{ width: bus.efficiency + '%' }"></div>
                    </div>
                    <span class="text-[10px] font-bold text-text-primary">{{ bus.efficiency }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useUiStore } from '../stores/ui'
import { useBookings, useBuses, useDrivers } from '../lib/queries'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ui = useUiStore()
const { t } = ui

const { data: bookingsData } = useBookings()
const { data: busesData } = useBuses()
const { data: driversData } = useDrivers()

const bookings = computed(() => bookingsData.value || [])
const buses = computed(() => busesData.value || [])
const drivers = computed(() => driversData.value || [])

const busStats = computed(() => {
  const stats = {}
  
  // Initialize with all buses to show zeros if no bookings
  buses.value.forEach(bus => {
    stats[bus.id] = { id: bus.id, plate: bus.plate, revenue: 0, count: 0, capacity: bus.capacity }
  })

  bookings.value.forEach(b => {
    if (b.status !== 'Confirmed' && b.status !== 'Completed') return
    if (!b.bus_id) return
    if (!stats[b.bus_id]) return
    
    stats[b.bus_id].revenue += Number(b.amount || 0)
    stats[b.bus_id].count += 1
  })

  return Object.values(stats).map(s => {
    // Efficiency calculation: (Total Bookings / (Est. Capacity * some factor for trips))
    // For simplicity, we compare to max potential bookings in the set
    const maxBookings = Math.max(...Object.values(stats).map(st => st.count)) || 1
    const efficiency = Math.round((s.count / maxBookings) * 100)
    return { ...s, efficiency }
  }).sort((a, b) => b.revenue - a.revenue)
})

const topRoute = computed(() => {
  const routes = {}
  bookings.value.forEach(b => {
    if (b.status !== 'Confirmed' && b.status !== 'Completed') return
    routes[b.route] = (routes[b.route] || 0) + Number(b.amount || 0)
  })
  const top = Object.entries(routes).sort((a, b) => b[1] - a[1])[0]
  return top ? { name: top[0], revenue: top[1] } : {}
})

const topBus = computed(() => {
  const sorted = [...busStats.value].sort((a, b) => b.efficiency - a.efficiency)
  return sorted[0] || { plate: 'N/A', avgOccupancy: 0 }
})

const topDriver = computed(() => {
  // Map drivers to their buses and aggregate trips
  const driverStats = {}
  buses.value.forEach(bus => {
    if (!bus.driver_id) return
    const driver = drivers.value.find(d => d.id === bus.driver_id)
    if (!driver) return
    
    const busStat = busStats.value.find(s => s.id === bus.id)
    if (!busStat) return

    if (!driverStats[driver.id]) driverStats[driver.id] = { name: driver.full_name, trips: 0 }
    driverStats[driver.id].trips += busStat.count // Approximated as total bookings for now
  })
  const top = Object.values(driverStats).sort((a, b) => b.trips - a.trips)[0]
  return top || {}
})

const busRevenueData = computed(() => {
  const topBuses = busStats.value.slice(0, 6)
  return {
    labels: topBuses.map(b => b.plate),
    datasets: [
      {
        label: t('analytics.revenue') + ' (ETB)',
        backgroundColor: '#F97316',
        borderRadius: 8,
        data: topBuses.map(b => b.revenue)
      }
    ]
  }
})


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      padding: 12,
      cornerRadius: 12,
      displayColors: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6', drawBorder: false },
      ticks: { font: { size: 10, weight: 'bold' }, color: '#64748b' }
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 10, weight: 'bold' }, color: '#64748b' }
    }
  }
}
</script>
