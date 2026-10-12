<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import type { HistoricalRecord, Metric } from '@/data/farm';
import { lineOptions } from './charts';

const props = defineProps<{ data: HistoricalRecord[]; metric: Metric; label: string; height: number }>();

const chartData = computed(() => ({
  labels: props.data.map(d => d.date),
  datasets: [
    {
      label: props.label,
      data: props.data.map(d => d[props.metric]),
      borderColor: '#84A12D',
      backgroundColor: '#ffffff',
      borderWidth: 2,
      pointRadius: 4,
      pointBorderColor: '#84A12D',
      cubicInterpolationMode: 'monotone' as const,
    },
  ],
}));
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Line :data="chartData" :options="lineOptions" />
  </div>
</template>
