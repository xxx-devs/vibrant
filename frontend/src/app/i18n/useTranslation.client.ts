'use client';

import IntlMessageFormat from 'intl-messageformat';
import { useTranslationContext } from '@/app/i18n/TranslationContext';
import { Dictionary } from '@/app/i18n/dictionaries/dictionaries';
import { useCallback } from 'react';

export const useTranslation = () => {
  const { dictionary, locale } = useTranslationContext();

  const t = useCallback(
    (dictionaryPath: (d: Dictionary) => string, values?: Record<string, string | number>) => {
      const msg = new IntlMessageFormat(dictionaryPath(dictionary), locale);

      return msg.format(values);
    },
    [dictionary, locale],
  );

  return t;
};
