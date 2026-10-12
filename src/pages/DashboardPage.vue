<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { mockHistoricalData, type Metric } from '@/data/farm';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import FieldBarChart from '@/components/dashboard/FieldBarChart.vue';
import MetricLineChart from '@/components/dashboard/MetricLineChart.vue';
import RecordsTable from '@/components/dashboard/RecordsTable.vue';
import ReportModal from '@/components/dashboard/ReportModal.vue';

const sensorData = reactive({ soilMoisture: '', temperature: '', humidity: '' });
const dataSource = ref('all');
const timeRange = ref('1month');
const metric = ref<Metric>('ndvi');
const showReportModal = ref(false);

function handleSubmitSensorData() {
  alert('Sensor data submitted successfully!');
  Object.assign(sensorData, { soilMoisture: '', temperature: '', humidity: '' });
}

const filteredData = computed(() =>
  dataSource.value === 'satellite' ? mockHistoricalData.filter(item => item.satellitePass) : mockHistoricalData,
);

const stats = [
  { label: 'Average NDVI', value: '0.75', sub: 'Healthy vegetation', color: 'text-[#84A12D]' },
  { label: 'Soil Moisture', value: '28%', sub: 'Optimal range', color: 'text-blue-500' },
  { label: 'Temperature', value: '22°C', sub: 'Current reading', color: 'text-orange-500' },
];

const cardClass = 'bg-white border border-gray-200 rounded-2xl p-6 shadow-sm';
const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10';
const selectClass = 'border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10';
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5]">
    <DashboardHeader active="dashboard" />

    <div class="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <!-- Page title -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Farm Dashboard</h1>
        <div class="flex items-center gap-2 text-sm bg-[#84A12D]/10 text-[#84A12D] border border-[#84A12D]/20 px-4 py-1.5 rounded-full font-medium">
          <span class="w-2 h-2 bg-[#84A12D] rounded-full animate-pulse inline-block" />
          Satellite Pass Active — Next 20 min
        </div>
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="s in stats" :key="s.label" :class="cardClass">
          <p class="text-sm text-gray-500 mb-1">{{ s.label }}</p>
          <p class="text-3xl font-bold" :class="s.color">{{ s.value }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ s.sub }}</p>
        </div>
      </div>

      <!-- Add Sensor Data -->
      <div :class="cardClass">
        <h2 class="font-semibold text-base mb-4">Add Sensor Data</h2>
        <form class="space-y-4" @submit.prevent="handleSubmitSensorData">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Soil Moisture (%)</label>
              <input v-model="sensorData.soilMoisture" type="number" :class="inputClass" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
              <input v-model="sensorData.temperature" type="number" :class="inputClass" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
              <input v-model="sensorData.humidity" type="number" :class="inputClass" required />
            </div>
          </div>
          <button type="submit" class="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Submit Sensor Data
          </button>
        </form>
      </div>

      <!-- Field Overview Chart -->
      <div :class="cardClass">
        <h2 class="font-semibold text-base mb-4">Field Overview</h2>
        <FieldBarChart />
      </div>

      <!-- Historical Data -->
      <div :class="cardClass">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 class="font-semibold text-base">Historical Data</h2>
          <div class="flex gap-3 flex-wrap">
            <select v-model="dataSource" :class="selectClass">
              <option value="all">All Sources</option>
              <option value="satellite">Satellite Only</option>
              <option value="iot">IoT Sensors Only</option>
            </select>
            <select v-model="timeRange" :class="selectClass">
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <select v-model="metric" :class="selectClass">
              <option value="ndvi">NDVI</option>
              <option value="soilMoisture">Soil Moisture</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>
        </div>
        <MetricLineChart :data="filteredData" :metric="metric" :label="metric.toUpperCase()" :height="300" />
      </div>

      <!-- Data Records Table -->
      <div :class="cardClass">
        <h2 class="font-semibold text-base mb-4">Data Records</h2>
        <RecordsTable :rows="filteredData" />
      </div>

      <!-- Alerts & Recommendations -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div :class="cardClass">
          <h2 class="font-semibold text-base mb-4">Recent Alerts</h2>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2"><span class="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" /><span>Low soil moisture detected in Field B</span></li>
            <li class="flex items-start gap-2"><span class="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" /><span>Potential pest infestation in Field C</span></li>
            <li class="flex items-start gap-2"><span class="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" /><span>Optimal conditions for harvesting in Field A</span></li>
          </ul>
        </div>
        <div :class="cardClass">
          <h2 class="font-semibold text-base mb-4">Recommendations</h2>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex items-start gap-2"><span class="text-gray-300">→</span> Increase irrigation in Field B</li>
            <li class="flex items-start gap-2"><span class="text-gray-300">→</span> Schedule pest inspection for Field C</li>
            <li class="flex items-start gap-2"><span class="text-gray-300">→</span> Prepare harvesting equipment for Field A</li>
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 justify-end pb-8">
        <button class="border border-gray-200 bg-white text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Export Raw Data</button>
        <button class="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors" @click="showReportModal = true">
          Download Report
        </button>
      </div>
    </div>

    <ReportModal v-if="showReportModal" @close="showReportModal = false" />
  </div>
</template>
