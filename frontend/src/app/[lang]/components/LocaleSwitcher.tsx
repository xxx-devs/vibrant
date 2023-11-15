'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/app/i18n/config';

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    // в куки еще записывать
    // и search добавлять
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => (
          <li key={locale}>
            {/* we can't set prefetch=false - https://github.com/vercel/next.js/issues/43118 */}
            <Link href={redirectedPathName(locale)} prefetch>
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
