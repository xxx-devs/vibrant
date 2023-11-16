import { getDictionary } from '@/app/i18n/dictionaries/dictionaries';
import { Locale } from '@/app/i18n/config';
import { getTranslationMethod } from '@/app/i18n/utils';

export const useTranslation = async (locale: Locale) => {
  const dictionary = await getDictionary(locale);

  const t = getTranslationMethod(dictionary, locale);

  return t;
};
