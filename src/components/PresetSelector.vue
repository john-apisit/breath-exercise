<script setup lang="ts">
import type { BreathingPreset } from '../types/breathing'

defineProps<{
  presets: BreathingPreset[]
  currentPresetId: string
}>()

const emit = defineEmits<{
  select: [preset: BreathingPreset]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-3 justify-center">
    <button
      v-for="preset in presets"
      :key="preset.id"
      @click="emit('select', preset)"
      :class="[
        'px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-200',
        'hover:bg-white/20 hover:scale-105 active:scale-95',
        currentPresetId === preset.id
          ? 'bg-white/30 shadow-lg ring-2 ring-white/50'
          : 'bg-white/10 shadow-md'
      ]"
    >
      <div class="text-white">
        <div class="text-lg font-medium">{{ preset.name }}</div>
        <div class="text-sm text-white/70 mt-1">
          {{ preset.inhale }}–{{ preset.holdAfterInhale }}–{{ preset.exhale }}–{{ preset.holdAfterExhale }}
        </div>
      </div>
    </button>
  </div>
</template>
