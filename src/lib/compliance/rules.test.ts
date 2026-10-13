import { describe, expect, test } from 'bun:test';
import { KEY_DATES, QUESTION_COUNT, buildIcs, counterFor, evaluate, questions, type Answers, type Lang } from './index';

// The answers behind the reference result ("Farm Compliance Check · result.pdf").
const reference: Answers = {
  region: 'catalonia',
  farmTypes: ['fruit'],
  area: '10to50',
  privateConsumptionOnly: false,
  fertiliser: 'mineral',
  manure: 'receive',
  plantProtection: 'self',
  irrigation: 'irrigated',
  schemes: ['cap_submitted'],
  recordMethods: ['excel', 'whatsapp', 'paper'],
  preparer: 'self',
  timeSpent: '10to20',
};

describe('evaluate', () => {
  test('reproduces the reference result', () => {
    const r = evaluate(reference);
    expect(r.requirements.map(x => [x.name, x.status])).toEqual([
      ['DUN 2026', 'required'],
      ['CAP aid application', 'completed'],
      ['DAN 2026', 'likely'],
      ['QIE · farm records', 'check'],
      ['Fertilisation records', 'required'],
    ]);
    expect(r.risks).toBe(2);
    expect(r.complianceScore).toBe(72);
    expect(r.dataScore).toBe(54);
    expect(r.dataSummary).toBe('Your records live in Excel, WhatsApp and paper');
    expect(r.burden.level).toBe('High');
    expect(r.requirements.find(x => x.id === 'qie')?.need).toBe('Treatments, fertilisation, irrigation');
    expect(r.notices.map(n => n.text)).toEqual([
      'Fertilisation records are stored in several places at once',
      'DAN may apply to your farm because you receive manure',
      'DUN identified and in scope',
      'Phytosanitary records are being maintained',
    ]);
  });

  test('confirmed dates are shown and every row carries a source', () => {
    const labels = Object.fromEntries(evaluate(reference).requirements.map(r => [r.id, r.deadlineLabel]));
    expect(labels).toEqual({
      dun: 'Feb–Apr 2027',
      cap: '1 Feb – 15 May 2026',
      dan: '20 January 2027',
      qie: 'Ongoing · electronic from 1 January 2027',
      fertilisation: 'Within 1 month of the operation',
    });
    for (const req of evaluate(reference).requirements) expect(req.source.length).toBeGreaterThan(0);
  });

  test('DUN and CAP link to the official page in the matching language', () => {
    const url = (lang: Lang, id: string) => evaluate(reference, lang).requirements.find(r => r.id === id)?.sourceUrl;
    expect(url('en', 'cap')).toBe('https://tramits.gencat.cat/ca/tramits/tramits-temes/6497_Declaracio-unica-Agraria-DUN');
    expect(url('es', 'dun')).toBe('https://tramits.gencat.cat/es/tramits/tramits-temes/6497_Declaracio-unica-Agraria-DUN');
    expect(url('ca', 'dan')).toBeUndefined();
    expect(evaluate(reference).requirements.find(r => r.id === 'cap')?.source).toBe('Ordre ARP/24/2026');
  });

  test('private consumption drops DUN', () => {
    const r = evaluate({ ...reference, privateConsumptionOnly: true });
    expect(r.requirements.some(x => x.id === 'dun')).toBe(false);
  });

  test('own manure makes DAN required, no manure removes it', () => {
    expect(evaluate({ ...reference, manure: 'own' }).requirements.find(x => x.id === 'dan')?.status).toBe('required');
    expect(evaluate({ ...reference, manure: 'none' }).requirements.some(x => x.id === 'dan')).toBe(false);
  });

  test('a digital notebook puts records on track and lifts data readiness', () => {
    const r = evaluate({ ...reference, recordMethods: ['digital'] });
    expect(r.requirements.find(x => x.id === 'qie')?.status).toBe('on_track');
    expect(r.requirements.find(x => x.id === 'fertilisation')?.status).toBe('on_track');
    expect(r.dataScore).toBe(90);
  });

  test('a rainfed farm with no inputs has no record obligations', () => {
    const r = evaluate({ ...reference, fertiliser: 'none', manure: 'none', plantProtection: 'none', irrigation: 'rainfed' });
    expect(r.requirements.map(x => x.id)).toEqual(['dun', 'cap']);
  });

  test('keeping no records is flagged as a risk', () => {
    const r = evaluate({ ...reference, recordMethods: ['none'] });
    expect(r.notices[0]).toEqual({ kind: 'warning', text: 'You keep no farm records, but your operations require them' });
    expect(r.dataScore).toBe(10);
  });
});

