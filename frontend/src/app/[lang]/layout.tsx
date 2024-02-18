import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/app/lib/providers/AntdRegistry';
import { direction, getDictionary } from '@/app/lib/i18n/dictionaries';
import { i18n } from '@/app/lib/i18n/config';
import { LangProps } from '@/app/shared/i18n/types';
import AntdConfigProvider from '@/app/lib/providers/AntdConfigProvider';
import DayJSLocale from '@/app/lib/DayJSLocale';
import { consoleLogDev } from '@/app/shared/utils/common';
import { TranslationProvider } from '../lib/providers/TranslationContext';

import '../lib/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  // TODO add hreflang tags https://localizely.com/blog/nextjs-i18n-tutorial/?tab=app-router#add-hreflang-tags-t0
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }: React.PropsWithChildren<LangProps>) {
  consoleLogDev('update RootLayout');
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const dir = direction[lang];

  return (
    <html lang={lang} dir={dir}>
      <body className={inter.className}>
        <DayJSLocale params={params} />
        <StyledComponentsRegistry>
          <AntdConfigProvider locale={lang} dir={dir}>
            <TranslationProvider dictionary={dictionary} locale={lang}>
              {children}
            </TranslationProvider>
          </AntdConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
