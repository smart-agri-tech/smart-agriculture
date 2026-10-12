<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({ firstName: '', lastName: '', email: '', message: '' });
const sent = ref(false);
const loading = ref(false);
const error = ref('');

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('https://formspree.io/f/mgaolqwq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form, _subject: `New message from ${form.firstName} ${form.lastName}` }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.errors?.map((e: { message: string }) => e.message).join(', ') || 'Failed to send');
    sent.value = true;
  } catch (err) {
    error.value = (err as Error).message || 'Something went wrong';
  } finally {
    loading.value = false;
  }
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900';
</script>

<template>
  <div v-if="sent" class="text-center py-8">
    <p class="text-2xl font-bold mb-2">Message sent!</p>
    <p class="text-gray-500 text-sm">We'll get back to you soon.</p>
  </div>
  <form v-else class="space-y-4" @submit.prevent="handleSubmit">
    <div v-if="error" class="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">First Name <span class="text-red-400">*</span></label>
        <input v-model="form.firstName" type="text" placeholder="Jane" :class="inputClass" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name <span class="text-red-400">*</span></label>
        <input v-model="form.lastName" type="text" placeholder="Smith" :class="inputClass" required />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-400">*</span></label>
      <input v-model="form.email" type="email" placeholder="jane@example.com" :class="inputClass" required />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
      <textarea v-model="form.message" placeholder="Write your message here" rows="6" :class="[inputClass, 'resize-none']" />
    </div>
    <button type="submit" :disabled="loading" class="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
      {{ loading ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>
