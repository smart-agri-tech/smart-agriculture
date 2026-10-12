<script setup lang="ts">
// Mock data for a single record
const recordData = {
  date: '2026-04-15',
  ndvi: 0.72,
  soilMoisture: 0.32,
  temperature: 22,
  satellitePass: true,
  cloudCover: 10,
  satellite: 'Landsat 9',
  sensorReadings: { soilpH: 6.8, nitrogen: 45, phosphorus: 30, potassium: 20 },
  ndviGrid: [
    [0.7, 0.71, 0.69],
    [0.73, 0.72, 0.74],
    [0.71, 0.75, 0.72],
  ],
};

const recommendations = [
  'Based on the NDVI value, crop health is good. Continue current management practices.',
  'Soil moisture is at an optimal level. Maintain current irrigation schedule.',
  'Consider a light fertilizer application to boost nitrogen levels for maximum yield.',
];

const nutrients = [
  { label: 'Nitrogen (N)', value: recordData.sensorReadings.nitrogen },
  { label: 'Phosphorus (P)', value: recordData.sensorReadings.phosphorus },
  { label: 'Potassium (K)', value: recordData.sensorReadings.potassium },
];

function getNDVIColor(value: number) {
  if (value < 0.1) return 'bg-red-500';
  if (value < 0.2) return 'bg-orange-500';
  if (value < 0.3) return 'bg-yellow-500';
  if (value < 0.4) return 'bg-green-300';
  if (value < 0.5) return 'bg-green-400';
  return 'bg-green-600';
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-green-700">Record Detail: {{ recordData.date }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-green-600">Satellite Data</h2>
        <p><strong>NDVI:</strong> {{ recordData.ndvi.toFixed(2) }}</p>
        <p><strong>Cloud Cover:</strong> {{ recordData.cloudCover }}%</p>
        <p><strong>Satellite:</strong> {{ recordData.satellite }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-green-600">IoT Sensor Data</h2>
        <p><strong>Soil Moisture:</strong> {{ recordData.soilMoisture.toFixed(2) }}</p>
        <p><strong>Temperature:</strong> {{ recordData.temperature }}°C</p>
        <p><strong>Soil pH:</strong> {{ recordData.sensorReadings.soilpH }}</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4 text-green-600">NDVI 3x3 Pixel Grid</h2>
      <div class="grid grid-cols-3 gap-1 w-64 mx-auto">
        <div
          v-for="(value, index) in recordData.ndviGrid.flat()"
          :key="index"
          class="h-16 flex items-center justify-center text-white font-bold"
          :class="getNDVIColor(value)"
        >
          {{ value.toFixed(2) }}
        </div>
      </div>
      <p class="text-center mt-2 text-sm text-gray-600">Center pixel represents the target location</p>
    </div>

    <div class="bg-white p-4 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4 text-green-600">Nutrient Levels</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="n in nutrients" :key="n.label">
          <p class="font-semibold">{{ n.label }}</p>
          <p>{{ n.value }} ppm</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow mb-8">
      <h2 class="text-xl font-semibold mb-4 text-green-600">Analysis and Recommendations</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li v-for="r in recommendations" :key="r">{{ r }}</li>
      </ul>
    </div>

    <div class="flex justify-between">
      <button class="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700">Download Raw Data</button>
      <button class="bg-green-600 text-white px-6 py-2 rounded-full text-lg hover:bg-green-700">Add to Report</button>
    </div>
  </div>
</template>
