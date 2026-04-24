<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <MainHeader />

    <div class="max-w-md mx-auto px-4 sm:px-6 py-8">

      <!-- Success icon -->
      <div class="flex justify-center mb-5 mt-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-accent bg-accent/10 flex items-center justify-center animate-fade-in shadow-lg">
          <svg class="h-8 w-8 sm:h-10 sm:w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <div class="text-center mb-6 animate-fade-in">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">{{ t('confirmed') }}</h2>
        <p class="text-text-secondary text-sm mt-1 font-medium">{{ t('ready') }}</p>
        <div v-if="bookingId" class="mt-2 text-xs font-bold text-accent uppercase tracking-widest">
          ID: #{{ bookingId }}
        </div>
      </div>

      <!-- Boarding Pass -->
      <div ref="ticketRef" class="bg-card rounded-2xl border-t-4 border-accent border border-border shadow-medium overflow-hidden mb-6 animate-fade-in">
        <!-- Header strip -->
        <div class="bg-primary-100 px-5 sm:px-6 py-4 border-b border-border">
          <div class="flex items-center gap-2 mb-1">
            <svg class="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
            </svg>
            <p class="text-text-secondary text-xs font-semibold tracking-widest uppercase">{{ t('boarding_pass') }}</p>
          </div>
          <h3 class="text-text-primary font-bold text-base sm:text-lg">
            {{ t('cities.' + route.query.from) || from }} → {{ t('cities.' + route.query.to) || to }}
          </h3>
        </div>

        <!-- Ticket tear line -->
        <div class="flex items-center">
          <div class="w-4 h-4 bg-background border-r border-border rounded-full -ml-2 flex-shrink-0"></div>
          <div class="flex-1 border-t-2 border-dashed border-border mx-1"></div>
          <div class="w-4 h-4 bg-background border-l border-border rounded-full -mr-2 flex-shrink-0"></div>
        </div>

        <!-- Details -->
        <div class="px-5 sm:px-6 py-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-text-secondary text-sm">{{ t('passenger') }}</span>
            <span class="text-text-primary text-sm font-medium">{{ name }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-text-secondary text-sm">{{ t('phone') }}</span>
            <span class="text-text-primary text-sm font-medium">{{ phone }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-text-secondary text-sm">{{ t('seat') }}</span>
            <span class="text-text-primary text-sm font-medium">#{{ seat }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-text-secondary text-sm">{{ t('bus') }}</span>
            <span class="text-text-primary text-sm font-medium">{{ busName }}</span>
          </div>

          <!-- Total -->
          <div class="pt-3 mt-2 border-t border-border flex items-center justify-between">
            <span class="font-bold text-text-primary">{{ t('total') }}</span>
            <div>
              <span class="text-2xl font-extrabold text-text-primary">{{ price }}</span>
              <span class="text-xs font-bold text-text-secondary ml-1">ETB</span>
            </div>
          </div>
        </div>

        <!-- Footer note -->
        <div class="bg-primary-100 px-5 sm:px-6 py-5 border-t border-border flex flex-col items-center">
          <div class="bg-white p-3 rounded-2xl shadow-inner mb-4 border border-border">
            <QrcodeVue :value="bookingId" :size="120" level="H" />
          </div>
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-3">Scan to Board</p>
          <p class="text-xs text-text-secondary font-medium text-center max-w-[200px] leading-relaxed">
            {{ t('station_note').replace('{phone}', phone) }}
          </p>
          <!-- Share / copy actions -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              @click="saveTicketImage"
              :disabled="isSaving"
              class="flex items-center gap-1.5 px-3 py-2 bg-text-primary text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              <svg v-if="!isSaving" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <svg v-else class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSaving ? '...' : t('feedback.save_qr') }}
            </button>
            <button
              v-if="canShare"
              @click="shareTicket"
              class="flex items-center gap-1.5 px-3 py-2 bg-accent text-white text-xs font-semibold rounded-xl hover:bg-accent/90 transition-all"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              Share
            </button>
            <button
              @click="copyId"
              :aria-label="copied ? 'Copied!' : 'Copy booking ID'"
              class="flex items-center gap-1.5 px-3 py-2 bg-white border border-border text-xs font-semibold text-text-primary rounded-xl hover:bg-background transition-all"
            >
              <svg v-if="!copied" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <svg v-else class="h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ copied ? 'Copied!' : 'Copy ID' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div v-if="!feedbackSubmitted" class="bg-card rounded-2xl border border-border shadow-soft p-6 mb-6 animate-fade-in delay-200">
        <h3 class="text-lg font-black text-text-primary mb-1">{{ t('feedback.title') }}</h3>
        <p class="text-xs text-text-secondary mb-4">{{ t('feedback.subtitle') }}</p>
        
        <div class="flex gap-2 mb-4">
          <button 
            v-for="star in 5" 
            :key="star" 
            @click="rating = star"
            class="transition-transform active:scale-90"
          >
            <svg 
              class="w-8 h-8" 
              :class="star <= rating ? 'text-accent fill-accent' : 'text-gray-300'"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>

        <textarea 
          v-model="comment"
          :placeholder="t('feedback.comment_placeholder')"
          class="w-full bg-background border border-border rounded-xl p-4 text-sm text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-accent outline-none min-h-[100px] mb-4"
        ></textarea>

        <AppButton 
          @click="submitFeedback"
          :loading="isSubmitting"
          :disabled="rating === 0"
          fullWidth
        >
          {{ t('feedback.submit') }}
        </AppButton>
      </div>

      <div v-else class="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6 text-center animate-fade-in">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <p class="text-green-800 font-bold">{{ t('feedback.thank_you') }}</p>
      </div>

      <!-- Book another -->
      <AppButton
        @click="$router.push('/')"
        variant="outline"
        fullWidth
      >
        {{ t('book_another') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '../stores/ui'
import { useAddFeedback } from '../lib/queries'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import QrcodeVue from 'qrcode.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'
import html2canvas from 'html2canvas'

const route = useRoute()
const ui = useUiStore()
const { t } = ui
const addFeedbackMutation = useAddFeedback()

const ticketRef = ref(null)
const isSaving = ref(false)

const busName   = computed(() => route.query.bus    || 'Ethio Bus')
const price     = computed(() => route.query.price  || 300)
const from      = computed(() => route.query.from   || 'Negele Borena')
const to        = computed(() => route.query.to     || 'Hawassa')
const depart    = computed(() => route.query.depart || '06:00')
const seat      = computed(() => route.query.seat   || 1)
const dateInitial = computed(() => route.query.date || new Date().toISOString())
const date      = computed(() => formatEthiopian(new Date(dateInitial.value), ui, t))
const name      = computed(() => route.query.name   || '—')
const phone     = computed(() => route.query.phone  || '—')
const bookingId = computed(() => route.query.id)

// Feedback state
const rating = ref(0)
const comment = ref('')
const feedbackSubmitted = ref(false)
const isSubmitting = ref(false)

async function submitFeedback() {
  if (rating.value === 0) return
  isSubmitting.value = true
  try {
    await addFeedbackMutation.mutateAsync({
      booking_id: bookingId.value,
      rating: rating.value,
      comment: comment.value,
      created_at: new Date().toISOString()
    })
    feedbackSubmitted.value = true
  } catch (err) {
    console.error('Feedback failed', err)
    feedbackSubmitted.value = true
  } finally {
    isSubmitting.value = false
  }
}

async function saveTicketImage() {
  if (!ticketRef.value || isSaving.value) return
  isSaving.value = true
  
  try {
    const canvas = await html2canvas(ticketRef.value, {
      scale: 3, // High quality
      useCORS: true,
      backgroundColor: '#ffffff',
      borderRadius: 16
    })
    
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `ticket-${bookingId.value || 'booking'}.png`
    link.click()
  } catch (err) {
    console.error('Failed to save ticket', err)
  } finally {
    isSaving.value = false
  }
}

const details = computed(() => [
  { label: t('passenger'),   value: name.value },
  { label: t('phone'),       value: phone.value },
  { label: t('bus'),         value: busName.value },
  { label: t('seat'),        value: `#${seat.value}` },
  { label: t('date'),        value: date.value },
  { label: t('departure'),   value: t('cities.' + route.query.from) || from.value },
  { label: t('destination'), value: t('cities.' + route.query.to)   || to.value },
])

// Share / copy
const canShare = computed(() => !!navigator.share)
const copied   = ref(false)

async function copyId() {
  try {
    await navigator.clipboard.writeText(bookingId.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (_) {
    // Clipboard access denied — silently ignore (button stays visible).
  }
}

async function shareTicket() {
  try {
    await navigator.share({
      title: 'My Bus Ticket',
      text: `Booking #${bookingId.value} — ${t('cities.' + route.query.from) || from.value} → ${t('cities.' + route.query.to) || to.value}, Seat ${seat.value}`,
    })
  } catch (_) {}
}


</script>

<style scoped></style>
