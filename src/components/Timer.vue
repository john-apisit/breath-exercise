<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useMotion } from '@vueuse/motion'

const props = defineProps<{
  phaseTimeRemaining: number
  sessionTime: string
}>()

const displayTime = computed(() => {
  return Math.ceil(props.phaseTimeRemaining)
})

const timeRef = ref<HTMLElement>()
const motion = useMotion(timeRef, {
  initial: {
    scale: 1,
    opacity: 1,
  }
})

// Pulse animation when time changes
// Skip if value hasn't actually changed to avoid unnecessary animations
watch(displayTime, (newVal, oldVal) => {
  if (newVal === oldVal) return
  if (motion) {
    motion.apply({
      scale: [1, 1.1, 1],
      transition: {
        duration: 300,
        ease: 'easeOut'
      }
    })
  }
})
</script>

<template>
  <div 
    class="text-center space-y-4"
  >
    <div class="text-white">
      <div 
        ref="timeRef"
        class="text-6xl md:text-7xl font-mono font-light tracking-wider"
      >
        {{ displayTime }}
      </div>
      <div class="text-sm text-white/60 uppercase tracking-widest mt-2">
        seconds remaining
      </div>
    </div>
    
    <div 
      class="text-white/80"
    >
      <div class="text-2xl font-mono">
        {{ sessionTime }}
      </div>
      <div class="text-xs text-white/60 uppercase tracking-widest mt-1">
        session time
      </div>
    </div>
  </div>
</template>
