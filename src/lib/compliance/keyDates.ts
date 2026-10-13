import { MESSAGES, type Lang, type Messages } from './locales';

/**
 * Key regulatory dates shown with live counters on the compliance check.
 *
 * Times are midnight in Madrid (CET, +01:00, for every date below), so counters
 * flip at the same moment for every visitor regardless of their own time zone.
 */

export type CounterStyle =
  /** Days, hours and minutes until the date: "80 d 06 h 32 m". Texts per language in `locales/*`. */
  | 'countdown'
  /** Whole days until the date: "starts in 445 days". */
  | 'starts'
  /** Whole days until a filing window opens: "opens in 111 days". */
  | 'opens';

export interface KeyDate {
  id: keyof Messages['keyDates'];
  /** When the obligation starts or the window opens. */
  at: string;
  /** When a filing window closes (end of that day); only for windows. */
  closes?: string;
  style: CounterStyle;
  source: keyof Messages['sources'];
}

export const KEY_DATES: KeyDate[] = [
  {
    id: 'phyto-electronic',
    at: '2027-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'fega',
  },
  {
    id: 'dan',
    at: '2027-01-20T00:00:00+01:00',
    style: 'countdown',
    source: 'dan',
  },
  {
    id: 'fertilisation',
    at: '2026-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'rd1051',
  },
  {
    id: 'treatments',
    at: '2013-01-01T00:00:00+01:00',
    style: 'countdown',
    source: 'rd1311',
  },
  {
    id: 'cue',
    at: '2028-01-01T00:00:00+01:00',
    style: 'starts',
    source: 'fega',
  },
  {
    id: 'dun',
    at: '2027-02-01T00:00:00+01:00',
    closes: '2027-05-01T00:00:00+02:00',
    style: 'opens',
    source: 'annualDun',
  },
];

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365.25 * DAY;

const pad = (n: number) => String(n).padStart(2, '0');

export interface Counter {
  text: string;
  /** Whether the obligation already applies (counts up instead of down). */
  inForce: boolean;
}

/** Counter text for a key date at a given moment. Pure: pass `now` in. */
export function counterFor(item: KeyDate, now: Date, lang: Lang = 'en'): Counter {
  const words = MESSAGES[lang].counters;
  const start = new Date(item.at).getTime();
  const time = now.getTime();

  if (item.closes) {
    const end = new Date(item.closes).getTime();
    if (time < start) return { text: words.opensIn(words.days(Math.floor((start - time) / DAY))), inForce: false };
    if (time < end) return { text: words.closesIn(words.days(Math.floor((end - time) / DAY))), inForce: true };
    return { text: words.closed, inForce: false };
  }

  if (time >= start) {
    const elapsed = time - start;
    const span = elapsed >= YEAR ? words.years(Math.floor(elapsed / YEAR)) : words.days(Math.floor(elapsed / DAY));
    return { text: words.inForce(span), inForce: true };
  }

  const left = start - time;
  if (item.style === 'countdown') {
    const d = Math.floor(left / DAY);
    const h = Math.floor((left % DAY) / HOUR);
    const m = Math.floor((left % HOUR) / MINUTE);
    return { text: `${d} d ${pad(h)} h ${pad(m)} m`, inForce: false };
  }
  const span = words.days(Math.floor(left / DAY));
  return { text: item.style === 'opens' ? words.opensIn(span) : words.startsIn(span), inForce: false };
}
