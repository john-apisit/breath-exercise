<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()

const emit = defineEmits<{
  start: []
  pause: []
  reset: []
}>()
</script>

<template>
  <div class="flex gap-4 justify-center">
    <button
      v-if="!isActive"
      @click="emit('start')"
      class="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Start breathing exercise"
    >
      Start
    </button>
    
    <button
      v-else
      @click="emit('pause')"
      class="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Pause breathing exercise"
    >
      Pause
    </button>
    
    <button
      @click="emit('reset')"
      class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium text-lg shadow-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Reset breathing exercise"
    >
      Reset
    </button>
  </div>
</template>
