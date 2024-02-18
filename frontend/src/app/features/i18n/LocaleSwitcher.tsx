'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/app/lib/i18n/config';
import { Locale } from '@/app/shared/i18n/types';
import { useTranslationContext } from '@/app/shared/i18n/useTranslationContext';
import { GlobalOutlined } from '@ant-design/icons';
import { setPreferredLocale } from '@/app/shared/utils/cookies';

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
        onClick={async () => {
          await setPreferredLocale(locale);
        }}
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
