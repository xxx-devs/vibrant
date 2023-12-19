import React, { useContext } from 'react';
import { Dictionary, Locale } from '@/app/shared/i18n/types';

export type TranslationContextValue = {
  dictionary: Dictionary;
  locale: Locale;
};

export const TranslationContext = React.createContext<TranslationContextValue>(
  {} as TranslationContextValue,
);

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);

  if (!context)
    throw new Error('useTranslationContext must be used within a TranslationContext.Provider');

  return context;
};
