import { ref, computed, onUnmounted } from 'vue'
import type { BreathingPreset, Phase } from '../types/breathing'

export function useBreathingCycle(initialPreset: BreathingPreset) {
  const currentPreset = ref<BreathingPreset>(initialPreset)
  const currentPhase = ref<Phase>('inhale')
  const phaseTimeRemaining = ref(0)
  const totalSessionTime = ref(0)
  const isActive = ref(false)
  
  let phaseInterval: number | null = null
  let sessionInterval: number | null = null
  let phaseStartTime = 0
  let sessionStartTime = 0

  const phaseSequence = computed(() => {
    const sequence: { phase: Phase; duration: number }[] = [
      { phase: 'inhale', duration: currentPreset.value.inhale }
    ]
    
    if (currentPreset.value.holdAfterInhale > 0) {
      sequence.push({ phase: 'hold-inhale', duration: currentPreset.value.holdAfterInhale })
    }
    
    sequence.push({ phase: 'exhale', duration: currentPreset.value.exhale })
    
    if (currentPreset.value.holdAfterExhale > 0) {
      sequence.push({ phase: 'hold-exhale', duration: currentPreset.value.holdAfterExhale })
    }
    
    return sequence
  })

  const currentPhaseIndex = computed(() => {
    return phaseSequence.value.findIndex(p => p.phase === currentPhase.value)
  })

  const currentPhaseDuration = computed(() => {
    return phaseSequence.value[currentPhaseIndex.value]?.duration || 0
  })

  const phaseLabel = computed(() => {
    switch (currentPhase.value) {
      case 'inhale':
        return 'Inhale'
      case 'hold-inhale':
      case 'hold-exhale':
        return 'Hold'
      case 'exhale':
        return 'Exhale'
      default:
        return ''
    }
  })

  const circleScale = computed(() => {
    const duration = currentPhaseDuration.value
    if (duration === 0) return 1.0
    
    if (currentPhase.value === 'inhale') {
      // Scale from 1.0 to 2.0 based on time remaining
      const progress = 1 - (phaseTimeRemaining.value / duration)
      return 1.0 + progress * 1.0
    } else if (currentPhase.value === 'exhale') {
      // Scale from 2.0 to 1.0 based on time remaining
      const progress = 1 - (phaseTimeRemaining.value / duration)
      return 2.0 - progress * 1.0
    } else {
      // Hold phases maintain current size
      return currentPhase.value === 'hold-inhale' ? 2.0 : 1.0
    }
  })

  const formattedSessionTime = computed(() => {
    const minutes = Math.floor(totalSessionTime.value / 60)
    const seconds = totalSessionTime.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  function nextPhase() {
    const nextIndex = (currentPhaseIndex.value + 1) % phaseSequence.value.length
    const nextPhaseData = phaseSequence.value[nextIndex]
    if (!nextPhaseData) return
    currentPhase.value = nextPhaseData.phase
    phaseTimeRemaining.value = nextPhaseData.duration
    phaseStartTime = Date.now()
  }

  function start() {
    if (isActive.value) return
    
    // Guard against orphaned intervals
    if (phaseInterval !== null || sessionInterval !== null) {
      pause()
    }
    
    isActive.value = true
    
    // Initialize first phase if needed
    if (phaseTimeRemaining.value === 0) {
      currentPhase.value = 'inhale'
      phaseTimeRemaining.value = currentPreset.value.inhale
    }

    // Capture initial remaining time for this phase (important for pause/resume)
    let initialPhaseRemaining = phaseTimeRemaining.value
    phaseStartTime = Date.now()
    
    // Capture initial session time for accurate elapsed calculation
    const initialSessionTime = totalSessionTime.value
    sessionStartTime = Date.now()

    // Phase countdown timer using timestamp-based calculation
    // This prevents drift from setInterval delays
    phaseInterval = window.setInterval(() => {
      if (!isActive.value) return
      
      const elapsed = (Date.now() - phaseStartTime) / 1000
      phaseTimeRemaining.value = Math.max(0, initialPhaseRemaining - elapsed)
      
      // Use a small threshold to prevent double-execution
      if (phaseTimeRemaining.value <= 0.05) {
        // Move to next phase
        nextPhase()
        
        // Reset timing for new phase
        initialPhaseRemaining = phaseTimeRemaining.value
        phaseStartTime = Date.now()
      }
    }, 50)

    // Session timer using timestamp-based calculation
    sessionInterval = window.setInterval(() => {
      if (!isActive.value) return
      
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000)
      totalSessionTime.value = initialSessionTime + elapsed
    }, 100)
  }

  function pause() {
    isActive.value = false
    
    if (phaseInterval !== null) {
      clearInterval(phaseInterval)
      phaseInterval = null
    }
    
    if (sessionInterval !== null) {
      clearInterval(sessionInterval)
      sessionInterval = null
    }
  }

  function reset() {
    pause()
    currentPhase.value = 'inhale'
    phaseTimeRemaining.value = currentPreset.value.inhale
    totalSessionTime.value = 0
    phaseStartTime = 0
    sessionStartTime = 0
  }

  function setPreset(preset: BreathingPreset) {
    const wasActive = isActive.value
    reset()
    currentPreset.value = preset
    currentPhase.value = 'inhale'
    phaseTimeRemaining.value = preset.inhale
    
    if (wasActive) {
      start()
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    pause()
  })

  return {
    currentPreset,
    currentPhase,
    phaseTimeRemaining,
    totalSessionTime,
    isActive,
    phaseLabel,
    circleScale,
    currentPhaseDuration,
    formattedSessionTime,
    start,
    pause,
    reset,
    setPreset
  }
}
