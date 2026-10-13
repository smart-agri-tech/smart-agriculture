import { describe, expect, test } from 'bun:test';
import { CONTROLLER, POLICY_VERSION, consentRecord } from './legal';

describe('legal', () => {
  test('controller details are filled in (no placeholders left)', () => {
    for (const value of [CONTROLLER.name, CONTROLLER.taxId, CONTROLLER.address, CONTROLLER.email]) {
      expect(value.length).toBeGreaterThan(0);
      expect(value).not.toContain('[');
    }
  });

  test('consent record carries the policy version and time', () => {
    expect(consentRecord(new Date('2026-10-13T10:00:00Z'))).toEqual({
      consent: 'yes',
      consentAt: '2026-10-13T10:00:00.000Z',
      policyVersion: POLICY_VERSION,
    });
  });
});
