import { describe, expect, test } from 'bun:test';
import { buildIcs, evaluate, type Answers } from './index';

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

  test('unconfirmed dates are shown as placeholders and every row carries a source', () => {
    for (const req of evaluate(reference).requirements) {
      expect(req.source.length).toBeGreaterThan(0);
      if (['dun', 'cap', 'dan'].includes(req.id)) expect(req.deadlineLabel).toBe('[DATE]');
    }
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
    expect(ics).toContain('DTSTART;VALUE=DATE:20261231');
    expect(ics).toContain('RRULE:FREQ=MONTHLY;COUNT=12');
    expect(ics).toContain('(date to confirm)');
  });

  test('uses CRLF and folds long lines', () => {
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    for (const line of ics.split('\r\n')) expect(line.length).toBeLessThanOrEqual(75);
  });
});
