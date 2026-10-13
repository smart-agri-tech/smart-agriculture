<script setup lang="ts">
import { computed, ref } from 'vue';
import { QUESTION_COUNT, questions, type Draft } from '@/lib/compliance';
import { useLang } from '@/composables/useLang';
import QuestionStep from './QuestionStep.vue';

const emit = defineEmits<{ done: [draft: Draft]; outOfRegion: [] }>();

const { lang, t } = useLang();
const step = ref(0);
const draft = ref<Draft>({});
const question = computed(() => questions(lang.value)[step.value]);
const value = computed(() => draft.value[question.value.key]);
const text = computed(() => {
  const key = question.value.freeText?.key;
  return key ? (draft.value[key] as string | undefined) : undefined;
});
const answered = computed(() => value.value !== undefined && (!Array.isArray(value.value) || value.value.length > 0));
const last = computed(() => step.value === QUESTION_COUNT - 1);

function next() {
  if (question.value.key === 'region' && draft.value.region === 'other') return emit('outOfRegion');
  if (last.value) return emit('done', draft.value);
  step.value++;
}

function change(v: string | string[]) {
  const updated: Draft = { ...draft.value, [question.value.key]: v };
  // Drop the free text once its option is no longer selected.
  const free = question.value.freeText;
  const freeOption = question.value.options.find(o => o.freeText)?.value;
  if (free && freeOption && !(Array.isArray(v) ? v : [v]).includes(freeOption)) delete updated[free.key];
  draft.value = updated;
  // Single-choice questions advance on their own.
  if (!question.value.multi) next();
}

function changeText(value: string) {
  const key = question.value.freeText?.key;
  if (key) draft.value = { ...draft.value, [key]: value };
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <p class="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
      {{ t.ui.questionOf(step + 1, QUESTION_COUNT) }}
    </p>
    <div class="h-1.5 bg-gray-200 rounded-full mb-10 overflow-hidden">
      <div
        class="h-full bg-emerald-500 transition-all"
        :style="{ width: `${((step + (answered ? 1 : 0)) / QUESTION_COUNT) * 100}%` }"
      />
    </div>

    <QuestionStep :key="question.key" :question="question" :value="value" :text="text" @change="change" @change-text="changeText" />

    <div class="flex items-center justify-between mt-10">
      <button
        type="button"
        :disabled="step === 0"
        class="text-sm font-bold text-gray-600 px-4 py-2.5 rounded-md hover:bg-gray-100 disabled:invisible"
        @click="step--"
      >
        {{ t.ui.back }}
      </button>
      <button
        type="button"
        :disabled="!answered"
        class="text-sm font-bold text-white bg-emerald-700 px-6 py-2.5 rounded-md hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        @click="next"
      >
        {{ last ? t.ui.seeResult : t.ui.next }}
      </button>
    </div>
    <p class="text-xs text-gray-400 mt-10">{{ t.ui.noLogin }}</p>
  </main>
</template>
