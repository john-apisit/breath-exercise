<script setup lang="ts">
import { watch, ref } from 'vue'
import { useMotion } from '@vueuse/motion'

const props = defineProps<{
  scale: number
  phase: string
  duration: number
  isActive: boolean
}>()

const circleRef = ref<HTMLElement>()

// Initialize audio for bell sound
const bellSound = new Audio('/floraphonic-copper-bell-ding-23-215438.mp3')
bellSound.volume = 0.1

// Function to play bell sound
const playBellSound = () => {
  try {
    bellSound.currentTime = 0 // Reset to start for quick successive plays
    bellSound.play()
  } catch (error) {
    console.warn('Could not play bell sound:', error)
  }
}
const motion = useMotion(circleRef, {
  initial: {
    scale: 1,
    opacity: 0.9,
  },
  enter: {
    scale: 1,
    opacity: 0.9,
  }
})

// Animate based on phase changes, not continuous scale updates
watch(() => props.phase, (newPhase) => {
  if (!motion) return
  
  if (!props.isActive) {
    // Reset to scale 1 when not active
    motion.apply({
      scale: 1,
      transition: {
        duration: 500,
        ease: 'easeOut'
      }
    })
    return
  }
  
  // Play bell sound when entering a new breathing phase
  if (newPhase === 'Inhale' || newPhase === 'Exhale' || newPhase === 'Hold') {
    playBellSound()
  }
  
  // Determine target scale based on phase
  let targetScale = 1
  let duration = props.duration
  
  if (newPhase === 'Inhale') {
    targetScale = 2.0
    duration = props.duration
  } else if (newPhase === 'Exhale') {
    targetScale = 1.0
    duration = props.duration
  } else if (newPhase === 'Hold') {
    // Maintain current scale during hold
    targetScale = props.scale
    duration = 0.3
  } else {
    // Ready state
    targetScale = 1.0
    duration = 0.5
  }
  
  motion.apply({
    scale: targetScale,
    transition: {
      duration: duration * 1000,
      ease: 'linear'
    }
  })
}, { immediate: true })

// Watch isActive to handle start/stop
watch(() => props.isActive, (isActive) => {
  if (!motion) return
  
  if (isActive) {
    // Trigger animation for current phase
    let targetScale = 1
    let duration = props.duration
    
    if (props.phase === 'Inhale') {
      targetScale = 2.0
    } else if (props.phase === 'Exhale') {
      targetScale = 1.0
    } else if (props.phase === 'Hold') {
      targetScale = props.scale
      duration = 0.3
    }
    
    motion.apply({
      scale: targetScale,
      transition: {
        duration: duration * 1000,
        ease: 'linear'
      }
    })
  } else {
    // Reset to scale 1 when stopped
    motion.apply({
      scale: 1,
      transition: {
        duration: 500,
        ease: 'easeOut'
      }
    })
  }
})

// Add subtle pulse during hold phases (only when active)
watch(() => props.phase, (newPhase, oldPhase) => {
  if (newPhase === 'Hold' && props.isActive && motion) {
    // Only pulse opacity, leave scale alone
    motion.apply({
      opacity: 0.85,
      transition: {
        duration: 1000,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror'
      }
    })
  } else if (oldPhase === 'Hold' && motion) {
    // Stop pulsing when leaving hold phase
    motion.apply({
      opacity: 0.9,
      transition: {
        duration: 300
      }
    })
  }
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      ref="circleRef"
      class="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-2xl"
    >
      <div class="w-full h-full flex items-center justify-center">
        <span 
          :key="phase"
          class="text-white text-4xl md:text-5xl font-light tracking-wide drop-shadow-lg transition-opacity duration-300"
        >
          {{ phase }}
        </span>
      </div>
    </div>
  </div>
</template>
