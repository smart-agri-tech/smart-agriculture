<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';
import BrandLink from '@/components/BrandLink.vue';
import SubscribedCard from '@/components/SubscribedCard.vue';

const router = useRouter();
const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');
const isSubscription = ref(false);
const isForgotPassword = ref(false);
const error = ref('');
const loading = ref(false);
const subscribed = ref(false);
const resetSent = ref(false);

async function handleSubmit() {
  error.value = '';
  loading.value = true;
  try {
    if (isSubscription.value) {
      subscribed.value = true;
    } else if (isLogin.value) {
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
      if (err) throw err;
      router.push('/dashboard');
    } else {
      const { error: err } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: { data: { full_name: name.value } },
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

async function handleForgotPassword() {
  error.value = '';
  loading.value = true;
  try {
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (err) throw err;
    resetSent.value = true;
  } catch (err) {
    error.value = (err as Error).message || 'Something went wrong';
  } finally {
    loading.value = false;
  }
}

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10';
</script>

<template>
  <div v-if="isForgotPassword" class="min-h-screen bg-[#f7f7f5] flex flex-col">
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <BrandLink />
      </div>
    </header>
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <div v-if="resetSent" class="text-center">
          <div class="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2">Check your email</h2>
          <p class="text-gray-500 text-sm mb-6">We sent a password reset link to <strong>{{ email }}</strong>.</p>
          <button
            class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            @click="isForgotPassword = false; resetSent = false"
          >
            Back to Login
          </button>
        </div>
        <template v-else>
          <button
            class="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            @click="isForgotPassword = false; error = ''"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            Back to Login
          </button>
          <h2 class="text-2xl font-bold mb-1">Reset your password</h2>
          <p class="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
          <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>
          <form class="space-y-4" @submit.prevent="handleForgotPassword">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input v-model="email" type="email" :class="inputClass" required />
            </div>
            <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
              {{ loading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>

  <SubscribedCard v-else-if="subscribed" :email="email" />

  <div v-else class="min-h-screen bg-[#f7f7f5] flex flex-col">
    <!-- Navbar -->
    <header class="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <BrandLink />
        <RouterLink to="/register" class="text-sm text-gray-500 hover:text-black transition-colors">
          Don't have an account? <span class="text-black font-medium">Sign up</span>
        </RouterLink>
      </div>
    </header>

    <!-- Form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <h1 class="text-2xl font-bold text-center mb-1">
          {{ isSubscription ? 'Stay updated' : isLogin ? 'Welcome back' : 'Create your account' }}
        </h1>
        <p class="text-gray-500 text-sm text-center mb-6">
          {{ isSubscription ? 'Subscribe to receive farm insights' : isLogin ? 'Sign in to your Smart Agriculture account' : 'Start your free account today' }}
        </p>

        <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{{ error }}</div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div v-if="!isLogin && !isSubscription">
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="name" type="text" :class="inputClass" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="email" type="email" :class="inputClass" required />
          </div>
          <div v-if="!isSubscription">
            <div class="flex items-center justify-between mb-1">
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <button
                v-if="isLogin"
                type="button"
                class="text-xs text-gray-500 hover:text-black transition-colors"
                @click="isForgotPassword = true; error = ''"
              >
                Forgot password?
              </button>
            </div>
            <input v-model="password" type="password" :class="inputClass" required />
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            {{ loading ? 'Please wait...' : isSubscription ? 'Subscribe' : isLogin ? 'Sign In' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-5 text-center text-sm text-gray-500 space-y-2">
          <p v-if="isSubscription">
            Want full access?
            <button class="text-black font-medium hover:underline" @click="isSubscription = false">
              {{ isLogin ? 'Login' : 'Create account' }}
            </button>
          </p>
          <template v-else>
            <p>
              {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
              <button class="text-black font-medium hover:underline" @click="isLogin = !isLogin; error = ''">
                {{ isLogin ? 'Sign up' : 'Login' }}
              </button>
            </p>
            <p>
              Just want updates?
              <button class="text-black font-medium hover:underline" @click="isSubscription = true">Subscribe with email</button>
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
