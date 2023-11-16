import { Dictionary } from '@/app/i18n/dictionaries/dictionaries';
import IntlMessageFormat from 'intl-messageformat';
import { Locale } from '@/app/i18n/config';

export const getTranslationMethod =
  (dictionary: Dictionary, locale: Locale) =>
  (dictionaryPath: (d: Dictionary) => string, values?: Record<string, string | number>) => {
    const msg = new IntlMessageFormat(dictionaryPath(dictionary), locale);

    return msg.format(values);
  };
