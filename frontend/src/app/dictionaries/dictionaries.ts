import 'server-only';

type Locales = 'en' | 'ru';

// посмотреть, остается ли код тайпскрипта Promise<typeof import('./en.json')>
const dictionaries: Record<Locales, () => Promise<typeof import('./en.json')>> = {
  en: () => import('./en.json').then((module) => module.default),
  ru: () => import('./ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locales) => dictionaries[locale]();
