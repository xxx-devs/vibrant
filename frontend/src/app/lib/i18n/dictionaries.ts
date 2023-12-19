import 'server-only';

import { Dictionary, Locale } from '@/app/shared/i18n/types';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en.json').then((module) => module).then((module) => module.default),
  ru: () => import('./ru.json').then((module) => module).then((module) => module.default),
};

export const direction: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ru: 'ltr',
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
