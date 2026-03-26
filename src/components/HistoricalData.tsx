'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2026-04-01', ndvi: 0.65, soilMoisture: 0.28, temperature: 18, satellitePass: true },
  { date: '2026-04-08', ndvi: 0.68, soilMoisture: 0.30, temperature: 20, satellitePass: false },
  { date: '2026-04-15', ndvi: 0.72, soilMoisture: 0.32, temperature: 22, satellitePass: true },
  { date: '2026-04-22', ndvi: 0.75, soilMoisture: 0.29, temperature: 24, satellitePass: false },
  { date: '2026-04-29', ndvi: 0.78, soilMoisture: 0.27, temperature: 26, satellitePass: true },
];

const metricLabels = { ndvi: 'NDVI', soilMoisture: 'Soil Moisture', temperature: 'Temperature' };

const HistoricalDataView = () => {
  const router = useRouter();
  const [dataSource, setDataSource] = useState('all');
  const [timeRange, setTimeRange] = useState('1month');
  const [metric, setMetric] = useState('ndvi');

  const filteredData = dataSource === 'satellite'
    ? mockData.filter(item => item.satellitePass)
    : mockData;

  const selectClass = "border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white text-gray-900";
  const cardClass = "bg-white border border-gray-200 rounded-2xl shadow-sm p-6";

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
            <button onClick={() => router.push('/dashboard/historical')} className="text-black font-medium">Historical</button>
            <button onClick={() => router.push('/dashboard/add-sensor')} className="text-gray-500 hover:text-black transition-colors">Add Sensor</button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">

        {/* Back button + Header */}
        <div>
          <button onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Historical Farm Data</h1>
              <p className="text-gray-500 text-sm">Analyse trends from satellite passes and IoT sensors over time.</p>
            </div>
            <div className="flex gap-3">
              <button className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                Export CSV
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={cardClass}>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Source</span>
              <select value={dataSource} onChange={(e) => setDataSource(e.target.value)} className={selectClass}>
                <option value="all">All Sources</option>
                <option value="satellite">Satellite Only</option>
                <option value="iot">IoT Sensors Only</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Range</span>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className={selectClass}>
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Metric</span>
              <select value={metric} onChange={(e) => setMetric(e.target.value)} className={selectClass}>
                <option value="ndvi">NDVI</option>
                <option value="soilMoisture">Soil Moisture</option>
                <option value="temperature">Temperature</option>
              </select>
            </div>
            <span className="ml-auto text-xs text-gray-400">{filteredData.length} records</span>
          </div>
        </div>

        {/* Chart */}
        <div className={cardClass}>
          <h2 className="font-semibold text-base mb-4">{metricLabels[metric]} Trend</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={metric} stroke="#84A12D" strokeWidth={2} dot={{ r: 4 }} name={metricLabels[metric]} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className={cardClass}>
          <h2 className="font-semibold text-base mb-4">Data Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">NDVI</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Soil Moisture</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Temperature (°C)</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Satellite</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{row.date}</td>
                    <td className="py-3 px-4">{row.ndvi.toFixed(2)}</td>
                    <td className="py-3 px-4">{row.soilMoisture.toFixed(2)}</td>
                    <td className="py-3 px-4">{row.temperature}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${row.satellitePass ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {row.satellitePass ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => router.push('/dashboard/record')} className="text-xs text-black underline hover:no-underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HistoricalDataView;
