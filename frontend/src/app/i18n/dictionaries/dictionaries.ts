import 'server-only';

import { Dictionary, Locale } from '@/app/i18n/types';

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
  'zh-CN': () => import('./zh-CN.json').then((module) => module.default),
};

export const direction: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ru: 'ltr',
  'zh-CN': 'ltr',
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
