'use client';

import { useMemo } from 'react';
import { getTranslationMethod } from '@/app/shared/i18n/utils';
import { useTranslationContext } from '@/app/shared/i18n/useTranslationContext';

export const useTranslation = () => {
  const { dictionary, locale } = useTranslationContext();
  const t = useMemo(() => getTranslationMethod(dictionary, locale), [dictionary, locale]);

  return t;
};
