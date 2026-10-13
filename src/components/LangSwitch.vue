<script setup lang="ts">
import { LANGS } from '@/lib/compliance';
import { useLang } from '@/composables/useLang';

const { lang, t } = useLang();
</script>

<template>
  <div role="group" :aria-label="t.ui.language" class="print:hidden inline-flex rounded-md border border-gray-300 overflow-hidden text-xs font-bold">
    <button
      v-for="l in LANGS"
      :key="l"
      type="button"
      :aria-pressed="lang === l"
      :lang="l"
      class="px-2.5 py-2 uppercase transition-colors"
      :class="lang === l ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
      @click="lang = l"
    >
      {{ l }}
    </button>
  </div>
</template>
