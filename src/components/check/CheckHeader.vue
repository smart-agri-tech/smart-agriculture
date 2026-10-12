<script setup lang="ts">
defineProps<{ showRestart: boolean }>();
defineEmits<{ restart: [] }>();
</script>

<template>
  <header class="bg-white border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <img src="/logo-smart-agri.svg" alt="" class="w-9 h-9 object-contain" />
        <span class="text-xl font-black tracking-tight text-gray-900">SA.TECH</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="hidden sm:inline text-sm text-gray-500">5-minute Farm Compliance Check · Catalonia</span>
        <button
          v-if="showRestart"
          class="text-sm font-bold text-gray-900 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
          @click="$emit('restart')"
        >
          Start again
        </button>
      </div>
    </div>
  </header>
</template>
