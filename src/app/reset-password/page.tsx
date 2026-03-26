'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
          {done ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Password updated!</h2>
              <p className="text-gray-500 text-sm mb-6">Your password has been changed successfully.</p>
              <button onClick={() => router.push('/login')}
                className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Sign In
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1">Set new password</h2>
              <p className="text-gray-500 text-sm mb-6">Choose a strong password for your account.</p>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" required />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
