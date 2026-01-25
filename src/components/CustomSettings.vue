<script setup lang="ts">
import { ref } from 'vue'
import type { BreathingPreset } from '../types/breathing'

const emit = defineEmits<{
  apply: [preset: BreathingPreset]
}>()

const inhale = ref(4)
const holdInhale = ref(4)
const exhale = ref(4)
const holdExhale = ref(4)
const isExpanded = ref(false)

function applyCustom() {
  // Validate and sanitize all inputs
  const validatedInhale = Math.max(1, Math.min(30, Math.floor(inhale.value || 4)))
  const validatedHoldInhale = Math.max(0, Math.min(30, Math.floor(holdInhale.value || 0)))
  const validatedExhale = Math.max(1, Math.min(30, Math.floor(exhale.value || 4)))
  const validatedHoldExhale = Math.max(0, Math.min(30, Math.floor(holdExhale.value || 0)))
  
  // Update the input fields with validated values
  inhale.value = validatedInhale
  holdInhale.value = validatedHoldInhale
  exhale.value = validatedExhale
  holdExhale.value = validatedHoldExhale
  
  const customPreset: BreathingPreset = {
    id: 'custom',
    name: 'Custom',
    inhale: validatedInhale,
    holdAfterInhale: validatedHoldInhale,
    exhale: validatedExhale,
    holdAfterExhale: validatedHoldExhale,
    description: 'Your custom breathing pattern'
  }
  emit('apply', customPreset)
  isExpanded.value = false
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <button
      @click="isExpanded = !isExpanded"
      class="w-full px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
    >
      {{ isExpanded ? '▼' : '▶' }} Custom Settings
    </button>
    
    <div
      v-if="isExpanded"
      class="mt-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl space-y-4 origin-top transition-all duration-300"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-white/80 text-sm mb-2">Inhale (s)</label>
          <input
            v-model.number="inhale"
            type="number"
            min="1"
            max="30"
            class="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label class="block text-white/80 text-sm mb-2">Hold (s)</label>
          <input
            v-model.number="holdInhale"
            type="number"
            min="0"
            max="30"
            class="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label class="block text-white/80 text-sm mb-2">Exhale (s)</label>
          <input
            v-model.number="exhale"
            type="number"
            min="1"
            max="30"
            class="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label class="block text-white/80 text-sm mb-2">Hold (s)</label>
          <input
            v-model.number="holdExhale"
            type="number"
            min="0"
            max="30"
            class="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      
      <button
        @click="applyCustom"
        class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Apply Custom Pattern
      </button>
    </div>
  </div>
</template>
