<script setup lang="ts">
import { computed, ref } from 'vue';
import { QUESTIONS, type Draft } from '@/lib/compliance';
import QuestionStep from './QuestionStep.vue';

const emit = defineEmits<{ done: [draft: Draft]; outOfRegion: [] }>();

const step = ref(0);
const draft = ref<Draft>({});
const question = computed(() => QUESTIONS[step.value]);
const value = computed(() => draft.value[question.value.key]);
const answered = computed(() => value.value !== undefined && (!Array.isArray(value.value) || value.value.length > 0));
const last = computed(() => step.value === QUESTIONS.length - 1);

function next() {
  if (question.value.key === 'region' && draft.value.region === 'other') return emit('outOfRegion');
  if (last.value) return emit('done', draft.value);
  step.value++;
}

function change(v: string | string[]) {
  draft.value = { ...draft.value, [question.value.key]: v };
  // Single-choice questions advance on their own.
  if (!question.value.multi) next();
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
    <p class="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
      Question {{ step + 1 }} of {{ QUESTIONS.length }}
    </p>
    <div class="h-1.5 bg-gray-200 rounded-full mb-10 overflow-hidden">
      <div
        class="h-full bg-emerald-500 transition-all"
        :style="{ width: `${((step + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }"
      />
    </div>

    <QuestionStep :key="question.key" :question="question" :value="value" @change="change" />

    <div class="flex items-center justify-between mt-10">
      <button
        type="button"
        :disabled="step === 0"
        class="text-sm font-bold text-gray-600 px-4 py-2.5 rounded-md hover:bg-gray-100 disabled:invisible"
        @click="step--"
      >
        Back
      </button>
      <button
        type="button"
        :disabled="!answered"
        class="text-sm font-bold text-white bg-emerald-700 px-6 py-2.5 rounded-md hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        @click="next"
      >
        {{ last ? 'See my result' : 'Next' }}
      </button>
    </div>
    <p class="text-xs text-gray-400 mt-10">No login and no personal data needed to see your result.</p>
  </main>
</template>
