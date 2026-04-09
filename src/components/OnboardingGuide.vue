<template>
  <section class="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
    <!-- Background atmosphere -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
    </div>

    <div class="relative max-w-5xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-14">
        <span class="inline-block bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">How It Works</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Book your seat in <span class="text-accent">3 easy steps</span>
        </h2>
        <p class="text-white/50 text-sm mt-3 font-medium max-w-md mx-auto">Rafiki will guide you through the whole process. He's done this a thousand times. 🚌</p>
      </div>

      <!-- Main Demo Area -->
      <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        <!-- LEFT: Step Navigator -->
        <div class="flex flex-col gap-3 w-full lg:w-56 flex-shrink-0">
          <button
            v-for="(step, i) in steps"
            :key="i"
            @click="goToStep(i)"
            :class="[
              'flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left group',
              activeStep === i
                ? 'bg-accent border-accent text-white shadow-xl shadow-accent/30'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
            ]"
          >
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-all', activeStep === i ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30']">
              {{ i + 1 }}
            </div>
            <span class="text-sm font-bold leading-tight">{{ step.label }}</span>
          </button>

          <!-- Progress dots -->
          <div class="flex items-center justify-center gap-2 pt-2">
            <button
              v-for="(_, i) in steps"
              :key="i"
              @click="goToStep(i)"
              :class="['rounded-full transition-all duration-300', activeStep === i ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20']"
            ></button>
          </div>
        </div>

        <!-- RIGHT: App Screen Mockup + Mascot -->
        <div class="flex-1 relative min-h-[480px] flex items-center justify-center w-full">

          <!-- Phone Frame -->
          <div class="relative w-full max-w-[300px] mx-auto">
            <!-- Phone shell -->
            <div class="relative bg-gray-900 rounded-[3rem] border-4 border-white/10 shadow-2xl overflow-hidden" style="aspect-ratio: 9/19;">
              <!-- Status bar -->
              <div class="absolute top-0 left-0 right-0 h-8 bg-black/40 z-10 flex items-center justify-between px-6">
                <span class="text-white/50 text-[8px] font-bold">9:41</span>
                <div class="w-20 h-5 bg-black rounded-full"></div>
                <div class="flex gap-1">
                  <div class="w-3 h-2 bg-white/50 rounded-sm"></div>
                  <div class="w-2 h-2 bg-white/50 rounded-full"></div>
                </div>
              </div>

              <!-- Step Screens -->
              <transition name="screen" mode="out-in">
                <!-- Step 0: Select Route -->
                <div v-if="activeStep === 0" key="s0" class="absolute inset-0 bg-[#0F172A] pt-10 px-4 pb-4 flex flex-col">
                  <p class="text-white/40 text-[8px] uppercase tracking-widest font-black mt-2 mb-3">Search Buses</p>
                  <div class="space-y-2 flex-1">
                    <div :class="['bg-white/5 rounded-xl p-3 border transition-all duration-300', highlightEl === 'from' ? 'border-accent shadow-lg shadow-accent/20' : 'border-white/10']">
                      <p class="text-white/30 text-[7px] uppercase font-black">From</p>
                      <p class="text-white text-xs font-bold mt-0.5">Negele Borena</p>
                    </div>
                    <div class="flex justify-center py-0.5">
                      <div class="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-accent text-xs">⇅</div>
                    </div>
                    <div :class="['bg-white/5 rounded-xl p-3 border transition-all duration-300', highlightEl === 'to' ? 'border-accent shadow-lg shadow-accent/20' : 'border-white/10']">
                      <p class="text-white/30 text-[7px] uppercase font-black">To</p>
                      <p class="text-white text-xs font-bold mt-0.5">Addis Ababa</p>
                    </div>
                    <div :class="['bg-white/5 rounded-xl p-3 border transition-all duration-300', highlightEl === 'date' ? 'border-accent shadow-lg shadow-accent/20' : 'border-white/10']">
                      <p class="text-white/30 text-[7px] uppercase font-black">Date</p>
                      <p class="text-white text-xs font-bold mt-0.5">Apr 10, 2026</p>
                    </div>
                    <button :class="['w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300', highlightEl === 'search' ? 'bg-accent text-white scale-105 shadow-lg shadow-accent/30' : 'bg-white/10 text-white/50']">
                      Search Buses →
                    </button>
                  </div>
                </div>

                <!-- Step 1: Pick a Seat -->
                <div v-else-if="activeStep === 1" key="s1" class="absolute inset-0 bg-[#0F172A] pt-10 px-3 pb-4 flex flex-col">
                  <p class="text-white/40 text-[8px] uppercase tracking-widest font-black mt-2 mb-2">Pick Your Seat</p>
                  <div class="bg-white/5 rounded-xl p-2 border border-white/10 flex-1">
                    <p class="text-white/30 text-[7px] uppercase font-black text-center mb-2">— FRONT —</p>
                    <div class="grid grid-cols-4 gap-1">
                      <div
                        v-for="n in 24"
                        :key="n"
                        :class="[
                          'rounded-lg text-[7px] font-black flex items-center justify-center transition-all duration-300',
                          n === animSeatPick ? 'bg-accent text-white scale-110 shadow-md' :
                          [3,7,12,18].includes(n) ? 'bg-white/10 text-white/20' : 'bg-white/5 text-white/40',
                          n % 3 === 0 ? 'col-span-1 h-6' : 'h-6'
                        ]"
                      >{{ n }}</div>
                    </div>
                    <div :class="['mt-3 w-full py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-center transition-all duration-300', animSeatPick ? 'bg-accent text-white' : 'bg-white/10 text-white/30']">
                      {{ animSeatPick ? `Confirm Seat #${animSeatPick}` : 'Select a seat' }}
                    </div>
                  </div>
                </div>

                <!-- Step 2: Booking Confirmed + QR -->
                <div v-else-if="activeStep === 2" key="s2" class="absolute inset-0 bg-[#0F172A] pt-10 px-4 pb-4 flex flex-col items-center">
                  <!-- Success icon -->
                  <div :class="['w-12 h-12 rounded-full flex items-center justify-center mt-4 mb-3 transition-all duration-700', showQR ? 'bg-green-500 scale-100' : 'bg-green-500/30 scale-75']">
                    <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p class="text-white font-black text-sm">Booking Confirmed!</p>
                  <p class="text-white/40 text-[8px] uppercase tracking-widest mt-0.5 mb-3">Your ticket is ready</p>

                  <!-- QR Code placeholder -->
                  <div :class="['bg-white rounded-2xl p-3 transition-all duration-700', showQR ? 'opacity-100 scale-100' : 'opacity-0 scale-90']">
                    <!-- Faked QR pattern -->
                    <div class="w-24 h-24 grid grid-cols-7 gap-px">
                      <div v-for="(cell, idx) in qrPattern" :key="idx"
                        :class="['rounded-[1px]', cell ? 'bg-gray-900' : 'bg-white']"
                      ></div>
                    </div>
                  </div>
                  <p :class="['text-[8px] text-white/40 font-black uppercase mt-2 tracking-widest transition-all duration-500', showQR ? 'opacity-100' : 'opacity-0']">Scan to Board</p>

                  <!-- Save buttons -->
                  <div :class="['w-full space-y-2 mt-3 transition-all duration-700', showQR ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']">
                    <div :class="['w-full py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-center transition-all duration-300', highlightEl === 'save' ? 'bg-accent text-white scale-105' : 'bg-white/10 text-white/60']">
                      📥 Save QR Code
                    </div>
                    <div class="w-full py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-center bg-white/5 text-white/30">
                      📋 My Bookings
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Notch -->
            <div class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20"></div>
          </div>

          <!-- ===== MASCOT: RAFIKI ===== -->
          <div
            :class="['absolute transition-all duration-700 ease-in-out select-none pointer-events-none', mascotPosition]"
          >
            <div class="relative">
              <!-- Body -->
              <div :class="['text-5xl sm:text-6xl transition-all duration-300', mascotBounce ? 'animate-bounce' : '', mascotSpin ? 'animate-spin' : '']">
                {{ mascotEmoji }}
              </div>
              <!-- Speech Bubble -->
              <div
                v-if="mascotSpeech"
                :class="[
                  'absolute bg-white rounded-2xl shadow-2xl px-3 py-2 text-xs font-bold text-gray-800 whitespace-nowrap bottom-full mb-2',
                  mascotBubbleSide === 'left' ? 'left-0' : 'right-0'
                ]"
                style="max-width: 180px; white-space: normal;"
              >
                {{ mascotSpeech }}
                <div :class="['absolute top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white', mascotBubbleSide === 'left' ? 'left-4' : 'right-4']"></div>
              </div>
            </div>
          </div>

          <!-- Tap Indicator -->
          <transition name="tap">
            <div
              v-if="showTap"
              class="absolute pointer-events-none z-20"
              :style="tapPosition"
            >
              <div class="w-10 h-10 rounded-full bg-accent/40 border-2 border-accent animate-ping"></div>
              <div class="absolute inset-2 rounded-full bg-accent/60"></div>
            </div>
          </transition>

        </div>
      </div>

      <!-- Bottom: Tips Bar -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="tip in tips"
          :key="tip.icon"
          class="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3 hover:bg-white/10 transition-all"
        >
          <span class="text-2xl flex-shrink-0 mt-0.5">{{ tip.icon }}</span>
          <div>
            <p class="text-white font-bold text-sm">{{ tip.title }}</p>
            <p class="text-white/40 text-xs mt-1 leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Steps definition
