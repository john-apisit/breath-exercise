<script setup lang="ts">
import { useBreathingCycle } from './composables/useBreathingCycle'
import { BREATHING_PRESETS, DEFAULT_PRESET } from './constants/presets'
import BreathingCircle from './components/BreathingCircle.vue'
import PresetSelector from './components/PresetSelector.vue'
import Controls from './components/Controls.vue'
import Timer from './components/Timer.vue'
import CustomSettings from './components/CustomSettings.vue'

const breathing = useBreathingCycle(DEFAULT_PRESET!)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl space-y-8 md:space-y-12">
      <!-- Header -->
      <div 
        class="text-center"
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 20
          }
        }"
      >
        <h1 class="text-4xl md:text-5xl font-light text-white tracking-wide mb-2">
          Breathe
        </h1>
        <p class="text-white/60 text-sm md:text-base">
          Find your calm through guided breathing
        </p>
      </div>

      <!-- Preset Selector -->
      <PresetSelector
        :presets="BREATHING_PRESETS"
        :current-preset-id="breathing.currentPreset.value.id"
        @select="breathing.setPreset"
      />

      <!-- Breathing Circle -->
      <div class="py-28 md:py-28">
        <BreathingCircle
          :scale="breathing.circleScale.value"
          :phase="breathing.isActive.value || breathing.totalSessionTime.value > 0 ? breathing.phaseLabel.value : 'Ready'"
          :duration="breathing.currentPhaseDuration.value"
          :is-active="breathing.isActive.value"
        />
      </div>

      <!-- Timer Display - Only show when active or has been started -->
      <Timer
        v-if="breathing.isActive.value || breathing.totalSessionTime.value > 0"
        :phase-time-remaining="breathing.phaseTimeRemaining.value"
        :session-time="breathing.formattedSessionTime.value"
      />

      <!-- Controls -->
      <Controls
        :is-active="breathing.isActive.value"
        @start="breathing.start"
        @pause="breathing.pause"
        @reset="breathing.reset"
      />

      <!-- Custom Settings -->
      <CustomSettings @apply="breathing.setPreset" />

      <!-- Footer -->
      <div 
        class="text-center text-white/40 text-xs md:text-sm pt-8"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ 
          opacity: 1,
          transition: {
            duration: 1000,
            delay: 600
          }
        }"
      >
        <p>Press Start to begin your breathing session</p>
      </div>
    </div>
  </div>
</template>
