export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ru'],
} as const;

export const COOKIE_NAME = 'preferredlocale';

export type Locale = (typeof i18n)['locales'][number];