const steps = [
  { label: 'Choose Your Route' },
  { label: 'Pick a Seat' },
  { label: 'Get Your QR Ticket' },
]

const tips = [
  { icon: '📸', title: 'Screenshot your QR', desc: 'Take a screenshot of your QR code so it\'s accessible offline at the station.' },
  { icon: '💾', title: 'Save to phone', desc: 'Tap "Save QR" on the confirmation page to download it directly to your gallery.' },
  { icon: '🔒', title: 'Keep it safe', desc: 'One QR code = one seat. Don\'t share it with others to avoid conflicts at boarding.' },
]

// QR fake pattern (7x7 grid)
const qrPattern = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,1,0,0,1,
  1,0,1,0,1,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
]

const activeStep = ref(0)
const highlightEl = ref('')
const animSeatPick = ref(null)
const showQR = ref(false)
const mascotEmoji = ref('🧑‍✈️')
const mascotSpeech = ref('')
const mascotPosition = ref('bottom-4 -right-4 sm:-right-12')
const mascotBubbleSide = ref('right')
const mascotBounce = ref(false)
const mascotSpin = ref(false)
const showTap = ref(false)
const tapPosition = ref({ top: '50%', left: '50%' })

let timer = null

function clearTimer() {
  if (timer) clearInterval(timer)
}

