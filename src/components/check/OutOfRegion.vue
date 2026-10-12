<script setup lang="ts">
defineEmits<{ back: [] }>();
</script>

<template>
  <main class="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
    <h1 class="text-3xl font-black text-gray-900">We only cover Catalonia for now</h1>
    <p class="text-gray-600 mt-3">
      The rules for declarations and farm records differ between regions. We are adding other regions next. Check back soon.
    </p>
    <div class="flex justify-center gap-3 mt-8">
      <button
        class="text-sm font-bold text-gray-700 border border-gray-300 px-6 py-2.5 rounded-md hover:bg-gray-50"
        @click="$emit('back')"
      >
        Back
      </button>
    </div>
  </main>
</template>
