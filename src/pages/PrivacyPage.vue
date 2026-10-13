<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue';
import { MESSAGES } from '@/lib/compliance';
import { CONTROLLER, POLICY_VERSION } from '@/lib/legal';
import { PRIVACY } from '@/i18n/privacy';
import { useLang } from '@/composables/useLang';
import BrandLink from '@/components/BrandLink.vue';
import LangSwitch from '@/components/LangSwitch.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const { lang } = useLang();
const t = computed(() => PRIVACY[lang.value]);
const updated = computed(() =>
  new Date(`${POLICY_VERSION}T00:00:00Z`).toLocaleDateString(MESSAGES[lang.value].locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }),
);

watchEffect(() => {
  document.documentElement.lang = lang.value;
  document.title = t.value.pageTitle;
});
onBeforeUnmount(() => (document.documentElement.lang = 'en'));
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f7f7f5] text-gray-900">
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <BrandLink />
        <LangSwitch />
      </div>
    </header>

    <main class="max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">{{ t.title }}</h1>
      <p class="text-sm text-gray-500 mt-2">{{ t.updated(updated) }}</p>
      <p class="text-gray-700 mt-6 leading-relaxed">{{ t.intro }}</p>

      <section v-for="(s, i) in t.sections" :key="s.title" class="mt-10">
        <h2 class="text-lg font-bold mb-3">{{ s.title }}</h2>
        <div v-if="s.table" class="overflow-x-auto mb-3">
          <table class="w-full text-sm bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <thead>
              <tr class="text-left text-gray-500 border-b border-gray-200">
                <th v-for="h in s.table.head" :key="h" class="py-2.5 px-4 font-medium">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in s.table.rows" :key="row[0]" class="border-b border-gray-100 last:border-0 align-top">
                <td v-for="(cell, c) in row" :key="c" class="py-2.5 px-4" :class="c === 0 ? 'font-medium' : 'text-gray-700'">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-for="p in s.paragraphs ?? []" :key="p" class="text-gray-700 leading-relaxed mb-3">{{ p }}</p>

        <dl v-if="i === 0" class="bg-white border border-gray-200 rounded-2xl p-5 grid gap-x-6 gap-y-2 sm:grid-cols-[8rem_1fr] text-sm">
          <dt class="text-gray-500">{{ t.controllerLabels.name }}</dt>
          <dd>{{ CONTROLLER.name }}, {{ CONTROLLER.legalForm[lang] }}</dd>
          <dt class="text-gray-500">{{ t.controllerLabels.taxId }}</dt>
          <dd>{{ CONTROLLER.taxId }}</dd>
          <dt class="text-gray-500">{{ t.controllerLabels.address }}</dt>
          <dd>{{ CONTROLLER.address }}</dd>
          <dt class="text-gray-500">{{ t.controllerLabels.email }}</dt>
          <dd><a :href="`mailto:${CONTROLLER.email}`" class="underline hover:no-underline">{{ CONTROLLER.email }}</a></dd>
        </dl>

        <ul v-if="s.items" class="list-disc pl-5 space-y-1.5 text-gray-700 leading-relaxed">
          <li v-for="item in s.items" :key="item">{{ item }}</li>
        </ul>
      </section>
    </main>

    <SiteFooter class="mt-auto" />
  </div>
</template>
