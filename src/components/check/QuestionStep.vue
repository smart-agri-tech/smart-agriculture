<script setup lang="ts">
import { computed } from 'vue';
import { EXCLUSIVE_OPTIONS, type Question } from '@/lib/compliance';

const props = defineProps<{ question: Question; value: string | string[] | undefined; text?: string }>();
const emit = defineEmits<{ change: [value: string | string[]]; changeText: [text: string] }>();

const selected = computed(() => (Array.isArray(props.value) ? props.value : props.value ? [props.value] : []));
const showText = computed(() => props.question.options.some(o => o.freeText && selected.value.includes(o.value)));

// Focus the free-text field as soon as it appears.
const vFocus = { mounted: (el: HTMLElement) => el.focus() };

function toggle(option: string) {
  if (!props.question.multi) return emit('change', option);
  if (EXCLUSIVE_OPTIONS.has(option)) return emit('change', selected.value.includes(option) ? [] : [option]);
  const rest = selected.value.filter(v => !EXCLUSIVE_OPTIONS.has(v));
  emit('change', rest.includes(option) ? rest.filter(v => v !== option) : [...rest, option]);
}
</script>

<template>
  <fieldset>
    <legend class="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{{ question.title }}</legend>
    <p v-if="question.help" class="text-gray-500 mb-6">{{ question.help }}</p>
    <div class="grid gap-3 sm:grid-cols-2" :class="{ 'mt-6': !question.help }">
      <button
        v-for="o in question.options"
        :key="o.value"
        type="button"
        :role="question.multi ? 'checkbox' : 'radio'"
        :aria-checked="selected.includes(o.value)"
        class="flex items-center gap-3 text-left rounded-lg border px-4 py-3.5 transition-colors"
        :class="
          selected.includes(o.value)
            ? 'border-emerald-600 bg-emerald-50 text-gray-900'
            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
        "
        @click="toggle(o.value)"
      >
        <span
          class="flex-none w-5 h-5 border-2 flex items-center justify-center"
          :class="[
            question.multi ? 'rounded' : 'rounded-full',
            selected.includes(o.value) ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300',
          ]"
        >
          <svg v-if="selected.includes(o.value)" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span class="font-bold">{{ o.label }}</span>
      </button>
    </div>
    <input
      v-if="showText && question.freeText"
      v-focus
      type="text"
      maxlength="100"
      :value="text"
      :placeholder="question.freeText.placeholder"
      :aria-label="question.freeText.placeholder"
      class="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
      @input="emit('changeText', ($event.target as HTMLInputElement).value)"
    />
  </fieldset>
</template>
