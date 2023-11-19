import IntlMessageFormat from 'intl-messageformat';

import { Dictionary, Locale } from '@/app/i18n/types';

// TODO https://formatjs.io/docs/intl-messageformat/#formatters ??
export const getTranslationMethod =
  (dictionary: Dictionary, locale: Locale) =>
  (dictionaryPath: (d: Dictionary) => string, values?: Record<string, string | number>) => {
    const msg = new IntlMessageFormat(dictionaryPath(dictionary), locale);

    return msg.format(values);
  };
