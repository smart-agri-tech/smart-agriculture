<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { METRIC_LABELS, mockHistoricalData, type Metric } from '@/data/farm';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import MetricLineChart from '@/components/dashboard/MetricLineChart.vue';
import RecordsTable from '@/components/dashboard/RecordsTable.vue';

const router = useRouter();
const dataSource = ref('all');
const timeRange = ref('1month');
const metric = ref<Metric>('ndvi');

const filteredData = computed(() =>
  dataSource.value === 'satellite' ? mockHistoricalData.filter(item => item.satellitePass) : mockHistoricalData,
);

const selectClass = 'border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-900';
const cardClass = 'bg-white border border-gray-200 rounded-2xl shadow-sm p-6';
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5]">
    <DashboardHeader active="historical" />

    <div class="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <!-- Back button + Header -->
      <div>
        <RouterLink to="/dashboard" class="flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Dashboard
        </RouterLink>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-1">Historical Farm Data</h1>
            <p class="text-gray-500 text-sm">Analyse trends from satellite passes and IoT sensors over time.</p>
          </div>
          <div class="flex gap-3">
            <button class="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Export CSV
            </button>
            <button class="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div :class="cardClass">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Source</span>
            <select v-model="dataSource" :class="selectClass">
              <option value="all">All Sources</option>
              <option value="satellite">Satellite Only</option>
              <option value="iot">IoT Sensors Only</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Range</span>
            <select v-model="timeRange" :class="selectClass">
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Metric</span>
            <select v-model="metric" :class="selectClass">
              <option value="ndvi">NDVI</option>
              <option value="soilMoisture">Soil Moisture</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>
          <span class="ml-auto text-xs text-gray-400">{{ filteredData.length }} records</span>
        </div>
      </div>

      <!-- Chart -->
      <div :class="cardClass">
        <h2 class="font-semibold text-base mb-4">{{ METRIC_LABELS[metric] }} Trend</h2>
        <MetricLineChart :data="filteredData" :metric="metric" :label="METRIC_LABELS[metric]" :height="320" />
      </div>

      <!-- Table -->
      <div :class="cardClass">
        <h2 class="font-semibold text-base mb-4">Data Records</h2>
        <RecordsTable :rows="filteredData" @view="router.push('/dashboard/record')" />
      </div>
    </div>
  </div>
</template>
