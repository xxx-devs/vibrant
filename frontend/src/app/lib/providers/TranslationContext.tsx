'use client';

import React, { useMemo } from 'react';

import { Dictionary, Locale } from '@/app/shared/i18n/types';
import {
  TranslationContext,
  TranslationContextValue,
} from '@/app/shared/i18n/useTranslationContext';

interface TranslationProviderProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function TranslationProvider(props: React.PropsWithChildren<TranslationProviderProps>) {
  const { children, dictionary, locale } = props;

  const contextValue: TranslationContextValue = useMemo(
    () => ({ dictionary, locale }),
    [dictionary, locale],
  );

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
}
