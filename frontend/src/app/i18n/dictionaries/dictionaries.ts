import 'server-only';

import { Dictionary, Locale } from '@/app/i18n/types';
import { consoleLogDev } from '@/app/utils/common';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () =>
    import('./en.json')
      .then((module) => {
        consoleLogDev('load en dictionary');
        return module;
      })
      .then((module) => module.default),
  ru: () =>
    import('./ru.json')
      .then((module) => {
        consoleLogDev('load ru dictionary');
        return module;
      })
      .then((module) => module.default),
};

export const direction: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ru: 'ltr',
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
