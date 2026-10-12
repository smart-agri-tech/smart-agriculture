<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import BrandLink from '@/components/BrandLink.vue';

const password = ref('');
const confirm = ref('');
const error = ref('');
const loading = ref(false);
const done = ref(false);

async function handleSubmit() {
  error.value = '';
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match';
    return;
  }
  loading.value = true;
  try {
    const { error: err } = await supabase.auth.updateUser({ password: password.value });
    if (err) throw err;
    done.value = true;
  } catch (err) {
    error.value = (err as Error).message || 'Something went wrong';
  } finally {
    loading.value = false;
  }
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10';
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] flex flex-col">
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <BrandLink />
      </div>
    </header>

    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <div v-if="done" class="text-center">
          <div class="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 class="text-xl font-bold mb-2">Password updated!</h2>
          <p class="text-gray-500 text-sm mb-6">Your password has been changed successfully.</p>
          <RouterLink to="/login" class="block w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Sign In
          </RouterLink>
        </div>
        <template v-else>
          <h2 class="text-2xl font-bold mb-1">Set new password</h2>
          <p class="text-gray-500 text-sm mb-6">Choose a strong password for your account.</p>
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input v-model="password" type="password" minlength="6" :class="inputClass" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input v-model="confirm" type="password" minlength="6" :class="inputClass" required />
            </div>
            <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
              {{ loading ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
