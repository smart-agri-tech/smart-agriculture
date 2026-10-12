<script setup lang="ts">
import BrandLink from '@/components/BrandLink.vue';
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] flex flex-col">
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <BrandLink />
      </div>
    </header>
    <div class="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <p class="text-6xl font-extrabold mb-2">404</p>
      <p class="text-gray-500 mb-6">This page could not be found.</p>
      <RouterLink to="/" class="bg-black text-white py-2.5 px-6 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
        Back to Home
      </RouterLink>
    </div>
  </div>
</template>
