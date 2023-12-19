import { getDictionary } from '@/app/lib/i18n/dictionaries';
import { getTranslationMethod } from '@/app/shared/i18n/utils';
import { Locale } from '@/app/shared/i18n/types';

export const useTranslation = async (locale: Locale) => {
  const dictionary = await getDictionary(locale);

  const t = getTranslationMethod(dictionary, locale);

  return t;
};
