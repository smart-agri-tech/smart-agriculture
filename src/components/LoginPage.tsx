'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Logo = () => <img src='/logo-smart-agri.svg' alt='Smart Agriculture' className='w-7 h-7 object-contain' />;

const LoginPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubscription, setIsSubscription] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSubscription) {
        setSubscribed(true);
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex flex-col">
        <header className="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-base tracking-tight">
              <img src="/logo-smart-agri.svg" alt="Smart Agriculture" className="w-7 h-7 object-contain" />
              Smart Agriculture
            </button>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
            {resetSent ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Check your email</h2>
                <p className="text-gray-500 text-sm mb-6">We sent a password reset link to <strong>{email}</strong>.</p>
                <button onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
                  className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { setIsForgotPassword(false); setError(''); }}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                  Back to Login
                </button>
                <h2 className="text-2xl font-bold mb-1">Reset your password</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" required />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

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
          <button onClick={() => router.push('/register')} className="text-sm text-gray-500 hover:text-black transition-colors">
            Don't have an account? <span className="text-black font-medium">Sign up</span>
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-1">
            {isSubscription ? 'Stay updated' : isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            {isSubscription ? 'Subscribe to receive farm insights' : isLogin ? 'Sign in to your Smart Agriculture account' : 'Start your free account today'}
          </p>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isSubscription && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  required={!isLogin && !isSubscription} />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" required />
            </div>
            {!isSubscription && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  {isLogin && (
                    <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); }}
                      className="text-xs text-gray-500 hover:text-black transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  required={!isSubscription} />
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
              {loading ? 'Please wait...' : isSubscription ? 'Subscribe' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-500 space-y-2">
            {isSubscription ? (
              <p>Want full access?{' '}
                <button onClick={() => setIsSubscription(false)} className="text-black font-medium hover:underline">
                  {isLogin ? 'Login' : 'Create account'}
                </button>
              </p>
            ) : (
              <>
                <p>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-black font-medium hover:underline">
                    {isLogin ? 'Sign up' : 'Login'}
                  </button>
                </p>
                <p>
                  Just want updates?{' '}
                  <button onClick={() => setIsSubscription(true)} className="text-black font-medium hover:underline">Subscribe with email</button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
