<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import { evaluate, toAnswers, type Draft } from '@/lib/compliance';
import CheckHeader from '@/components/check/CheckHeader.vue';
import QuestionnaireForm from '@/components/check/QuestionnaireForm.vue';
import ResultView from '@/components/check/ResultView.vue';
import OutOfRegion from '@/components/check/OutOfRegion.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { useLang } from '@/composables/useLang';

type Stage = { kind: 'form' } | { kind: 'waitlist' } | { kind: 'result'; draft: Draft };

const { lang } = useLang();

// Only this page is translated; the rest of the site stays English.
watchEffect(() => (document.documentElement.lang = lang.value));
onBeforeUnmount(() => (document.documentElement.lang = 'en'));

const stage = ref<Stage>({ kind: 'form' });
const attempt = ref(0);
const result = computed(() => {
  if (stage.value.kind !== 'result') return null;
  const answers = toAnswers(stage.value.draft);
  return answers && evaluate(answers, lang.value);
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
  <div class="min-h-screen flex flex-col bg-slate-100 font-['Lato',sans-serif]">
    <CheckHeader :show-restart="stage.kind !== 'form'" @restart="restart" />
    <QuestionnaireForm
      v-if="stage.kind === 'form'"
      :key="attempt"
      @done="showResult"
      @out-of-region="stage = { kind: 'waitlist' }"
    />
    <OutOfRegion v-else-if="stage.kind === 'waitlist'" @back="restart" />
    <ResultView v-if="result" :result="result" />
    <SiteFooter class="print:hidden mt-auto" />
  </div>
</template>
