<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import { consentRecord } from '@/lib/legal';
import ConsentCheckbox from '@/components/ConsentCheckbox.vue';
import BrandLink from '@/components/BrandLink.vue';
import SubscribedCard from '@/components/SubscribedCard.vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const name = ref('');
const isSkippingRegistration = ref(false);
const subscribed = ref(false);
const error = ref('');
const loading = ref(false);
const consent = ref(false);
const consentMissing = ref(false);

async function handleSubmit() {
  error.value = '';
  consentMissing.value = !consent.value;
  if (consentMissing.value) return;
  loading.value = true;
  try {
    if (isSkippingRegistration.value) {
      subscribed.value = true;
    } else {
      const consentGiven = consentRecord();
      const { error: err } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            full_name: name.value,
            // Proof of consent, kept with the account.
            privacy_consent_at: consentGiven.consentAt,
            privacy_policy_version: consentGiven.policyVersion,
          },
        },
      });
      if (err) throw err;
      router.push('/onboarding');
    }
  } catch (err) {
    error.value = (err as Error).message || 'Something went wrong';
  } finally {
    loading.value = false;
  }
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10';
</script>

<template>
  <SubscribedCard v-if="subscribed" :email="email" />

  <div v-else class="min-h-screen bg-[#f7f7f5] flex flex-col">
    <!-- Navbar -->
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <BrandLink />
        <RouterLink to="/login" class="text-sm text-gray-500 hover:text-black transition-colors">
          Already have an account? <span class="text-black font-medium">Sign in</span>
        </RouterLink>
      </div>
    </header>

    <!-- Form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <h1 class="text-2xl font-bold text-center mb-1">
          {{ isSkippingRegistration ? 'Stay updated' : 'Create your account' }}
        </h1>
        <p class="text-gray-500 text-sm text-center mb-6">
          {{ isSkippingRegistration ? 'Get farm insights in your inbox' : 'Start your free Smart Agriculture account' }}
        </p>

        <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div v-if="!isSkippingRegistration">
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="name" type="text" :class="inputClass" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="email" type="email" :class="inputClass" required />
          </div>
          <div v-if="!isSkippingRegistration">
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input v-model="password" type="password" :class="inputClass" />
          </div>
          <ConsentCheckbox v-model="consent" :purpose="isSkippingRegistration ? 'updates' : 'account'" :invalid="consentMissing" />
          <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            {{ loading ? 'Please wait...' : isSkippingRegistration ? 'Subscribe' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-5 text-center text-sm text-gray-500 space-y-2">
          <p v-if="isSkippingRegistration">
            Want full access?
            <button class="text-black font-medium hover:underline" @click="isSkippingRegistration = false">Create an account</button>
          </p>
          <p v-else>
            Just want updates?
            <button class="text-black font-medium hover:underline" @click="isSkippingRegistration = true">Subscribe with email</button>
          </p>
        </div>

        <div class="mt-5 pt-5 border-t border-gray-100 text-center">
          <p class="text-sm text-gray-400 mb-3">Not ready to sign up?</p>
          <RouterLink
            to="/dashboard"
            class="block w-full border border-gray-200 bg-white text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Explore Demo →
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
