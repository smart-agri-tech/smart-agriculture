import { DEADLINES } from './deadlines';
import { MESSAGES, type Lang } from './locales';
import type { Requirement } from './types';

/** Builds an RFC 5545 calendar: one VEVENT per applicable deadline, each with a 14-day reminder. */

const REMINDER_DAYS = 14;

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

const encoder = new TextEncoder();

/** Folds lines longer than 75 octets, as required by RFC 5545 §3.1, without splitting a character. */
function fold(line: string): string {
  const out: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const bytes = encoder.encode(ch).length;
    if (size + bytes > 75) {
      out.push(current);
      current = ' ';
      size = 1;
    }
    current += ch;
    size += bytes;
  }
  out.push(current);
  return out.join('\r\n');
}

function ymd(iso: string): string {
  return iso.replace(/-/g, '');
}

function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function stamp(now: Date): string {
  return now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Requirements that get a calendar event: open ones whose deadline is still ahead.
 * Continuous obligations (monthly reminders) always qualify.
 */
export function calendarEvents(requirements: Requirement[], now: Date): Requirement[] {
  const today = now.toISOString().slice(0, 10);
  return requirements.filter(req => {
    if (req.status === 'completed') return false;
    const d = DEADLINES[req.id];
    return d.monthly || (d.date !== null && d.date >= today);
  });
}

export interface IcsOptions {
  /** Injected so the output is deterministic in tests. */
  now: Date;
  /** First day of the monthly reminder for continuous obligations (YYYY-MM-DD). */
  monthlyStart: string;
  lang?: Lang;
}

export function buildIcs(requirements: Requirement[], { now, monthlyStart, lang = 'en' }: IcsOptions): string {
  const m = MESSAGES[lang];
  const t = m.ics;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SA.TECH//Farm Compliance Check//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(t.calendarName)}`,
  ];

  for (const req of calendarEvents(requirements, now)) {
    const d = DEADLINES[req.id];
    const label = t.labels[req.id];
    const start = d.date && !d.monthly ? d.date : monthlyStart;
    const summary = d.confirmed ? label : `${label} ${t.toConfirm}`;
    const description = [
      req.need,
      d.opens ? t.windowOpens(d.opens) : '',
      t.source(req.sourceUrl ? `${req.source} (${req.sourceUrl})` : req.source),
      d.confirmed ? '' : t.unconfirmed,
    ]
      .filter(Boolean)
      .join('\n');

    lines.push(
      'BEGIN:VEVENT',
      `UID:${req.id}-${ymd(start)}@satech.compliance-check`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART;VALUE=DATE:${ymd(start)}`,
      `DTEND;VALUE=DATE:${ymd(nextDay(start))}`,
      ...(d.monthly ? ['RRULE:FREQ=MONTHLY;COUNT=12'] : []),
      `SUMMARY:${escapeText(summary)}`,
      `DESCRIPTION:${escapeText(description)}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(t.reminder(label, REMINDER_DAYS))}`,
      `TRIGGER:-P${REMINDER_DAYS}D`,
      'END:VALARM',
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
