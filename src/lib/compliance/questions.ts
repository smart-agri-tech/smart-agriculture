import type { Answers } from './types';

export interface Option<V extends string = string> {
  value: V;
  label: string;
  hint?: string;
}

export interface Question {
  key: keyof Answers;
  title: string;
  help?: string;
  multi?: boolean;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    key: 'region',
    title: 'Where is your farm?',
    help: 'The check currently covers Catalan rules only.',
    options: [
      { value: 'catalonia', label: 'Catalonia' },
      { value: 'other', label: 'Another region of Spain' },
    ],
  },
  {
    key: 'farmTypes',
    title: 'What do you farm?',
    help: 'Select all that apply.',
    multi: true,
    options: [
      { value: 'arable', label: 'Arable crops' },
      { value: 'fruit', label: 'Fruit trees' },
      { value: 'olive', label: 'Olives' },
      { value: 'vineyard', label: 'Vineyard' },
      { value: 'horticulture', label: 'Vegetables' },
      { value: 'livestock', label: 'Livestock' },
    ],
  },
  {
    key: 'area',
    title: 'How large is your farm?',
    options: [
      { value: 'lt1', label: 'Under 1 ha' },
      { value: '1to10', label: '1 to 10 ha' },
      { value: '10to50', label: '10 to 50 ha' },
      { value: '50to200', label: '50 to 200 ha' },
      { value: 'gt200', label: 'More than 200 ha' },
    ],
  },
  {
    key: 'privateConsumptionOnly',
    title: 'Is everything you produce for your own household?',
    options: [
      { value: 'no', label: 'No, I sell some or all of it' },
      { value: 'yes', label: 'Yes, private consumption only' },
    ],
  },
  {
    key: 'fertiliser',
    title: 'Do you apply fertilisers?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'mineral', label: 'Mineral fertilisers' },
      { value: 'organic', label: 'Organic fertilisers' },
      { value: 'both', label: 'Both' },
    ],
  },
  {
    key: 'manure',
    title: 'Do you use manure or slurry?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'own', label: 'Yes, from my own livestock' },
      { value: 'receive', label: 'Yes, I receive it from another farm' },
      { value: 'both', label: 'Both' },
    ],
  },
  {
    key: 'plantProtection',
    title: 'Do you use plant protection products?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'self', label: 'Yes, I apply them myself' },
      { value: 'contractor', label: 'Yes, through a contractor' },
    ],
  },
  {
    key: 'irrigation',
    title: 'How are your crops watered?',
    options: [
      { value: 'rainfed', label: 'Rainfed' },
      { value: 'irrigated', label: 'Irrigated' },
      { value: 'fertigation', label: 'Irrigated with fertigation' },
    ],
  },
  {
    key: 'schemes',
    title: 'Which schemes are you part of?',
    help: 'Select all that apply.',
    multi: true,
    options: [
      { value: 'cap_submitted', label: 'CAP direct aid, already applied this year' },
      { value: 'cap_pending', label: 'CAP direct aid, not applied yet' },
      { value: 'eco', label: 'Eco-schemes' },
      { value: 'organic', label: 'Organic certification' },
      { value: 'integrated', label: 'Integrated production' },
      { value: 'none', label: 'None of these' },
    ],
  },
  {
    key: 'recordMethods',
    title: 'Where do you keep your farm records today?',
    help: 'Select all that apply.',
    multi: true,
    options: [
      { value: 'paper', label: 'Paper notebook' },
      { value: 'excel', label: 'Excel or spreadsheets' },
      { value: 'whatsapp', label: 'WhatsApp messages or photos' },
      { value: 'digital', label: 'A digital farm notebook' },
      { value: 'none', label: 'I do not keep records' },
    ],
  },
  {
    key: 'preparer',
    title: 'Who prepares your declarations?',
    options: [
      { value: 'self', label: 'I do it myself' },
      { value: 'cooperative', label: 'My cooperative' },
      { value: 'advisor', label: 'An advisor or gestoria' },
      { value: 'nobody', label: 'Nobody at the moment' },
    ],
  },
  {
    key: 'timeSpent',
    title: 'How much time do you spend on paperwork each year?',
    options: [
      { value: 'lt5', label: 'Under 5 hours' },
      { value: '5to10', label: '5 to 10 hours' },
      { value: '10to20', label: '10 to 20 hours' },
      { value: 'gt20', label: 'More than 20 hours' },
    ],
  },
];

/** Options that clear every other selection in a multi-select question. */
export const EXCLUSIVE_OPTIONS = new Set(['none']);

export type Draft = Partial<Record<keyof Answers, string | string[]>>;

/** Converts raw form values into typed answers. Returns null until every question is answered. */
export function toAnswers(draft: Draft): Answers | null {
  for (const q of QUESTIONS) {
    const v = draft[q.key];
    if (v === undefined || (Array.isArray(v) && v.length === 0)) return null;
  }
  return {
    ...(draft as unknown as Answers),
    privateConsumptionOnly: draft.privateConsumptionOnly === 'yes',
  };
}
