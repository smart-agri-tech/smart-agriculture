<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import BrandLink from '@/components/BrandLink.vue';
import CheckIcon from '@/components/CheckIcon.vue';

const farmTypes = [
  { id: 'crop', label: 'Crop Farming' },
  { id: 'livestock', label: 'Livestock' },
  { id: 'mixed', label: 'Mixed Farming' },
  { id: 'organic', label: 'Organic Farming' },
  { id: 'greenhouse', label: 'Greenhouse' },
  { id: 'orchard', label: 'Orchard' },
  { id: 'other', label: 'Other' },
];

const indicators = [
  { id: 'ndvi', label: 'NDVI (Vegetation Health)' },
  { id: 'lai', label: 'LAI (Leaf Area Index)' },
  { id: 'evi', label: 'EVI (Enhanced Vegetation Index)' },
  { id: 'ndwi', label: 'NDWI (Water Content)' },
  { id: 'soil_moisture', label: 'Soil Moisture' },
  { id: 'temperature', label: 'Surface Temperature' },
  { id: 'chlorophyll', label: 'Chlorophyll Content' },
  { id: 'nitrogen', label: 'Nitrogen Content' },
];

const router = useRouter();
const formData = reactive({
  name: '',
  farmTypes: [] as string[],
  otherFarmType: '',
  indicators: [] as string[],
  farmLocation: '',
  notificationFrequency: 'Weekly',
});
const error = ref('');
const loading = ref(false);

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) formData.name = user.user_metadata?.full_name || '';
});

function toggleFarmType(id: string) {
  formData.farmTypes = formData.farmTypes.includes(id)
    ? formData.farmTypes.filter(t => t !== id)
    : [...formData.farmTypes, id];
}

async function handleSubmit() {
  loading.value = true;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const payload = {
        user_id: user.id,
        name: formData.name,
        farm_types: formData.farmTypes,
        other_farm_type: formData.otherFarmType,
        indicators: formData.indicators,
        farm_location: formData.farmLocation,
        notification_frequency: formData.notificationFrequency,
      };
      const { error: err } = await supabase.from('onboarding').upsert(payload);
      if (err) throw err;
    }
    router.push('/dashboard');
  } catch (err) {
    error.value = (err as Error).message || 'Failed to save onboarding data';
  } finally {
    loading.value = false;
  }
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white';
const sectionClass = 'bg-white border border-gray-200 rounded-2xl p-6 shadow-sm';
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5]">
    <!-- Navbar -->
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <BrandLink />
        <span class="text-sm text-gray-400">Setup your farm profile</span>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-6 py-12">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold mb-2">Welcome to Smart Agriculture</h1>
        <p class="text-gray-500 text-sm">Tell us about your farm so we can personalize your experience.</p>
      </div>

      <div v-if="error" class="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Your Info -->
        <div :class="sectionClass">
          <h2 class="font-semibold text-base mb-4">Your Information</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="formData.name" type="text" :class="inputClass" />
          </div>
        </div>

        <!-- Farm Type -->
        <div :class="sectionClass">
          <h2 class="font-semibold text-base mb-1">Farm Type</h2>
          <p class="text-xs text-gray-400 mb-4">Select all that apply</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              v-for="{ id, label } in farmTypes"
              :key="id"
              type="button"
              class="flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm transition-colors text-left"
              :class="formData.farmTypes.includes(id) ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400 bg-white'"
              @click="toggleFarmType(id)"
            >
              <span
                class="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center"
                :class="formData.farmTypes.includes(id) ? 'bg-white border-white' : 'border-gray-300'"
              >
                <CheckIcon v-if="formData.farmTypes.includes(id)" class="text-black" />
              </span>
              {{ label }}
            </button>
          </div>
          <div v-if="formData.farmTypes.includes('other')" class="mt-3">
            <input v-model="formData.otherFarmType" type="text" placeholder="Describe your farm type..." :class="inputClass" />
          </div>
        </div>

        <!-- Indicators -->
        <div :class="sectionClass">
          <h2 class="font-semibold text-base mb-4">Monitoring Indicators</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              v-for="{ id, label } in indicators"
              :key="id"
              class="flex items-center gap-3 border rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-colors"
              :class="formData.indicators.includes(id) ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'"
            >
              <input v-model="formData.indicators" type="checkbox" :value="id" class="sr-only" />
              <span
                class="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                :class="formData.indicators.includes(id) ? 'bg-white border-white' : 'border-gray-300'"
              >
                <CheckIcon v-if="formData.indicators.includes(id)" class="text-black" />
              </span>
              {{ label }}
            </label>
          </div>
        </div>

        <!-- Location & Notifications -->
        <div :class="sectionClass">
          <h2 class="font-semibold text-base mb-4">Farm Details</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
              <input v-model="formData.farmLocation" type="text" placeholder="City, Country" :class="inputClass" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notification Frequency</label>
              <select v-model="formData.notificationFrequency" :class="inputClass">
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50">
          {{ loading ? 'Setting up...' : 'Complete Setup and View Dashboard →' }}
        </button>
      </form>
    </div>
  </div>
</template>
