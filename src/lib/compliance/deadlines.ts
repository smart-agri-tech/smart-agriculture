import type { RequirementId } from './types';

/**
 * Deadline catalogue.
 *
 * [UNVERIFIED] The dates below come from the project spec and have NOT been
 * confirmed against the published 2026 campaign Ordre. While `confirmed` is
 * false the UI shows a [DATE] placeholder and the .ics marks the event as
 * "to confirm". Flip `confirmed` only after checking each date at source.
 */
export interface Deadline {
  id: RequirementId;
  label: string;
  /** ISO date (YYYY-MM-DD) for a single-day deadline, or null for continuous obligations. */
  date: string | null;
  /** Monthly reminder instead of a single date (records that must be kept continuously). */
  monthly?: boolean;
  confirmed: boolean;
  source: string;
}

export const DEADLINES: Record<RequirementId, Deadline> = {
  dun: {
    id: 'dun',
    label: 'DUN 2026 · annual farm declaration',
    date: '2026-12-31',
    confirmed: false,
    source: 'Annual DUN Ordre (ARP/7/2026)',
  },
  cap: {
    id: 'cap',
    label: 'CAP aid application',
    date: '2026-12-31',
    confirmed: false,
    source: 'Annual DUN Ordre (ARP/7/2026)',
  },
  dan: {
    id: 'dan',
    label: 'DAN 2026 · annual nitrogen declaration',
    date: '2027-01-20',
    confirmed: false,
    source: 'Catalan nitrogen management rules (DAN)',
  },
  qie: {
    id: 'qie',
    label: 'QIE · machine-readable phytosanitary records',
    date: '2027-01-01',
    confirmed: false,
    source: 'RD 1311/2012; FEGA note of 6 Nov 2025',
  },
  fertilisation: {
    id: 'fertilisation',
    label: 'Fertilisation records · monthly check',
    date: null,
    monthly: true,
    confirmed: true,
    source: 'RD 1051/2022',
  },
};

export const PLACEHOLDER_DATE = '[DATE]';
