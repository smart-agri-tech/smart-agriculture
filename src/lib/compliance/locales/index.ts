import { ca } from './ca';
import { en, type Messages } from './en';
import { es } from './es';

export type Lang = 'en' | 'ca' | 'es';
export type { Messages };

export const LANGS: Lang[] = ['en', 'ca', 'es'];

export const MESSAGES: Record<Lang, Messages> = { en, ca, es };
