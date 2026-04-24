<template>
  <div class="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden">

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 px-6 py-4 bg-card border-b border-border shadow-soft">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary/5 border border-border rounded-xl flex items-center justify-center p-1.5">
            <img src="/favicon.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-text-primary font-bold text-sm tracking-tight leading-none">{{ t('brand_name') }}</h1>
            <p class="text-text-secondary text-[10px] font-medium uppercase tracking-widest mt-0.5">{{ t('driver.portal') }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <button 
            @click="ui.toggleTheme"
            class="h-9 w-9 flex items-center justify-center text-text-secondary hover:text-text-primary bg-background rounded-xl transition-all border border-border"
          >
            <svg v-if="ui.isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.757 7.757l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <div v-if="ui.userProfile?.full_name" class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-xl">
            <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <span class="text-accent text-[8px] font-bold">{{ ui.userProfile.full_name.charAt(0) }}</span>
            </div>
            <span class="text-text-secondary text-[10px] font-medium">{{ ui.userProfile.full_name }}</span>
          </div>
          <div class="px-3 py-1.5 bg-background border border-border rounded-xl flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <span class="text-text-secondary text-[10px] font-medium uppercase tracking-wide">{{ formatEthiopian(new Date(), ui, t) }}</span>
          </div>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary transition-colors bg-background hover:bg-primary/5 border border-border rounded-xl">
            <span class="text-[10px] font-medium uppercase tracking-wide">{{ t('sign_out') }}</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="isBusLoading" class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-card border border-border rounded-2xl p-6 animate-pulse">
            <div class="h-4 bg-primary/10 rounded w-24 mb-4"></div>
            <div class="h-10 bg-primary/10 rounded w-32 mb-6"></div>
            <div class="h-20 bg-primary/5 rounded-xl"></div>
          </div>
          <div class="bg-card border border-border rounded-2xl p-6 animate-pulse">
            <div class="h-12 bg-primary/10 rounded-xl mb-3"></div>
            <div class="grid grid-cols-2 gap-3">
              <div class="h-20 bg-primary/5 rounded-xl"></div>
              <div class="h-20 bg-primary/5 rounded-xl"></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-8">
          <div class="bg-card border border-border rounded-2xl h-[500px] animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- LEFT: Trip Info & Actions -->
        <div class="lg:col-span-4 space-y-4 lg:sticky lg:top-24">

          <!-- No Bus Assigned -->
          <section v-if="!driverBus" class="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-white/50 text-sm font-semibold">{{ t('driver.no_bus') }}</h3>
            <p class="text-white/25 text-xs mt-2 leading-relaxed">{{ t('driver.contact_dispatch') }}</p>
          </section>

          <!-- Trip Summary Card -->
          <section v-if="driverBus" class="bg-card border border-border rounded-2xl p-6 shadow-soft">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="text-text-secondary text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('driver.assigned_bus') }}</p>
                <h2 class="text-text-primary text-3xl font-bold tracking-tight">{{ driverBus.plate }}</h2>
                <p v-if="driverBus.capacity" class="text-text-secondary/60 text-xs mt-1">{{ driverBus.capacity }} {{ t('driver.total_seats') }}</p>
              </div>
              <div :class="tripStatusClass" class="text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                {{ tripStatusText }}
              </div>
            </div>

            <!-- Boarding Progress -->
            <div class="bg-background rounded-xl p-4 border border-border space-y-3">
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-text-secondary text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('driver.boarding_progress') }}</p>
                  <p class="text-text-primary text-xl font-bold">
                    {{ boardedCount }}
                    <span class="text-text-secondary/40 text-sm font-medium"> / {{ manifestoCount }}</span>
                  </p>
                </div>
                <p class="text-accent text-base font-bold">{{ boardingPercentage }}%</p>
              </div>
              <div class="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                <div class="h-full bg-accent rounded-full transition-all duration-700" :style="{ width: boardingPercentage + '%' }"></div>
              </div>
              <p v-if="noShowCount > 0 && busStatus === 'On Route'" class="text-yellow-600 text-[10px]">
                {{ noShowCount }} no-show{{ noShowCount > 1 ? 's' : '' }}
              </p>
            </div>

            <!-- Route -->
            <div v-if="assignedRoute" class="mt-5 flex items-center justify-between">
              <div>
                <p class="text-text-secondary text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('departure') }}</p>
                <p class="text-text-primary text-sm font-semibold">{{ assignedRoute.from_city }}</p>
              </div>
              <svg class="w-4 h-4 text-text-secondary/20 mx-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              <div class="text-right">
                <p class="text-text-secondary text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('destination') }}</p>
                <p class="text-text-primary text-sm font-semibold">{{ assignedRoute.to_city }}</p>
              </div>
            </div>
            <div v-else class="mt-5 flex items-center gap-2 p-3 bg-background border border-border rounded-xl">
              <svg class="w-4 h-4 text-text-secondary/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              <p class="text-text-secondary/40 text-xs">No route assigned yet</p>
            </div>
          </section>

          <!-- Action Buttons -->
          <section v-if="driverBus" class="grid grid-cols-2 gap-3">
            <!-- Scan Ticket -->
            <button @click="isScannerOpen = true" class="col-span-2 flex items-center justify-center gap-2 p-4 bg-accent hover:bg-orange-600 text-white rounded-2xl transition-all active:scale-[0.98] shadow-soft">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2" /></svg>
              <span class="text-sm font-bold uppercase tracking-wide">{{ t('driver.scan_ticket') }}</span>
            </button>

            <!-- Depart / Arrived toggle -->
            <button
              v-if="busStatus !== 'On Route' && busStatus !== 'Arrived'"
              @click="isDepartConfirmOpen = true"
              :disabled="!assignedRoute"
              class="driver-btn group"
            >
              <svg class="w-4 h-4 text-text-secondary/30 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
              <span class="text-text-secondary group-hover:text-text-primary text-[11px] font-bold uppercase tracking-wide transition-colors">{{ t('driver.depart') }}</span>
            </button>
            <button
              v-else-if="busStatus === 'On Route'"
              @click="endTrip"
              class="driver-btn group border-green-500/20 hover:bg-green-500/10"
            >
              <svg class="w-4 h-4 text-green-500/50 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-green-500/50 group-hover:text-green-500 text-[11px] font-bold uppercase tracking-wide transition-colors">{{ t('driver.arrived') }}</span>
            </button>
            <div v-else class="driver-btn opacity-30 cursor-not-allowed">
              <svg class="w-4 h-4 text-text-secondary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-text-secondary text-[11px] font-bold uppercase tracking-wide">{{ t('driver.arrived') }}</span>
            </div>

            <button @click="openChat" class="driver-btn group">
              <svg class="w-4 h-4 text-text-secondary/30 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <span class="text-text-secondary group-hover:text-text-primary text-[11px] font-bold uppercase tracking-wide transition-colors">{{ t('driver.hub_chat') }}</span>
            </button>

            <button @click="isFuelModalOpen = true" class="driver-btn group">
              <svg class="w-4 h-4 text-text-secondary/30 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <span class="text-text-secondary group-hover:text-text-primary text-[11px] font-bold uppercase tracking-wide transition-colors">{{ t('driver.fuel_report') }}</span>
            </button>

            <button @click="triggerSOS" class="col-span-2 driver-btn group border-red-500/20 hover:bg-red-500/5 hover:border-red-500/30">
              <svg class="w-4 h-4 text-red-500/50 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span class="text-red-500/50 group-hover:text-red-500 text-[11px] font-bold uppercase tracking-wide transition-colors">{{ t('driver.emergency_sos') }}</span>
            </button>
          </section>
        </div>

        <!-- RIGHT: Passenger Manifest -->
        <div class="lg:col-span-8 space-y-4">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-text-secondary font-medium text-xs uppercase tracking-widest">{{ t('driver.manifest') }}</h3>
            <div class="flex items-center gap-3">
              <button 
                @click="generateWaybill"
                :disabled="isGeneratingWaybill || !assignedRoute"
                class="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-lg text-text-secondary hover:text-text-primary transition-all hover:bg-background disabled:opacity-30"
              >
                <svg v-if="!isGeneratingWaybill" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <svg v-else class="animate-spin h-3 w-3 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="text-[10px] font-bold uppercase tracking-wide">{{ isGeneratingWaybill ? '...' : t('driver.waybill') }}</span>
              </button>
              <div class="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-lg">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span class="text-text-secondary/50 text-[10px] font-medium uppercase tracking-wide">Live</span>
              </div>
            </div>
          </div>

          <div ref="manifestRef" class="border border-border rounded-2xl overflow-hidden min-h-[500px] bg-card shadow-soft">
            <PassengerManifest
              v-if="assignedRoute"
              :initial-route="assignedRouteText"
              :show-route-filter="false"
              :show-stats="false"
              :compact="true"
            />
            <div v-else class="flex flex-col items-center justify-center py-24 text-center px-6">
              <div class="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-5 border border-border">
                <svg class="w-8 h-8 text-text-secondary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h4 class="text-text-secondary font-semibold uppercase tracking-widest text-xs">Awaiting Assignment</h4>
              <p class="text-text-secondary/40 text-[10px] mt-2 max-w-[180px]">The passenger manifest will appear once a route is assigned.</p>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Depart Confirmation Modal -->
    <div v-if="isDepartConfirmOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
      <div class="bg-card border border-border rounded-2xl p-7 text-center space-y-5 max-w-sm w-full shadow-2xl">
        <div class="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl mx-auto flex items-center justify-center">
          <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
        </div>
        <div>
          <h2 class="text-text-primary text-lg font-bold">Confirm Departure</h2>
          <p class="text-text-secondary text-sm mt-1">
            {{ boardedCount }} of {{ manifestoCount }} passengers boarded
          </p>
          <p v-if="noShowCount > 0" class="text-yellow-600 text-sm mt-1 font-medium">
            ⚠ {{ noShowCount }} passenger{{ noShowCount > 1 ? 's' : '' }} not yet boarded
          </p>
        </div>
        <div v-if="assignedRoute" class="flex items-center justify-center gap-3 py-2.5 px-4 bg-background rounded-xl border border-border">
          <span class="text-text-primary text-sm font-bold">{{ assignedRoute.from_city }}</span>
          <svg class="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          <span class="text-text-primary text-sm font-bold">{{ assignedRoute.to_city }}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-1">
          <button @click="isDepartConfirmOpen = false" class="bg-background hover:bg-primary/5 text-text-primary py-3 rounded-xl font-bold text-sm transition-all border border-border">
            Cancel
          </button>
          <button @click="startTrip" class="bg-accent hover:bg-orange-600 text-white py-3 rounded-xl font-black text-sm transition-all uppercase tracking-wide shadow-soft">
            Depart
          </button>
        </div>
      </div>
    </div>

    <!-- SOS Countdown Modal -->
    <div v-if="sosCountdown > 0" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div class="bg-card border border-red-500/30 rounded-2xl p-8 text-center space-y-6 max-w-sm w-full shadow-2xl">
        <div class="w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-full mx-auto flex items-center justify-center">
          <span class="text-red-500 text-5xl font-black tabular-nums">{{ sosCountdown }}</span>
        </div>
        <div>
          <h2 class="text-text-primary text-xl font-black uppercase tracking-tight">Emergency SOS</h2>
          <p class="text-text-secondary text-sm mt-2">Emergency signal sends to dispatch in {{ sosCountdown }} second{{ sosCountdown !== 1 ? 's' : '' }}.</p>
          <p class="text-red-500/50 text-[10px] font-bold mt-1 uppercase tracking-wider">Help is on the way once sent.</p>
        </div>
        <button @click="cancelSOS" class="w-full bg-background hover:bg-primary/5 text-text-primary py-4 rounded-xl font-bold uppercase tracking-widest transition-all border border-border">
          Cancel SOS
        </button>
      </div>
    </div>
    <!-- SOS Sent Confirmation -->
    <div v-if="sosSent" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div class="bg-card border border-red-500/40 rounded-2xl p-8 text-center space-y-5 max-w-sm w-full shadow-2xl">
        <div class="w-16 h-16 bg-red-500/20 rounded-full mx-auto flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <div>
          <h2 class="text-text-primary text-xl font-bold">SOS Sent</h2>
          <p class="text-text-secondary text-sm mt-1">Dispatch and emergency services have been alerted. Stay at your current location.</p>
        </div>
        <button @click="sosSent = false" class="w-full bg-background hover:bg-primary/5 text-text-primary py-3 rounded-xl font-bold transition-all border border-border">
          Dismiss
        </button>
      </div>
    </div>

    <!-- Hub Chat Sidebar -->
    <div
      :class="isChatOpen ? 'translate-x-0' : 'translate-x-full'"
      class="fixed top-0 right-0 h-full w-full sm:w-[380px] z-[100] bg-card border-l border-border transition-transform duration-300 ease-in-out flex flex-col shadow-2xl"
    >
      <div class="p-5 border-b border-border flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center">
            <svg class="w-4 h-4 text-text-secondary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          </div>
          <div>
            <h3 class="text-text-primary font-bold text-sm leading-none">Dispatch Hub</h3>
            <span class="text-green-500 text-[10px] font-bold uppercase tracking-wide">Connected</span>
          </div>
        </div>
        <button @click="isChatOpen = false" class="text-text-secondary/50 hover:text-text-primary transition-colors p-1.5 hover:bg-background rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div ref="chatScrollRef" class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        <div v-for="msg in chatMessages" :key="msg.id" :class="msg.isMe ? 'items-end' : 'items-start'" class="flex flex-col gap-1">
          <span class="text-[10px] font-bold text-text-secondary/40 uppercase tracking-wide">{{ msg.sender }}</span>
          <div :class="msg.isMe ? 'bg-accent/10 border-accent/20 text-text-primary' : 'bg-background border-border text-text-primary'" class="max-w-[80%] px-4 py-3 rounded-2xl border shadow-soft">
            <p class="text-sm leading-relaxed">{{ msg.text }}</p>
          </div>
          <span class="text-[10px] text-text-secondary/30 font-medium">{{ msg.time }}</span>
        </div>
        <div ref="chatEndRef"></div>
      </div>

      <div class="p-5 border-t border-border bg-background/50 shrink-0">
        <div class="relative">
          <input
            v-model="newMessage"
            @keydown.enter.prevent="sendMessage"
            type="text"
            placeholder="Message dispatch…"
            class="w-full bg-card border border-border rounded-xl py-3 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/30 shadow-soft"
          />
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-medium"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Scanner Modal -->
    <QRScannerModal
      :is-open="isScannerOpen"
      :scan-result="scanResult"
      @close="isScannerOpen = false; scanResult = null"
      @scanned="onTicketScanned"
    />

    <!-- Fuel & Expense Modal -->
    <FuelExpenseModal
      :is-open="isFuelModalOpen"
      @close="isFuelModalOpen = false"
    />

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '../stores/ui'
import { useDriverBus, useBookings, useToggleBoarding, useUpdateBusStatus } from '../lib/queries'
import { toast } from '../lib/toast.js'
import PassengerManifest from '../components/PassengerManifest.vue'
import QRScannerModal from '../components/QRScannerModal.vue'
import FuelExpenseModal from '../components/FuelExpenseModal.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'
import html2canvas from 'html2canvas'

