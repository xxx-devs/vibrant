import IntlMessageFormat from 'intl-messageformat';
import { Dictionary, Locale } from '@/app/shared/i18n/types';

// TODO https://formatjs.io/docs/intl-messageformat/#formatters ??
// TODO обернуть этот файл в "use server" для того чтобы intl-messageformat не тянуть на клиент (сейчас ошибка падает)
export const getTranslationMethod =
  (dictionary: Dictionary, locale: Locale) =>
  (dictionaryPath: (d: Dictionary) => string, values?: Record<string, string | number>): string => {
    const msg = new IntlMessageFormat(dictionaryPath(dictionary), locale);

    return String(msg.format(values));
  };
