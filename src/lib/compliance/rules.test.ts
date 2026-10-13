import { describe, expect, test } from 'bun:test';
import { buildIcs, evaluate, type Answers } from './index';
import { KEY_DATES, counterFor } from './keyDates';

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

  test('confirmed dates are shown, CAP stays a placeholder, every row carries a source', () => {
    const labels = Object.fromEntries(evaluate(reference).requirements.map(r => [r.id, r.deadlineLabel]));
    expect(labels).toEqual({
      dun: 'Feb–Apr 2027',
      cap: '[DATE]',
      dan: '20 January 2027',
      qie: 'Ongoing · electronic from 1 January 2027',
      fertilisation: 'Within 1 month of the operation',
    });
    for (const req of evaluate(reference).requirements) expect(req.source.length).toBeGreaterThan(0);
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

  test('uses CRLF and folds long lines', () => {
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    for (const line of ics.split('\r\n')) expect(line.length).toBeLessThanOrEqual(75);
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
