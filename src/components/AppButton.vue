<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'relative inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
      variantClasses,
      fullWidth ? 'w-full' : 'px-6',
      sizeClasses,
      'rounded-xl'
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // primary, secondary, outline, ghost
  },
  size: {
    type: String,
    default: 'md' // sm, md, lg
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-accent text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
    case 'secondary':
      return 'bg-primary-100 text-text-primary hover:bg-gray-200'
    case 'outline':
      return 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white'
    case 'ghost':
      return 'bg-transparent text-text-secondary hover:bg-gray-100'
    default:
      return 'bg-accent text-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'py-2 text-xs'
    case 'md':
      return 'py-3.5 text-sm'
    case 'lg':
      return 'py-4 text-base'
    default:
      return 'py-3.5 text-sm'
  }
})
</script>
