<script setup lang="ts">
import { computed } from 'vue';
import { QUESTION_COUNT, calendarEvents, type Result } from '@/lib/compliance';
import { useLang } from '@/composables/useLang';
import ScoreCard from './ScoreCard.vue';
import KeyDates from './KeyDates.vue';
import { STATUS_CLASS, downloadIcs, scoreColours } from './format';

const props = defineProps<{ result: Result }>();

const { lang, t } = useLang();

const calendarCount = computed(() => calendarEvents(props.result.requirements, new Date()).length);

// The browser's print dialog offers "Save as PDF"; the document title becomes the suggested file name.
function saveAsPdf() {
  const title = document.title;
  document.title = t.value.ui.pdfTitle;
  window.addEventListener('afterprint', () => (document.title = title), { once: true });
  window.print();
}

const burdenColour = computed(() => {
  const p = props.result.burden.percent;
  return scoreColours(p >= 70 ? 0 : p >= 40 ? 50 : 100);
});
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[4.5rem] py-8 sm:py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-wide text-emerald-700">{{ t.ui.yourResult }}</p>
        <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{{ t.ui.resultTitle }}</h1>
      </div>
      <button
        class="print:hidden flex-none inline-flex items-center gap-2 text-sm font-bold text-white bg-emerald-700 rounded-md px-4 py-2.5 hover:bg-emerald-800 transition-colors"
        @click="saveAsPdf"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
        </svg>
        {{ t.ui.savePdf }}
      </button>
    </div>
    <p class="text-lg text-gray-600 mt-2">
      {{ t.ui.summary(QUESTION_COUNT, result.requirements.length, result.risks) }}
    </p>

    <section class="grid gap-6 md:grid-cols-3 print:grid-cols-3 mt-6">
      <ScoreCard
        :title="t.ui.complianceReadiness"
        :value="result.complianceScore"
        :suffix="t.ui.outOf100"
        :percent="result.complianceScore"
        v-bind="scoreColours(result.complianceScore)"
        :caption="t.ui.risks(result.risks)"
      />
      <ScoreCard
        :title="t.ui.dataReadiness"
        :value="result.dataScore"
        :suffix="t.ui.outOf100"
        :percent="result.dataScore"
        v-bind="scoreColours(result.dataScore)"
        :caption="result.dataSummary"
      />
      <ScoreCard
        :title="t.ui.administrativeBurden"
        :value="result.burden.level"
        :percent="result.burden.percent"
        v-bind="burdenColour"
        :caption="result.burden.summary"
      />
    </section>

    <section class="bg-white rounded-lg p-6 mt-6 break-inside-avoid">
      <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t.ui.appliesTitle }}</h2>
      <p v-if="result.requirements.length === 0" class="text-gray-600">{{ t.ui.noneApply }}</p>
      <template v-else>
        <ul class="md:hidden print:hidden divide-y divide-gray-200 border-t border-gray-200">
          <li v-for="r in result.requirements" :key="r.id" class="py-4 text-sm">
            <div class="flex items-start justify-between gap-3">
              <span class="font-bold text-gray-900">{{ r.name }}</span>
              <span class="flex-none text-xs font-bold rounded px-2 py-0.5 ring-1" :class="STATUS_CLASS[r.status]">
                {{ t.ui.status[r.status] }}
              </span>
            </div>
            <p class="text-gray-600 mt-1">{{ r.need }}</p>
            <p class="text-gray-900 mt-2"><span class="text-gray-500">{{ t.ui.deadlinePrefix }} </span>{{ r.deadlineLabel }}</p>
            <p class="text-xs text-gray-400 mt-0.5">
              {{ t.ui.sourcePrefix }}
              <a v-if="r.sourceUrl" :href="r.sourceUrl" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">{{ r.source }} ↗</a>
              <template v-else>{{ r.source }}</template>
            </p>
          </li>
        </ul>
        <div class="hidden md:block print:block">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs font-bold text-gray-600 border-b border-gray-200">
                <th class="py-3 px-3.5 font-bold">{{ t.ui.columns.requirement }}</th>
                <th class="py-3 px-3.5 font-bold">{{ t.ui.columns.status }}</th>
                <th class="py-3 px-3.5 font-bold">{{ t.ui.columns.need }}</th>
                <th class="py-3 px-3.5 font-bold">{{ t.ui.columns.deadline }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in result.requirements" :key="r.id" class="border-b border-gray-200 last:border-0 align-top">
                <td class="py-3.5 px-3.5 font-bold text-gray-900">{{ r.name }}</td>
                <td class="py-3.5 px-3.5">
                  <span class="inline-block text-xs font-bold rounded px-2 py-0.5 ring-1" :class="STATUS_CLASS[r.status]">
                    {{ t.ui.status[r.status] }}
                  </span>
                </td>
                <td class="py-3.5 px-3.5 text-gray-600">{{ r.need }}</td>
                <td class="py-3.5 px-3.5 text-gray-900">
                  {{ r.deadlineLabel }}
                  <span class="block text-xs text-gray-400 mt-0.5">
                    {{ t.ui.sourcePrefix }}
                    <a v-if="r.sourceUrl" :href="r.sourceUrl" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">{{ r.source }} ↗</a>
                    <template v-else>{{ r.source }}</template>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>

    <KeyDates />

    <section class="grid gap-6 lg:grid-cols-[1fr_17rem] mt-6 break-inside-avoid">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-3">{{ t.ui.noticedTitle }}</h2>
        <ul class="space-y-3">
          <li v-for="n in result.notices" :key="n.text" class="flex items-center gap-3 text-sm text-gray-800">
            <svg v-if="n.kind === 'warning'" class="w-4 h-4 flex-none text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linejoin="round" d="M12 3 2 21h20L12 3z" />
              <path stroke-linecap="round" d="M12 10v5M12 18h.01" />
            </svg>
            <svg v-else class="w-4 h-4 flex-none text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ n.text }}
          </li>
        </ul>
      </div>
      <div v-if="calendarCount > 0" class="print:hidden bg-emerald-800 rounded-lg p-6 text-white">
        <h2 class="text-lg font-bold leading-snug">{{ t.ui.calendarTitle }}</h2>
        <p class="text-sm text-emerald-50 mt-3 leading-relaxed">{{ t.ui.calendarBody(calendarCount) }}</p>
        <button
          class="print:hidden mt-4 bg-white text-emerald-800 text-sm font-bold rounded-md px-5 py-2.5 hover:bg-emerald-50 transition-colors"
          @click="downloadIcs(result, lang)"
        >
          {{ t.ui.downloadCalendar }}
        </button>
      </div>
    </section>

    <p class="text-xs text-gray-500 mt-6 leading-relaxed">{{ t.ui.footnote }}</p>
  </main>
</template>
