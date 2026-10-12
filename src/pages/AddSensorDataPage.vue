<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';

const fields = [
  { name: 'soilMoisture', label: 'Soil Moisture', unit: '%', step: '1' },
  { name: 'temperature', label: 'Temperature', unit: '°C', step: '0.1' },
  { name: 'humidity', label: 'Humidity', unit: '%', step: '1' },
  { name: 'soilpH', label: 'Soil pH', unit: 'pH', step: '0.1' },
  { name: 'nitrogen', label: 'Nitrogen', unit: 'ppm', step: '1' },
  { name: 'phosphorus', label: 'Phosphorus', unit: 'ppm', step: '1' },
  { name: 'potassium', label: 'Potassium', unit: 'ppm', step: '1' },
];

const emptyForm = () => Object.fromEntries(fields.map(f => [f.name, ''])) as Record<string, string>;

const router = useRouter();
const formData = reactive(emptyForm());
const submitted = ref(false);
const loading = ref(false);

async function handleSubmit() {
  loading.value = true;
  await new Promise(r => setTimeout(r, 600));
  submitted.value = true;
  loading.value = false;
}

function addMore() {
  submitted.value = false;
  Object.assign(formData, emptyForm());
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-900';
</script>

<template>
  <div v-if="submitted" class="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 w-full max-w-md text-center">
      <div class="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 class="text-xl font-bold mb-2">Data Submitted</h2>
      <p class="text-gray-500 text-sm mb-6">Sensor readings have been recorded successfully.</p>
      <div class="flex gap-3">
        <button class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors" @click="addMore">
          Add More
        </button>
        <button class="flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors" @click="router.push('/dashboard')">
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen bg-[#f7f7f5]">
    <DashboardHeader active="add-sensor" />

    <div class="max-w-2xl mx-auto px-6 py-10">
      <!-- Back button -->
      <RouterLink to="/dashboard" class="flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Back to Dashboard
      </RouterLink>

      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-1">Add Sensor Data</h1>
          <p class="text-gray-500 text-sm">Record readings during or within 30 min of a satellite pass.</p>
        </div>
        <RouterLink
          to="/dashboard"
          class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </RouterLink>
      </div>

      <!-- Alert -->
      <div class="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-sm text-amber-800">
        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <span><strong>Important:</strong> Ensure all sensor readings are taken within 30 minutes of the satellite pass for optimal data correlation.</span>
      </div>

      <!-- Form -->
      <form class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div v-for="f in fields" :key="f.name">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ f.label }} <span class="text-gray-400 font-normal">({{ f.unit }})</span>
            </label>
            <input v-model="formData[f.name]" type="number" :step="f.step" required :class="inputClass" placeholder="—" />
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            type="button"
            class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            @click="router.push('/dashboard')"
          >
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            {{ loading ? 'Submitting...' : 'Submit Sensor Data' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
