'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, PREFERRED_LOCALE_COOKIE } from '@/app/i18n/config';
import { Locale } from '@/app/i18n/types';
import Cookies from 'js-cookie';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { useTranslationContext } from '@/app/i18n/TranslationContext';

const LANGUAGES_TRANSLATIONS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
} as const;

// а точно нужен клиентский компонент? нельзя его в серверный превратить? - https://github.com/vercel/next.js/issues/43704
export default function LocaleSwitcher() {
  const pathName = usePathname();
  const { locale: currentLocale } = useTranslationContext();
  // https://nextjs.org/docs/messages/deopted-into-client-rendering
  // TODO realise if we need redirect with searchParams
  // const searchParams = useSearchParams();

  const redirectedPathName = (locale: Locale) => {
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const onClick = (locale: Locale) => {
    Cookies.set(PREFERRED_LOCALE_COOKIE, locale, { expires: 365 });
  };

  const items: MenuProps['items'] = i18n.locales.map((locale) => ({
    key: locale,
    label: (
      /* we can't set prefetch=false - https://github.com/vercel/next.js/issues/43118 */
      <Link
        href={{
          pathname: redirectedPathName(locale),
          // search: searchParams.toString(),
        }}
        prefetch
        onClick={() => onClick(locale)}
      >
        {LANGUAGES_TRANSLATIONS[locale]}
      </Link>
    ),
  }));

  return (
    <Dropdown menu={{ items }}>
      <Button icon={<GlobalOutlined />}>{LANGUAGES_TRANSLATIONS[currentLocale]}</Button>
    </Dropdown>
  );
}
