import { DEADLINES, PLACEHOLDER_DATE } from './deadlines';
import type {
  Answers,
  BurdenLevel,
  Notice,
  RecordMethod,
  Requirement,
  RequirementId,
  Result,
  TimeSpent,
} from './types';

/** Pure rules engine for the Farm Compliance Check. No I/O, no dates from the clock. */

const RECORD_METHOD_LABEL: Record<RecordMethod, string> = {
  paper: 'paper',
  excel: 'Excel',
  whatsapp: 'WhatsApp',
  digital: 'a digital farm notebook',
  none: 'nowhere',
};

const RECORD_METHOD_SCORE: Record<RecordMethod, number> = {
  digital: 90,
  excel: 70,
  whatsapp: 50,
  paper: 45,
  none: 10,
};

const BURDEN: Record<TimeSpent, { level: BurdenLevel; percent: number; hours: string }> = {
  lt5: { level: 'Low', percent: 25, hours: 'under 5 hours' },
  '5to10': { level: 'Medium', percent: 55, hours: '5 to 10 hours' },
  '10to20': { level: 'High', percent: 85, hours: '10 to 20 hours' },
  gt20: { level: 'Very high', percent: 100, hours: 'more than 20 hours' },
};

const RISK_PENALTY = 14;
const EXTRA_SOURCE_PENALTY = 8;

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function deadlineLabel(id: RequirementId): string {
  const d = DEADLINES[id];
  if (id === 'fertilisation') return 'Within 1 month of the operation';
  if (!d.confirmed || !d.date) return id === 'qie' ? 'Ongoing' : PLACEHOLDER_DATE;
  if (id === 'qie') return `Ongoing · electronic from ${formatDate(d.date)}`;
  return d.dateLabel ?? formatDate(d.date);
}

function usesDigitalOnly(methods: RecordMethod[]): boolean {
  return methods.length > 0 && methods.every(m => m === 'digital');
}

function keepsNoRecords(methods: RecordMethod[]): boolean {
  return methods.length === 0 || methods.every(m => m === 'none');
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function receivesManure(a: Answers): boolean {
  return a.manure === 'receive' || a.manure === 'both';
}

function producesManure(a: Answers): boolean {
  return a.manure === 'own' || a.manure === 'both';
}

function appliesNutrients(a: Answers): boolean {
  return a.fertiliser !== 'none' || a.manure !== 'none';
}

export function applicableRequirements(a: Answers): Requirement[] {
  const reqs: Requirement[] = [];
  const digital = usesDigitalOnly(a.recordMethods);
  const make = (
    id: RequirementId,
    name: string,
    status: Requirement['status'],
    need: string,
  ): Requirement => ({ id, name, status, need, deadlineLabel: deadlineLabel(id), source: DEADLINES[id].source });

  if (!a.privateConsumptionOnly) {
    reqs.push(make('dun', 'DUN 2027', 'required', 'Annual farm declaration'));
  }

  if (a.schemes.includes('cap_submitted')) {
    reqs.push(make('cap', 'CAP aid application', 'completed', 'Direct aid application'));
  } else if (a.schemes.includes('cap_pending')) {
    reqs.push(make('cap', 'CAP aid application', 'required', 'Direct aid application'));
  }

  if (producesManure(a)) {
    reqs.push(make('dan', 'DAN 2026', 'required', 'Annual nitrogen declaration for the manure your farm produces.'));
  } else if (receivesManure(a)) {
    reqs.push(
      make('dan', 'DAN 2026', 'likely', 'Annual nitrogen declaration. We need two more details to confirm.'),
    );
  }

  const recordAreas: string[] = [];
  if (a.plantProtection !== 'none') recordAreas.push('treatments');
  if (appliesNutrients(a)) recordAreas.push('fertilisation');
  if (a.irrigation !== 'rainfed') recordAreas.push('irrigation');
  if (recordAreas.length > 0) {
    reqs.push(make('qie', 'QIE · farm records', digital ? 'on_track' : 'check', capitalise(recordAreas.join(', '))));
  }

  if (appliesNutrients(a)) {
    reqs.push(
      make(
        'fertilisation',
        'Fertilisation records',
        digital ? 'on_track' : 'required',
        a.irrigation === 'fertigation'
          ? 'Record every nutrient application, plus irrigation dose and N and P in the water'
          : 'Record every nutrient application',
      ),
    );
  }

  return reqs;
}

export function notices(a: Answers, reqs: Requirement[]): Notice[] {
  const warnings: string[] = [];
  const ok: string[] = [];
  const has = (id: RequirementId) => reqs.some(r => r.id === id);
  const paperLike = a.recordMethods.filter(m => m !== 'digital' && m !== 'none');
  const noRecords = keepsNoRecords(a.recordMethods);
  const recordObligations = reqs.filter(r => r.id === 'qie' || r.id === 'fertilisation').length;

  if (noRecords && recordObligations > 0) {
    warnings.push('You keep no farm records, but your operations require them');
  } else if (has('fertilisation') && paperLike.length >= 2) {
    warnings.push('Fertilisation records are stored in several places at once');
  }
  if (producesManure(a)) warnings.push('DAN applies because your farm produces manure');
  else if (receivesManure(a)) warnings.push('DAN may apply to your farm because you receive manure');
  if (a.schemes.includes('cap_pending')) warnings.push('Your CAP aid application has not been submitted yet');
  if (a.preparer === 'nobody' && reqs.length > 0) warnings.push('Nobody is responsible for preparing your declarations');

  if (has('dun')) ok.push('DUN identified and in scope');
  if (a.plantProtection !== 'none' && !noRecords) ok.push('Phytosanitary records are being maintained');
  if (a.recordMethods.includes('digital')) ok.push('A digital farm notebook is already in use');
  if (a.privateConsumptionOnly) ok.push('Private consumption only: no DUN declaration needed');

  return [
    ...warnings.map(text => ({ kind: 'warning' as const, text })),
    ...ok.map(text => ({ kind: 'ok' as const, text })),
  ];
}

export function dataReadiness(methods: RecordMethod[]): { score: number; summary: string } {
  if (keepsNoRecords(methods)) return { score: RECORD_METHOD_SCORE.none, summary: 'You do not keep records yet' };
  const used = methods.filter(m => m !== 'none');
  const best = Math.max(...used.map(m => RECORD_METHOD_SCORE[m]));
  const score = Math.max(0, best - EXTRA_SOURCE_PENALTY * (used.length - 1));
  const labels = used.map(m => RECORD_METHOD_LABEL[m]);
  const summary =
    used.length === 1 ? `Your records live in ${labels[0]}` : `Your records live in ${joinList(labels)}`;
  return { score, summary };
}

export function evaluate(a: Answers): Result {
  const requirements = applicableRequirements(a);
  const notes = notices(a, requirements);
  const risks = notes.filter(n => n.kind === 'warning').length;
  const data = dataReadiness(a.recordMethods);
  const burden = BURDEN[a.timeSpent];

  return {
    requirements,
    notices: notes,
    risks,
    complianceScore: Math.max(0, 100 - RISK_PENALTY * risks),
    dataScore: data.score,
    dataSummary: data.summary,
    burden: { level: burden.level, percent: burden.percent, summary: `You estimated ${burden.hours} a year` },
  };
}
