<script setup lang="ts">
import { computed } from 'vue';
import { MESSAGES, type Lang } from '@/lib/compliance';
import { useLang } from '@/composables/useLang';

// The landing page is English-only and passes `lang="en"`; other pages follow the chosen language.
const props = defineProps<{ lang?: Lang }>();

const { lang: chosen } = useLang();
const t = computed(() => MESSAGES[props.lang ?? chosen.value].footer);
</script>

<template>
  <footer class="border-t border-gray-200 py-6">
    <div class="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
      <span>© 2026 Smart Agriculture</span>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <RouterLink to="/#features" class="hover:text-gray-600">{{ t.features }}</RouterLink>
        <RouterLink to="/#about" class="hover:text-gray-600">{{ t.about }}</RouterLink>
        <RouterLink to="/#contact" class="hover:text-gray-600">{{ t.contact }}</RouterLink>
        <RouterLink to="/login" class="hover:text-gray-600">{{ t.login }}</RouterLink>
        <a href="https://www.linkedin.com/company/smart-agri-tec" target="_blank" rel="noopener noreferrer" class="hover:text-gray-600">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>
