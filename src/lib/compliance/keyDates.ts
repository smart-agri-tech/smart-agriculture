/**
 * Key regulatory dates shown with live counters on the compliance check.
 *
 * Times are midnight in Madrid (CET, +01:00, for every date below), so counters
 * flip at the same moment for every visitor regardless of their own time zone.
 */

export type CounterStyle =
  /** Days, hours and minutes until the date: "80 d 06 h 32 m". */
  | 'countdown'
  /** Whole days until the date: "starts in 445 days". */
  | 'starts'
  /** Whole days until a filing window opens: "opens in 111 days". */
  | 'opens';

export interface KeyDate {
  id: string;
  /** Date as shown in the list. */
  dateLabel: string;
  title: string;
  /** When the obligation starts or the window opens. */
  at: string;
  /** When a filing window closes (end of that day); only for windows. */
  closes?: string;
  style: CounterStyle;
  source: string;
}

export const KEY_DATES: KeyDate[] = [
  {
    id: 'phyto-electronic',
    dateLabel: '1 Jan 2027',
    title: 'Electronic phytosanitary register',
    at: '2027-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'FEGA note of 6 Nov 2025',
  },
  {
    id: 'dan',
    dateLabel: '20 Jan 2027',
    title: 'DAN · annual nitrogen declaration',
    at: '2027-01-20T00:00:00+01:00',
    style: 'countdown',
    source: 'Catalan nitrogen management rules (DAN)',
  },
  {
    id: 'fertilisation',
    dateLabel: '1 Jan 2026',
    title: 'Fertilisation records',
    at: '2026-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'RD 1051/2022',
  },
  {
    id: 'treatments',
    dateLabel: 'Since 2013',
    title: 'Treatment register',
    at: '2013-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'RD 1311/2012',
  },
  {
    id: 'cue',
    dateLabel: '1 Jan 2028',
    title: 'Digital farm notebook (CUE)',
    at: '2028-01-01T00:00:00+01:00',
    style: 'starts',
    source: 'FEGA note of 6 Nov 2025',
  },
  {
    id: 'dun',
    dateLabel: 'Feb–Apr 2027',
    title: 'DUN · annual farm declaration',
    at: '2027-02-01T00:00:00+01:00',
    closes: '2027-05-01T00:00:00+02:00',
    style: 'opens',
    source: 'Annual DUN Ordre',
  },
];

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365.25 * DAY;

const pad = (n: number) => String(n).padStart(2, '0');
const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`;
const years = (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`;

export interface Counter {
  text: string;
  /** Whether the obligation already applies (counts up instead of down). */
  inForce: boolean;
}

/** Counter text for a key date at a given moment. Pure: pass `now` in. */
export function counterFor(item: KeyDate, now: Date): Counter {
  const start = new Date(item.at).getTime();
  const t = now.getTime();

  if (item.closes) {
    const end = new Date(item.closes).getTime();
    if (t < start) return { text: `opens in ${days(Math.floor((start - t) / DAY))}`, inForce: false };
    if (t < end) return { text: `closes in ${days(Math.floor((end - t) / DAY))}`, inForce: true };
    return { text: 'closed', inForce: false };
  }

  if (t >= start) {
    const elapsed = t - start;
    return { text: `in force ${elapsed >= YEAR ? years(Math.floor(elapsed / YEAR)) : days(Math.floor(elapsed / DAY))}`, inForce: true };
  }

  const left = start - t;
  if (item.style === 'countdown') {
    const d = Math.floor(left / DAY);
    const h = Math.floor((left % DAY) / HOUR);
    const m = Math.floor((left % HOUR) / MINUTE);
    return { text: `${d} d ${pad(h)} h ${pad(m)} m`, inForce: false };
  }
  return { text: `${item.style === 'opens' ? 'opens' : 'starts'} in ${days(Math.floor(left / DAY))}`, inForce: false };
}
