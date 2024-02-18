'use server';

import { Locale } from '@/app/shared/i18n/types';
import { cookies } from 'next/headers';
import { PREFERRED_LOCALE_COOKIE } from '@/app/lib/i18n/config';

const DAYS_IN_YEAR = 365;

const expiresInDays = (days: number) => {
  // eslint-disable-next-line no-magic-numbers
  const oneDay = 24 * 60 * 60 * 1000;

  return new Date(Date.now() + days * oneDay);
};

export async function setPreferredLocale(locale: Locale) {
  cookies().set(PREFERRED_LOCALE_COOKIE, locale, { expires: expiresInDays(DAYS_IN_YEAR) });
}
