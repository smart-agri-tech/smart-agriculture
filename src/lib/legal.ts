/**
 * Data controller details shown in the privacy policy and next to every form that collects personal data.
 * DRAFT: the policy text has not been reviewed by a lawyer yet.
 */
export const CONTROLLER = {
  name: 'Ekaterina Akhmadeeva',
  /** Legal form, shown after the name. */
  legalForm: { en: 'self-employed professional (autónoma)', ca: 'professional autònoma', es: 'profesional autónoma' },
  taxId: 'Z1782216C',
  address: 'Calle Barcelona, 20, Esc. 1, 2º 1ª, 08930 Sant Adrià de Besòs, Barcelona, Spain',
  email: 'info@smart-agriculture.tech',
};

/** Bump when the policy text changes; stored with every consent. */
export const POLICY_VERSION = '2026-10-13';

/** Fields stored with each consent, as proof of what was accepted and when. */
export function consentRecord(now = new Date()) {
  return { consent: 'yes', consentAt: now.toISOString(), policyVersion: POLICY_VERSION };
}