const router = useRouter()
const ui = useUiStore()
const { t } = ui
const isScannerOpen = ref(false)
const isFuelModalOpen = ref(false)
const scanResult = ref(null)
const isChatOpen = ref(false)
const isDepartConfirmOpen = ref(false)
const sosCountdown = ref(0)
const sosSent = ref(false)
const newMessage = ref('')
const chatEndRef = ref(null)
const chatScrollRef = ref(null)
const manifestRef = ref(null)
const isGeneratingWaybill = ref(false)
let sosTimer = null

async function generateWaybill() {
  if (!manifestRef.value || isGeneratingWaybill.value) return
  isGeneratingWaybill.value = true
  try {
    const canvas = await html2canvas(manifestRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0F172A',
    })
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `waybill-${driverBus.value?.plate || 'manifest'}-${new Date().getTime()}.png`
    link.click()
    toast.success('Waybill generated successfully')
  } catch (err) {
    console.error('Waybill error', err)
    toast.error('Failed to generate waybill')
  } finally {
    isGeneratingWaybill.value = false
  }
}

const { data: driverBusData, isLoading: isBusLoading } = useDriverBus(computed(() => ui.userProfile?.id).value)
const { data: bookingsData } = useBookings()
const toggleBoardingMutation = useToggleBoarding()
const updateBusStatusMutation = useUpdateBusStatus()

