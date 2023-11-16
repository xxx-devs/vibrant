'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { i18n, PREFERRED_LOCALE_COOKIE } from '@/app/i18n/config';
import { Locale } from '@/app/i18n/types';
import Cookies from 'js-cookie';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedPathName = (locale: Locale) => {
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const onClick = (locale: Locale) => {
    Cookies.set(PREFERRED_LOCALE_COOKIE, locale, { expires: 365 });
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => (
          <li key={locale}>
            {/* we can't set prefetch=false - https://github.com/vercel/next.js/issues/43118 */}
            <Link
              href={{
                pathname: redirectedPathName(locale),
                search: searchParams.toString(),
              }}
              prefetch
              onClick={() => onClick(locale)}
            >
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
