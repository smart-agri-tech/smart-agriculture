import { buildIcs, type RequirementStatus, type Result } from '@/lib/compliance';

const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);
export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const STATUS_BADGE: Record<RequirementStatus, { label: string; className: string }> = {
  required: { label: 'Required', className: 'bg-red-50 text-red-700 ring-red-200' },
  completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  likely: { label: 'Likely applicable', className: 'bg-amber-50 text-amber-800 ring-amber-200' },
  check: { label: 'Check records', className: 'bg-amber-50 text-amber-800 ring-amber-200' },
  on_track: { label: 'On track', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
};

export const scoreColours = (score: number) =>
  score >= 70
    ? { textClass: 'text-emerald-700', barClass: 'bg-emerald-500' }
    : score >= 40
      ? { textClass: 'text-amber-700', barClass: 'bg-amber-500' }
      : { textClass: 'text-red-700', barClass: 'bg-red-500' };

export function downloadIcs(result: Result) {
  const now = new Date();
  const firstOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const ics = buildIcs(result.requirements, { now, monthlyStart: firstOfNextMonth.toISOString().slice(0, 10) });
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'farm-compliance-deadlines.ics';
  a.click();
  URL.revokeObjectURL(url);
}
