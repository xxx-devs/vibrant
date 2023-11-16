'use client';

import { useTranslationContext } from '@/app/i18n/TranslationContext';
import { useMemo } from 'react';
import { getTranslationMethod } from '@/app/i18n/utils';

export const useTranslation = () => {
  const { dictionary, locale } = useTranslationContext();

  const t = useMemo(() => getTranslationMethod(dictionary, locale), [dictionary, locale]);

  return t;
};
