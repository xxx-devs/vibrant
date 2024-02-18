import { PropsWithChildren } from 'react';
import { Locale } from '@/app/shared/i18n/types';
import { ConfigProvider } from 'antd';
import { Locale as AntdLocale } from 'antd/es/locale';

const localeMap: Record<Locale, () => Promise<AntdLocale>> = {
  en: () => import('antd/es/locale/en_US').then((module) => module.default),
  ru: () => import('antd/es/locale/ru_RU').then((module) => module.default),
};

// вынести в отдельный файл
const theme = {
  components: {
    Layout: {
      headerBg: 'white',
    },
    Typography: {
      titleMarginBottom: 0,
    },
    Form: {
      itemMarginBottom: 0,
      labelFontSize: 12,
    },
  },
};

interface AntdConfigProviderProps {
  locale: Locale;
  dir: 'ltr' | 'rtl';
}

const AntdConfigProvider = async (props: PropsWithChildren<AntdConfigProviderProps>) => {
  const { locale, children, dir } = props;

  const antdLocale: AntdLocale = await localeMap[locale]();

  return (
    <ConfigProvider locale={antdLocale} direction={dir} theme={theme}>
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
