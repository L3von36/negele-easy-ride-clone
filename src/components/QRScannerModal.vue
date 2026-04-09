<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-[#1E293B] rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden animate-slide-up">
      <div class="p-6 sm:p-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2M6 20h2" /></svg>
             </div>
             <div>
                <h3 class="text-white font-black text-xl tracking-tight">Scanner</h3>
                <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Ticket Verification</p>
             </div>
          </div>
          <button @click="$emit('close')" class="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Scanner Container -->
        <div class="relative bg-black rounded-3xl overflow-hidden aspect-square border border-white/5 shadow-inner">
           <div id="qr-reader" class="w-full h-full"></div>
           
           <!-- Overlay UI -->
           <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div class="w-64 h-64 border-2 border-accent/50 rounded-3xl relative">
                  <div class="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-xl"></div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-xl"></div>
                  <div class="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-xl"></div>
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-xl"></div>
              </div>
              <p class="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-6 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">Position QR in center</p>
           </div>
        </div>

        <div class="mt-8 flex flex-col gap-3">
           <div v-if="lastResult" class="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center gap-4 animate-fade-in">
              <div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white shrink-0">
                 <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                 <p class="text-green-500 text-[10px] font-black uppercase tracking-widest">Boarded Successfully</p>
                 <p class="text-white font-bold text-sm">Ticket #{{ lastResult }}</p>
              </div>
           </div>
           
           <p class="text-center text-white/30 text-[10px] font-medium leading-relaxed px-4">
              Please grant camera permissions when prompted. Scanning is handled locally on your device for security.
           </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { store } from '../store.js'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'scanned'])

const lastResult = ref(null)
let html5QrcodeScanner = null

function onScanSuccess(decodedText) {
  // Assuming decodedText is the booking ID
  const bookingId = decodedText
  const booking = store.bookings.find(b => b.id === bookingId)
  
  if (booking && !booking.boarded) {
    store.toggleBoarding(bookingId)
    lastResult.value = bookingId
    emit('scanned', bookingId)
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      lastResult.value = null
    }, 3000)
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      initScanner()
    }, 100)
  } else {
    stopScanner()
  }
})

function initScanner() {
  const container = document.getElementById('qr-reader')
  if (!container) return

  html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", 
    { 
      fps: 10, 
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1,
      rememberLastUsedCamera: true,
      showTorchButtonIfSupported: true
    },
    false
  )
  html5QrcodeScanner.render(onScanSuccess)
}

function stopScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear().catch(err => console.error("Failed to clear scanner", err))
    html5QrcodeScanner = null
  }
}

onMounted(() => {
  if (props.isOpen) initScanner()
})

onUnmounted(() => {
  stopScanner()
})
</script>

<style>
/* Override default html5-qrcode styles for better look */
#qr-reader {
  border: none !important;
}
#qr-reader__dashboard {
  background: transparent !important;
  color: white !important;
}
#qr-reader__dashboard_section_csr button {
  background: #f97316 !important;
  color: white !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 8px 16px !important;
  font-weight: 900 !important;
  font-size: 10px !important;
  text-transform: uppercase !important;
}
#qr-reader__status_span {
  display: none !important;
}
#qr-reader video {
  border-radius: 20px !important;
  object-fit: cover !important;
}

.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
