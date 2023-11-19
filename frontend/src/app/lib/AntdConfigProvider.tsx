import { PropsWithChildren } from 'react';
import { Locale } from '@/app/i18n/types';
import { ConfigProvider } from 'antd';
import { Locale as AntdLocale } from 'antd/es/locale';

const localeMap: Record<Locale, () => Promise<AntdLocale>> = {
  en: () => import('antd/es/locale/en_US').then((module) => module.default),
  ru: () => import('antd/es/locale/ru_RU').then((module) => module.default),
  'zh-CN': () => import('antd/es/locale/zh_CN').then((module) => module.default),
};

interface AntdConfigProviderProps {
  locale: Locale;
  dir: 'ltr' | 'rtl';
}

const AntdConfigProvider = async (props: PropsWithChildren<AntdConfigProviderProps>) => {
  const { locale, children, dir } = props;

  const antdLocale: AntdLocale = await localeMap[locale]();

  return (
    <ConfigProvider locale={antdLocale} direction={dir}>
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
