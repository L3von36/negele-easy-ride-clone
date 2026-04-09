<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Revenue Bar Chart -->
    <div class="bg-card p-6 rounded-xl border border-border shadow-soft h-80 flex flex-col">
      <h3 class="text-sm font-semibold text-text-primary mb-4">Revenue Trend (ETB)</h3>
      <div class="flex-1 relative">
        <Bar :data="revenueData" :options="barOptions" />
      </div>
    </div>
    
    <!-- Popularity Doughnut Chart -->
    <div class="bg-card p-6 rounded-xl border border-border shadow-soft h-80 flex flex-col">
      <h3 class="text-sm font-semibold text-text-primary mb-4">Route Popularity</h3>
      <div class="flex-1 relative flex justify-center">
        <Doughnut :data="routeData" :options="pieOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

import { getRecentEthiopianDates } from '../lib/ethiopianCalendar.js'
import { t } from '../store.js'

// Compute dynamic chart data based on store
const revenueData = computed(() => {
  const labels = getRecentEthiopianDates(6, store, t)
  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: '#F97316', // Accent orange
        borderRadius: 4,
        data: [15000, 22000, 18000, 24000, 31000, store.totalRevenue]
      }
    ]
  }
})

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#e4e4e7' } },
    x: { grid: { display: false } }
  }
}

const routeData = computed(() => {
  // Dynamically map routes to random/computed distributions
  const labels = store.routes.slice(0, 4).map(r => r.from.split(' ')[0] + '-' + r.to.split(' ')[0])
  return {
    labels,
    datasets: [
      {
        backgroundColor: ['#F97316', '#3b82f6', '#8b5cf6', '#10b981'],
        data: [45, 25, 20, 10]
      }
    ]
  }
})

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' }
  }
}
</script>
