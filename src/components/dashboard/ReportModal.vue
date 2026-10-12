<script setup lang="ts">
import { reactive, ref } from 'vue';

defineEmits<{ close: [] }>();

const CALENDLY_URL = 'https://calendly.com/sync_katerina_a/30min';
const form = reactive({ name: '', email: '', message: '' });
const sent = ref(false);
const loading = ref(false);

async function handleSubmit() {
  loading.value = true;
  await new Promise(r => setTimeout(r, 600));
  sent.value = true;
  loading.value = false;
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900';
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />
    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10">
      <!-- Close -->
      <button
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div v-if="sent" class="text-center py-4">
        <div class="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 class="text-lg font-bold mb-1">Request Sent!</h3>
        <p class="text-gray-500 text-sm mb-6">We'll prepare your demo report and get back to you shortly.</p>
        <a
          :href="CALENDLY_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full inline-flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Schedule a Call on Calendly
        </a>
      </div>
      <template v-else>
        <h3 class="text-xl font-bold mb-1">Request Demo Report</h3>
        <p class="text-gray-500 text-sm mb-6">Fill in your details and we'll send you a tailored farm report.</p>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="form.name" type="text" :class="inputClass" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" :class="inputClass" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              What would you like in the report? <span class="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea v-model="form.message" rows="3" :class="[inputClass, 'resize-none']" />
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            {{ loading ? 'Sending...' : 'Request Report' }}
          </button>
        </form>
        <div class="mt-4 pt-4 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-400 mb-2">Prefer to talk directly?</p>
          <a :href="CALENDLY_URL" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-black font-medium hover:underline">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Schedule a 30-min call on Calendly
          </a>
        </div>
      </template>
    </div>
  </div>
</template>
