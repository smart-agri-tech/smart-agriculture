<script setup lang="ts">
import BrandLink from '@/components/BrandLink.vue';

defineProps<{ active: 'dashboard' | 'historical' | 'add-sensor' }>();

const links = [
  { id: 'dashboard', to: '/dashboard', label: 'Dashboard' },
  { id: 'historical', to: '/dashboard/historical', label: 'Historical' },
  { id: 'add-sensor', to: '/dashboard/add-sensor', label: 'Add Sensor' },
] as const;
</script>

<template>
  <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <BrandLink />
      <nav class="flex items-center gap-4 text-sm">
        <RouterLink
          v-for="l in links"
          :key="l.id"
          :to="l.to"
          :class="l.id === active ? 'text-black font-medium' : 'text-gray-500 hover:text-black transition-colors'"
        >
          {{ l.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