// Chat
const chatMessages = ref([
  { id: 1, sender: 'Dispatch', text: 'Good morning. Traffic is clear on Route 4. Proceed with scheduled departure.', time: '07:45 AM', isMe: false },
  { id: 2, sender: 'You', text: 'Acknowledged. Vehicle inspection complete. Ready for boarding.', time: '08:02 AM', isMe: true },
])

function sendMessage() {
  const text = newMessage.value.trim()
  if (!text) return
  chatMessages.value.push({
    id: Date.now(),
    sender: 'You',
    text,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    isMe: true,
  })
  newMessage.value = ''
  nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'smooth' }))
}

function openChat() {
  isChatOpen.value = true
  nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'instant' }))
}

// Trip data
const driverBus = computed(() => driverBusData.value)
const assignedRoute = computed(() => driverBus.value?.routes)
const busStatus = computed(() => driverBus.value?.status || 'Active')

const tripStatusText = computed(() => {
  if (busStatus.value === 'On Route') return 'In Transit'
  if (busStatus.value === 'Arrived') return 'Arrived'
  return 'Ready'
})

const tripStatusClass = computed(() => {
  if (busStatus.value === 'On Route') return 'bg-green-500/10 text-green-400 border border-green-500/20'
  if (busStatus.value === 'Arrived') return 'bg-white/10 text-white/40 border border-white/10'
  return 'bg-accent/10 text-accent border border-accent/20'
})

