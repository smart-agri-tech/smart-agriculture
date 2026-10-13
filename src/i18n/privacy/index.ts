import type { Lang } from '@/lib/compliance';
import { ca } from './ca';
import { en, type PrivacyMessages } from './en';
import { es } from './es';

export const PRIVACY: Record<Lang, PrivacyMessages> = { en, ca, es };
export type { PolicySection, PrivacyMessages } from './en';
