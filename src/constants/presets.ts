import type { BreathingPreset } from '../types/breathing'

export const BREATHING_PRESETS: BreathingPreset[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    inhale: 4,
    holdAfterInhale: 4,
    exhale: 4,
    holdAfterExhale: 4,
    description: 'Equal breathing for balance and focus'
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    inhale: 4,
    holdAfterInhale: 7,
    exhale: 8,
    holdAfterExhale: 0,
    description: 'Calming technique for relaxation'
  },
  {
    id: 'relaxing',
    name: 'Relaxing',
    inhale: 5,
    holdAfterInhale: 0,
    exhale: 5,
    holdAfterExhale: 0,
    description: 'Simple and soothing'
  },
  {
    id: 'focus',
    name: 'Focus',
    inhale: 4,
    holdAfterInhale: 0,
    exhale: 6,
    holdAfterExhale: 0,
    description: 'Longer exhale for concentration'
  }
]

export const DEFAULT_PRESET = BREATHING_PRESETS[0]
