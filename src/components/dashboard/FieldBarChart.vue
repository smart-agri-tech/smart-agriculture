<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { mockFieldData } from '@/data/farm';
import { barOptions } from './charts';

const radius = { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 };
const chartData = {
  labels: mockFieldData.map(f => f.name),
  datasets: [
    { label: 'NDVI', data: mockFieldData.map(f => f.ndvi), backgroundColor: '#84A12D', borderRadius: radius, yAxisID: 'y' },
    { label: 'Soil Moisture', data: mockFieldData.map(f => f.soilMoisture), backgroundColor: '#93c5fd', borderRadius: radius, yAxisID: 'y1' },
  ],
};
</script>

<template>
  <div style="height: 280px">
    <Bar :data="chartData" :options="barOptions" />
  </div>
</template>
