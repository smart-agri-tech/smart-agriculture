<script setup lang="ts">
import { computed } from 'vue';
import type { Lang } from '@/lib/compliance';
import { CONTROLLER } from '@/lib/legal';
import { PRIVACY } from '@/i18n/privacy';

/**
 * Required, unticked-by-default consent with the short first layer of privacy information (LOPDGDD art. 11).
 * The full policy opens in a new tab so the form is not lost.
 */
const props = defineProps<{ purpose: 'contact' | 'account' | 'updates'; lang?: Lang; invalid?: boolean }>();
const accepted = defineModel<boolean>({ required: true });

const t = computed(() => PRIVACY[props.lang ?? 'en'].consent);
</script>

<template>
  <div class="text-sm">
    <label class="flex items-start gap-2.5 cursor-pointer">
      <input
        v-model="accepted"
        type="checkbox"
        required
        class="mt-0.5 h-4 w-4 flex-none rounded border-gray-300 accent-black"
        :aria-invalid="invalid || undefined"
      />
      <span class="text-gray-700">
        {{ t.accept }}
        <a href="/privacy" target="_blank" rel="noopener" class="underline hover:no-underline">{{ t.policyLink }}</a>.
      </span>
    </label>
    <p v-if="invalid" class="text-red-600 text-xs mt-1.5 ml-6.5">{{ t.required }}</p>
    <p class="text-xs text-gray-400 mt-1.5 leading-relaxed">
      {{ t.layer(CONTROLLER.name, t.purposes[purpose], CONTROLLER.email) }}
    </p>
  </div>
</template>
