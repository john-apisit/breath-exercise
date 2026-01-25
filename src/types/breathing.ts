export interface BreathingPreset {
  id: string
  name: string
  inhale: number
  holdAfterInhale: number
  exhale: number
  holdAfterExhale: number
  description?: string
}

export type Phase = 'inhale' | 'hold-inhale' | 'exhale' | 'hold-exhale'

export interface BreathingState {
  currentPhase: Phase
  phaseTimeRemaining: number
  totalSessionTime: number
  isActive: boolean
  currentPreset: BreathingPreset
}
