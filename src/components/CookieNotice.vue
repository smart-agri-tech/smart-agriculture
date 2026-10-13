<script setup lang="ts">
import { computed, ref } from 'vue';
import { POLICY_VERSION } from '@/lib/legal';
import { PRIVACY } from '@/i18n/privacy';
import { useLang } from '@/composables/useLang';

/**
 * Informational cookie notice. The site only uses strictly necessary storage (language choice, sign-in session),
 * which needs no consent under LSSI art. 22.2; if analytics are ever added, this must become a consent banner.
 */
const STORAGE_KEY = 'satech-cookie-notice';

function seenCurrentVersion(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === POLICY_VERSION;
  } catch {
    return false;
  }
}

const { lang } = useLang();
const t = computed(() => PRIVACY[lang.value].cookieNotice);
const visible = ref(!seenCurrentVersion());

function dismiss() {
  visible.value = false;
  try {
    localStorage.setItem(STORAGE_KEY, POLICY_VERSION);
  } catch {
    // Without storage the notice simply shows again on the next visit.
  }
}
</script>

<template>
  <div
    v-if="visible"
    role="region"
    :aria-label="t.label"
    class="print:hidden fixed z-[60] bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-lg p-4 text-sm"
  >
    <p class="leading-relaxed">{{ t.text }}</p>
    <div class="flex items-center justify-between gap-4 mt-3">
      <RouterLink to="/privacy#cookies" class="underline hover:no-underline text-gray-600">{{ t.learnMore }}</RouterLink>
      <button
        type="button"
        class="bg-black text-white font-medium rounded-full px-5 py-2 hover:bg-gray-800 transition-colors"
        @click="dismiss"
      >
        {{ t.ok }}
      </button>
    </div>
  </div>
</template>
