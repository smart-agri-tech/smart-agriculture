import type { RequirementId } from './types';

/**
 * Deadline catalogue.
 *
 * Dates confirmed by the SA.TECH team on 13 Oct 2026. While `confirmed` is false
 * the UI shows a [DATE] placeholder and the .ics marks the event as "to confirm".
 */
export interface Deadline {
  id: RequirementId;
  label: string;
  /** ISO date (YYYY-MM-DD) of the deadline, or null for continuous obligations. */
  date: string | null;
  /** First day of the filing window, when the obligation has one (YYYY-MM-DD). */
  opens?: string;
  /** Overrides the formatted date in the deadline column, e.g. a filing window. */
  dateLabel?: string;
  /** Monthly reminder instead of a single date (records that must be kept continuously). */
  monthly?: boolean;
  confirmed: boolean;
  source: string;
}

// The DUN filing window runs February to April. The closing day is taken as 30 April;
// check it against the DUN Ordre for each campaign.
const DUN_WINDOW = { opens: '2027-02-01', date: '2027-04-30', dateLabel: 'Feb–Apr 2027' };

export const DEADLINES: Record<RequirementId, Deadline> = {
  dun: {
    id: 'dun',
    label: 'DUN 2027 · annual farm declaration',
    ...DUN_WINDOW,
    confirmed: true,
    source: 'Annual DUN Ordre',
  },
  cap: {
    id: 'cap',
    // In Catalonia the CAP aid application is filed inside the DUN.
    label: 'CAP aid application (filed with the DUN)',
    ...DUN_WINDOW,
    confirmed: true,
    source: 'Annual DUN Ordre',
  },
  dan: {
    id: 'dan',
    label: 'DAN 2026 · annual nitrogen declaration',
    date: '2027-01-20',
    confirmed: true,
    source: 'Catalan nitrogen management rules (DAN)',
  },
  qie: {
    id: 'qie',
    label: 'Electronic phytosanitary register becomes mandatory',
    date: '2027-01-01',
    confirmed: true,
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
