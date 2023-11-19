'use client';

import React, { useContext, useMemo } from 'react';

import { Dictionary, Locale } from '@/app/i18n/types';

interface TranslationProviderProps {
  dictionary: Dictionary;
  locale: Locale;
}

type TranslationContextValue = {
  dictionary: Dictionary;
  locale: Locale;
};

const TranslationContext = React.createContext<TranslationContextValue>(
  {} as TranslationContextValue,
);

export function TranslationProvider(props: React.PropsWithChildren<TranslationProviderProps>) {
  const { children, dictionary, locale } = props;

  const contextValue: TranslationContextValue = useMemo(
    () => ({ dictionary, locale }),
    [dictionary, locale],
  );

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
}

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);

  if (!context)
    throw new Error('useTranslationContext must be used within a TranslationContext.Provider');

  return context;
};
