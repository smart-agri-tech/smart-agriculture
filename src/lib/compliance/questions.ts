import { MESSAGES, type Lang } from './locales';
import type { Answers } from './types';

export interface Option<V extends string = string> {
  value: V;
  label: string;
  /** Selecting this option shows a free-text field. */
  freeText?: boolean;
}

export interface Question {
  key: keyof Answers;
  title: string;
  help?: string;
  multi?: boolean;
  options: Option[];
  /** Where the free-text answer is stored, and its placeholder. */
  freeText?: { key: keyof Answers; placeholder: string };
}

type QuestionKey = keyof (typeof MESSAGES)['en']['questions'];

/** Question order and option values. Texts come from `locales/*`. */
const DEFS: { key: QuestionKey; multi?: boolean; values: string[]; freeTextValue?: string }[] = [
  { key: 'region', values: ['catalonia', 'other'] },
  { key: 'farmTypes', multi: true, values: ['arable', 'fruit', 'olive', 'vineyard', 'horticulture', 'livestock', 'other'], freeTextValue: 'other' },
  { key: 'area', values: ['lt1', '1to5', '5to10', '10to50', '50to200', 'gt200'] },
  { key: 'privateConsumptionOnly', values: ['no', 'yes'] },
  { key: 'fertiliser', values: ['none', 'mineral', 'organic', 'both'] },
  { key: 'manure', values: ['none', 'own', 'receive', 'both'] },
  { key: 'plantProtection', values: ['none', 'self', 'contractor'] },
  { key: 'irrigation', values: ['rainfed', 'irrigated', 'fertigation'] },
  { key: 'schemes', multi: true, values: ['cap_submitted', 'cap_pending', 'eco', 'organic', 'integrated', 'none'] },
  { key: 'recordMethods', multi: true, values: ['paper', 'excel', 'whatsapp', 'digital', 'none'] },
  { key: 'preparer', values: ['self', 'cooperative', 'advisor', 'nobody'] },
  { key: 'timeSpent', values: ['lt5', '5to10', '10to20', 'gt20'] },
];

export const QUESTION_COUNT = DEFS.length;

export function questions(lang: Lang = 'en'): Question[] {
  return DEFS.map(def => {
    const q = MESSAGES[lang].questions[def.key] as {
      title: string;
      help?: string;
      options: Record<string, string>;
      otherPlaceholder?: string;
    };
    return {
      key: def.key,
      title: q.title,
      help: q.help,
      multi: def.multi,
      options: def.values.map(value => ({ value, label: q.options[value], freeText: value === def.freeTextValue || undefined })),
      freeText: def.freeTextValue
        ? { key: `${def.key}Other` as keyof Answers, placeholder: q.otherPlaceholder ?? '' }
        : undefined,
    };
  });
}

/** Options that clear every other selection in a multi-select question. */
export const EXCLUSIVE_OPTIONS = new Set(['none']);

export type Draft = Partial<Record<keyof Answers, string | string[]>>;

/** Converts raw form values into typed answers. Returns null until every question is answered. */
export function toAnswers(draft: Draft): Answers | null {
  for (const def of DEFS) {
    const v = draft[def.key];
    if (v === undefined || (Array.isArray(v) && v.length === 0)) return null;
  }
  return {
    ...(draft as unknown as Answers),
    privateConsumptionOnly: draft.privateConsumptionOnly === 'yes',
  };
}
