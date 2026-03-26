'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Logo = () => <img src='/logo-smart-agri.svg' alt='Smart Agriculture' className='w-7 h-7 object-contain' />;

const farmTypes = [
  { id: 'crop', label: 'Crop Farming' },
  { id: 'livestock', label: 'Livestock' },
  { id: 'mixed', label: 'Mixed Farming' },
  { id: 'organic', label: 'Organic Farming' },
  { id: 'greenhouse', label: 'Greenhouse' },
  { id: 'orchard', label: 'Orchard' },
];

const indicators = [
  { id: 'ndvi', label: 'NDVI (Vegetation Health)' },
  { id: 'lai', label: 'LAI (Leaf Area Index)' },
  { id: 'evi', label: 'EVI (Enhanced Vegetation Index)' },
  { id: 'ndwi', label: 'NDWI (Water Content)' },
  { id: 'soil_moisture', label: 'Soil Moisture' },
  { id: 'temperature', label: 'Surface Temperature' },
  { id: 'chlorophyll', label: 'Chlorophyll Content' },
  { id: 'nitrogen', label: 'Nitrogen Content' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', farmTypes: [] as string[], otherFarmType: '', indicators: [] as string[], farmLocation: '', notificationFrequency: 'Weekly'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setFormData(prev => ({ ...prev, name: user.user_metadata?.full_name || '' }));
      }
    });
  }, []);

  const toggleFarmType = (id: string) => {
    setFormData(prev => ({
      ...prev,
      farmTypes: prev.farmTypes.includes(id)
        ? prev.farmTypes.filter(t => t !== id)
        : [...prev.farmTypes, id]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (checked ? [...prev.indicators, value] : prev.indicators.filter(i => i !== value))
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const payload = {
          user_id: user.id,
          name: formData.name,
          farm_types: formData.farmTypes,
          other_farm_type: formData.otherFarmType,
          indicators: formData.indicators,
          farm_location: formData.farmLocation,
          notification_frequency: formData.notificationFrequency,
        };
        const { error } = await supabase.from('onboarding').upsert(payload);
        if (error) throw error;
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save onboarding data');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white";
  const sectionClass = "bg-white border border-gray-200 rounded-2xl p-6 shadow-sm";

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-base tracking-tight">
            <Logo />
            Smart Agriculture
          </button>
          <span className="text-sm text-gray-400">Setup your farm profile</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Smart Agriculture</h1>
          <p className="text-gray-500 text-sm">Tell us about your farm so we can personalize your experience.</p>
        </div>

        {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Info */}
          <div className={sectionClass}>
            <h2 className="font-semibold text-base mb-4">Your Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          {/* Farm Type */}
          <div className={sectionClass}>
            <h2 className="font-semibold text-base mb-1">Farm Type</h2>
            <p className="text-xs text-gray-400 mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {farmTypes.map(({ id, label }) => {
                const selected = formData.farmTypes.includes(id);
                return (
                  <button key={id} type="button" onClick={() => toggleFarmType(id)}
                    className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm transition-colors text-left ${selected ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                    <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${selected ? 'bg-white border-white' : 'border-gray-300'}`}>
                      {selected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </span>
                    {label}
                  </button>
                );
              })}
              {/* Other option */}
              <button type="button" onClick={() => toggleFarmType('other')}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm transition-colors text-left ${formData.farmTypes.includes('other') ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${formData.farmTypes.includes('other') ? 'bg-white border-white' : 'border-gray-300'}`}>
                  {formData.farmTypes.includes('other') && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                </span>
                Other
              </button>
            </div>
            {formData.farmTypes.includes('other') && (
              <div className="mt-3">
                <input
                  type="text"
                  name="otherFarmType"
                  value={formData.otherFarmType}
                  onChange={handleInputChange}
                  placeholder="Describe your farm type..."
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {/* Indicators */}
          <div className={sectionClass}>
            <h2 className="font-semibold text-base mb-4">Monitoring Indicators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {indicators.map(({ id, label }) => {
                const checked = formData.indicators.includes(id);
                return (
                  <label key={id} className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-colors ${checked ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'}`}>
                    <input type="checkbox" name="indicators" value={id} checked={checked} onChange={handleInputChange} className="sr-only" />
                    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? 'bg-white border-white' : 'border-gray-300'}`}>
                      {checked && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </span>
                    {label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Location & Notifications */}
          <div className={sectionClass}>
            <h2 className="font-semibold text-base mb-4">Farm Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                <input type="text" name="farmLocation" value={formData.farmLocation} onChange={handleInputChange} placeholder="City, Country" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Frequency</label>
                <select name="notificationFrequency" value={formData.notificationFrequency} onChange={handleInputChange} className={inputClass}>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50">
            {loading ? 'Setting up...' : 'Complete Setup and View Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}
