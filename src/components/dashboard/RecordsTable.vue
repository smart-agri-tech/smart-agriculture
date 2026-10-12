<script setup lang="ts">
import type { HistoricalRecord } from '@/data/farm';

defineProps<{ rows: HistoricalRecord[] }>();
defineEmits<{ view: [row: HistoricalRecord] }>();

const headers = ['Date', 'NDVI', 'Soil Moisture', 'Temperature (°C)', 'Satellite', ''];
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-100">
          <th v-for="h in headers" :key="h" class="text-left py-3 px-4 text-gray-500 font-medium">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.date" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td class="py-3 px-4">{{ row.date }}</td>
          <td class="py-3 px-4">{{ row.ndvi.toFixed(2) }}</td>
          <td class="py-3 px-4">{{ row.soilMoisture.toFixed(2) }}</td>
          <td class="py-3 px-4">{{ row.temperature }}</td>
          <td class="py-3 px-4">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              :class="row.satellitePass ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
            >
              {{ row.satellitePass ? 'Yes' : 'No' }}
            </span>
          </td>
          <td class="py-3 px-4">
            <button class="text-xs text-black underline hover:no-underline" @click="$emit('view', row)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
