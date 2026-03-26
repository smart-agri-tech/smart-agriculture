'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ContactForm = () => {
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl font-bold mb-2">Message sent!</p>
        <p className="text-gray-500 text-sm">We'll get back to you soon.</p>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-400">*</span></label>
          <input type="text" placeholder="Jane" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-400">*</span></label>
          <input type="text" placeholder="Smith" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className={inputClass} required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-400">*</span></label>
        <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea placeholder="Write your message here" rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
          className={`${inputClass} resize-none`} />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-gray-900 font-sans">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f5]/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <img src="/logo-smart-agri.svg" alt="Smart Agriculture" className="w-7 h-7 object-contain" />
            Smart Agriculture
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative flex flex-col items-center justify-center min-h-screen pt-14 overflow-hidden">

        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/video-net.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#f7f7f5]/60" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
          {/* App icon with logo */}
          <div className="w-24 h-24 mb-4 drop-shadow-xl">
            <img src="/logo-smart-agri.svg" alt="Smart Agriculture" className="w-full h-full object-contain" />
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 border border-gray-300 bg-white text-gray-600 text-sm px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <span>✦</span>
            <span>Smart Agriculture Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Farm smarter with<br />satellite & IoT data
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg mb-10 max-w-xl">
            Harness Landsat imagery and local sensor data to monitor crop health, track soil conditions, and make data-driven decisions—without complexity.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/register')}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Start Free Trial <span>→</span>
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Try Demo
            </button>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to run a smart farm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🛰️', title: 'Satellite Data Integration', desc: 'Access Landsat imagery for broad-scale crop health monitoring and NDVI analysis.' },
            { icon: '📡', title: 'IoT Sensor Network', desc: 'Integrate local sensor data for real-time, precise farm condition monitoring.' },
            { icon: '📊', title: 'Comprehensive Insights', desc: 'Get actionable recommendations based on combined satellite and local data analysis.' },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white border-y border-gray-200 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Built for modern farmers</h2>
          <p className="text-gray-500 text-lg">Smart Agriculture combines cutting-edge satellite technology with local IoT sensors to give you a complete, real-time view of your farm. Actionable insights, optimized practices, better yield.</p>
        </div>
      </section>

      {/* CTA section */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your farm?</h2>
        <p className="text-gray-500 mb-8">Sign up for free or explore the demo to see Smart Agriculture in action.</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.push('/register')}
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Sign Up Free
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Explore Demo
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white border-t border-gray-200 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Contact Us
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-4">We'd Love to<br />Hear from You<br />and Connect</h2>
              <p className="text-gray-500 text-base mb-8">We're here to help with any questions about our product, pricing, or partnership opportunities.</p>
              <a
                href="https://www.linkedin.com/company/smart-agri-tec"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                Follow us on LinkedIn
              </a>
            </div>

            {/* Right — Form */}
            <div className="bg-[#f7f7f5] border border-gray-200 rounded-2xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
          <span>© 2026 Smart Agriculture</span>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-gray-600">Features</a>
            <a href="#about" className="hover:text-gray-600">About</a>
            <a href="#contact" className="hover:text-gray-600">Contact</a>
            <a href="/login" className="hover:text-gray-600">Login</a>
            <a href="https://www.linkedin.com/company/smart-agri-tec" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
