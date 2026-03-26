'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Logo = () => <img src='/logo-smart-agri.svg' alt='Smart Agriculture' className='w-7 h-7 object-contain' />;

const RegistrationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSkippingRegistration, setIsSkippingRegistration] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSkippingRegistration) {
        setSubscribed(true);
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        router.push('/onboarding');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center">
        <div className="bg-white border border-gray-200 p-10 rounded-2xl shadow-sm w-full max-w-md text-center">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4"><Logo /></div>
          <h1 className="text-2xl font-bold mb-2">You're subscribed!</h1>
          <p className="text-gray-500 text-sm mb-6">We'll send updates to <strong>{email}</strong>.</p>
          <button onClick={() => router.push('/')} className="bg-black text-white py-2 px-6 rounded-full text-sm hover:bg-gray-800 transition-colors">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-base tracking-tight">
            <Logo />
            Smart Agriculture
          </button>
          <button onClick={() => router.push('/login')} className="text-sm text-gray-500 hover:text-black transition-colors">
            Already have an account? <span className="text-black font-medium">Sign in</span>
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            {isSkippingRegistration ? 'Stay updated' : 'Create your account'}
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            {isSkippingRegistration ? 'Get farm insights in your inbox' : 'Start your free Smart Agriculture account'}
          </p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSkippingRegistration && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" required />
            </div>
            {!isSkippingRegistration && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
              {loading ? 'Please wait...' : isSkippingRegistration ? 'Subscribe' : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-500 space-y-2">
            {isSkippingRegistration ? (
              <p>Want full access?{' '}
                <button onClick={() => setIsSkippingRegistration(false)} className="text-black font-medium hover:underline">Create an account</button>
              </p>
            ) : (
              <p>Just want updates?{' '}
                <button onClick={() => setIsSkippingRegistration(true)} className="text-black font-medium hover:underline">Subscribe with email</button>
              </p>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400 mb-3">Not ready to sign up?</p>
            <button onClick={() => router.push('/dashboard')}
              className="w-full border border-gray-200 bg-white text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Explore Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
