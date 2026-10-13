<script setup lang="ts">
import { computed } from 'vue';
import { QUESTIONS, type Result } from '@/lib/compliance';
import ScoreCard from './ScoreCard.vue';
import KeyDates from './KeyDates.vue';
import { STATUS_BADGE, capitalise, downloadIcs, inWords, plural, scoreColours } from './format';

const props = defineProps<{ result: Result }>();

const open = computed(() => props.result.requirements.filter(r => r.status !== 'completed').length);
const burdenColour = computed(() => {
  const p = props.result.burden.percent;
  return scoreColours(p >= 70 ? 0 : p >= 40 ? 50 : 100);
});
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-[4.5rem] py-8 sm:py-10">
    <p class="text-xs font-bold uppercase tracking-wide text-emerald-700">Your result</p>
    <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Your Farm Compliance Map</h1>
    <p class="text-lg text-gray-600 mt-2">
      Based on your {{ QUESTIONS.length }} answers, {{ inWords(result.requirements.length) }}
      {{ plural(result.requirements.length, 'requirement applies', 'requirements apply') }} to your farm and
      {{ inWords(result.risks) }} {{ plural(result.risks, 'needs', 'need') }} attention.
    </p>

    <section class="grid gap-6 md:grid-cols-3 mt-6">
      <ScoreCard
        title="Compliance readiness"
        :value="result.complianceScore"
        suffix="/ 100"
        :percent="result.complianceScore"
        v-bind="scoreColours(result.complianceScore)"
        :caption="result.risks === 0 ? 'No risks detected' : `${result.risks} potential ${plural(result.risks, 'risk', 'risks')} detected`"
      />
      <ScoreCard
        title="Data readiness"
        :value="result.dataScore"
        suffix="/ 100"
        :percent="result.dataScore"
        v-bind="scoreColours(result.dataScore)"
        :caption="result.dataSummary"
      />
      <ScoreCard
        title="Administrative burden"
        :value="result.burden.level"
        :percent="result.burden.percent"
        v-bind="burdenColour"
        :caption="result.burden.summary"
      />
    </section>

    <section class="bg-white rounded-lg p-6 mt-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">What applies to your farm</h2>
      <p v-if="result.requirements.length === 0" class="text-gray-600">
        Based on your answers, none of the requirements we check apply to your farm.
      </p>
      <template v-else>
        <ul class="md:hidden divide-y divide-gray-200 border-t border-gray-200">
          <li v-for="r in result.requirements" :key="r.id" class="py-4 text-sm">
            <div class="flex items-start justify-between gap-3">
              <span class="font-bold text-gray-900">{{ r.name }}</span>
              <span class="flex-none text-xs font-bold rounded px-2 py-0.5 ring-1" :class="STATUS_BADGE[r.status].className">
                {{ STATUS_BADGE[r.status].label }}
              </span>
            </div>
            <p class="text-gray-600 mt-1">{{ r.need }}</p>
            <p class="text-gray-900 mt-2"><span class="text-gray-500">Deadline: </span>{{ r.deadlineLabel }}</p>
            <p class="text-xs text-gray-400 mt-0.5">Source: {{ r.source }}</p>
          </li>
        </ul>
        <div class="hidden md:block">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs font-bold text-gray-600 border-b border-gray-200">
                <th class="py-3 px-3.5 font-bold">Requirement</th>
                <th class="py-3 px-3.5 font-bold">Status</th>
                <th class="py-3 px-3.5 font-bold">What you need</th>
                <th class="py-3 px-3.5 font-bold">Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in result.requirements" :key="r.id" class="border-b border-gray-200 last:border-0 align-top">
                <td class="py-3.5 px-3.5 font-bold text-gray-900 whitespace-nowrap">{{ r.name }}</td>
                <td class="py-3.5 px-3.5 whitespace-nowrap">
                  <span class="inline-block text-xs font-bold rounded px-2 py-0.5 ring-1" :class="STATUS_BADGE[r.status].className">
                    {{ STATUS_BADGE[r.status].label }}
                  </span>
                </td>
                <td class="py-3.5 px-3.5 text-gray-600">{{ r.need }}</td>
                <td class="py-3.5 px-3.5 text-gray-900">
                  {{ r.deadlineLabel }}
                  <span class="block text-xs text-gray-400 mt-0.5">Source: {{ r.source }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>

    <KeyDates />

    <section class="grid gap-6 lg:grid-cols-[1fr_17rem] mt-6">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-3">What we noticed</h2>
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
      <div v-if="open > 0" class="bg-emerald-800 rounded-lg p-6 text-white">
        <h2 class="text-lg font-bold leading-snug">Put the dates in your calendar</h2>
        <p class="text-sm text-emerald-50 mt-3 leading-relaxed">
          {{ capitalise(inWords(open)) }} {{ plural(open, 'deadline', 'deadlines') }}, each with a reminder two weeks ahead.
          Works in Google Calendar, Outlook and Apple Calendar.
        </p>
        <button
          class="mt-4 bg-white text-emerald-800 text-sm font-bold rounded-md px-5 py-2.5 hover:bg-emerald-50 transition-colors"
          @click="downloadIcs(result)"
        >
          Download calendar (.ics)
        </button>
      </div>
    </section>

    <p class="text-xs text-gray-500 mt-6 leading-relaxed">
      Sources: RD 1051/2022 (fertilisation records), RD 1311/2012 and the FEGA note of 6 November 2025 (phytosanitary
      records, machine-readable from 1 January 2027), Catalan nitrogen management rules (DAN), and the annual DUN Ordre.
      Check each date against the official text before relying on it.
    </p>
  </main>
</template>