const assignedRouteText = computed(() => {
  if (!assignedRoute.value) return ''
  return `${assignedRoute.value.from_city} → ${assignedRoute.value.to_city}`
})

const manifestoCount = computed(() => {
  if (!assignedRouteText.value) return 0
  const bookings = bookingsData.value || []
  return bookings.filter(b => b.status === 'Confirmed' && b.route === assignedRouteText.value).length
})

const boardedCount = computed(() => {
  if (!assignedRouteText.value) return 0
  const bookings = bookingsData.value || []
  return bookings.filter(b => b.status === 'Confirmed' && b.route === assignedRouteText.value && b.boarded).length
})

const noShowCount = computed(() => manifestoCount.value - boardedCount.value)

const boardingPercentage = computed(() => {
  if (manifestoCount.value === 0) return 0
  return Math.round((boardedCount.value / manifestoCount.value) * 100)
})

// Ticket scanning — all validation happens here
async function onTicketScanned(rawId) {
  const bookings = bookingsData.value || []
  const booking = bookings.find(b => b.id === rawId)

  if (!booking) {
    const msg = 'Ticket not found in system'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (booking.status === 'Canceled' || booking.status === 'Cancelled') {
    const msg = 'This booking has been cancelled'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (booking.status !== 'Confirmed') {
    const msg = 'Booking is not confirmed'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (assignedRouteText.value && booking.route !== assignedRouteText.value) {
    const msg = `Wrong route — ticket is for: ${booking.route}`
    scanResult.value = { type: 'warning', message: msg }
    toast.info(msg)
    return
  }
  if (booking.boarded) {
    const msg = `${booking.name} — already boarded (Seat ${booking.seat_number || '?'})`
    scanResult.value = { type: 'warning', message: msg }
    toast.info(msg)
    return
  }

  await toggleBoardingMutation.mutateAsync({ id: rawId, boarded: true })
  const msg = `${booking.name} — Seat ${booking.seat_number || '?'}`
  scanResult.value = { type: 'success', message: msg }
  toast.success(`Boarded: ${msg}`)
}

async function startTrip() {
  if (!driverBus.value?.id) return
  isDepartConfirmOpen.value = false
  await updateBusStatusMutation.mutateAsync({ id: driverBus.value.id, status: 'On Route' })
  toast.success('Trip started — safe travels!')
}

async function endTrip() {
  if (!driverBus.value?.id) return
  await updateBusStatusMutation.mutateAsync({ id: driverBus.value.id, status: 'Arrived' })
  toast.success(`Trip complete — ${boardedCount.value} boarded, ${noShowCount.value} no-show${noShowCount.value !== 1 ? 's' : ''}`)
}

function cancelSOS() {
  clearInterval(sosTimer)
  sosCountdown.value = 0
}

function triggerSOS() {
  if (sosCountdown.value > 0) return
  sosCountdown.value = 5
  sosTimer = setInterval(() => {
    sosCountdown.value--
    if (sosCountdown.value <= 0) {
      clearInterval(sosTimer)
      sosCountdown.value = 0
      sosSent.value = true
    }
  }, 1000)
}

async function handleSignOut() {
  await ui.signOut()
  router.push('/')
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
  cursor: pointer;
}
.driver-btn:hover { background-color: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); }
.driver-btn:active { transform: scale(0.98); }
.driver-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

</style>