describe('buildIcs', () => {
  const ics = buildIcs(evaluate(reference).requirements, {
    now: new Date('2026-10-12T00:00:00Z'),
    monthlyStart: '2026-11-01',
  });

  test('one VEVENT with a 14-day VALARM per open deadline', () => {
    // Completed CAP application is skipped: DUN, DAN, QIE, fertilisation.
    expect(ics.match(/BEGIN:VEVENT/g)?.length).toBe(4);
    expect(ics.match(/TRIGGER:-P14D/g)?.length).toBe(4);
    expect(ics).toContain('DTSTART;VALUE=DATE:20270430');
    expect(ics).toContain('DTSTART;VALUE=DATE:20270120');
    expect(ics).toContain('Filing window opens 2027-02-01.');
    expect(ics).toContain('RRULE:FREQ=MONTHLY;COUNT=12');
    expect(ics).not.toContain('(date to confirm)');
  });

  test('uses CRLF and folds long lines by bytes, also with accents', () => {
    const icsCa = buildIcs(evaluate(reference, 'ca').requirements, { now: new Date('2026-10-12T00:00:00Z'), monthlyStart: '2026-11-01', lang: 'ca' });
    expect(icsCa).toContain('X-WR-CALNAME:Terminis normatius de l');
    for (const out of [ics, icsCa]) {
      expect(out.endsWith('END:VCALENDAR\r\n')).toBe(true);
      for (const line of out.split('\r\n')) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    }
  });

  test('skips deadlines that have already passed', () => {
    // A pending CAP application (deadline 15 May 2026) gets no event in October 2026.
    const pending = evaluate({ ...reference, schemes: ['cap_pending'] }).requirements;
    const out = buildIcs(pending, { now: new Date('2026-10-12T00:00:00Z'), monthlyStart: '2026-11-01' });
    expect(out).not.toContain('UID:cap-');
    expect(out.match(/BEGIN:VEVENT/g)?.length).toBe(4);
  });
});

describe('key date counters', () => {
  // 12 Oct 2026, 18:28 in Madrid.
  const now = new Date('2026-10-12T18:28:00+02:00');
  const text = (id: string, at = now) => counterFor(KEY_DATES.find(k => k.id === id)!, at).text;

  test('match the agreed formats', () => {
    expect(text('phyto-electronic')).toBe('80 d 06 h 32 m');
    expect(text('dan')).toBe('99 d 06 h 32 m');
    expect(text('fertilisation')).toBe('in force 284 days');
    expect(text('treatments')).toBe('in force 13 years');
    expect(text('cue')).toBe('starts in 445 days');
    expect(text('dun')).toBe('opens in 111 days');
  });

  test('countdowns turn into "in force" once the date passes', () => {
    expect(text('phyto-electronic', new Date('2027-01-01T00:00:00+01:00'))).toBe('in force 0 days');
    expect(text('cue', new Date('2028-01-02T12:00:00+01:00'))).toBe('in force 1 day');
  });

  test('the DUN window opens, then closes', () => {
    expect(text('dun', new Date('2027-03-01T12:00:00+01:00'))).toBe('closes in 60 days');
    expect(text('dun', new Date('2027-05-01T00:00:00+02:00'))).toBe('closed');
  });
});

describe('languages', () => {
  test('questions have every text in every language, with the new area bands and "Other"', () => {
    for (const lang of ['en', 'ca', 'es'] as Lang[]) {
      const qs = questions(lang);
      expect(qs.length).toBe(QUESTION_COUNT);
      for (const q of qs) {
        expect(q.title.length).toBeGreaterThan(0);
        for (const o of q.options) expect(o.label?.length).toBeGreaterThan(0);
      }
      const farm = qs.find(q => q.key === 'farmTypes')!;
      expect(farm.options.find(o => o.value === 'other')?.freeText).toBe(true);
      expect(farm.freeText?.key).toBe('farmTypesOther');
      expect(qs.find(q => q.key === 'area')!.options.map(o => o.value)).toEqual(['lt1', '1to5', '5to10', '10to50', '50to200', 'gt200']);
    }
  });

  test('the reference result in Catalan and Spanish', () => {
    const ca = evaluate(reference, 'ca');
    expect(ca.requirements.map(r => r.name)).toEqual([
      'DUN 2026',
      "Sol·licitud d'ajuts PAC",
      'DAN 2026',
      "QIE · registres de l'explotació",
      'Registre de fertilització',
    ]);
    expect(ca.dataSummary).toBe('Els teus registres són a Excel, WhatsApp i paper');
    expect(ca.burden.level).toBe('Alta');

    const es = evaluate(reference, 'es');
    expect(es.requirements.find(r => r.id === 'qie')?.need).toBe('Tratamientos, fertilización, riego');
    expect(es.requirements.find(r => r.id === 'cap')?.deadlineLabel).toBe('1 feb – 15 may 2026');
    expect(es.burden.summary).toBe('Has estimado de 10 a 20 horas al año');
    // Scores do not depend on the language.
    expect([ca.complianceScore, es.dataScore]).toEqual([72, 54]);
  });

  test('counters in Catalan and Spanish', () => {
    const now = new Date('2026-10-12T18:28:00+02:00');
    const text = (id: string, lang: Lang) => counterFor(KEY_DATES.find(k => k.id === id)!, now, lang).text;
    expect(text('phyto-electronic', 'ca')).toBe('80 d 06 h 32 m');
    expect(text('fertilisation', 'ca')).toBe('en vigor fa 284 dies');
    expect(text('treatments', 'es')).toBe('en vigor desde hace 13 años');
    expect(text('cue', 'es')).toBe('empieza en 445 días');
    expect(text('dun', 'ca')).toBe("s'obre d'aquí a 111 dies");
  });
});
