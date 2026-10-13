<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { KEY_DATES, counterFor } from '@/lib/compliance';

const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  // Tick on the minute so the "m" in countdowns changes in step with the clock.
  const tick = () => (now.value = new Date());
  timer = setTimeout(() => {
    tick();
    timer = setInterval(tick, 60_000);
  }, 60_000 - (Date.now() % 60_000));
});
onBeforeUnmount(() => clearInterval(timer));

const rows = computed(() => KEY_DATES.map(k => ({ ...k, counter: counterFor(k, now.value) })));
</script>

<template>
  <section class="bg-white rounded-lg p-6 mt-6">
    <h2 class="text-lg font-bold text-gray-900 mb-4">Key dates</h2>
    <ul class="divide-y divide-gray-200 border-t border-gray-200">
      <li
        v-for="r in rows"
        :key="r.id"
        class="py-3.5 grid gap-x-6 gap-y-1 grid-cols-[1fr_auto] md:grid-cols-[9rem_1fr_auto] items-baseline text-sm"
      >
        <span class="text-gray-600 md:order-none order-2 col-span-2 md:col-span-1">{{ r.dateLabel }}</span>
        <span class="order-1 md:order-none">
          <span class="font-bold text-gray-900">{{ r.title }}</span>
          <span class="block text-xs text-gray-400 mt-0.5">Source: {{ r.source }}</span>
        </span>
        <span
          class="order-1 md:order-none text-right font-bold tabular-nums whitespace-nowrap"
          :class="r.counter.inForce ? 'text-emerald-700' : 'text-gray-900'"
        >
          {{ r.counter.text }}
        </span>
      </li>
    </ul>
  </section>
</template>
