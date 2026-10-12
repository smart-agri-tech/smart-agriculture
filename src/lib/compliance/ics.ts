import { DEADLINES } from './deadlines';
import type { Requirement } from './types';

/** Builds an RFC 5545 calendar: one VEVENT per applicable deadline, each with a 14-day reminder. */

const REMINDER_DAYS = 14;

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Folds lines longer than 75 octets, as required by RFC 5545 §3.1. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    out.push(rest.slice(0, 75));
    rest = ' ' + rest.slice(75);
  }
  out.push(rest);
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

export interface IcsOptions {
  /** Injected so the output is deterministic in tests. */
  now: Date;
  /** First day of the monthly reminder for continuous obligations (YYYY-MM-DD). */
  monthlyStart: string;
}

export function buildIcs(requirements: Requirement[], { now, monthlyStart }: IcsOptions): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SA.TECH//Farm Compliance Check//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Farm compliance deadlines',
  ];

  for (const req of requirements) {
    if (req.status === 'completed') continue;
    const d = DEADLINES[req.id];
    const start = d.date ?? monthlyStart;
    const summary = d.confirmed ? d.label : `${d.label} (date to confirm)`;
    const description = [
      req.need,
      `Source: ${d.source}.`,
      d.confirmed ? '' : 'This date has not yet been confirmed against the published 2026 campaign. Check it before relying on it.',
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
      `DESCRIPTION:${escapeText(`${d.label} in ${REMINDER_DAYS} days`)}`,
      `TRIGGER:-P${REMINDER_DAYS}D`,
      'END:VALARM',
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
