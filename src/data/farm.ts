/** Demo data shown on the dashboard until real sensor and satellite data is wired in. */

export interface HistoricalRecord {
  date: string;
  ndvi: number;
  soilMoisture: number;
  temperature: number;
  satellitePass: boolean;
}

export type Metric = 'ndvi' | 'soilMoisture' | 'temperature';

export const METRIC_LABELS: Record<Metric, string> = { ndvi: 'NDVI', soilMoisture: 'Soil Moisture', temperature: 'Temperature' };

export const mockFieldData = [
  { name: 'Field A', ndvi: 0.8, soilMoisture: 0.3 },
  { name: 'Field B', ndvi: 0.7, soilMoisture: 0.25 },
  { name: 'Field C', ndvi: 0.75, soilMoisture: 0.28 },
  { name: 'Field D', ndvi: 0.85, soilMoisture: 0.32 },
];

export const mockHistoricalData: HistoricalRecord[] = [
  { date: '2026-04-01', ndvi: 0.65, soilMoisture: 0.28, temperature: 18, satellitePass: true },
  { date: '2026-04-08', ndvi: 0.68, soilMoisture: 0.3, temperature: 20, satellitePass: false },
  { date: '2026-04-15', ndvi: 0.72, soilMoisture: 0.32, temperature: 22, satellitePass: true },
  { date: '2026-04-22', ndvi: 0.75, soilMoisture: 0.29, temperature: 24, satellitePass: false },
  { date: '2026-04-29', ndvi: 0.78, soilMoisture: 0.27, temperature: 26, satellitePass: true },
];