// Step 0 animation sequence
function runStep0() {
  mascotEmoji.value = '🧑‍✈️'
  mascotPosition.value = 'bottom-4 -right-4 sm:-right-12'
  mascotBubbleSide.value = 'right'
  mascotSpeech.value = "First, pick where you're going! ✈️"
  mascotBounce.value = true
  highlightEl.value = 'from'

  let seq = 0
  clearTimer()
  timer = setInterval(() => {
    seq++
    if (seq === 1) { highlightEl.value = 'to'; mascotSpeech.value = 'Now select your destination 🎯' }
    if (seq === 2) { highlightEl.value = 'date'; mascotSpeech.value = 'Pick your travel date 📅' }
    if (seq === 3) {
      highlightEl.value = 'search'
      mascotSpeech.value = 'Hit search! I\'ll find the best buses 🚌'
      showTap.value = true
      tapPosition.value = { bottom: '20%', left: '50%', transform: 'translateX(-50%)' }
    }
    if (seq === 4) { showTap.value = false; seq = 0; highlightEl.value = 'from'; mascotSpeech.value = "First, pick where you're going! ✈️" }
  }, 1800)
}

// Step 1 animation sequence
function runStep1() {
  mascotEmoji.value = '🧑‍✈️'
  mascotPosition.value = 'bottom-4 -left-4 sm:-left-12'
  mascotBubbleSide.value = 'left'
  mascotSpeech.value = 'Green = available. Tap one! 🟢'
  mascotBounce.value = false
  animSeatPick.value = null
  highlightEl.value = ''

  clearTimer()
  let picked = false
  timer = setInterval(() => {
    if (!picked) {
      const choices = [5, 9, 14, 20]
      animSeatPick.value = choices[Math.floor(Math.random() * choices.length)]
      mascotSpeech.value = `Seat #${animSeatPick.value}? Great choice! 😄`
      mascotBounce.value = true
      showTap.value = true
      tapPosition.value = { top: '35%', left: '45%' }
      picked = true
    } else {
      animSeatPick.value = null
      mascotSpeech.value = 'Green = available. Tap one! 🟢'
      mascotBounce.value = false
      showTap.value = false
      picked = false
    }
  }, 2000)
}

