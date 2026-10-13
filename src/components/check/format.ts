import { buildIcs, type Lang, type RequirementStatus, type Result } from '@/lib/compliance';

export const STATUS_CLASS: Record<RequirementStatus, string> = {
  required: 'bg-red-50 text-red-700 ring-red-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  likely: 'bg-amber-50 text-amber-800 ring-amber-200',
  check: 'bg-amber-50 text-amber-800 ring-amber-200',
  on_track: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

export const scoreColours = (score: number) =>
  score >= 70
    ? { textClass: 'text-emerald-700', barClass: 'bg-emerald-500' }
    : score >= 40
      ? { textClass: 'text-amber-700', barClass: 'bg-amber-500' }
      : { textClass: 'text-red-700', barClass: 'bg-red-500' };

export function downloadIcs(result: Result, lang: Lang) {
  const now = new Date();
  const firstOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const ics = buildIcs(result.requirements, { now, monthlyStart: firstOfNextMonth.toISOString().slice(0, 10), lang });
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'farm-compliance-deadlines.ics';
  a.click();
  URL.revokeObjectURL(url);
}
