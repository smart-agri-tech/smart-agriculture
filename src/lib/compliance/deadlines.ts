import type { Messages } from './locales';
import type { RequirementId } from './types';

/**
 * Deadline catalogue. Display texts live in `locales/*` (`deadlines`, `sources`, `ics.labels`).
 *
 * Dates confirmed by the SA.TECH team on 13 Oct 2026; CAP dates taken from the official
 * DUN page on Tràmits Gencat (tràmit 6497). While `confirmed` is false the UI shows a
 * [DATE] placeholder and the .ics marks the event as "to confirm".
 */
export interface Deadline {
  id: RequirementId;
  /** ISO date (YYYY-MM-DD) of the deadline, or null for continuous obligations. */
  date: string | null;
  /** First day of the filing window, when the obligation has one (YYYY-MM-DD). */
  opens?: string;
  /** Monthly reminder instead of a single date (records that must be kept continuously). */
  monthly?: boolean;
  confirmed: boolean;
  source: keyof Messages['sources'];
  /** Official page for checking the dates; `{lang}` becomes `ca` or `es`. */
  url?: string;
}

const DUN_PAGE = 'https://tramits.gencat.cat/{lang}/tramits/tramits-temes/6497_Declaracio-unica-Agraria-DUN';

export const DEADLINES: Record<RequirementId, Deadline> = {
  // The DUN filing window runs February to April; the closing day is taken as 30 April.
  dun: { id: 'dun', opens: '2027-02-01', date: '2027-04-30', confirmed: true, source: 'dunOrdre', url: DUN_PAGE },
  // CAP direct aid for 2026: 1 Feb – 15 May 2026, changes allowed until 31 May (Ordre ARP/24/2026).
  cap: { id: 'cap', opens: '2026-02-01', date: '2026-05-15', confirmed: true, source: 'dunOrdre', url: DUN_PAGE },
  dan: { id: 'dan', date: '2027-01-20', confirmed: true, source: 'dan' },
  qie: { id: 'qie', date: '2027-01-01', confirmed: true, source: 'qie' },
  fertilisation: { id: 'fertilisation', date: null, monthly: true, confirmed: true, source: 'rd1051' },
};

export const PLACEHOLDER_DATE = '[DATE]';

export function officialUrl(d: Deadline, m: Messages): string | undefined {
  return d.url?.replace('{lang}', m.officialLang);
}
