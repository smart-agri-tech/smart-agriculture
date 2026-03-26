'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Logo = () => <img src='/logo-smart-agri.svg' alt='Smart Agriculture' className='w-7 h-7 object-contain' />;

const ReportModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-[#84A12D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#84A12D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Request Sent!</h3>
            <p className="text-gray-500 text-sm mb-6">We'll prepare your demo report and get back to you shortly.</p>
            <a
              href="https://calendly.com/sync_katerina_a/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Schedule a Call on Calendly
            </a>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-1">Request Demo Report</h3>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll send you a tailored farm report.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What would you like in the report? <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                {loading ? 'Sending...' : 'Request Report'}
              </button>
            </form>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 mb-2">Prefer to talk directly?</p>
              <a
                href="https://calendly.com/sync_katerina_a/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-black font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Schedule a 30-min call on Calendly
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mockFieldData = [
  { name: 'Field A', ndvi: 0.8, soilMoisture: 0.3 },
  { name: 'Field B', ndvi: 0.7, soilMoisture: 0.25 },
  { name: 'Field C', ndvi: 0.75, soilMoisture: 0.28 },
  { name: 'Field D', ndvi: 0.85, soilMoisture: 0.32 },
];

const mockHistoricalData = [
  { date: '2026-04-01', ndvi: 0.65, soilMoisture: 0.28, temperature: 18, satellitePass: true },
  { date: '2026-04-08', ndvi: 0.68, soilMoisture: 0.30, temperature: 20, satellitePass: false },
  { date: '2026-04-15', ndvi: 0.72, soilMoisture: 0.32, temperature: 22, satellitePass: true },
  { date: '2026-04-22', ndvi: 0.75, soilMoisture: 0.29, temperature: 24, satellitePass: false },
  { date: '2026-04-29', ndvi: 0.78, soilMoisture: 0.27, temperature: 26, satellitePass: true },
];

const ComprehensiveDashboard = () => {
  const router = useRouter();
  const [sensorData, setSensorData] = useState({ soilMoisture: '', temperature: '', humidity: '' });
  const [dataSource, setDataSource] = useState('all');
  const [timeRange, setTimeRange] = useState('1month');
  const [metric, setMetric] = useState('ndvi');
  const [showReportModal, setShowReportModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSensorData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitSensorData = (e) => {
    e.preventDefault();
    alert('Sensor data submitted successfully!');
    setSensorData({ soilMoisture: '', temperature: '', humidity: '' });
  };

  const filteredData = dataSource === 'satellite'
    ? mockHistoricalData.filter(item => item.satellitePass)
    : mockHistoricalData;

  const cardClass = "bg-white border border-gray-200 rounded-2xl p-6 shadow-sm";
  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10";
  const selectClass = "border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10";

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-[#f7f7f5]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-base tracking-tight">
            <Logo />
            Smart Agriculture
          </button>
          <nav className="flex items-center gap-4 text-sm">
            <button onClick={() => router.push('/dashboard')} className="text-black font-medium">Dashboard</button>
            <button onClick={() => router.push('/dashboard/historical')} className="text-gray-500 hover:text-black transition-colors">Historical</button>
            <button onClick={() => router.push('/dashboard/add-sensor')} className="text-gray-500 hover:text-black transition-colors">Add Sensor</button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Page title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Farm Dashboard</h1>
          <div className="flex items-center gap-2 text-sm bg-[#84A12D]/10 text-[#84A12D] border border-[#84A12D]/20 px-4 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 bg-[#84A12D] rounded-full animate-pulse inline-block"></span>
            Satellite Pass Active — Next 20 min
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Average NDVI', value: '0.75', sub: 'Healthy vegetation', color: 'text-[#84A12D]' },
            { label: 'Soil Moisture', value: '28%', sub: 'Optimal range', color: 'text-blue-500' },
            { label: 'Temperature', value: '22°C', sub: 'Current reading', color: 'text-orange-500' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className={cardClass}>
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Add Sensor Data */}
        <div className={cardClass}>
          <h2 className="font-semibold text-base mb-4">Add Sensor Data</h2>
          <form onSubmit={handleSubmitSensorData} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture (%)</label>
                <input type="number" name="soilMoisture" value={sensorData.soilMoisture} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                <input type="number" name="temperature" value={sensorData.temperature} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
                <input type="number" name="humidity" value={sensorData.humidity} onChange={handleInputChange} className={inputClass} required />
              </div>
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Submit Sensor Data
            </button>
          </form>
        </div>

        {/* Field Overview Chart */}
        <div className={cardClass}>
          <h2 className="font-semibold text-base mb-4">Field Overview</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockFieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="ndvi" fill="#84A12D" name="NDVI" radius={[4,4,0,0]} />
              <Bar yAxisId="right" dataKey="soilMoisture" fill="#93c5fd" name="Soil Moisture" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Historical Data */}
        <div className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="font-semibold text-base">Historical Data</h2>
            <div className="flex gap-3 flex-wrap">
              <select value={dataSource} onChange={(e) => setDataSource(e.target.value)} className={selectClass}>
                <option value="all">All Sources</option>
                <option value="satellite">Satellite Only</option>
                <option value="iot">IoT Sensors Only</option>
              </select>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className={selectClass}>
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <select value={metric} onChange={(e) => setMetric(e.target.value)} className={selectClass}>
                <option value="ndvi">NDVI</option>
                <option value="soilMoisture">Soil Moisture</option>
                <option value="temperature">Temperature</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={metric} stroke="#84A12D" strokeWidth={2} dot={{ r: 4 }} name={metric.toUpperCase()} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Data Records Table */}
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
                      <button className="text-xs text-black underline hover:no-underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cardClass}>
            <h2 className="font-semibold text-base mb-4">Recent Alerts</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span><span>Low soil moisture detected in Field B</span></li>
              <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></span><span>Potential pest infestation in Field C</span></li>
              <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span><span>Optimal conditions for harvesting in Field A</span></li>
            </ul>
          </div>
          <div className={cardClass}>
            <h2 className="font-semibold text-base mb-4">Recommendations</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-gray-300">→</span> Increase irrigation in Field B</li>
              <li className="flex items-start gap-2"><span className="text-gray-300">→</span> Schedule pest inspection for Field C</li>
              <li className="flex items-start gap-2"><span className="text-gray-300">→</span> Prepare harvesting equipment for Field A</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pb-8">
          <button className="border border-gray-200 bg-white text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Export Raw Data</button>
          <button onClick={() => setShowReportModal(true)} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Download Report</button>
        </div>
      </div>

      {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}
    </div>
  );
};

export default ComprehensiveDashboard;
