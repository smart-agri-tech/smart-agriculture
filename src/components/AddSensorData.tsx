'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddSensorData = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    soilMoisture: '',
    temperature: '',
    humidity: '',
    soilpH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
    setLoading(false);
  };

  const fields = [
    { name: 'soilMoisture', label: 'Soil Moisture', unit: '%', step: '1' },
    { name: 'temperature', label: 'Temperature', unit: '°C', step: '0.1' },
    { name: 'humidity', label: 'Humidity', unit: '%', step: '1' },
    { name: 'soilpH', label: 'Soil pH', unit: 'pH', step: '0.1' },
    { name: 'nitrogen', label: 'Nitrogen', unit: 'ppm', step: '1' },
    { name: 'phosphorus', label: 'Phosphorus', unit: 'ppm', step: '1' },
    { name: 'potassium', label: 'Potassium', unit: 'ppm', step: '1' },
  ];

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-900";

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 w-full max-w-md text-center">
          <div className="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Data Submitted</h2>
          <p className="text-gray-500 text-sm mb-6">Sensor readings have been recorded successfully.</p>
          <div className="flex gap-3">
            <button onClick={() => { setSubmitted(false); setFormData({ soilMoisture: '', temperature: '', humidity: '', soilpH: '', nitrogen: '', phosphorus: '', potassium: '' }); }}
              className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Add More
            </button>
            <button onClick={() => router.push('/dashboard')}
              className="flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-base tracking-tight">
            <img src="/logo-smart-agri.svg" alt="Smart Agriculture" className="w-7 h-7 object-contain" />
            Smart Agriculture
          </button>
          <nav className="flex items-center gap-4 text-sm">
            <button onClick={() => router.push('/dashboard')} className="text-gray-500 hover:text-black transition-colors">Dashboard</button>
            <button onClick={() => router.push('/dashboard/historical')} className="text-gray-500 hover:text-black transition-colors">Historical</button>
            <button onClick={() => router.push('/dashboard/add-sensor')} className="text-black font-medium">Add Sensor</button>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Back button */}
        <button onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Add Sensor Data</h1>
            <p className="text-gray-500 text-sm">Record readings during or within 30 min of a satellite pass.</p>
          </div>
          <button onClick={() => router.push('/dashboard')}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Alert */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 text-sm text-amber-800">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          <span><strong>Important:</strong> Ensure all sensor readings are taken within 30 minutes of the satellite pass for optimal data correlation.</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map(({ name, label, unit, step }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} <span className="text-gray-400 font-normal">({unit})</span>
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  step={step}
                  required
                  className={inputClass}
                  placeholder="—"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => router.push('/dashboard')}
              className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Sensor Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorData;
