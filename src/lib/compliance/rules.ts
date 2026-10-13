import { DEADLINES, PLACEHOLDER_DATE, officialUrl } from './deadlines';
import { MESSAGES, type Lang, type Messages } from './locales';
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

const RECORD_METHOD_SCORE: Record<RecordMethod, number> = {
  digital: 90,
  excel: 70,
  whatsapp: 50,
  paper: 45,
  none: 10,
};

const BURDEN: Record<TimeSpent, { level: BurdenLevel; percent: number }> = {
  lt5: { level: 'low', percent: 25 },
  '5to10': { level: 'medium', percent: 55 },
  '10to20': { level: 'high', percent: 85 },
  gt20: { level: 'veryHigh', percent: 100 },
};

const RISK_PENALTY = 14;
const EXTRA_SOURCE_PENALTY = 8;

export function deadlineLabel(id: RequirementId, lang: Lang = 'en'): string {
  const m = MESSAGES[lang].deadlines;
  const d = DEADLINES[id];
  if (id === 'fertilisation') return m.fertilisation;
  if (!d.confirmed) return id === 'qie' ? m.qieUnconfirmed : PLACEHOLDER_DATE;
  return m[id];
}

function usesDigitalOnly(methods: RecordMethod[]): boolean {
  return methods.length > 0 && methods.every(m => m === 'digital');
}

function keepsNoRecords(methods: RecordMethod[]): boolean {
  return methods.length === 0 || methods.every(m => m === 'none');
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

export function applicableRequirements(a: Answers, lang: Lang = 'en'): Requirement[] {
  const m = MESSAGES[lang];
  const t = m.requirements;
  const reqs: Requirement[] = [];
  const digital = usesDigitalOnly(a.recordMethods);
  const make = (id: RequirementId, name: string, status: Requirement['status'], need: string): Requirement => ({
    id,
    name,
    status,
    need,
    deadlineLabel: deadlineLabel(id, lang),
    source: m.sources[DEADLINES[id].source],
    sourceUrl: officialUrl(DEADLINES[id], m),
  });

  if (!a.privateConsumptionOnly) {
    reqs.push(make('dun', t.dun.name, 'required', t.dun.need));
  }

  if (a.schemes.includes('cap_submitted')) {
    reqs.push(make('cap', t.cap.name, 'completed', t.cap.need));
  } else if (a.schemes.includes('cap_pending')) {
    reqs.push(make('cap', t.cap.name, 'required', t.cap.need));
  }

  if (producesManure(a)) {
    reqs.push(make('dan', t.dan.name, 'required', t.dan.needRequired));
  } else if (receivesManure(a)) {
    reqs.push(make('dan', t.dan.name, 'likely', t.dan.needLikely));
  }

  const recordAreas: string[] = [];
  if (a.plantProtection !== 'none') recordAreas.push(t.qie.areas.treatments);
  if (appliesNutrients(a)) recordAreas.push(t.qie.areas.fertilisation);
  if (a.irrigation !== 'rainfed') recordAreas.push(t.qie.areas.irrigation);
  if (recordAreas.length > 0) {
    reqs.push(make('qie', t.qie.name, digital ? 'on_track' : 'check', capitalise(recordAreas.join(', '))));
  }

  if (appliesNutrients(a)) {
    reqs.push(
      make(
        'fertilisation',
        t.fertilisation.name,
        digital ? 'on_track' : 'required',
        a.irrigation === 'fertigation' ? t.fertilisation.needFertigation : t.fertilisation.need,
      ),
    );
  }

  return reqs;
}

export function notices(a: Answers, reqs: Requirement[], lang: Lang = 'en'): Notice[] {
  const t = MESSAGES[lang].notices;
  const warnings: string[] = [];
  const ok: string[] = [];
  const has = (id: RequirementId) => reqs.some(r => r.id === id);
  const paperLike = a.recordMethods.filter(m => m !== 'digital' && m !== 'none');
  const noRecords = keepsNoRecords(a.recordMethods);
  const recordObligations = reqs.filter(r => r.id === 'qie' || r.id === 'fertilisation').length;

  if (noRecords && recordObligations > 0) {
    warnings.push(t.noRecords);
  } else if (has('fertilisation') && paperLike.length >= 2) {
    warnings.push(t.severalPlaces);
  }
  if (producesManure(a)) warnings.push(t.danProduces);
  else if (receivesManure(a)) warnings.push(t.danReceives);
  if (a.schemes.includes('cap_pending')) warnings.push(t.capPending);
  if (a.preparer === 'nobody' && reqs.length > 0) warnings.push(t.nobody);

  if (has('dun')) ok.push(t.dunInScope);
  if (a.plantProtection !== 'none' && !noRecords) ok.push(t.phytoMaintained);
  if (a.recordMethods.includes('digital')) ok.push(t.digitalInUse);
  if (a.privateConsumptionOnly) ok.push(t.privateOnly);

  return [
    ...warnings.map(text => ({ kind: 'warning' as const, text })),
    ...ok.map(text => ({ kind: 'ok' as const, text })),
  ];
}

export function dataReadiness(methods: RecordMethod[], lang: Lang = 'en'): { score: number; summary: string } {
  const t: Messages['data'] = MESSAGES[lang].data;
  if (keepsNoRecords(methods)) return { score: RECORD_METHOD_SCORE.none, summary: t.noRecords };
  const used = methods.filter(m => m !== 'none');
  const best = Math.max(...used.map(m => RECORD_METHOD_SCORE[m]));
  const score = Math.max(0, best - EXTRA_SOURCE_PENALTY * (used.length - 1));
  return { score, summary: t.liveIn(used.map(m => t.methods[m])) };
}

export function evaluate(a: Answers, lang: Lang = 'en'): Result {
  const requirements = applicableRequirements(a, lang);
  const notes = notices(a, requirements, lang);
  const risks = notes.filter(n => n.kind === 'warning').length;
  const data = dataReadiness(a.recordMethods, lang);
  const burden = BURDEN[a.timeSpent];
  const t = MESSAGES[lang].burden;

  return {
    requirements,
    notices: notes,
    risks,
    complianceScore: Math.max(0, 100 - RISK_PENALTY * risks),
    dataScore: data.score,
    dataSummary: data.summary,
    burden: { level: t.levels[burden.level], percent: burden.percent, summary: t.summary(t.hours[a.timeSpent]) },
  };
}
