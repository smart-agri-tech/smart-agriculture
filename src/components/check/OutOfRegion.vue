<script setup lang="ts">
import { useLang } from '@/composables/useLang';

defineEmits<{ back: [] }>();

const { t } = useLang();
</script>

<template>
  <main class="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
    <h1 class="text-3xl font-black text-gray-900">{{ t.ui.outOfRegionTitle }}</h1>
    <p class="text-gray-600 mt-3">{{ t.ui.outOfRegionBody }}</p>
    <div class="flex justify-center gap-3 mt-8">
      <button
        class="text-sm font-bold text-gray-700 border border-gray-300 px-6 py-2.5 rounded-md hover:bg-gray-50"
        @click="$emit('back')"
      >
        {{ t.ui.back }}
      </button>
    </div>
  </main>
</template>
