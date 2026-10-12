<script setup lang="ts">
import { computed, ref } from 'vue';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import { evaluate, toAnswers, type Draft } from '@/lib/compliance';
import CheckHeader from '@/components/check/CheckHeader.vue';
import QuestionnaireForm from '@/components/check/QuestionnaireForm.vue';
import ResultView from '@/components/check/ResultView.vue';
import OutOfRegion from '@/components/check/OutOfRegion.vue';

type Stage = { kind: 'form' } | { kind: 'waitlist' } | { kind: 'result'; draft: Draft };

const stage = ref<Stage>({ kind: 'form' });
const attempt = ref(0);
const result = computed(() => {
  if (stage.value.kind !== 'result') return null;
  const answers = toAnswers(stage.value.draft);
  return answers && evaluate(answers);
});

function restart() {
  attempt.value++;
  stage.value = { kind: 'form' };
  window.scrollTo({ top: 0 });
}

function showResult(draft: Draft) {
  stage.value = { kind: 'result', draft };
  window.scrollTo({ top: 0 });
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 font-['Lato',sans-serif]">
    <CheckHeader :show-restart="stage.kind !== 'form'" @restart="restart" />
    <QuestionnaireForm
      v-if="stage.kind === 'form'"
      :key="attempt"
      @done="showResult"
      @out-of-region="stage = { kind: 'waitlist' }"
    />
    <OutOfRegion v-else-if="stage.kind === 'waitlist'" @back="restart" />
    <ResultView v-if="result" :result="result" />
  </div>
</template>
