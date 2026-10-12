import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

// Shared look, matching the previous recharts styling: light dashed grid, 12px ticks, legend at the bottom.
const common = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: { legend: { position: 'bottom' as const } },
};

const axis = {
  grid: { color: '#f0f0f0', tickBorderDash: [3, 3] },
  border: { dash: [3, 3] },
  ticks: { font: { size: 12 } },
};

export const lineOptions: ChartOptions<'line'> = { ...common, scales: { x: axis, y: { ...axis, beginAtZero: true } } };

export const barOptions: ChartOptions<'bar'> = {
  ...common,
  scales: {
    x: axis,
    y: { ...axis, position: 'left', beginAtZero: true },
    y1: { ...axis, position: 'right', beginAtZero: true, grid: { ...axis.grid, drawOnChartArea: false } },
  },
};
