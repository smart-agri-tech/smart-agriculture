<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import LangSwitch from './LangSwitch.vue';

defineProps<{ showRestart: boolean }>();
defineEmits<{ restart: [] }>();

const { t } = useLang();
</script>

<template>
  <header class="bg-white border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
      <RouterLink to="/" class="flex items-center gap-2 flex-none">
        <img src="/logo-smart-agri.svg" alt="" class="w-9 h-9 object-contain" />
        <span class="text-xl font-black tracking-tight text-gray-900">SA.TECH</span>
      </RouterLink>
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <span class="hidden lg:inline text-sm text-gray-500 truncate">{{ t.ui.tagline }}</span>
        <button
          v-if="showRestart"
          :title="t.ui.startAgain"
          class="print:hidden inline-flex items-center text-sm font-bold text-gray-900 border border-gray-300 rounded-md px-2.5 sm:px-4 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
          @click="$emit('restart')"
        >
          <!-- Icon only on phones, where the label and the language switch do not both fit. -->
          <svg class="w-4 h-4 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M4.6 15a8 8 0 1 0 1.9-8.3L4 9" />
          </svg>
          <span class="sr-only sm:not-sr-only">{{ t.ui.startAgain }}</span>
        </button>
        <LangSwitch />
      </div>
    </div>
  </header>
</template>
