<script setup lang="ts">
defineProps<{ email: string }>();
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] flex items-center justify-center">
    <div class="bg-white border border-gray-200 p-10 rounded-2xl shadow-sm w-full max-w-md text-center">
      <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
        <img src="/logo-smart-agri.svg" alt="Smart Agriculture" class="w-7 h-7 object-contain" />
      </div>
      <h1 class="text-2xl font-bold mb-2">You're subscribed!</h1>
      <p class="text-gray-500 text-sm mb-6">We'll send updates to <strong>{{ email }}</strong>.</p>
      <RouterLink to="/" class="inline-block bg-black text-white py-2 px-6 rounded-full text-sm hover:bg-gray-800 transition-colors">Back to Home</RouterLink>
    </div>
  </div>
</template>
