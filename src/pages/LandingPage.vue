<script setup lang="ts">
import { useRouter } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';

const router = useRouter();

const features = [
  { icon: '🛰️', title: 'Satellite Data Integration', desc: 'Access Landsat imagery for broad-scale crop health monitoring and NDVI analysis.' },
  { icon: '📡', title: 'IoT Sensor Network', desc: 'Integrate local sensor data for real-time, precise farm condition monitoring.' },
  { icon: '📊', title: 'Comprehensive Insights', desc: 'Get actionable recommendations based on combined satellite and local data analysis.' },
];
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] text-gray-900 font-sans">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f5]/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2 font-bold text-lg tracking-tight">
          <img src="/logo-smart-agri.svg" alt="Smart Agriculture" class="w-7 h-7 object-contain" />
          Smart Agriculture
        </div>
        <nav class="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" class="hover:text-black transition-colors">Features</a>
          <a href="#about" class="hover:text-black transition-colors">About</a>
          <a href="#contact" class="hover:text-black transition-colors">Contact</a>
        </nav>
        <button class="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors" @click="router.push('/onboarding')">
          Get Started
        </button>
      </div>
    </header>

    <!-- Hero -->
    <main class="relative flex flex-col items-center justify-center min-h-screen pt-14 overflow-hidden">
      <!-- Video background -->
      <div class="absolute inset-0 z-0">
        <video src="/video-net.mp4" autoplay loop muted playsinline preload="auto" class="w-full h-full object-cover opacity-40" />
        <div class="absolute inset-0 bg-[#f7f7f5]/60" />
      </div>

      <div class="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <!-- App icon with logo -->
        <div class="w-24 h-24 mb-4 drop-shadow-xl">
          <img src="/logo-smart-agri.svg" alt="Smart Agriculture" class="w-full h-full object-contain" />
        </div>

        <!-- Badge -->
        <div class="flex items-center gap-2 border border-gray-300 bg-white text-gray-600 text-sm px-4 py-1.5 rounded-full mb-8 shadow-sm">
          <span>✦</span>
          <span>Smart Agriculture Platform</span>
        </div>

        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Farm smarter with<br />satellite &amp; IoT data
        </h1>

        <p class="text-gray-500 text-lg mb-10 max-w-xl">
          Harness Landsat imagery and local sensor data to monitor crop health, track soil conditions, and make data-driven decisions—without complexity.
        </p>

        <!-- CTAs -->
        <div class="flex items-center gap-4">
          <button
            class="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            @click="router.push('/register')"
          >
            Start Free Trial <span>→</span>
          </button>
          <button
            class="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            @click="router.push('/dashboard')"
          >
            Try Demo
          </button>
        </div>
      </div>
    </main>

    <!-- Features -->
    <section id="features" class="max-w-5xl mx-auto px-6 py-24">
      <h2 class="text-3xl font-bold text-center mb-12">Everything you need to run a smart farm</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="f in features" :key="f.title" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="text-3xl mb-4">{{ f.icon }}</div>
          <h3 class="font-semibold text-lg mb-2">{{ f.title }}</h3>
          <p class="text-gray-500 text-sm">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="bg-white border-y border-gray-200 py-20">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Built for modern farmers</h2>
        <p class="text-gray-500 text-lg">
          Smart Agriculture combines cutting-edge satellite technology with local IoT sensors to give you a complete, real-time view of your farm. Actionable insights, optimized practices, better yield.
        </p>
      </div>
    </section>

    <!-- CTA section -->
    <section id="contact" class="max-w-3xl mx-auto px-6 py-24 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to transform your farm?</h2>
      <p class="text-gray-500 mb-8">Sign up for free or explore the demo to see Smart Agriculture in action.</p>
      <div class="flex items-center justify-center gap-4">
        <button class="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors" @click="router.push('/register')">
          Sign Up Free
        </button>
        <button
          class="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          @click="router.push('/dashboard')"
        >
          Explore Demo
        </button>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-white border-t border-gray-200 py-24">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <!-- Left -->
          <div>
            <div class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Contact Us
            </div>
            <h2 class="text-4xl font-extrabold leading-tight mb-4">We'd Love to<br />Hear from You<br />and Connect</h2>
            <p class="text-gray-500 text-base mb-8">We're here to help with any questions about our product, pricing, or partnership opportunities.</p>
            <a
              href="https://www.linkedin.com/company/smart-agri-tec"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              Follow us on LinkedIn
            </a>
          </div>

          <!-- Right — Form -->
          <div class="bg-[#f7f7f5] border border-gray-200 rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-6">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
        <span>© 2026 Smart Agriculture</span>
        <div class="flex gap-6">
          <a href="#features" class="hover:text-gray-600">Features</a>
          <a href="#about" class="hover:text-gray-600">About</a>
          <a href="#contact" class="hover:text-gray-600">Contact</a>
          <RouterLink to="/login" class="hover:text-gray-600">Login</RouterLink>
          <a href="https://www.linkedin.com/company/smart-agri-tec" target="_blank" rel="noopener noreferrer" class="hover:text-gray-600">LinkedIn</a>
        </div>
      </div>
    </footer>
  </div>
</template>
