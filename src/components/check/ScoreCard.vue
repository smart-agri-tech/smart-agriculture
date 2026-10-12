<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  suffix?: string;
  percent: number;
  textClass: string;
  barClass: string;
  caption: string;
}>();
</script>

<template>
  <div class="bg-white rounded-lg p-6">
    <p class="text-sm font-bold text-gray-600">{{ title }}</p>
    <p class="mt-3 mb-3">
      <span class="text-4xl font-black" :class="textClass">{{ value }}</span>
      <span v-if="suffix" class="text-lg text-gray-500 ml-1.5">{{ suffix }}</span>
    </p>
    <div
      class="h-4 bg-slate-200 rounded overflow-hidden"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="title"
    >
      <div class="h-full" :class="barClass" :style="{ width: `${percent}%` }" />
    </div>
    <p class="text-xs text-gray-600 mt-4">{{ caption }}</p>
  </div>
</template>