// Step 2 animation sequence
function runStep2() {
  mascotEmoji.value = '🥳'
  mascotPosition.value = 'bottom-4 -right-4 sm:-right-12'
  mascotBubbleSide.value = 'right'
  mascotSpeech.value = 'You\'re booked! Your QR is ready 🎉'
  mascotBounce.value = true
  showQR.value = false
  highlightEl.value = ''
  showTap.value = false

  clearTimer()
  setTimeout(() => {
    showQR.value = true
    mascotSpeech.value = 'Save this QR code to your phone! 📱'
  }, 600)

  let seq = 0
  timer = setInterval(() => {
    seq++
    if (seq === 1) {
      highlightEl.value = 'save'
      mascotSpeech.value = 'Tap SAVE to keep it safe 📥'
      mascotEmoji.value = '🧑‍✈️'
      showTap.value = true
      tapPosition.value = { bottom: '28%', left: '50%', transform: 'translateX(-50%)' }
    }
    if (seq === 2) {
      highlightEl.value = ''
      showTap.value = false
      mascotSpeech.value = 'Or take a screenshot! 📸'
      mascotEmoji.value = '🥳'
      mascotBounce.value = true
    }
    if (seq === 3) {
      mascotSpeech.value = 'Show it to the driver at the gate ✅'
      mascotBounce.value = false
      mascotEmoji.value = '🧑‍✈️'
      seq = 0
    }
  }, 2400)
}

function goToStep(i) {
  clearTimer()
  showTap.value = false
  mascotBounce.value = false
  activeStep.value = i

  if (i === 0) runStep0()
  else if (i === 1) runStep1()
  else if (i === 2) runStep2()
}

// Auto-advance
let autoTimer = null
function startAutoAdvance() {
  autoTimer = setInterval(() => {
    const next = (activeStep.value + 1) % steps.length
    goToStep(next)
  }, 9000)
}

onMounted(() => {
  goToStep(0)
  startAutoAdvance()
})

onUnmounted(() => {
  clearTimer()
  if (autoTimer) clearInterval(autoTimer)
})
</script>

<style scoped>
.screen-enter-active, .screen-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.screen-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.97);
}
.screen-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.97);
}
.tap-enter-active, .tap-leave-active {
  transition: all 0.3s ease;
}
.tap-enter-from, .tap-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
