import { i18n } from '@/app/i18n/config';

export type Locale = (typeof i18n)['locales'][number];
export type Dictionary = typeof import('./dictionaries/en.json');

export type LangProps = { params: { lang: Locale } };
