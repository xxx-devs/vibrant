import { i18n } from '@/app/lib/i18n/config';

export type Locale = (typeof i18n)['locales'][number];
export type Dictionary = typeof import('../../lib/i18n/en.json');

export type LangProps = { params: { lang: Locale } };
