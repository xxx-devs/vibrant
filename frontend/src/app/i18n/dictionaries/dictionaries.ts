import 'server-only';

import { Locale } from '@/app/i18n/config';

export type Dictionary = typeof import('./en.json');

// лишнего не тянет, можно проверить собрав приложение и посмотрев что только 1 импорт выполняется
// проверить что при переходе на урлы не грузится перевод лишний раз
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () =>
    import('./en.json')
      .then((module) => {
        console.log('load en dictionary');
        return module;
      })
      .then((module) => module.default),
  ru: () =>
    import('./ru.json')
      .then((module) => {
        console.log('load ru dictionary');
        return module;
      })
      .then((module) => module.default),
};

export const direction: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ru: 'ltr',
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
